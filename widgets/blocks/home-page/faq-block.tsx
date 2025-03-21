import React from "react";
import Image from "next/image";
import Chat from "@/assets/images/chat-icon.png";
import Mail from "@/assets/images/mail-icon.png";
import { CallbackForm } from "@/components/forms/callback.form";

export const FaqBlock = () => {
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
            <a href="#" className="question-chat question-link">
              <span className="img-wrap">
                <Image
                  src={Chat}
                  alt=""
                  layout="response"
                  width={Chat.width}
                  height={Chat.height}
                />
              </span>
              <span>Live Chat</span>
            </a>
            <a href="#" className="question-mail question-link">
              <span className="img-wrap">
                <Image
                  src={Mail}
                  alt=""
                  layout="response"
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
