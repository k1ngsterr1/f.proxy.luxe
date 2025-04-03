"use client";

import { useCallback } from "react";
import { getExchangeRate } from "@/entities/exchange-rates/api/get/get-exchange-rate.api"; // USD -> RUB
import { getCryptoRates } from "@/entities/exchange-rates/api/get/get-crypto-rates.api"; // BTC/LTC -> USD
import { getUserIdFromToken } from "@/shared/utils/get-user-id";
import { submitWebMoneyForm } from "../../helper/submit-webmoney.helper";

// ✅ Constants
const MERCHANT_WALLET = "T830321222093";
const MERCHANT_WALLET_LTC = "L886522288283";
const MERCHANT_WALLET_BTC = "X974038425634";
const RESULT_URL = "https://api.proxy.luxe/api/v1/payment/success";

// ✅ Hook: WebMoney Payment Processing
export const useWebMoneyPayment = () => {
  const processWebMoneyPayment = useCallback(
    async (
      amount: string | number,
      type: "webmoney" | "bitcoin" | "litecoin"
    ) => {
      try {
        let purse = MERCHANT_WALLET;
        let convertedAmount = Number(amount);

        // 💰 Convert RUB -> USD -> BTC/LTC if needed
        if (type === "bitcoin" || type === "litecoin") {
          const [rubRate, cryptoRates] = await Promise.all([
            getExchangeRate(), // USD → RUB
            getCryptoRates(), // BTC/LTC → USD
          ]);

          if (!rubRate || !cryptoRates) {
            console.error("❌ Failed to fetch exchange rates");
            return;
          }

          const cryptoPriceUSD =
            type === "bitcoin"
              ? cryptoRates.bitcoin.usd
              : cryptoRates.litecoin.usd;

          convertedAmount = Number(
            (Number(amount) / (cryptoPriceUSD / 1000)).toFixed(8)
          ); // USD → crypto

          purse =
            type === "bitcoin" ? MERCHANT_WALLET_BTC : MERCHANT_WALLET_LTC;
        }

        const userId = getUserIdFromToken();
        if (!userId) return;

        const orderId = Math.floor(Math.random() * 1_000_000_000);
        const description = `Пополнение баланса на ${amount} USD`;

        const fields = {
          LMI_PAYEE_PURSE: purse,
          LMI_PAYMENT_AMOUNT: String(convertedAmount.toFixed(2)),
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
