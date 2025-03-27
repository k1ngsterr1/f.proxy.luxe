import axios from "axios";
import { apiClient } from "@/shared/config/apiClient";

export const deleteOrder = async (id: string): Promise<any> => {
  try {
    const response = await apiClient.delete(`/api/v1/orders/${id}`);
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
