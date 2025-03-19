"use client";

import { useState } from "react";

export default function ResponsibilityBlock() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#000000",
        color: "#FFFFFF",
      }}
    >
      {/* Alert Banner */}
      {showAlert && (
        <div
          style={{
            backgroundColor: "rgba(243, 214, 117, 0.1)",
            padding: "16px",
            textAlign: "center",
            marginBottom: "32px",
            borderRadius: "4px",
            border: "1px solid rgba(243, 214, 117, 0.2)",
          }}
        >
          <div
            style={{
              color: "#f3d675",
              fontSize: "14px",
            }}
          >
            Вам необходимо{" "}
            <span style={{ fontWeight: "500" }}>подтвердить свой email</span>{" "}
            перейдя по ссылке, указанной в письме.{" "}
            <button
              onClick={() => setShowAlert(false)}
              style={{
                background: "none",
                border: "none",
                borderBottom: "1px dotted #f3d675",
                color: "#f3d675",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
              }}
            >
              Отправить еще раз
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "32px",
            margin: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          ИНФОРМАЦИЯ О WEBMONEY TRANSFER
        </h1>
      </div>

      {/* Content */}
      <div
        style={{
          backgroundColor: "rgba(243, 214, 117, 0.05)",
          borderRadius: "8px",
          border: "1px solid rgba(243, 214, 117, 0.2)",
          padding: "24px",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <p style={{ marginBottom: "16px" }}>
            Предлагаемые товары и услуги предоставляются не по заказу лица либо
            предприятия, эксплуатирующего систему WebMoney Transfer. Мы являемся
            независимым предприятием, оказывающим услуги, и самостоятельно
            принимаем решения о ценах и предложениях. Предприятия,
            эксплуатирующие систему WebMoney Transfer, не получают комиссионных
            вознаграждений или иных вознаграждений за участие в предоставлении
            услуг и не несут никакой ответственности за нашу деятельность.
          </p>
          <p>
            Аттестация, произведенная со стороны WebMoney Transfer, лишь
            подтверждает наши реквизиты для связи и удостоверяет личность. Она
            осуществляется по нашему желанию и не означает, что мы каким-либо
            образом связаны с продажами операторов системы WebMoney.
          </p>
        </div>

        {/* WebMoney Logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              padding: "16px",
              borderRadius: "8px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(243, 214, 117, 0.2)",
            }}
          >
            <div
              style={{
                color: "#f3d675",
                fontWeight: "bold",
                fontSize: "16px",
                letterSpacing: "1px",
              }}
            >
              WebMoney Transfer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
