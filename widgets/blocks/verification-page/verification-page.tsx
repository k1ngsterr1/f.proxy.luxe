"use client";

import { VerificationForm } from "@/widgets/forms/verification-form";
import React from "react";

export const VerificationPageBlock = () => {
  return (
    <div
      className="inner-page"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#000000",
        color: "#FFFFFF",
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
            margin: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          ПОДТВЕРЖДЕНИЕ АККАУНТА
        </h1>
      </div>
      <VerificationForm />
    </div>
  );
};
