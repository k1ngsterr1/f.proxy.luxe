"use client";

import { AlertMessage } from "@/shared/ui/alert";
import { useState } from "react";

export default function PaymentsPage() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#000000",
      }}
    >
      <AlertMessage
        type="warning"
        message="Вам необходимо подтвердить свой email перейдя по ссылке, указанной в письме."
      />
      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            margin: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          ПЛАТЕЖИ
        </h1>
      </div>

      {/* Empty State */}
      <div
        style={{
          backgroundColor: "rgba(243, 214, 117, 0.1)",
          padding: "24px",
          textAlign: "center",
          borderRadius: "4px",
          color: "#f3d675",
          fontSize: "14px",
          border: "1px solid rgba(243, 214, 117, 0.2)",
        }}
      >
        Ничего не найдено...
      </div>
    </div>
  );
}
