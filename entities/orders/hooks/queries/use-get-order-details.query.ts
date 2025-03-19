import { useQuery } from "@tanstack/react-query";
import { getOrderById, OrderDetail } from "../../api/get/get-order-by-id.api";

export const useGetOrderDetails = (orderId: string) => {
  return useQuery<OrderDetail, Error>({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
