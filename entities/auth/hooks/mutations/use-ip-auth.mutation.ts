import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ipAuth } from "../../api/post/ip-auth.api";
import type { IpAuthRequest } from "@/shared/interfaces/ip-authorization.interface";

export const useIpAuth = (orderId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IpAuthRequest) => ipAuth.data(data),
    onSuccess: (data) => {
      console.log("Auth success:", data);
      if (orderId) {
        queryClient.invalidateQueries({
          queryKey: ["ip-authorizations", orderId],
        });
      }
    },
    onError: (error: Error) => {
      console.error("Auth error:", error.message);
    },
  });
};
