import axios from "axios";
import { apiClient } from "./apiClient/apiClient";
import { Orders } from "@/types/order.types";

export const createOrder = async (data: Orders): Promise<any> => {
  try {
    const response = await apiClient.post("/api/v1/orders", data);
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
