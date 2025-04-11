import { useMutation } from "@tanstack/react-query";
import { updateRotation } from "../../api/patch/update-rotation.api";

export const useUpdateRotation = () => {
  return useMutation({
    mutationFn: updateRotation,
    onSuccess: (data) => {
      console.log("✅ Rotation updated successfully:", data);
    },
    onError: (error) => {
      console.error("❌ Rotation update failed:", error.message);
    },
  });
};
