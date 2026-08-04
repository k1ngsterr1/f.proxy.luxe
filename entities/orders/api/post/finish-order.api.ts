import axios from "axios";
import { apiClient } from "@/shared/config/apiClient";
import { FinishOrderDTO } from "@/shared/interfaces/order.interface";

export const finishOrder = async (data: FinishOrderDTO): Promise<any> => {
  try {
    const response = await apiClient.post("/api/v1/orders/finish", {
      orderId: data.orderId,
      promocode: data.promocode,
      proxyType: data.proxyType,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to finish an order:", error.response.status);
    } else {
      console.error("Finish order error:", error);
    }
    throw error;
  }
};
