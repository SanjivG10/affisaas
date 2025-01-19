import axios, { AxiosError } from "axios";
import { BACKEND_URLS } from "./urls";

export const getAuthHeaders = () => {
  if (typeof window === "undefined") {
    return {};
  }
  const token = localStorage.getItem("jwt");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const axiosInstance = axios.create({
  baseURL: BACKEND_URLS.BACKEND_BASE_URL,
});

export const getAxiosError = (error: unknown) => {
  let errorMessage = "Something went wrong";
  if (error instanceof AxiosError) {
    if (error.response) {
      errorMessage = error.response?.data?.error ?? "Something went wrong";
    } else if (error.request) {
      errorMessage = "Network Error";
    } else {
      errorMessage = "Something went wrong";
    }
  }
  return errorMessage;
};
