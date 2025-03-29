"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPreferences } from "@/entities/preferences/hooks/queries/use-get-preferences.query";
import { useCreateOrder } from "@/entities/orders/hooks/mutation/use-create-order.mutation";
import { Button } from "@/shared/ui/button";
import { useTranslations } from "next-intl";

export const IPV6BuyCard = () => {
  const router = useRouter();
  const i18n = useTranslations("proxy-cards.ipv6");

  const { data: preferences, isLoading: isLoadingPreferences } =
    useGetPreferences();
  const { mutate: createOrder, isPending: isLoadingOrder } = useCreateOrder();

  const [countryId, setCountryId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("10");
  const [goal, setGoal] = useState<string>("");
  const [usage, setUsage] = useState<string>("HTTPs / SOCKS5");
  const [period, setPeriod] = useState<string>("");

  useEffect(() => {
    if (preferences?.ipv6?.country.length && !countryId) {
      setCountryId(preferences.ipv6.country[0].id);
    }

    if (preferences?.ipv6?.period.length && !period) {
      setPeriod(preferences.ipv6.period[0].id);
    }
  }, [preferences]);

  const handleBuyClick = () => {
    const selectedCountry = preferences?.ipv6.country.find(
      (c) => c.id == countryId
    );
    const selectedPeriod = preferences?.ipv6.period.find((p) => p.id == period);

    if (!selectedCountry || !selectedPeriod) return null;

    const orderData = {
      country: selectedCountry.name,
      quantity: Number(quantity),
      goal,
      usage,
      period: selectedPeriod.name,
      periodDays: selectedPeriod.id,
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
      <div className="buy-item" style={{ minHeight: 800, height: 850 }}>
        <h3 className="buy-item__header">{i18n("title")}</h3>
        <div className="separator"></div>
        <p className="buy-item__about">{i18n("description")}</p>
        <a className="buy-item__btn">{i18n("issued")}</a>

        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          {i18n("country")}
        </h4>
        <select
          value={countryId}
          onChange={(e) => setCountryId(e.target.value)}
          disabled={isLoadingPreferences}
          style={selectStyle}
        >
          {preferences?.ipv6?.country.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          {i18n("quantity")}
        </h4>
        <input
          type="number"
          value={quantity}
          min={10}
          onChange={(e) => setQuantity(e.target.value)}
          style={inputStyle}
        />

        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          {i18n("period")}
        </h4>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          disabled={isLoadingPreferences}
          style={selectStyle}
        >
          <option> {i18n("month")}</option>
        </select>

        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          {i18n("usage")}
        </h4>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={inputStyle}
        />

        <div className="buy-item__price">
          {i18n("price")}: <span>$0.08 / IP</span>
        </div>
        <Button
          onClick={handleBuyClick}
          disabled={isLoadingOrder || isLoadingPreferences}
          className="btn"
          variant="big"
          name={isLoadingOrder ? i18n("processing") : i18n("buy")}
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
