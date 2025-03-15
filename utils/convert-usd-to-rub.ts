import { getExchangeRate } from "@/hooks/get-exchange-rate";

export const convertUsdToRub = async (usdAmount: number): Promise<void> => {
  const exchangeRate = await getExchangeRate();
  if (exchangeRate) {
    const rubAmount = usdAmount * exchangeRate;
    console.log(`${usdAmount} USD is equal to ${rubAmount.toFixed(2)} RUB`);
  } else {
    console.log("Failed to fetch exchange rate.");
  }
};
