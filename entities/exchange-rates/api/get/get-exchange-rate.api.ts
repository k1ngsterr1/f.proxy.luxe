import axios from "axios";

const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Qh5c6mbVT8vhMNQAyTGQ4wfZ81skygsEhlqrJgVa&currencies=RUB`;

export const getExchangeRate = async (): Promise<number | null> => {
  try {
    const response = await axios.get(BASE_URL);
    if (response.data && response.data.data.RUB) {
      return response.data.data.RUB;
    }
    throw new Error("RUB exchange rate not found");
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null;
  }
};
