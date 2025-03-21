"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPreferences } from "@/entities/preferences/hooks/queries/use-get-preferences.query";
import { useCreateOrder } from "@/entities/orders/hooks/mutation/use-create-order.mutation";
import { Orders } from "@/shared/types/order.types";
import { ProxyOrder } from "@/entities/orders/api/get/get-all-orders.api";

export const IPV6BuyCard = () => {
  const router = useRouter();

  const { data: preferences, isLoading: isLoadingPreferences } =
    useGetPreferences();
  const { mutate: createOrder, isPending: isLoadingOrder } = useCreateOrder();

  const [countryId, setCountryId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("10");
  const [usage, setUsage] = useState<string>("HTTPs / SOCKS5");

  useEffect(() => {
    if (!countryId && preferences?.ipv6?.country.length) {
      setCountryId(preferences.ipv6.country[0].id);
    }
  }, [preferences]);

  // ✅ Handle Country Change
  const handleChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryId(e.target.value);
  };

  // ✅ Ensure order sends properly
  const handleBuyClick = () => {
    const selectedCountry = preferences?.ipv6.country.find((c) => {
      return c.id == countryId;
    });

    if (!selectedCountry) return null;

    const orderData = {
      country: selectedCountry.name,
      quantity: Number(quantity),
      usage,
      period: "1m",
      periodDays: "1m",
      totalPrice: 0.08 * Number(quantity),
      proxyType: usage.includes("SOCKS5") ? "SOCKS5" : "HTTPS",
      type: "ipv6",
    };

    createOrder(orderData, {
      onSuccess: (order: any) =>
        router.push(`/personal-account/orders/${order.id}`),
    });
  };

  return (
    <div className="buy-col">
      <div className="buy-item" style={{ height: 800 }}>
        <h3 className="buy-item__header">IPv6 ПРОКСИ</h3>
        <div className="separator"></div>
        <p className="buy-item__about">
          Подходят для сайтов с поддержкой IPv6. Кроме платёжных систем.
        </p>
        <a className="buy-item__btn">Выдаются в одни руки</a>
        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          СТРАНА
        </h4>
        <select
          value={countryId}
          onChange={handleChangeCountry}
          disabled={isLoadingPreferences}
          style={{
            backgroundColor: "#1E1E1E",
            color: "#fff",
            border: "1px solid #3E3E3E",
            padding: "10px",
            width: "100%",
            borderRadius: "5px",
            appearance: "none",
            cursor: isLoadingPreferences ? "not-allowed" : "pointer",
          }}
        >
          {preferences?.ipv6?.country.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* ✅ Quantity Input */}
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
        <div
          style={{
            backgroundColor: "#1E1E1E",
            color: "#fff",
            border: "1px solid #3E3E3E",
            padding: "10px",
            width: "100%",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          1 месяц
        </div>
        <div className="buy-item__price">
          ЦЕНА: <span>0.08$ / IP</span>
        </div>

        <button
          onClick={handleBuyClick}
          disabled={isLoadingOrder || isLoadingPreferences}
          className="btn"
        >
          {isLoadingOrder ? "Обработка..." : "Купить"}
        </button>
      </div>
    </div>
  );
};
