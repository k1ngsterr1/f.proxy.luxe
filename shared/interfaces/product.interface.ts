import {Option} from "@/interfaces/option.interface";

export interface ResponseReference {
    status: "success",
    isp: {
        country: Option[];
        period: Option[];
        targets: Option[];
    },
    ipv6: {
        country: Option[];
        period: Option[];
        targets: Option[];
    },
    resident: {
        targets: Option[];
        tariffs: Option[];
    },
    amounts: Option[];
}

export interface ResponseError {
    status: "error",
    message: string;
}