"use client";

import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/entities/orders/hooks/mutation/use-create-order.mutation";
import { useGetPreferences } from "@/entities/preferences/hooks/queries/use-get-preferences.query";
import { Button } from "@/shared/ui/button";
import type React from "react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

export const ISPBuyCard = () => {
  const router = useRouter();
  const i18n = useTranslations("proxy-cards.isp");
  const [countryId, setCountryId] = useState<string>("3758");
  const [quantity, setQuantity] = useState<string>("1");
  const [period, setPeriod] = useState<string>("1m");
  const [goal, setGoal] = useState<string>("surfing");
  const [validationError, setValidationError] = useState<string | null>(null);

  const { data: preferences, isLoading: isLoadingPreferences } =
    useGetPreferences();
  const { mutate: createOrder, isPending: isLoadingOrder } = useCreateOrder();

  useEffect(() => {
    if (!countryId && preferences?.isp?.country.length) {
      setCountryId(preferences.isp.country[0].id);
    }
    if (!period && preferences?.isp?.period.length) {
      setPeriod(preferences.isp.period[0].id);
    }
  }, [preferences]);

  // 👉 Пример обработчика для кнопки "Купить"
  const handleBuyClick = () => {
    // Validate goal is selected

    const selectedCountry = preferences?.isp.country.find((c) => {
      console.log(c);
      return c.id == countryId;
    });

    const orderData = {
      country: selectedCountry?.name,
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
        <h3 className="buy-item__header">{i18n("title")}</h3>
        <div className="separator"></div>
        <p className="buy-item__about">{i18n("description")}</p>
        <a href="#" className="buy-item__btn">
          {i18n("issued")}
        </a>

        <h4 className="buy-item__subheader">{i18n("country")}</h4>
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
          {i18n("quantity")}
        </h4>
        <select
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={selectStyle}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>

        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          {i18n("period")}
        </h4>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={selectStyle}
        >
          <option>{i18n("month")}</option>
        </select>
        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          {i18n("usage")} <span style={{ color: "#f3d675" }}>*</span>
        </h4>
        <div style={{ position: "relative" }}>
          <select
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value);
              setValidationError(null);
            }}
            style={{
              ...selectStyle,
              borderColor: validationError ? "#ff4d4f" : "#3E3E3E",
            }}
            required
          >
            <option value="surfing">
              {i18n("goals.surfing") || "Surfing"}
            </option>
            <option value="social_media">
              {i18n("goals.socialMedia") || "Social Media"}
            </option>
            <option value="seo">
              {i18n("goals.seo") || "SEO & Marketing"}
            </option>
            <option value="data_collection">
              {i18n("goals.dataCollection") || "Data Collection"}
            </option>
            <option value="ecommerce">
              {i18n("goals.ecommerce") || "E-commerce"}
            </option>
            <option value="gaming">{i18n("goals.gaming") || "Gaming"}</option>
            <option value="streaming">
              {i18n("goals.streaming") || "Streaming"}
            </option>
            <option value="research">
              {i18n("goals.research") || "Research"}
            </option>
            <option value="other">{i18n("goals.other") || "Other"}</option>
          </select>
          <ChevronDown
            size={16}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#f3d675",
              pointerEvents: "none",
            }}
          />
        </div>
        {validationError && (
          <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
            {validationError}
          </div>
        )}

        <div className="buy-item__price">
          {i18n("price")} <span>$2.4 / IP</span>
        </div>
        <Button
          className="btn"
          variant="big"
          name={isLoadingOrder ? i18n("loading") : i18n("buy")}
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
  paddingRight: "30px", // Space for the chevron
};

const inputStyle = {
  ...selectStyle,
};
