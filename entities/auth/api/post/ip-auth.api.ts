import {
  IpAuthRequest,
  IpAuthResponse,
} from "@/shared/interfaces/ip-authorization.interface";
import { apiClient } from "@/shared/config/apiClient";
import axios from "axios";

export const ipAuth = {
  data: async (data: IpAuthRequest): Promise<IpAuthResponse> => {
    try {
      const response = await apiClient.post<IpAuthResponse>(
        "/api/v1/user/add-auth",
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("IP Auth Error:", error.response?.data);
        throw new Error(error.response?.data?.message || "Auth failed");
      }
      throw error;
    }
  },
};
