import { useMutation } from "@tanstack/react-query";
import { Orders } from "@/shared/types/order.types";
import { createOrder } from "../../api/post/create-order.api";

export const useCreateOrder = () => {
  return useMutation<Orders, Error, Orders>({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log("✅ Order successfully created:", data);
    },
    onError: (error) => {
      console.error("❌ Order creation failed:", error.message);
    },
  });
};
