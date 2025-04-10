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
}

/**
 * Function to prolong a proxy
 * @param params - The proxy data for prolongation
 * @returns Promise with the response data
 */
const prolongProxyRequest = async (params: ProlongProxyParams) => {
  const { data } = await apiClient.post("/api/v1/products/prolong", {
    ...params,
  });
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
