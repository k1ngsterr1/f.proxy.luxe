import axios from "axios";
import { apiClient } from "@/shared/config/apiClient";

export const getGeoReferences = async (): Promise<any> => {
  try {
    const response = await apiClient.get("/api/v1/products/geo/reference");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Get geo failed with status:", error.response.status);
    } else {
      console.error("Get geo error:", error);
    }
    throw error;
  }
};
