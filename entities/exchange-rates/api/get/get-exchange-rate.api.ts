import axios from "axios";

const BASE_URL = "https://api.currencyapi.com/v3/latest";
const API_KEY = "C6x7R3ce2DBYdou9uq8CkflAKXrYVZ4ynbHolmF9"; // store in .env in real projects

export const getExchangeRate = async (
  amount: number = 1, // default to 1 for rate
  from: string = "USD",
  to: string = "RUB"
): Promise<number | null> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        base_currency: from,
        currencies: to,
      },
    });

    const rate = response.data?.data?.[to]?.value;

    if (!rate) throw new Error("Conversion rate not found");

    return amount * rate;
  } catch (error) {
    console.error("Currency conversion failed:", error);
    return null;
  }
};
