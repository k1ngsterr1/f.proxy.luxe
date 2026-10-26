import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/config/apiClient";

/**
 * Interface for the proxy prolong request payload
 */
interface ProlongProxyParams {
  orderId: string;
  type: string;
  id: number | string;
  periodId: string;
  tariff?: string;
}

/**
 * Function to prolong a proxy
 * @param params - The proxy data for prolongation
 * @returns Promise with the response data
 */
export const prolongProxyRequest = async (params: ProlongProxyParams) => {
  if (params.type === "resident") {
    const { data } = await apiClient.post(
      "/api/v1/products/prolong/resident",
      {
        orderId: params.orderId,
        packageKey: String(params.id),
        tariff: params.tariff,
      }
    );
    if (data?.status !== "success") {
      throw new Error("Resident renewal was not confirmed");
    }
    return data;
  }

  const { data } = await apiClient.post("/api/v1/products/prolong", {
    ...params,
  });
  if (data?.status !== "success") {
    throw new Error("Proxy renewal was not confirmed");
  }
  return data;
};

/**
 * Hook to handle proxy prolongation with React Query
 */
export const useProlongProxy = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: prolongProxyRequest,
    onSuccess: () => {
      // Invalidate and refetch the proxy list query
      queryClient.invalidateQueries({ queryKey: ["proxyList"] });
    },
  });

  return {
    prolongProxy: mutation.mutate,
    isProlonging: mutation.isPending,
    prolongError: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
