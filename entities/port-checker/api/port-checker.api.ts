import axios from "axios";
import { apiClient } from "@/shared/config/apiClient";
import { IPort } from "@/shared/interfaces/port.interface";

export const postPortChecker = async (data: IPort): Promise<any> => {
  try {
    const response = await apiClient.post(
      "/api/v1/services/port-checker/check",
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Port Checker failed with status:", error.response.status);
    } else {
      console.error("Port Checker error:", error);
    }
    throw error;
  }
};
