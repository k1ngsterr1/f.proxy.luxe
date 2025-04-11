import { useMutation } from "@tanstack/react-query";
import type { CouponValidityResponse } from "@/shared/interfaces/coupon.interface";
import { checkCouponValidity } from "../../api/get/get-check-coupon.api";

export const useCheckCouponValidity = () => {
  return useMutation<CouponValidityResponse, Error, string>({
    mutationFn: checkCouponValidity,
    onSuccess: (data) => {
      console.log("✅ Coupon validation successful:", data);
    },
    onError: (error) => {
      console.error("❌ Coupon validation failed:", error.message);
    },
  });
};
