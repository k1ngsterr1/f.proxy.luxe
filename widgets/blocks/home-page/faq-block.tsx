"use client";

import React from "react";
import Image from "next/image";
import Chat from "@/assets/images/chat-icon.png";
import Mail from "@/assets/images/mail-icon.png";
import { CallbackForm } from "@/components/forms/callback.form";

declare global {
  interface Window {
    Chatra?: (...args: any[]) => void;
  }
}

export const FaqBlock = () => {
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
            <h2 className="question-header">ОСТАЛИСЬ ВОПРОСЫ?</h2>
            <p className="question-text">
              Напишите нам и мы постараемся максимально <br />
              быстро вам помочь и проконсультировать.
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
                  alt="Chat"
                  layout="responsive"
                  width={Chat.width}
                  height={Chat.height}
                />
              </span>
              <span>Live Chat</span>
            </button>
            <a
              href="mailto:admin@proxy.luxe"
              className="question-mail question-link"
            >
              <span className="img-wrap">
                <Image
                  src={Mail}
                  alt="Mail"
                  layout="responsive"
                  width={Mail.width}
                  height={Mail.height}
                />
              </span>
              <span>admin@proxy.luxe</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
