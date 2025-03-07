"use client";
import {FC, useEffect, useState} from "react";
import Select from "@/components/Select";
import {Option} from "@/interfaces/option.interface";
import {Services} from "@/services";

const protocols: Option[] = [
    {id: "HTTPS", text: "HTTPS"},
    {id: "SOCKS5", text: "SOCKS5"}
]

interface Ipv6BuyFormProps {
    countries: Option[],
    targets: Option[],
    amounts: Option[],
    periods: Option[],
    onLoaded: () => void;
}

export const IpV6BuyForm: FC<Ipv6BuyFormProps> = ({countries, targets, amounts, periods, onLoaded}) => {
    const [country, setCountry] = useState<string | undefined>(undefined);
    const [amount, setAmount] = useState<string | undefined>(undefined);
    const [target, setTarget] = useState<string | undefined>(undefined);
    const [period, setPeriod] = useState<string | undefined>(undefined);
    const [price, setPrice] = useState<string | undefined>();
    const [protocol, setProtocol] = useState<string | undefined>(undefined);

    const fetchPrice = async () => {
        if (!country || !amount || !period || !protocol) return;
        const result =  await Services.Product.getCalc(country, period, amount, protocol);
        if (!result) return;
        
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const rub: string = fx(result.price).from("USD").to("RUB");
        
        setPrice(`${Math.ceil(parseFloat(rub))}`);

        onLoaded();
    }

    useEffect(() => {
        fetchPrice()
    }, [country, amount, period, protocol])

    const countryChangeHandler = (value: string) => {
        setCountry(value);
    };

    const countryAmountHandler = (value: string) => {
        setAmount(value);
    };

    const targetChangeHandler = (value: string) => {
        setTarget(value);
    };

    const periodChangeHandler = (value: string) => {
        setPeriod(value);
    };

    const protocolChangeHandler = (value: string) => {
        setProtocol(value);
    };

    return (
        <form action="">
            <h4 className="buy-item__subheader">СТРАНА</h4>
            <Select
                options={countries.map(item => ({id: item.id, text: item.text.replace("Proxy of ", "")}))}
                value={country}
                onChange={countryChangeHandler}
                placeholder="Выбирите страну"
            />
            <h4 className="buy-item__subheader">Кол-во</h4>
            <Select
                options={amounts}
                value={amount}
                onChange={countryAmountHandler}
                placeholder="Укажите колличество"
            />
            <h4 className="buy-item__subheader">Цель использования</h4>
            <Select
                options={targets}
                value={target}
                onChange={targetChangeHandler}
                placeholder="Выбирите цель использования"
            />
            <h4 className="buy-item__subheader">Период</h4>
            <Select
                options={periods}
                value={period}
                onChange={periodChangeHandler}
                placeholder="Выбирите период"
            />
            <h4 className="buy-item__subheader">Протокол</h4>
            <Select
                options={protocols}
                value={protocol}
                onChange={protocolChangeHandler}
                placeholder="Выбирите протокол"
            />
            <div className="buy-item__price">
                ЦЕНА
                <span>{price} ₽</span>
            </div>
            <a href="#" className="btn">
                купить
            </a>
        </form>
    )
}