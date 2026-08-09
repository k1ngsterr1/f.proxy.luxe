import { useQuery } from "@tanstack/react-query";
import { ipAuthorizations } from "../../api/ip-authorization.api";

export const useIpAuthorizations = (orderId?: string) => {
  return useQuery({
    queryKey: ["ip-authorizations", orderId],
    queryFn: () => ipAuthorizations.list(orderId as string),
    enabled: Boolean(orderId),
  });
};
