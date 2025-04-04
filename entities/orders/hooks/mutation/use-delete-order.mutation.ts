import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder } from "../../api/delete/delete-order.api";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteOrder,
    onSuccess: () => {
      console.log("✅ Order successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["proxyOrders"] });
    },
    onError: (error) => {
      console.error("❌ Order deletion failed:", error.message);
    },
  });
};
