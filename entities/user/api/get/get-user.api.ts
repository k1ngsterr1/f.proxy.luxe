import { LoginRDO, LoginUser } from "@/shared/interfaces/login.interface";
import { apiClient } from "@/shared/config/apiClient";
import axios from "axios";
import { UserRDO } from "@/shared/interfaces/user.interface";

export const getUser = async (): Promise<UserRDO> => {
  try {
    const response = await apiClient.post("/api/v1/user/me");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Get me failed with status:", error.response.status);
    } else {
      console.error("Get me error:", error);
    }
    throw error;
  }
};
