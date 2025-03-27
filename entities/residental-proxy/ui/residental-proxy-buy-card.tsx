import { Button } from "@/shared/ui/button";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/entities/orders/hooks/mutation/use-create-order.mutation";
import { useGetPreferences } from "@/entities/preferences/hooks/queries/use-get-preferences.query";

export const ResidentalProxyBuyCard = () => {
  const i18n = useTranslations("proxy-cards.residential");
  const [goal, setGoal] = useState<string>("");
  const [tariffId, setTariffId] = useState<number>(0);

  const router = useRouter();
  const { data: preferences, isLoading: isLoadingPreferences } =
    useGetPreferences();
  const { mutate: createOrder, isPending: isLoadingOrder } = useCreateOrder();
  useEffect(() => {
    if (!tariffId && preferences?.isp?.country.length) {
      setTariffId(preferences.resident.tariffs[0].id);
    }
  }, [preferences]);
  const handleBuyClick = () => {
    const selectedTariff = preferences?.resident.tariffs.find((t) => {
      return t.id == tariffId;
    });

    if (!selectedTariff) return null;

    const orderData = {
      tariff: selectedTariff.name,
      quantity: 1,
      periodDays: "1m",
      goal,
      type: "resident",
      totalPrice: 2.4 * 1,
    };
    console.log(orderData);

    createOrder(orderData, {
      onSuccess: (order: any) =>
        router.push(`/personal-account/orders/${order.id}`),
    });
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
        <a className="buy-item__btn">{i18n("issued")}</a>
        <h4
          className="buy-item__subheader"
          style={{
            marginTop: 16,
          }}
        >
          {i18n("quantity")}
        </h4>
        <select
          className="buy-item__select"
          style={{
            backgroundColor: "#1E1E1E", // Dark background
            color: "#fff", // White text
            border: "1px solid #3E3E3E", // Border color
            padding: "10px", // Padding inside the select
            width: "100%", // Full width
            borderRadius: "5px", // Rounded corners
            appearance: "none", // Removes default styles
            cursor: "pointer", // Pointer cursor
          }}
        >
          <option value="1">1</option>
        </select>
        <h4
          className="buy-item__subheader"
          style={{
            marginTop: 16,
          }}
        >
          {i18n("plan")}
        </h4>
        <select
          className="buy-item__select"
          style={{
            backgroundColor: "#1E1E1E", // Dark background
            color: "#fff", // White text
            border: "1px solid #3E3E3E", // Border color
            padding: "10px", // Padding inside the select
            width: "100%", // Full width
            borderRadius: "5px", // Rounded corners
            appearance: "none", // Removes default styles
            cursor: "pointer", // Pointer cursor
          }}
        >
          {preferences?.resident?.tariffs.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <h4 className="buy-item__subheader" style={{ marginTop: 16 }}>
          {i18n("usage")}
        </h4>
        <input
          type="text"
          value={goal}
          min={10}
          onChange={(e) => setGoal(e.target.value)}
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
        <div className="buy-item__price">
          {i18n("price")}
          <span>$2.4 / IP</span>
        </div>
        <Button
          className="btn"
          variant="big"
          name={i18n("buy")}
          onClick={handleBuyClick}
        />
      </div>
    </div>
  );
};
