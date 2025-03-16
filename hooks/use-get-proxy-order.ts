import { useQuery } from "@tanstack/react-query";
import { getAllOrders, ProxyOrderResponse } from "./get-all-orders";

export const useProxyOrders = () => {
  return useQuery<ProxyOrderResponse | undefined, Error>({
    queryKey: ["proxyOrders"],
    queryFn: getAllOrders, // ✅ No arrow function needed
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry twice on failure
  });
};
