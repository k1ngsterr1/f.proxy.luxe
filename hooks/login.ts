import { LoginUser } from "@/interfaces/login.interface";
import axios from "axios";
import { apiClient } from "./apiClient/apiClient";

export const login = async (data: LoginUser) => {
  try {
    const response = await apiClient.post("/api/v1/auth/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login failed with status:", error.response.status);
    } else {
      console.error("Login error:", error);
    }
    throw error;
  }
};
