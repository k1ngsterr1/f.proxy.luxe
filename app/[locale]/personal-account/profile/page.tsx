"use client";

import { Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useSendResetEmail } from "@/entities/auth/hooks/mutations/use-reset-email.mutations";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { AlertMessage } from "@/shared/ui/alert";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useIsSmallerTablet } from "@/shared/utils/use-is-smaller-tablet";
import { useIsTablet } from "@/shared/utils/use-is-tablet";

export default function ProfilePage() {
  const { data } = useGetUser();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmallerTablet = useIsSmallerTablet();
  const locale = useLocale();
  const i18n = useTranslations();
  const t = useTranslations("personal-profile");

  const containerWidth = isSmallerTablet
    ? "400px"
    : isTablet
    ? "600px"
    : "800px";

  const {
    mutate: sendResetEmail,
    isPending: isSendingResetEmail,
    isSuccess: isResetLinkSent,
    isError: isResetLinkError,
  } = useSendResetEmail();

  const handleSendResetLink = () => {
    if (!data?.email) return;

    sendResetEmail({
      email: data.email,
      lang: locale === "ru" ? "ru" : "en",
    });
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        maxWidth: containerWidth,
        margin: "0 auto",
        backgroundColor: "#000000",
      }}
    >
      <title>{i18n("personalProfile.title")}</title>

      {data?.isVerified === false && (
        <AlertMessage
          type="warning"
          isEmail
          message={t("verification-warning")}
        />
      )}
      {isResetLinkSent && (
        <AlertMessage type="success" message={t("success.reset-link-sent")} />
      )}
      {isResetLinkError && (
        <AlertMessage type="error" message={t("errors.generic-error")} />
      )}

      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: isMobile ? "24px" : "32px",
            margin: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          {t("title")}
        </h1>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label
          htmlFor="profile-email"
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#FFFFFF",
            fontSize: "14px",
          }}
        >
          {t("email")} <span style={{ color: "#f3d675" }}>*</span>
        </label>
        <div style={{ position: "relative", marginBottom: "8px" }}>
          <Mail
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#f3d675",
            }}
          />
          <input
            id="profile-email"
            type="email"
            value={data?.email || ""}
            readOnly
            style={{
              width: "100%",
              padding: "10px 12px 10px 36px",
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              color: "#f3d675",
              fontSize: "14px",
            }}
          />
        </div>
        <p style={{ color: "#999999", fontSize: "12px", margin: "0 0 12px" }}>
          {t("password-reset-hint")}
        </p>
        <button
          type="button"
          onClick={handleSendResetLink}
          disabled={isSendingResetEmail || !data?.email}
          style={{
            backgroundColor: isSendingResetEmail
              ? "rgba(243, 214, 117, 0.5)"
              : "#f3d675",
            border: "1px solid #f3d675",
            color: "#111111",
            padding: "8px 14px",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 600,
            cursor:
              isSendingResetEmail || !data?.email ? "not-allowed" : "pointer",
            opacity: !data?.email ? 0.55 : 1,
          }}
        >
          {isSendingResetEmail ? t("sending") : t("button-request-link")}
        </button>
      </div>
    </div>
  );
}
