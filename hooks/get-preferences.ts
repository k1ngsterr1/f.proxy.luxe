import axios from "axios";
import { apiClient } from "./apiClient/apiClient";
import { Preferences } from "@/types/preferences.types";

export const getPreferences = async (): Promise<Preferences | null> => {
  try {
    const response = await apiClient.get("/api/v1/products/references");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Get preferences failed with status:",
        error.response.status
      );
    } else {
      console.error("Get preferences error:", error);
    }
    throw error;
  }
};
