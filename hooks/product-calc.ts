import axios from "axios";
import { apiClient } from "./apiClient/apiClient";
import { CalcData } from "@/types/calc.types";

export const productCalc = async (data: CalcData): Promise<any> => {
  try {
    const response = await apiClient.post("/api/v1/products/calc", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to calculate an order:", error.response.status);
    } else {
      console.error("Create calculation error:", error);
    }
    throw error;
  }
};
