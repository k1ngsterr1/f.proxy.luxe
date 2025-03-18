import { useMutation } from "@tanstack/react-query";
import { CalcData } from "@/shared/types/calc.types";
import { productCalc } from "../../api/post/create-product-calculation.api";

export const useCreateProductCalc = () => {
  return useMutation<any, Error, CalcData>({
    mutationFn: productCalc,
    onSuccess: (data) => {
      console.log("✅ Calculation successful:", data);
    },
    onError: (error) => {
      console.error("❌ Calculation error:", error);
    },
  });
};
