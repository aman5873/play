import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://3.252.220.211";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// 🔹 Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Handle expired/invalid token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.dispatchEvent(new Event("auth-logout"));
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
    const response = await axios.post(`${BASE_URL}/api/v1/app/login`, {
      email,
      password,
    });

    if (response.data?.data?.token) {
      localStorage.setItem("token", response.data.data?.token);
    }

    if (response.data?.data?.user) {
      sessionStorage.setItem("user", JSON.stringify(response.data.data?.user));
    }

    return response.data;
  } catch (error) {
    return error.response?.data;
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
    if (response.data?.user) {
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    return error.response?.data;
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
