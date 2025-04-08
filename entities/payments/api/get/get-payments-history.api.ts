import { apiClient } from "@/shared/config/apiClient";
import axios from "axios";

export const getPaymentsHistory = async (): Promise<any> => {
  try {
    const response = await apiClient.get("/api/v1/payment/history");
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
