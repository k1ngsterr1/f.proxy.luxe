"use client";
import { useEffect, useRef, useState } from "react";

interface WebMoneyButtonProps {
  orderId: string;
  amount: string | number; // Amount to be paid
  purse: string; // WebMoney Purse
}

export const WebMoneyButton: React.FC<WebMoneyButtonProps> = ({
  orderId,
  amount,
  purse,
}) => {
  const wmWidgetRef = useRef<HTMLDivElement | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (!isScriptLoaded) {
      const script = document.createElement("script");
      script.src =
        "https://merchant.webmoney.ru/conf/lib/widgets/wmApp.js?v=1.6";
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        setIsScriptLoaded(true);
      };
      document.body.appendChild(script);
    }
  }, [isScriptLoaded]);


  return (
    <div>
      <div
        id="wm-widget"
        ref={wmWidgetRef}
        style={{ width: "200px", height: "50px" }}
      ></div>
      <button
        onClick={() => alert("Продолжение оформления заказа")}
        style={{
          padding: "10px 24px",
          backgroundColor: "#f3d675",
          border: "none",
          borderRadius: "4px",
          color: "#000000",
          fontSize: "14px",
          cursor: "pointer",
          fontWeight: "500",
          marginTop: "10px",
        }}
      >
        Продолжить
      </button>
    </div>
  );
};
