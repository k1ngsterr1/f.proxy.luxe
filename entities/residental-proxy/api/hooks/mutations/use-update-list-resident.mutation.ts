import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/config/apiClient";

/**
 * Interface for the proxy update request payload
 */
interface UpdateProxyParams {
  listId: number;
  title: string;
  rotation: number;
  packageKey: string;
}

/**
 * Function to update a proxy in the list
 * @param params - The proxy data to update
 * @returns Promise with the response data
 */
const updateProxyRequest = async (params: UpdateProxyParams) => {
  const { data } = await apiClient.patch("/api/v1/user/update-list", {
    ...params,
  });
  return data;
};

/**
 * Hook to handle proxy updates with React Query
 */
export const useUpdateProxy = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProxyRequest,
    onSuccess: () => {
      // Invalidate and refetch the proxy list query
      queryClient.invalidateQueries({ queryKey: ["proxyList"] });
    },
  });

  return {
    updateProxy: mutation.mutate,
    isUpdating: mutation.isPending,
    updateError: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
