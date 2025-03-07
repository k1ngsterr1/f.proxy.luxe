import {BaseService} from "@/services/base.service";
import {AxiosResponse} from "axios";
import {ResponseError, ResponseReference} from "@/interfaces/product.interface";

interface QueryCalc {
    countryId: string,
    periodId: string,
    quantity: string,
    protocol?: string;
}

interface QueryResidentCalc {
    tariffId: number;
    quantity: number;
}

export class ProductService extends BaseService {
    async getReferences(): Promise<Omit<ResponseReference, "status"> | false> {
        const response: AxiosResponse<ResponseReference | ResponseError> = await this.http.get("/v1/products/references");
        const data = response.data;

        if (data.status !== "success") return false;

        return {
            isp: data.isp,
            ipv6: data.ipv6,
            resident: data.resident,
            amounts: data.amounts
        }
    }

    async getCalc(country: string, periodId: string, quantity: string, protocol?: string) {
        const query: QueryCalc = {
            countryId: country,
            periodId: periodId,
            quantity: quantity,
        }

        if (protocol) {
            query.protocol = protocol
        }

        const response = await this.http.post("/v1/products/calc", query);

        const data = response.data;

        if (data.status !== "success") return false;

        return {
            price: data.totalPrice
        }
    }

    async getCalcResident(quantity: string, tariff: string) {
        const query: QueryResidentCalc = {
            tariffId: Number(tariff),
            quantity: Number(quantity),
        }

        const response = await this.http.post("/v1/products/calc/resident", query);
        const data = response.data;

        if (data.status !== "success") return false;

        return {
            price: data.totalPrice
        }
    }
}