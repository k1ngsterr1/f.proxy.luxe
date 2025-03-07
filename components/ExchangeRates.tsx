"use client";
import {FC, useState, useEffect} from "react";
import {Services} from "@/services";

interface ExchangeRates {
    USD: string;
    BTC: string;
    LTC: string;
    DOGE: string;
}

export const ExchangeRates: FC = () => {
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const rates = await Services.Pay.getExchangeRates();
                setExchangeRates(rates);
            } catch (error) {
                console.error("Failed to fetch exchange rates", error);
            }
        };

        fetchRates();
    }, []);

    if (!exchangeRates) {
        return <div>Loading exchange rates...</div>; // Or an error message
    }

    return (
        <div className="exchange_rates_list">
            <ul>
                <li>1 USD = <span>{exchangeRates.USD} RUB</span></li>
                <li>1 BTC = <span>{exchangeRates.BTC} RUB</span></li>
                <li>1 LTC = <span>{exchangeRates.LTC} RUB</span></li>
                <li>1 DOGE = <span>{exchangeRates.DOGE} RUB</span></li>
            </ul>
        </div>
    );
};