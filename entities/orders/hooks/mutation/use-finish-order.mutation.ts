import { useMutation } from "@tanstack/react-query";
import { FinishOrderDTO } from "@/shared/interfaces/order.interface";
import { finishOrder } from "../../api/post/finish-order.api";

export const useFinishOrder = () => {
  return useMutation<FinishOrderDTO, Error, any>({
    mutationFn: finishOrder,
    onSuccess: (data) => {
      console.log("✅ Order finished successfully:", data);
    },
    onError: (error) => {
      console.error("❌ Order finish failed:", error.message);
    },
  });
};
