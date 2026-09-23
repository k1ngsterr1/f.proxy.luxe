import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ipAuthorizations } from "../../api/ip-authorization.api";

interface DeleteIpAuthorizationVariables {
  orderId: string;
  authorizationId: string;
  providerProxyId?: string;
}

export const useDeleteIpAuthorization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      authorizationId,
      providerProxyId,
    }: DeleteIpAuthorizationVariables) =>
      ipAuthorizations.delete(orderId, authorizationId, providerProxyId),
    onSuccess: (_data, { orderId, providerProxyId }) => {
      queryClient.invalidateQueries({
        queryKey: ["ip-authorizations", orderId, providerProxyId],
      });
    },
  });
};
