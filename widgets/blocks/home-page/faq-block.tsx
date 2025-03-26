"use client";

import React from "react";
import Image from "next/image";
import Chat from "@/assets/images/chat-icon.png";
import Mail from "@/assets/images/mail-icon.png";
import { CallbackForm } from "@/components/forms/callback.form";
import { useTranslations } from "next-intl";

declare global {
  interface Window {
    Chatra?: (...args: any[]) => void;
  }
}

export const FaqBlock = () => {
  const i18n = useTranslations("faqBlock");

  const openChatra = () => {
    if (typeof window !== "undefined" && typeof window.Chatra === "function") {
      window.Chatra("openChat", true);
    }
  };

  return (
    <section className="question section">
      <div className="container">
        <div className="question-inner">
          <CallbackForm />
          <div className="question-info">
            <h2 className="question-header">{i18n("header")}</h2>
            <p className="question-text">
              {i18n("description.line1")} <br />
              {i18n("description.line2")}
            </p>
            <div className="separator"></div>
            <button
              onClick={openChatra}
              style={{
                background: "none",
                border: "none",
              }}
              className="question-chat question-link"
            >
              <span
                className="img-wrap"
                style={{
                  background: "transparent",
                }}
              >
                <Image
                  style={{
                    background: "transparent",
                  }}
                  src={Chat}
                  alt={i18n("chat.altText")}
                  layout="responsive"
                  width={Chat.width}
                  height={Chat.height}
                />
              </span>
              <span>{i18n("chat.label")}</span>
            </button>
            <a
              href={`mailto:${i18n("email.address")}`}
              className="question-mail question-link"
            >
              <span className="img-wrap">
                <Image
                  src={Mail}
                  alt={i18n("email.altText")}
                  layout="responsive"
                  width={Mail.width}
                  height={Mail.height}
                />
              </span>
              <span>{i18n("email.address")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
