import axios from "axios";
import { apiClient } from "./apiClient/apiClient";

export interface OrderDetail {
  id: string;
  orderNumber: string;
  date: string;
  type: string;
  quantity: number;
  periodDays: number;
  totalPrice: number;
  status: "PENDING" | "ACTIVE" | "EXPIRED";
  proxyType: "HTTP" | "SOCKS5";
  country: string;
  createdAt: string;
  updatedAt: string;
}

export const getOrderById = async (orderId: string): Promise<OrderDetail> => {
  try {
    const response = await apiClient.get(`/api/v1/orders/${orderId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Failed to fetch order ${orderId}:`, error.response.status);
    } else {
      console.error(`Error fetching order ${orderId}:`, error);
    }
    throw error;
  }
};
