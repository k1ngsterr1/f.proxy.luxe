"use client";

import { useCallback } from "react";
import { getExchangeRate } from "@/entities/exchange-rates/api/get/get-exchange-rate.api";
import { getUserIdFromToken } from "@/shared/utils/get-user-id";
import { submitWebMoneyForm } from "../../helper/submit-webmoney.helper";

// ✅ Constants
const MERCHANT_WALLET = "T830321222093";
const RESULT_URL = "https://api.proxy.luxe/api/v1/payment/success";

// ✅ Hook: WebMoney Payment Processing
export const useWebMoneyPayment = () => {
  const processWebMoneyPayment = useCallback(
    async (amount: string | number) => {
      try {
        const userId = getUserIdFromToken();
        if (!userId) return;

        const orderId = Math.floor(Math.random() * 1_000_000_000);
        const description = `Пополнение баланса на ${amount}`;

        const fields = {
          LMI_PAYEE_PURSE: MERCHANT_WALLET,
          LMI_PAYMENT_AMOUNT: String(amount),
          LMI_PAYMENT_NO: orderId.toString(),
          LMI_PAYMENT_DESC: description,
          LMI_SIM_MODE: "0",
          LMI_RESULT_URL: `${RESULT_URL}?userId=${userId}&amount=${amount}`,
        };

        submitWebMoneyForm(fields);
      } catch (error) {
        console.error("❌ Ошибка при обработке платежа через WebMoney:", error);
      }
    },
    []
  );

  return { processWebMoneyPayment };
};
