import axios from "axios";
import { apiClient } from "./apiClient/apiClient";

export interface ProxyOrder {
  id: string;
  userId: string;
  country: string;
  quantity: number;
  periodDays: string;
  tariff: string | null;
  proxyType: string;
  type: string;
  status: "PENDING" | "ACTIVE" | "EXPIRED"; // Assuming possible statuses
  totalPrice: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProxyOrderResponse {
  data: ProxyOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getAllOrders = async (): Promise<
  ProxyOrderResponse | undefined
> => {
  try {
    const response = await apiClient.get("/api/v1/orders");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to create an order:", error.response.status);
    } else {
      console.error("Create an order error:", error);
    }
    throw error;
  }
};
