import { RegisterUser } from "@/interfaces/register.interface";
import axios from "axios";
import { apiClient } from "./apiClient/apiClient";

export const register = async (data: RegisterUser) => {
  try {
    const response = await apiClient.post("/api/v1/auth/register", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Registration failed with status:", error.response.status);
    } else {
      console.error("Registration error:", error);
    }
    throw error;
  }
};
