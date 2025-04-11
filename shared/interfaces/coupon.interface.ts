export interface CouponValidityResponse {
  isValid: boolean;
  coupon?: {
    code: string;
    discount: number;
    limit: number;
  };
}
