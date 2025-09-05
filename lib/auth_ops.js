// src/lib/auth_ops.js
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://3.252.220.211";

export async function registerUser({
  name,
  email,
  password,
  password_confirmation,
}) {
  const payload = {
    name,
    email,
    password,
    password_confirmation,
  };

  console.log("-- Register Request Payload --", payload);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/app/register`,
      payload
    );

    console.log("-- Register Response --", response.data);
    return response.data;
  } catch (error) {
    console.error("-- Register Error --", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error; // re-throw so modal can handle
  }
}

export async function verifyOtpApi(email, token) {
  return axios.post(`${BASE_URL}/api/v1/app/verify-email`, { email, token });
}
