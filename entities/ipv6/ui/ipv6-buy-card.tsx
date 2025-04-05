"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPreferences } from "@/entities/preferences/hooks/queries/use-get-preferences.query";
import { useCreateOrder } from "@/entities/orders/hooks/mutation/use-create-order.mutation";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { PureRangeSlider } from "@/shared/ui/range-slider";

export const IPV6BuyCard = () => {
  const router = useRouter();
  const i18n = useTranslations("proxy-cards.ipv6");

  const { data: preferences, isLoading: isLoadingPreferences } =
    useGetPreferences();
  const { mutate: createOrder, isPending: isLoadingOrder } = useCreateOrder();

  const [validationError, setValidationError] = useState<string | null>(null);
  const [countryId, setCountryId] = useState<string>("");
  const [goal, setGoal] = useState<string>("Surfing");
  const [usage, setUsage] = useState<string>("HTTPs / SOCKS5");
  const [period, setPeriod] = useState<string>("");

  const [value, setValue] = useState(5);
  const rangeRef = useRef<HTMLInputElement>(null);

  const min = 0;
  const max = 10;

  const fillPercentage = ((value - min) / (max - min)) * 100;

  useEffect(() => {
    if (rangeRef.current) {
      rangeRef.current.style.setProperty(
        "--fill-percentage",
        `${fillPercentage}%`
      );
    }
  }, [fillPercentage]);

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
      quantity: Number(value),
      goal: goal,
      usage,
      period: selectedPeriod.name,
      periodDays: selectedPeriod.id,
      totalPrice: 0.08 * Number(value),
      proxyType: usage.includes("SOCKS5") ? "SOCKS5" : "HTTPS",
      type: "ipv6",
    };

    createOrder(orderData, {
      onSuccess: (order: any) =>
        router.push(`/personal-account/orders/${order.id}`),
    });
  };

  // Common style for select elements
  const selectStyle = {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    border: "1px solid #3E3E3E",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    appearance: "none" as const,
    cursor: "pointer",
    paddingRight: "30px", // Space for the chevron icon
  };

  // Style for the select wrapper (to position the chevron icon)
  const selectWrapperStyle = {
    position: "relative" as const,
    width: "100%",
  };

  // Style for the chevron icon
  const chevronStyle = {
    position: "absolute" as const,
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none" as const,
    color: "#f3d675",
  };

  // Style for validation error message
  const errorStyle = {
    color: "#ff4d4f",
    fontSize: "12px",
    marginTop: "4px",
  };

  return (
    <div className="buy-col">
      <div className="buy-item" style={{ minHeight: 800, height: 850 }}>
        <h3 className="buy-item__header">{i18n("title")}</h3>
        <div className="separator"></div>
        <p className="buy-item__about">{i18n("description")}</p>
        <span className="buy-item__btn">{i18n("issued")}</span>
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

        <h4
          className="buy-item__subheader"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          {i18n("quantity")}:{" "}
          <span style={{ left: `calc(${fillPercentage}% + 10px)` }}>
            {value}
          </span>
        </h4>
        <PureRangeSlider
          value={value}
          setValue={setValue}
          ref={rangeRef}
          max={10}
        />
        <h4 className="buy-item__subheader" style={{ marginTop: 20 }}>
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
        <h4 className="buy-item__subheader" style={{ marginTop: 20 }}>
          {i18n("usage")} <span style={{ color: "#f3d675" }}>*</span>
        </h4>
        <div style={selectWrapperStyle}>
          <select
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value);
              setValidationError(null);
            }}
            style={{
              ...selectStyle,
              border: validationError
                ? "1px solid #ff4d4f"
                : "1px solid #3E3E3E",
            }}
            required
          >
            <option value="surfing">{i18n("goals.surfing")}</option>
            <option value="socialMedia">{i18n("goals.socialMedia")}</option>
            <option value="seo">{i18n("goals.seo")}</option>
            <option value="dataCollection">
              {i18n("goals.dataCollection")}
            </option>
            <option value="ecommerce">{i18n("goals.ecommerce")}</option>
            <option value="gaming">{i18n("goals.gaming")}</option>
            <option value="streaming">{i18n("goals.streaming")}</option>
            <option value="research">{i18n("goals.research")}</option>
            <option value="other">{i18n("goals.other")}</option>
          </select>
          <ChevronDown style={chevronStyle} size={16} />
        </div>
        <div className="buy-item__price">
          {i18n("price")}:{" "}
          <span>{`$${(0.8 * value).toFixed(2)} / ${value} IP`}</span>
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
