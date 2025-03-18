import {
  getAllOrders,
  ProxyOrderResponse,
} from "@/entities/orders/api/get/get-all-orders.api";
import { useQuery } from "@tanstack/react-query";

export const useProxyOrders = () => {
  return useQuery<ProxyOrderResponse | undefined, Error>({
    queryKey: ["proxyOrders"],
    queryFn: getAllOrders,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
