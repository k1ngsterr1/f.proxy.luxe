import axios from "axios";
import { apiClient } from "@/shared/config/apiClient";

export const postWhoIs = async (query: string): Promise<any> => {
  try {
    const response = await apiClient.post("/api/v1/services/whois/lookup", {
      query, // Send IP/domain in the request body
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Whois failed with status:", error.response.status);
    } else {
      console.error("Whois error:", error);
    }
    throw error;
  }
};
