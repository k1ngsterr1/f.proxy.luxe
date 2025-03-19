import { apiClient } from "@/shared/config/apiClient";
import axios from "axios";
import { SendVerifyCodeDTO } from "@/shared/interfaces/email.interface";

export const sendVerifyCode = async (data: SendVerifyCodeDTO) => {
  try {
    const response = await apiClient.post("/api/v1/user/verify", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Verification code failed with status:",
        error.response.status
      );
    } else {
      console.error("Verification code error:", error);
    }
    throw error;
  }
};
