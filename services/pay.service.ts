import {BaseService} from "@/services/base.service";
import {AxiosResponse} from "axios";

interface Response {
    USD: string;
    BTC: string;
    LTC: string;
    DOGE: string;
}

interface Pair {
    ask: string;
    bid: string;
    last: string;
    min24: string;
    max24: string;
}

interface ExchangeRatesResponse {
    rates: {
        pairs: {
            [key: string]: Pair
        }
    }
}


export class PayService extends BaseService {
    async getExchangeRates(): Promise<Response> {
        try {
            const response: AxiosResponse<ExchangeRatesResponse> = await this.http.get('/v1/pay/rates');
            const pairs = response.data.rates.pairs;
            return {
                USD: pairs.USD_RUB.bid,
                BTC: pairs.BTC_RUB.bid,
                LTC: pairs.LTC_RUB.bid,
                DOGE: pairs.DOGE_RUB.bid,
            };
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
            throw error;  // Re-throw the error to be handled by the component
        }
    }
}