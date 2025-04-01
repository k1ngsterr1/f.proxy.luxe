"use client";

import type React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Visa from "@/assets/images/visa.png";
import WebMoney from "@/assets/images/webmoney.png";
import BitCoin from "@/assets/images/bitcoin.png";
import LitCoin from "@/assets/images/litecoin.png";
import Digiseller from "@/assets/images/digiseller.png";
import Payer from "@/assets/images/payeer.png";
import Enot from "@/assets/images/enot.png";
import Image from "next/image";
import { useWebMoneyPayment } from "@/entities/payments/hooks/general/use-webmoney-payment";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { usePayeerPayment } from "@/entities/payments/hooks/general/use-payeer-payment";
import { useDigisellerPayment } from "@/entities/payments/hooks/general/use-digiseller-payment";

// const PayFormValidation = () => {
//   const i18n = useTranslations("forms.payment.errors");

//   return Yup.object({
//     paymentMethod: Yup.string().required(i18n("selectPaymentMethod")),
//     paymentAmount: Yup.number()
//       .typeError(i18n("invalidAmount"))
//       .min(1, i18n("minAmount"))
//       .max(1000, i18n("maxAmount"))
//       .required(i18n("enterAmount")),
//     agreed: Yup.boolean().oneOf([true], i18n("agreeToTerms")),
//   });
// };

// const validationSchema = PayFormValidation();

export const PayForm = () => {
  const isMobile = useIsMobile();
  const { processWebMoneyPayment } = useWebMoneyPayment();
  const { processPayeerPayment } = usePayeerPayment();
  const { processDigisellerPayment } = useDigisellerPayment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const i18n = useTranslations("forms.payment");
  const errorI18n = useTranslations("forms.payment.errors");
  const locale = useLocale();

  const formik = useFormik({
    initialValues: {
      paymentMethod: "",
      paymentAmount: "",
      agreed: false,
    },
    // validationSchema,
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);

        if (values.paymentMethod === "webmoney") {
          await processWebMoneyPayment(values.paymentAmount);
        } else if (values.paymentMethod === "payeer") {
          await processPayeerPayment(values.paymentAmount);
        } else if (values.paymentMethod === "digiseller") {
          console.log(locale);
          await processDigisellerPayment(
            Math.floor(parseFloat(values.paymentAmount)),
            locale
          );
        } else {
          // Handle other payment methods
          console.log("Processing payment:", values);
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error("Payment processing error:", error);
        alert(
          error instanceof Error ? error.message : errorI18n("generalError")
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
      alert(errorI18n("selectPaymentMethod"));
      return;
    }

    // Check for agreement
    if (!formik.values.agreed) {
      alert(errorI18n("agreeToTerms"));
      return;
    }

    // Check for payment amount
    if (!formik.values.paymentAmount) {
      alert(errorI18n("enterAmount"));
      return;
    }

    // If we have a payment amount, validate it
    const amount = Number(formik.values.paymentAmount);
    if (isNaN(amount)) {
      alert(errorI18n("invalidAmount"));
      return;
    }

    if (amount < 1) {
      alert(errorI18n("minAmount"));
      return;
    }

    if (amount > 1000) {
      alert(errorI18n("maxAmount"));
      return;
    }

    // Submit the form
    formik.handleSubmit(e);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      style={{
        marginLeft: isMobile ? 0 : 64,
        marginTop: isMobile ? 32 : 0,
      }}
      noValidate // Add this to disable browser validation
    >
      <div className="m_title">
        <h1 className="h1">
          <span>{i18n("title")}</span>
        </h1>
      </div>

      <div className="payment_method">
        <div className="h5">
          {i18n("paymentMethod")} <span style={{ color: "#f3d675" }}>*</span>
        </div>

        <div className="methods">
          {[
            { id: "visa", img: Visa, text: "VISA/MASTERCARD/MIR" },
            { id: "webmoney", img: WebMoney, text: "WEBMONEY (WMT)" },
            { id: "bitcoin", img: BitCoin, text: "BITCOIN (BTC)" },
            { id: "litecoin", img: LitCoin, text: "LITECOIN (LTC)" },
            { id: "digiseller", img: Digiseller, text: "DIGISELLER" },
            { id: "payeer", img: Payer, text: "PAYEER" },
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
          {i18n("paymentAmount")} <span style={{ color: "#f3d675" }}>*</span>
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
          <Button
            type="submit"
            className="btn_next"
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
            name={isSubmitting ? i18n("processing") : i18n("continue")}
          />
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
          <span className="checkbox-text">{i18n("agreement")}</span>
        </label>
      </div>
    </form>
  );
};
