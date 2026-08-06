import { apiClient } from "@/shared/config/apiClient";
import axios from "axios";
import { SendResetEmailDTO } from "@/shared/interfaces/email.interface";

export const sendResetEmail = async (data: SendResetEmailDTO) => {
  try {
    const response = await apiClient.post(
      "/api/v1/auth/reset-password-email",
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Send reset link failed with status:",
        error.response.status
      );
    } else {
      console.error("Send reset link error:", error);
    }
    throw error;
  }
};
