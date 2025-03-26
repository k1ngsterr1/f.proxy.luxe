"use client";

import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/entities/orders/hooks/mutation/use-create-order.mutation";
import { useGetPreferences } from "@/entities/preferences/hooks/queries/use-get-preferences.query";
import { Button } from "@/shared/ui/button";
import React, { useEffect, useState } from "react";

export const ISPBuyCard = () => {
  const router = useRouter();
  const [countryId, setCountryId] = useState<string>("1");
  const [quantity, setQuantity] = useState<string>("1");
  const [period, setPeriod] = useState<string>("1m");
  const [goal, setGoal] = useState<string>("");

  const { data: preferences, isLoading: isLoadingPreferences } =
    useGetPreferences();
  const { mutate: createOrder, isPending: isLoadingOrder } = useCreateOrder();

  useEffect(() => {
    if (!countryId && preferences?.isp?.country.length) {
      setCountryId(preferences.isp.country[0].id);
    }
  }, [preferences]);

  // 👉 Пример обработчика для кнопки "Купить"
  const handleBuyClick = () => {
    const selectedCountry = preferences?.isp.country.find((c) => {
      return c.id == countryId;
    });

    if (!selectedCountry) return null;

    const orderData = {
      country: selectedCountry.name,
      quantity: Number(quantity),
      periodDays: period,
      goal,
      type: "isp",
      totalPrice: 2.4 * Number(quantity),
    };

    createOrder(orderData, {
      onSuccess: (order: any) =>
        router.push(`/personal-account/orders/${order.id}`),
    });
  };

  const handleChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryId(e.target.value);
  };

  return (
    <div className="buy-col">
      <div className="buy-item" style={{ height: 850, minHeight: 800 }}>
        <h3 className="buy-item__header">
          ISP IPv4 ПРОКСИ <br />
          СТАТИЧЕСКИЕ
        </h3>
        <div className="separator"></div>
        <p className="buy-item__about">
          Подходят для всех сайтов. Кроме платёжных систем. Выдаются в одни руки
        </p>
        <a href="#" className="buy-item__btn">
          Выдаются в одни руки
        </a>

        <h4 className="buy-item__subheader">СТРАНА</h4>
        <select
          value={countryId}
          onChange={handleChangeCountry}
          disabled={isLoadingPreferences}
          style={selectStyle}
        >
          {preferences?.isp?.country.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          КОЛ-ВО
        </h4>
        <select
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={selectStyle}
        >
          <option value="1">1</option>
        </select>

        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          ПЕРИОД
        </h4>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={selectStyle}
        >
          <option value="1m">1 месяц</option>
        </select>

        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          ЦЕЛЬ ИСПОЛЬЗОВАНИЯ
        </h4>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={inputStyle}
        />

        <div className="buy-item__price">
          ЦЕНА <span>2.4$ / IP</span>
        </div>
        <Button
          className="btn"
          variant="big"
          name="Купить"
          onClick={handleBuyClick}
        />
      </div>
    </div>
  );
};

const selectStyle = {
  backgroundColor: "#1E1E1E",
  color: "#fff",
  border: "1px solid #3E3E3E",
  padding: "10px",
  width: "100%",
  borderRadius: "5px",
  appearance: "none" as const,
  cursor: "pointer",
};

const inputStyle = {
  ...selectStyle,
};
