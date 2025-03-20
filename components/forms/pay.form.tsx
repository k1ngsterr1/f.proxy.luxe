"use client";

import type React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Visa from "@/assets/images/visa.png";
import WebMoney from "@/assets/images/webmoney.png";
import BitCoin from "@/assets/images/bitcoin.png";
import LitCoin from "@/assets/images/litecoin.png";
import DogeCoin from "@/assets/images/dogetoin.png";
import Payer from "@/assets/images/payeer.png";
import Enot from "@/assets/images/enot.png";
import Image from "next/image";
import { useWebMoneyPayment } from "@/entities/payments/hooks/general/use-webmoney-payment";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useState } from "react";

const validationSchema = Yup.object({
  paymentMethod: Yup.string().required("Выберите способ оплаты"),
  paymentAmount: Yup.number()
    .typeError("Введите корректную сумму")
    .min(1, "Минимальная сумма 1$")
    .max(1000, "Максимальная сумма 1000$")
    .required("Введите сумму платежа"),
  agreed: Yup.boolean().oneOf(
    [true],
    "Вы должны подтвердить ознакомление с FAQ"
  ),
});

export const PayForm = () => {
  const isMobile = useIsMobile();
  const { processWebMoneyPayment } = useWebMoneyPayment();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      paymentMethod: "",
      paymentAmount: "",
      agreed: false,
    },
    validationSchema,
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);

        if (values.paymentMethod === "webmoney") {
          await processWebMoneyPayment(values.paymentAmount);
        } else {
          // Handle other payment methods
          console.log("Processing payment:", values);
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error("Payment processing error:", error);
        alert(
          error instanceof Error
            ? error.message
            : "Произошла ошибка при обработке платежа. Пожалуйста, попробуйте позже."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Handle form submission with native alert for validation errors
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Check for payment method
    if (!formik.values.paymentMethod) {
      alert("Выберите способ оплаты");
      return;
    }

    // Check for agreement
    if (!formik.values.agreed) {
      alert("Вы должны подтвердить ознакомление с FAQ");
      return;
    }

    // Check for payment amount
    if (!formik.values.paymentAmount) {
      alert("Введите сумму платежа");
      return;
    }

    // If we have a payment amount, validate it
    const amount = Number(formik.values.paymentAmount);
    if (isNaN(amount)) {
      alert("Введите корректную сумму");
      return;
    }

    if (amount < 1) {
      alert("Минимальная сумма 1$");
      return;
    }

    if (amount > 1000) {
      alert("Максимальная сумма 1000$");
      return;
    }

    // Submit the form
    formik.handleSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginLeft: isMobile ? 0 : 64,
        marginTop: isMobile ? 32 : 0,
      }}
      noValidate // Add this to disable browser validation
    >
      <div className="m_title">
        <h1 className="h1">
          <span>ЛИЧНЫЙ КАБИНЕТ</span>/БАЛАНС
        </h1>
      </div>

      <div className="payment_method">
        <div className="h5">
          Способ оплаты: <span style={{ color: "#f3d675" }}>*</span>
        </div>

        <div className="methods">
          {[
            { id: "visa", img: Visa, text: "VISA/MASTERCARD/MIR" },
            { id: "webmoney", img: WebMoney, text: "WEBMONEY (WMT)" },
            { id: "bitcoin", img: BitCoin, text: "BITCOIN (BTC)" },
            { id: "litecoin", img: LitCoin, text: "LITECOIN (LTC)" },
            { id: "dogecoin", img: DogeCoin, text: "DOGECOIN (DOGE)" },
            { id: "payeer", img: Payer, text: "PAYER" },
            { id: "enot", img: Enot, text: "ENOT.IO" },
          ].map((method) => (
            <label key={method.id} className="method">
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={formik.values.paymentMethod === method.id}
                onChange={formik.handleChange}
                // Remove required attribute
              />
              <span className="method_cont">
                <span className="img">
                  <Image
                    src={method.img || "/placeholder.svg"}
                    alt={method.text}
                    width={80}
                    height={80}
                  />
                </span>
                <span className="txt">{method.text}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="sum_line">
        <div className="h5">
          Сумма платежа: <span style={{ color: "#f3d675" }}>*</span>
        </div>

        <div className="form">
          <input
            name="paymentAmount"
            type="number"
            min={1}
            max={1000}
            placeholder="1000$"
            value={formik.values.paymentAmount}
            onChange={formik.handleChange}
            // Keep required for this input as it's a standard input
          />

          <button
            type="submit"
            className="btn_next"
            disabled={isSubmitting}
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "обработка..." : "продолжить"}
          </button>
        </div>
      </div>

      {/* Checkbox for agreement - positioned at the bottom */}
      <div
        className="agree_faq"
        style={{
          marginLeft: 0,
          marginTop: "16px",
        }}
      >
        <label className="checkbox">
          <input
            className="checkbox-inp"
            name="agreed"
            type="checkbox"
            checked={formik.values.agreed}
            onChange={formik.handleChange}
            // Remove required attribute
          />
          <span className="checkbox-box"></span>
          <span className="checkbox-text">
            Я прочитал раздел FAQ. Я знаю, что покупаю и согласен с условиями
            использования
          </span>
        </label>
      </div>
    </form>
  );
};
