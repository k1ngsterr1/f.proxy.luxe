import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ipAuthorizations } from "../../api/ip-authorization.api";

export const useIpAuth = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ip }: { ip: string }) =>
      ipAuthorizations.create(orderId, ip),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ip-authorizations", orderId],
      });
    },
    onError: (error: Error) => {
      console.error("Auth error:", error.message);
    },
  });
};
