"use client";
import { useCallback } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode JWT
import { getExchangeRate } from "@/hooks/get-exchange-rate";

const WEBMONEY_URL = "https://merchant.webmoney.com/lmi/payment_utf.asp";
const MERCHANT_WALLET = "T830321222093";
const RESULT_URL = "https://api.proxy.luxe/api/v1/payment/success";

export const useWebMoneyPayment = () => {
  const processWebMoneyPayment = useCallback(
    async (amount: string | number) => {
      try {
        const storage = JSON.parse(
          localStorage.getItem("auth-storage") ?? "{}"
        );
        if (!storage) {
          console.error("❌ No JWT found in localStorage");
          return;
        }

        const decoded: any = jwtDecode(storage.state.token);
        const userId = decoded?.sub;

        if (!userId) {
          console.error("❌ Invalid JWT: userId not found");
          return;
        }

        const usdRate = await getExchangeRate();
        const finalPrice = (Number(amount) / (usdRate ?? 100)).toFixed(2);
        const orderId = Math.floor(Math.random() * 1000000000);
        const description = `Пополнение баланса на ${amount}, руб`;

        const form = document.createElement("form");
        form.method = "POST";
        form.action = WEBMONEY_URL;
        form.acceptCharset = "UTF-8";
        form.style.display = "none";

        const fields = {
          LMI_PAYEE_PURSE: MERCHANT_WALLET,
          LMI_PAYMENT_AMOUNT: finalPrice,
          LMI_PAYMENT_NO: orderId,
          LMI_PAYMENT_DESC: description,
          LMI_SIM_MODE: 0,
          LMI_RESULT_URL: `${RESULT_URL}?userId=${userId}&amount=${finalPrice}`,
        };

        Object.entries(fields).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit(); // Submit form to WebMoney
      } catch (error) {
        console.error("Ошибка при обработке платежа через WebMoney:", error);
      }
    },
    []
  );

  return { processWebMoneyPayment };
};
