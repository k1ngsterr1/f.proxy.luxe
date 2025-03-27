import { useMutation } from "@tanstack/react-query";
import { deleteOrder } from "../../api/delete/delete-order.api";

export const useDeleteOrder = () => {
  return useMutation<void, Error, string>({
    mutationFn: deleteOrder,
    onSuccess: () => {
      console.log("✅ Order successfully deleted");
    },
    onError: (error) => {
      console.error("❌ Order deletion failed:", error.message);
    },
  });
};
