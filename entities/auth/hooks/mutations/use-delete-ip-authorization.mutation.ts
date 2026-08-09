import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ipAuthorizations } from "../../api/ip-authorization.api";

interface DeleteIpAuthorizationVariables {
  orderId: string;
  authorizationId: string;
}

export const useDeleteIpAuthorization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, authorizationId }: DeleteIpAuthorizationVariables) =>
      ipAuthorizations.delete(orderId, authorizationId),
    onSuccess: (_data, { orderId }) => {
      queryClient.invalidateQueries({
        queryKey: ["ip-authorizations", orderId],
      });
    },
  });
};
