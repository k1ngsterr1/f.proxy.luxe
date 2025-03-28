"use client";

import { useCallback } from "react";
import { getExchangeRate } from "@/entities/exchange-rates/api/get/get-exchange-rate.api";
import { getUserIdFromToken } from "@/shared/utils/get-user-id";
import { submitWebMoneyForm } from "../../helper/submit-webmoney.helper";
import { submitPayeer } from "../../helper/submit-payeer.helper";

// ✅ Hook: WebMoney Payment Processing
export const usePayeerPayment = () => {
  const processPayeerPayment = useCallback(async (amount: string | number) => {
    try {
      submitPayeer(amount);
    } catch (error) {
      console.error("❌ Ошибка при обработке платежа через WebMoney:", error);
    }
  }, []);

  return { processPayeerPayment };
};
