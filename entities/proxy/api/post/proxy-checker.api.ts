import axios from "axios";
import { CalcData } from "@/shared/types/calc.types";
import { apiClient } from "@/shared/config/apiClient";

interface IProxyChecker {
  proxies: string[];
  addCountry: boolean;
}

export const proxyChecker = async (data: IProxyChecker): Promise<any> => {
  try {
    const response = await apiClient.post(
      "/api/v1/services/proxy-checker/check",
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to check proxy:", error.response.status);
    } else {
      console.error("Check proxy error:", error);
    }
    throw error;
  }
};
