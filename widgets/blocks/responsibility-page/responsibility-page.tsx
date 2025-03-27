"use client";

import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { AlertMessage } from "@/shared/ui/alert";
import { useTranslations } from "next-intl";

export default function ResponsibilityBlock() {
  const i18n = useTranslations("pages.responsibility");
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
      <div style={{ marginBottom: "32px", padding: 65 }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
            margin: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          {i18n("title")}
        </h1>
      </div>
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
            {i18n("disclaimer1")}
          </p>
          <p>
            {i18n("disclaimer2")}
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
