import axios from "axios";
import { apiClient } from "./apiClient/apiClient";
import { IpData } from "@/app/services/my-ip/page";

export const checkIpv6 = async (): Promise<IpData | null> => {
  try {
    const response = await apiClient.get("/api/v1/services/ipv6-checker/check");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Get my ip failed with status:", error.response.status);
    } else {
      console.error("Get my ip error:", error);
    }
    throw error;
  }
};
