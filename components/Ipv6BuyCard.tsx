"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Preferences, Country } from "@/types/preferences.types";
import { getPreferences } from "@/hooks/get-preferences";
import { createOrder } from "@/hooks/create-order";
import { productCalc } from "@/hooks/product-calc";
import { CalcData } from "@/types/calc.types";

const API_KEY = "d03c0baa50128a51bb904a7b";
const EXCHANGE_API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

export const IPV6BuyCard = () => {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [country, setCountry] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("10");
  const [usage, setUsage] = useState<string>("HTTPs / SOCKS5");
  const [period, setPeriod] = useState<string>("1m");
  const [priceUSD, setPriceUSD] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  // Fetch preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const data = await getPreferences();
        setPreferences(data);
        if (data?.ipv6?.country.length) {
          setCountry(data.ipv6.country[0].text);
        }
      } catch (error) {
        console.error("Ошибка загрузки настроек:", error);
      }
    };
    fetchPreferences();
  }, []);

  // Fetch USD to RUB exchange rate
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(EXCHANGE_API_URL);
        if (response.data && response.data.conversion_rates) {
          setExchangeRate(response.data.conversion_rates.RUB);
        }
      } catch (error) {
        console.error("Ошибка получения курса валют:", error);
      }
    };
    fetchExchangeRate();
  }, []);

  // Calculate price
  useEffect(() => {
    if (!country || !quantity || !period) return;

    const calculatePrice = async () => {
      const calcData: CalcData = {
        countryId: Number(country),
        periodId: period,
        quantity: Number(quantity),
        protocol: "HTTPS",
        customTargetName: usage,
      };

      try {
        const response = await productCalc(calcData);
        setPriceUSD(response.totalPrice);
      } catch (error) {
        console.error("Ошибка при расчёте стоимости:", error);
        setPriceUSD(null);
      }
    };

    calculatePrice();
  }, [country, quantity, period, usage]);

  const handleBuyClick = async () => {
    if (!preferences) return;

    const periodDays = period === "1w" ? "7" : "30"; // Convert period to string
    const totalPrice = priceUSD ? Math.round(priceUSD) : 0; // Ensure integer value
    const proxyType = usage.includes("SOCKS5") ? "SOCKS5" : "HTTPS"; // Ensure valid proxyType

    const orderData = {
      country,
      quantity: Number(quantity),
      usage,
      period,
      periodDays, // Must be a string
      totalPrice, // Must be an integer
      proxyType, // Must be either "HTTPS" or "SOCKS5"
      type: "ipv6", // Ensure type is valid
    };

    try {
      const response = await createOrder(orderData);
      console.log("Заказ успешно создан:", response);
      alert("Заказ успешно создан!");
    } catch (error) {
      console.error("Ошибка при создании заказа:", error);
      alert("Ошибка при создании заказа.");
    }
  };

  // Convert price to RUB
  const priceRUB =
    priceUSD && exchangeRate ? (priceUSD * exchangeRate).toFixed(2) : null;

  return (
    <div className="buy-col">
      <div
        className="buy-item"
        style={{
          height: 800,
        }}
      >
        <h3 className="buy-item__header">IPv6 ПРОКСИ</h3>
        <div className="separator"></div>
        <p className="buy-item__about">
          Подходят для сайтов с поддержкой IPv6. Кроме платёжных систем.
        </p>
        <a href="#" className="buy-item__btn">
          Выдаются в одни руки
        </a>

        {/* Выбор страны */}
        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          СТРАНА
        </h4>
        <select
          className="buy-item__select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={!preferences}
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
          {preferences?.ipv6?.country.map((c: Country) => (
            <option key={c.id} value={c.id}>
              {c.text}
            </option>
          ))}
        </select>

        {/* Количество */}
        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          КОЛ-ВО
        </h4>
        <input
          className="buy-item__select"
          type="number"
          value={quantity}
          min={10}
          onChange={(e) => setQuantity(e.target.value)} // Allow free typing
          onBlur={(e) => {
            if (Number(e.target.value) < 10) {
              setQuantity("10"); // Enforce minimum value only on blur
            }
          }}
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

        {/* Период */}
        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          ПЕРИОД
        </h4>
        <select
          className="buy-item__select"
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
              {p.text}
            </option>
          ))}
        </select>

        {/* Display prices */}
        <div className="buy-item__price">
          ЦЕНА:{" "}
          {priceUSD !== null ? (
            <>{exchangeRate && <span> {priceRUB} RUB</span>}</>
          ) : (
            "Рассчитывается..."
          )}
        </div>

        <button onClick={handleBuyClick} className="btn">
          купить
        </button>
      </div>
    </div>
  );
};
