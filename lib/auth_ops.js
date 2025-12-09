// lib/auth_ops.js
import axios from "axios";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.questhub.digital";

const api = axios.create({ baseURL: BASE_URL });

// --- Helper: force logout user completely ---
const handleForcedLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
  sessionStorage.removeItem("user");
  window.dispatchEvent(new Event("auth-logout"));
};

// --- Token refresh function ---
const refreshAccessToken = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/v1/app/refresh`,
      {},
      {
        withCredentials: true,
        headers: { Accept: "application/json" },
      }
    );

    const newToken = res.data?.data?.access_token;
    const newExpiry = res.data?.data?.expires_in; // UNIX timestamp

    if (newToken && newExpiry) {
      localStorage.setItem("token", newToken);
      localStorage.setItem("tokenExpiry", newExpiry.toString());
      return newToken;
    }

    console.warn("Invalid refresh response:", res.data);
    handleForcedLogout();
    return null;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("Refresh token expired or invalid — logging out");
    } else {
      console.error("Token refresh failed:", error);
    }
    handleForcedLogout();
    return null;
  }
};

// --- Request Interceptor (check expiry before sending) ---
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    const expiry = Number(localStorage.getItem("tokenExpiry"));
    const lang = localStorage.getItem("lang");

    // Check expiry before request
    if (expiry && Math.floor(Date.now() / 1000) >= expiry) {
      console.warn("Token expired — refreshing before request...");
      const newToken = await refreshAccessToken();

      // if refresh failed, stop request entirely
      if (!newToken) throw new Error("Token refresh failed before request");

      config.headers.Authorization = `Bearer ${newToken}`;
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (lang) config.headers["Accept-Language"] = lang;
    config.withCredentials = true;

    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor (only logout on 401/403) ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("401/403 detected — logging out user");
      handleForcedLogout();
    }
    return Promise.reject(error);
  }
);

export default api;

export async function logoutUser() {
  try {
    await api.post("/api/v1/app/logout");
  } catch (error) {
    return error?.response?.data;
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("user");
    localStorage.removeItem("guestId");
    sessionStorage.removeItem("user");

    window.dispatchEvent(new Event("auth-logout"));
  }
}

// ================== AUTH OPS ==================
export async function registerUser(data) {
  try {
    const lang = localStorage.getItem("lang") || "en";
    const response = await axios.post(`${BASE_URL}/api/v1/app/register`, data, {
      headers: {
        "Accept-Language": lang,
      },
    });
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function loginUser({ email, password }) {
  try {
    const lang = localStorage.getItem("lang") || "en";
    const response = await axios.post(
      `${BASE_URL}/api/v1/app/login`,
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Accept-Language": lang,
        },
      }
    );

    const data = response.data?.data || response.data;

    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("tokenExpiry", data.expires_in.toString());
    }

    return {
      success: true,
      status: response.status,
      message: "Login successful",
      data,
    };
  } catch (error) {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || "Login failed. Please try again.";

    return {
      success: false,
      status,
      message,
      data: null,
    };
  }
}

export async function guestLoginApi() {
  try {
    const lang = localStorage.getItem("lang") || "en";
    const guestId = localStorage.getItem("guestId");
    const data = guestId
      ? {
          guest_id: guestId,
        }
      : null;
    const response = await axios.post(
      `${BASE_URL}/api/v1/app/guest-login`,
      data,
      {
        headers: {
          "Accept-Language": lang,
        },
      }
    );

    // if (response.data?.data?.token) {
    //   localStorage.setItem("token", response.data.data.token);
    // }

    return response.data;
  } catch (error) {
    return { ...error.response?.data, status: error.response?.status };
  }
}
/** Step 1: Redirect to Google OAuth */
export async function loginWithGoogleApi() {
  try {
    const lang = localStorage.getItem("lang") || "en";
    const response = await axios.get(
      `${BASE_URL}/api/v1/app/login/google/redirect`,
      {
        headers: {
          "Accept-Language": lang,
        },
      }
    );
    // The backend returns the Google OAuth redirect URL
    if (response?.data?.url) {
      window.location.href = response.data.url; // Redirect directly from frontend
    }
    return response.data;
  } catch (error) {
    console.error("Google login redirect failed:", error);
    return { ...error.response?.data, status: error.response?.status };
  }
}

export async function verifyOtpApi(email, token) {
  try {
    const lang = localStorage.getItem("lang") || "en";
    const response = await axios.post(
      `${BASE_URL}/api/v1/app/verify-email`,
      {
        email,
        token,
      },
      {
        headers: {
          "Accept-Language": lang,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function forgotPassword(email) {
  try {
    const lang = localStorage.getItem("lang") || "en";
    const response = await axios.post(
      `${BASE_URL}/api/v1/app/forgot-password`,
      {
        email,
      },
      {
        headers: {
          "Accept-Language": lang,
        },
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
    const lang = localStorage.getItem("lang") || "en";
    const response = await axios.post(
      `${BASE_URL}/api/v1/app/reset-password`,
      {
        email,
        otp,
        password,
        password_confirmation,
      },
      {
        headers: {
          "Accept-Language": lang,
        },
      }
    );
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

export async function getTagList() {
  try {
    const response = await api.get(`/api/v1/app/tags`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
