"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalcData } from "@/shared/types/calc.types";
import { useGetPreferences } from "@/entities/preferences/hooks/queries/use-get-preferences.query";
import { useCreateProductCalc } from "@/entities/product/hooks/mutations/use-create-product-calc.mutation";
import { useGetExchangeRate } from "@/entities/exchange-rates/api/hooks/use-get-exchange-rate.query";
import { useCreateOrder } from "@/entities/orders/hooks/mutation/use-create-order.mutation";

export const IPV6BuyCard = () => {
  const router = useRouter();

  const { data: preferences } = useGetPreferences();
  const { data: exchangeRate } = useGetExchangeRate();
  const { mutate: calculatePrice, data: priceUSD } = useCreateProductCalc();
  const { mutate: createOrder, isPending: isLoadingOrder } = useCreateOrder();

  const [countryId, setCountryId] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("10");
  const [usage, setUsage] = useState<string>("HTTPs / SOCKS5");
  const [period, setPeriod] = useState<string>("1m");

  useEffect(() => {
    if (!countryId && preferences?.ipv6?.country.length) {
      setCountryId(preferences.ipv6.country[0].id);
      setCountry(preferences.ipv6.country[0].name);
    }
  }, [preferences]);

  useEffect(() => {
    if (countryId && period) {
      handleCalculatePrice();
    }
  }, [countryId, period]);

  const handleChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = JSON.parse(e.target.value);
    setCountryId(selected.id);
    setCountry(selected.name);
  };

  const handleCalculatePrice = () => {
    const calcData: CalcData = {
      countryId: Number(countryId),
      periodId: period,
      quantity: Number(quantity),
      protocol: "HTTPS",
      type: "ipv6",
      customTargetName: usage,
    };
    calculatePrice(calcData);
  };

  const handleBuyClick = () => {
    const orderData = {
      country,
      quantity: Number(quantity),
      usage,
      period,
      periodDays: "1m",
      totalPrice: priceUSD ? Math.round(priceUSD) : 0,
      proxyType: usage.includes("SOCKS5") ? "SOCKS5" : "HTTPS",
      type: "ipv6",
    };
    createOrder(orderData, {
      onSuccess: () => router.push("/personal-account/orders"),
    });
  };

  const priceRUB =
    priceUSD && exchangeRate ? (priceUSD * exchangeRate).toFixed(2) : null;

  return (
    <div className="buy-col">
      <div className="buy-item" style={{ height: 800 }}>
        <h3 className="buy-item__header">IPv6 ПРОКСИ</h3>
        <div className="separator"></div>
        <p className="buy-item__about">
          Подходят для сайтов с поддержкой IPv6. Кроме платёжных систем.
        </p>
        <a href="#" className="buy-item__btn">
          Выдаются в одни руки
        </a>
        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          СТРАНА
        </h4>
        <select
          value={JSON.stringify({ id: countryId, name: country })}
          onChange={handleChangeCountry}
          style={{
            backgroundColor: "#1E1E1E",
            color: "#fff",
            border: "1px solid #3E3E3E",
            padding: "10px",
            width: "100%",
            borderRadius: "5px",
            appearance: "none",
            cursor: "pointer",
          }}
        >
          {preferences?.ipv6?.country.map((c) => (
            <option key={c.id} value={JSON.stringify(c)}>
              {c.name}
            </option>
          ))}
        </select>
        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          КОЛ-ВО
        </h4>
        <input
          type="number"
          value={quantity}
          min={10}
          onChange={(e) => setQuantity(e.target.value)}
          style={{
            backgroundColor: "#1E1E1E",
            color: "#fff",
            border: "1px solid #3E3E3E",
            padding: "10px",
            width: "100%",
            borderRadius: "5px",
            appearance: "none",
            cursor: "pointer",
          }}
        />
        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          ПЕРИОД
        </h4>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{
            backgroundColor: "#1E1E1E",
            color: "#fff",
            border: "1px solid #3E3E3E",
            padding: "10px",
            width: "100%",
            borderRadius: "5px",
            appearance: "none",
            cursor: "pointer",
          }}
        >
          {preferences?.ipv6?.period.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <div className="buy-item__price">
          ЦЕНА: <span>0.08$ / IP</span>
        </div>
        <button
          onClick={handleBuyClick}
          disabled={isLoadingOrder}
          className="btn"
        >
          {isLoadingOrder ? "Обработка..." : "Купить"}
        </button>
      </div>
    </div>
  );
};
