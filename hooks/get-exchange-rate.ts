import axios from "axios";

const API_KEY = "d03c0baa50128a51bb904a7b";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

export const getExchangeRate = async (): Promise<number | null> => {
  try {
    const response = await axios.get(BASE_URL);
    if (
      response.data &&
      response.data.conversion_rates &&
      response.data.conversion_rates.RUB
    ) {
      return response.data.conversion_rates.RUB; // Get USD to RUB rate
    }
    throw new Error("RUB exchange rate not found");
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null;
  }
};
