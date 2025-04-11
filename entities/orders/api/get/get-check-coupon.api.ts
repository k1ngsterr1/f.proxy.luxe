import { apiClient } from "@/shared/config/apiClient";
import { CouponValidityResponse } from "@/shared/interfaces/coupon.interface";

export const checkCouponValidity = async (
  promocode: string
): Promise<CouponValidityResponse> => {
  const response = await apiClient.get(
    `/api/v1/user/coupon/check-valid/${promocode}`
  );
  return response.data;
};
