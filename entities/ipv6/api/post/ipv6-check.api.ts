import axios from "axios";
import { IpData } from "@/app/services/my-ip/page";
import { apiClient } from "@/shared/config/apiClient";

export const checkIpv6 = async (domain: any): Promise<IpData | null> => {
  try {
    const response = await apiClient.post("/api/v1/services/ipv6/check", {
      domain: domain,
    });
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
