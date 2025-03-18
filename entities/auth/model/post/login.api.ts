import { LoginRDO, LoginUser } from "@/shared/interfaces/login.interface";
import { apiClient } from "@/shared/config/apiClient";
import axios from "axios";

export const login = async (data: LoginUser): Promise<LoginRDO> => {
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
