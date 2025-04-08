import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/config/apiClient";

/**
 * Function to delete a proxy from the list
 * @param listId - The ID of the proxy to delete
 * @param packageKey - The package key associated with the proxy
 * @returns Promise with the response data
 */
const deleteProxyRequest = async ({
  listId,
  packageKey,
}: {
  listId: string;
  packageKey: string;
}) => {
  const { data } = await apiClient.delete(
    `/api/v1/user/delete-list/${listId}/${packageKey}`
  );
  return data;
};

/**
 * Hook to handle proxy deletion with React Query
 */
export const useDeleteProxy = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProxyRequest,
    onSuccess: () => {
      // Invalidate and refetch the proxy list query
      queryClient.invalidateQueries({ queryKey: ["proxyList"] });
    },
  });

  return {
    deleteProxy: mutation.mutate,
    isDeleting: mutation.isPending,
    deleteError: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
