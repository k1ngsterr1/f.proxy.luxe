import { apiClient } from "@/shared/config/apiClient";
import axios from "axios";
import { ChangePassword } from "@/shared/interfaces/change-password.interface";

export const changePassword = async (data: ChangePassword): Promise<any> => {
  try {
    const response = await apiClient.post("/api/v1/auth/reset-password", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Reset password failed with status:",
        error.response.status
      );
    } else {
      console.error("Reset password error:", error);
    }
    throw error;
  }
};
