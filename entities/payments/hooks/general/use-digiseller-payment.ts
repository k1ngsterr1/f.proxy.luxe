"use client";

import { useCallback } from "react";
import { getExchangeRate } from "@/entities/exchange-rates/api/get/get-exchange-rate.api";
import { getUserIdFromToken } from "@/shared/utils/get-user-id";
import { submitDigisellerForm } from "../../helper/submit-digiseller.helper";

export const useDigisellerPayment = () => {
  const processDigisellerPayment = useCallback(
    async (amount: string | number, lang: string) => {
      try {
        const userId = getUserIdFromToken();
        if (!userId) return;

        const fields = {
          id_d: "5084120",
          typecurr: "USD",
          lang: lang,
          unit_cnt: amount,
        };

        submitDigisellerForm(fields);
      } catch (error) {
        console.error("❌ Ошибка при обработке платежа через WebMoney:", error);
      }
    },
    []
  );

  return { processDigisellerPayment };
};
