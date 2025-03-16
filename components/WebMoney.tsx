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

  useEffect(() => {
    if (isScriptLoaded && window.webmoney && wmWidgetRef.current) {
      window.webmoney
        .widgets()
        .button.create({
          data: {
            amount: amount.toString(), // Ensure amount is a string
            purse: purse,
            desc: `Order ID: ${orderId}`, // Dynamically set order ID
            paymentType: "wm",
            forcePay: true,
          },
          style: {
            theme: "wm",
            showAmount: true,
            titleNum: 1,
            title: "Оплатить",
            design: "skeuomorph",
          },
          lang: "ru",
        })
        .on("paymentComplete", function (data: any) {
          console.log("Payment Complete", data);
          alert("Оплата успешно завершена!");
        })
        .mount(wmWidgetRef.current);
    }
  }, [isScriptLoaded, orderId, amount, purse]);

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
