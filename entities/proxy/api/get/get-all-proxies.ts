import { apiClient } from "@/shared/config/apiClient";
import axios from "axios";

export interface Proxy {
  id: string;
  ip: string;
  protocol: string;
  port_socks: number;
  port_http: number;
  country: string;
}

export interface ProxyListResponse {
  data: Proxy[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getAllProxies = async (): Promise<
  ProxyListResponse | undefined
> => {
  try {
    const response = await apiClient.get("/api/v1/products/active-list");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to fetch proxies:", error.response.status);
    } else {
      console.error("Fetch proxies error:", error);
    }
    throw error;
  }
};
