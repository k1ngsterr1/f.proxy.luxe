import { useQuery } from "@tanstack/react-query";
import { getCryptoRates } from "../get/get-crypto-rates.api";
import { getExchangeRate } from "../get/get-exchange-rate.api";

interface ExchangeRates {
  USD: string;
  BTC: string;
  LTC: string;
}

export const useExchangeRates = () => {
  return useQuery<ExchangeRates>({
    queryKey: ["exchangeRates"],
    queryFn: async () => {
      const usdRate = await getExchangeRate(); // ✅ USD → RUB (unchanged)
      const cryptoRates = await getCryptoRates(); // ✅ Fetch BTC, LTC, DOGE prices in USD

      return {
        USD: usdRate ? usdRate.toFixed(2) : "N/A",
        BTC: cryptoRates?.bitcoin ? cryptoRates.bitcoin.usd.toFixed(2) : "0",
        LTC: cryptoRates?.litecoin ? cryptoRates.litecoin.usd.toFixed(2) : "0",
      };
    },
    staleTime: 60 * 1000, // Cache for 1 minute
    refetchInterval: 30 * 1000, // Auto-refresh every 30 sec
  });
};
