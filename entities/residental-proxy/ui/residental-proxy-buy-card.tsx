"use client";

import { Button } from "@/shared/ui/button";
import type React from "react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/entities/orders/hooks/mutation/use-create-order.mutation";
import { useGetPreferences } from "@/entities/preferences/hooks/queries/use-get-preferences.query";
import { ChevronDown, Loader2 } from "lucide-react";

const TARIFF_PRICES = {
  "1 Gb": 2.4,
  "3 Gb": 7,
  "10 Gb": 21,
  "25 Gb": 50,
  "50 Gb": 90,
  "100 Gb": 170,
};

export const ResidentalProxyBuyCard = () => {
  const i18n = useTranslations("proxy-cards.residential");
  const [goal, setGoal] = useState<string>("surfing"); // Default to "surfing"
  const [tariffId, setTariffId] = useState<number>(0);
  const [selectedTariff, setSelectedTariff] = useState<any>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const router = useRouter();
  const { data: preferences, isLoading: isLoadingPreferences } =
    useGetPreferences();
  const { mutate: createOrder, isPending: isLoadingOrder } = useCreateOrder();

  useEffect(() => {
    if (Object.keys(TARIFF_PRICES).length > 0 && !selectedTariff) {
      const firstTariffName = Object.keys(TARIFF_PRICES)[0];
      setTariffId(0);
      setSelectedTariff({ id: 0, name: firstTariffName });
    }
  }, [selectedTariff]);

  const handleTariffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setTariffId(id);
    // Create a synthetic tariff object based on the selected option
    const tariffName = Object.keys(TARIFF_PRICES)[id];
    setSelectedTariff({ id, name: tariffName });
  };

  const getTariffPrice = (tariffName: string) => {
    // Extract the GB value from the tariff name (e.g., "Тариф 10 GB" -> "10 GB")
    const gbMatch = tariffName.match(/(\d+)\s*GB/i);
    if (gbMatch && gbMatch[0]) {
      return TARIFF_PRICES[gbMatch[0] as keyof typeof TARIFF_PRICES] || 2.4;
    }
    return 2.4; // Default to the lowest price if no match
  };

  const handleBuyClick = () => {
    // Clear previous validation errors
    setValidationError(null);

    // Validate that a goal is selected
    if (!goal) {
      setValidationError(i18n("errors.goalRequired"));
      return;
    }

    if (!selectedTariff) return;

    const price = getTariffPrice(selectedTariff.name);
    console.log(selectedTariff);

    const orderData = {
      tariff: selectedTariff.name,
      quantity: 1,
      periodDays: "1m",
      goal,
      type: "resident",
      totalPrice: price,
    };

    console.log(orderData);

    createOrder(orderData, {
      onSuccess: (order: any) =>
        router.push(`/personal-account/orders/${order.id}`),
      onError: () => {
        alert(i18n("errors.login-required"));
      },
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
      <div
        className="buy-item"
        style={{
          height: 850,
          minHeight: 800,
        }}
      >
        <h3 className="buy-item__header buy-item__header--solo">
          {i18n("title")}
        </h3>
        <div className="separator"></div>
        <p className="buy-item__about">{i18n("description")}</p>
        <span className="buy-item__btn">{i18n("issued")}</span>
        <h4
          className="buy-item__subheader"
          style={{
            marginTop: 16,
          }}
        >
          {i18n("country")}
        </h4>
        <div style={selectWrapperStyle}>
          <select className="buy-item__select" style={selectStyle}>
            <option value="∞">
              Создавайте любое кол-во прокси после оплаты тарифа в личном
              кабинете.
            </option>
          </select>
          <ChevronDown style={chevronStyle} size={16} />
        </div>
        <h4
          className="buy-item__subheader"
          style={{
            marginTop: 16,
          }}
        >
          {i18n("quantity")}
        </h4>
        <div style={selectWrapperStyle}>
          <select className="buy-item__select" style={selectStyle}>
            <option value="∞">
              Создавайте любое кол-во прокси после оплаты тарифа в личном
              кабинете.
            </option>
          </select>
          <ChevronDown style={chevronStyle} size={16} />
        </div>
        <h4
          className="buy-item__subheader"
          style={{
            marginTop: 16,
          }}
        >
          {i18n("plan")}
        </h4>
        {isLoadingPreferences ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px",
            }}
          >
            <Loader2 size={16} className="animate-spin" />
            <span>{i18n("loading")}</span>
          </div>
        ) : (
          <div style={selectWrapperStyle}>
            <select
              className="buy-item__select"
              value={tariffId}
              onChange={handleTariffChange}
              style={selectStyle}
            >
              {Object.entries(TARIFF_PRICES).map(
                ([tariffName, price], index) => (
                  <option key={index} value={index}>
                    {tariffName} - ${price}/{i18n("month")}
                  </option>
                )
              )}
            </select>
            <ChevronDown style={chevronStyle} size={16} />
          </div>
        )}
        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
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
          >
            {/* Added placeholder option with empty value */}
            <option value="">
              {i18n("goals.placeholder") || "Select a goal"}
            </option>
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
        {validationError && <div style={errorStyle}>{validationError}</div>}
        <div
          className="buy-item__price"
          style={{
            marginTop: 42,
          }}
        >
          {i18n("price")}
          <span>
            {selectedTariff
              ? `$${getTariffPrice(selectedTariff.name)} / ${i18n("month")}`
              : "Выберите тариф"}
          </span>
        </div>
        <Button
          className="btn"
          variant="big"
          name={isLoadingOrder ? i18n("loading") : i18n("buy")}
          onClick={handleBuyClick}
          disabled={isLoadingOrder || !selectedTariff}
        />
      </div>
    </div>
  );
};
