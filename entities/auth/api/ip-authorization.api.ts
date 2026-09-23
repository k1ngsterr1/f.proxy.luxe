import axios from "axios";
import { apiClient } from "@/shared/config/apiClient";
import type {
  IpAuthorizationCreateResponse,
  IpAuthorizationListResponse,
} from "@/shared/interfaces/ip-authorization.interface";

const authorizationPath = (orderId: string) =>
  `/api/v1/user/orders/${encodeURIComponent(orderId)}/ip-authorizations`;

const withProviderProxy = (path: string, providerProxyId?: string) =>
  providerProxyId
    ? `${path}?providerProxyId=${encodeURIComponent(providerProxyId)}`
    : path;

export const ipAuthorizations = {
  create: async (
    orderId: string,
    ip: string,
    providerProxyId?: string,
  ): Promise<IpAuthorizationCreateResponse> => {
    try {
      const response = await apiClient.post<IpAuthorizationCreateResponse>(
        authorizationPath(orderId),
        { ip, ...(providerProxyId && { providerProxyId }) },
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

  list: async (
    orderId: string,
    providerProxyId?: string,
  ): Promise<IpAuthorizationListResponse> => {
    try {
      const response = await apiClient.get<IpAuthorizationListResponse>(
        withProviderProxy(authorizationPath(orderId), providerProxyId),
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

  delete: async (
    orderId: string,
    authorizationId: string,
    providerProxyId?: string,
  ): Promise<void> => {
    try {
      await apiClient.delete(
        withProviderProxy(
          `${authorizationPath(orderId)}/${encodeURIComponent(authorizationId)}`,
          providerProxyId,
        ),
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
