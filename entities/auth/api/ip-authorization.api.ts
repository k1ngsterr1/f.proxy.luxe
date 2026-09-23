import axios from "axios";
import { apiClient } from "@/shared/config/apiClient";
import type {
  IpAuthorizationCreateResponse,
  IpAuthorizationListResponse,
} from "@/shared/interfaces/ip-authorization.interface";

const authorizationPath = (orderId: string) =>
  `/api/v1/user/orders/${encodeURIComponent(orderId)}/ip-authorizations`;

export const ipAuthorizations = {
  create: async (
    orderId: string,
    ip: string,
  ): Promise<IpAuthorizationCreateResponse> => {
    try {
      const response = await apiClient.post<IpAuthorizationCreateResponse>(
        authorizationPath(orderId),
        { ip },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        throw new Error(
          error.response?.data?.message ?? "Failed to create IP authorization",
        );
      }
      throw error;
    }
  },

  list: async (orderId: string): Promise<IpAuthorizationListResponse> => {
    try {
      const response = await apiClient.get<IpAuthorizationListResponse>(
        authorizationPath(orderId),
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        throw new Error(
          error.response?.data?.message ?? "Failed to load IP authorizations",
        );
      }
      throw error;
    }
  },

  delete: async (orderId: string, authorizationId: string): Promise<void> => {
    try {
      await apiClient.delete(
        `${authorizationPath(orderId)}/${encodeURIComponent(authorizationId)}`,
      );
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        throw new Error(
          error.response?.data?.message ?? "Failed to delete IP authorization",
        );
      }
      throw error;
    }
  },
};
