import { apiClient } from "@/shared/config/apiClient";
import axios from "axios";

export interface Proxy {
  id: string;
  ip: string;
  type: string;
  ports: number[];
  protocol: string;
  port_socks: number;
  port_http: number;
  geo: {
    country: string;
    region: string;
    city: string;
    isp: string;
  }[];
  login: string;
  password: string;
  package_items: any;
  package_info?: any;
  package_list?: any[];
}

export interface ProxyListResponse {
  status: string;
  data: {
    items: Proxy[];
  };
}

export const getAllProxies = async (
  type: string
): Promise<ProxyListResponse> => {
  try {
    const response = await apiClient.get(
      `/api/v1/products/active-list/${type}`
    );

    return {
      status: "success",
      data: {
        items: response.data?.data.items || [], // Default to empty array if no data
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to fetch proxies:", error.response.status);
    } else {
      console.error("Fetch proxies error:", error);
    }

    // ✅ Return a consistent error response
    return {
      status: "error",
      data: {
        items: [],
      },
    };
  }
};
