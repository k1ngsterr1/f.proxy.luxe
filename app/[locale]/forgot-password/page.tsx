"use client";
import { useState } from "react";
import { ChangePasswordForm } from "@/widgets/forms/change-password-form";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useTranslations } from "next-intl";

export default function ChangePasswordPage() {
  const isMobile = useIsMobile();
  const i18n = useTranslations();
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
      <div
        style={{ marginTop: isMobile ? "16px" : "64px", marginBottom: "32px" }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
            margin: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          {i18n("forgot-password.changePassword")}
        </h1>
      </div>
      <ChangePasswordForm />
      <div
        style={{
          marginTop: "24px",
          fontSize: "14px",
          color: "#999999",
          textAlign: "center",
        }}
      >
        {i18n("forgot-password.changePasswordEmail")}{" "}
        <a
          href="mailto:support@proxy.luxe"
          style={{
            color: "#f3d675",
            textDecoration: "none",
            borderBottom: "1px dotted #f3d675",
          }}
        >
          support@proxy.luxe
        </a>
      </div>
    </div>
  );
}
