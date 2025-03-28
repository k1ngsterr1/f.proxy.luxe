import { apiClient } from "@/shared/config/apiClient";
import axios from "axios";
import { EmailDTO } from "@/shared/interfaces/email.interface";

export const sendEmailCode = async () => {
  try {
    const response = await apiClient.post("/api/v1/user/send-verification");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Verification failed with status:", error.response.status);
    } else {
      console.error("Verification error:", error);
    }
    throw error;
  }
};
