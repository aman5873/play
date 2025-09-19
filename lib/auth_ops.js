// lib/auth_ops.js
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.questhub.digital";
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://54.154.152.8";

// Axios instance
const api = axios.create({ baseURL: BASE_URL });

let isRefreshing = false; // flag to prevent multiple refresh requests
let failedQueue = [];

// Helper to process queued requests after token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add withCredentials to allow sending cookies with requests
  config.withCredentials = true;

  return config;
});

// Response interceptor to handle 401 || 403
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Queue the request until token refresh is done
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${BASE_URL}/api/v1/app/refresh`,
          {},
          {
            withCredentials: true, // ✅ include cookies for refresh
            headers: { Accept: "application/json" },
          }
        );

        if (refreshResponse.data?.data?.access_token) {
          const newToken = refreshResponse.data.data.access_token;
          localStorage.setItem("token", newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          processQueue(null, newToken);

          return api(originalRequest); // retry failed request
        }
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.dispatchEvent(new Event("auth-logout"));
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// ================== AUTH OPS ==================
export async function registerUser({
  name,
  email,
  password,
  password_confirmation,
}) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/app/register`, {
      name,
      email,
      password,
      password_confirmation,
    });
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/app/login`,
      { email, password },
      { withCredentials: true }
    );

    if (response.data?.data?.token) {
      localStorage.setItem("token", response.data.data.token);
    }

    return response.data;
  } catch (error) {
    return { ...error.response?.data, status: error.response?.status };
  }
}
export async function verifyOtpApi(email, token) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/app/verify-email`, {
      email,
      token,
    });
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function forgotPassword(email) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/app/forgot-password`,
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function resetPassword(
  email,
  otp,
  password,
  password_confirmation
) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/app/reset-password`, {
      email,
      otp,
      password,
      password_confirmation,
    });
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function changePassword(
  current_password,
  new_password,
  new_password_confirmation
) {
  try {
    const response = await api.post(`/api/v1/app/change-password`, {
      current_password,
      new_password,
      new_password_confirmation,
    });
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function logoutUser() {
  try {
    await api.post("/api/v1/app/logout");
  } catch (error) {
    return error.response?.data;
  } finally {
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-logout"));
  }
}

// ✅ Fetch user profile if session empty
export async function fetchProfile() {
  try {
    const response = await api.get(`/api/v1/app/fetch-profile`);
    if (response.data?.data?.user) {
      sessionStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function updateProfile(data) {
  try {
    const response = await api.post(`/api/v1/app/update-profile`, data);
    if (response.data?.data?.user) {
      sessionStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

// 🔹 Handle backend messages consistently
export function handleApiMessage(message, showAlert, type = "error") {
  if (!message) {
    showAlert("Something went wrong", type);
    return;
  }

  if (typeof message === "string") {
    showAlert(message, type);
    return;
  }

  if (typeof message === "object") {
    Object.entries(message).forEach(([field, errors]) => {
      errors.forEach((msg) => {
        showAlert(`${field}: ${msg}`, type);
      });
    });
  }
}
