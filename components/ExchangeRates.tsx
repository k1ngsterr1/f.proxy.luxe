"use client";

import { useExchangeRates } from "@/entities/exchange-rates/api/hooks/use-get-crypto-rates.query";
import { FC } from "react";

export const ExchangeRates: FC = () => {
  const { data, isLoading, isError } = useExchangeRates();

  if (isLoading) {
    return <div>Loading exchange rates...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching exchange rates.</div>;
  }

  return (
    <div className="exchange_rates_list">
      <ul>
        <li>
          1 USD = <span>{data.USD} RUB</span>
        </li>
        <li>
          1 BTC = <span>{data.BTC} USD</span>
        </li>
        <li>
          1 LTC = <span>{data.LTC} USD</span>
        </li>
      </ul>
    </div>
  );
};
