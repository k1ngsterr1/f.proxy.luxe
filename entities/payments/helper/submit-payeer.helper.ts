import { apiClient } from "@/shared/config/apiClient";

export const submitPayeer = async (amount: string | number) => {
  const response = await apiClient.post("/api/v1/payment/payeer/invoice", {
    amount: amount,
  });

  const redirectUrl = response.data.url;
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
};
