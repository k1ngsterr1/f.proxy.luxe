import { useQuery } from "@tanstack/react-query";
import { ipAuthorizations } from "../../api/ip-authorization.api";

export const useIpAuthorizations = (
  orderId?: string,
  providerProxyId?: string,
) => {
  return useQuery({
    queryKey: ["ip-authorizations", orderId, providerProxyId],
    queryFn: () => ipAuthorizations.list(orderId as string, providerProxyId),
    enabled: Boolean(orderId),
  });
};
