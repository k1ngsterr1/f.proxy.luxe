import { useQuery } from "@tanstack/react-query";
import { getOrderById, OrderDetail } from "./get-order-by-id";

export const useOrderDetail = (orderId: string) => {
  return useQuery<OrderDetail, Error>({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry twice on failure
  });
};
