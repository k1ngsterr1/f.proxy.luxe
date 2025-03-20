import axios from "axios";

export interface ExchangeRates {
  bitcoin: { usd: number };
  ethereum: { usd: number };
  litecoin: { usd: number };
}

export const getCryptoRates = async (): Promise<ExchangeRates | null> => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd"
    );

    if (response.data) {
      return response.data; // ✅ Correctly returns exchange rates
    }
    throw new Error("Exchange rate data not found");
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
};
