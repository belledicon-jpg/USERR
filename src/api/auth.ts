import axios from "axios";

// Base API configuration
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Functions
export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const signupUser = async (name: string, email: string, password: string) => {
  const response = await api.post("/auth/signup", { name, email, password });
  return response.data;
};

export const verifyOTPUser = async (email: string, otp: string) => {
  const response = await api.post("/auth/verify-otp", { email, otp });
  return response.data;
};

export const resendOTPUser = async (email: string) => {
  const response = await api.post("/auth/resend-otp", { email });
  return response.data;
};