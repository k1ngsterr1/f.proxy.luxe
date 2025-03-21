import axios from "axios";
import { apiClient } from "@/shared/config/apiClient";

export const postBlacklists = async (ip: string): Promise<any> => {
  try {
    const response = await apiClient.post(
      "/api/v1/services/blacklist-checker/check",
      {
        ip,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Black lists failed with status:", error.response.status);
    } else {
      console.error("Black lists error:", error);
    }
    throw error;
  }
};
