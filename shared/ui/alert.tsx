import React, { useEffect, useState } from "react";
import { EmailDTO } from "@/shared/interfaces/email.interface";
import { sendEmailCode } from "@/entities/auth/api/post/send-email-code.api";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertMessageProps {
  type: AlertType;
  message: React.ReactNode;
  show?: boolean;
  className?: string;
  isEmail?: boolean;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  message,
  show = true,
  isEmail = false,
  className = "",
}) => {
  const navigate = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const t = useTranslations("alert.resend");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail);
    }
  }, []);

  if (!show) return null;

  const styles = {
    success: {
      backgroundColor: "rgba(76, 175, 80, 0.1)",
      border: "1px solid rgba(76, 175, 80, 0.3)",
      color: "#4CAF50",
    },
    error: {
      backgroundColor: "rgba(255, 82, 82, 0.1)",
      border: "1px solid rgba(255, 82, 82, 0.3)",
      color: "#FF5252",
    },
    warning: {
      backgroundColor: "rgba(255, 193, 7, 0.1)",
      border: "1px solid rgba(255, 193, 7, 0.3)",
      color: "#FFC107",
    },
    info: {
      backgroundColor: "rgba(33, 150, 243, 0.1)",
      border: "1px solid rgba(33, 150, 243, 0.3)",
      color: "#2196F3",
    },
  };

  const handleResend = async () => {
    if (!email) return;

    const payload: EmailDTO = { email };

    try {
      setResendStatus("loading");
      await sendEmailCode(payload);
      setResendStatus("success");
      navigate.push("/verification-code");
    } catch (err) {
      setResendStatus("error");
    } finally {
      setTimeout(() => setResendStatus("idle"), 3000);
    }
  };

  return (
    <div
      style={{
        ...styles[type],
        borderRadius: "4px",
        padding: "16px",
        marginBottom: "24px",
        fontSize: "14px",
      }}
      className={className}
      role={type === "error" ? "alert" : "status"}
    >
      {message}{" "}
      {isEmail && (
        <button
          onClick={handleResend}
          disabled={resendStatus === "loading"}
          style={{
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
            paddingLeft: "8px",
            color: styles[type].color,
          }}
        >
          {resendStatus === "loading"
            ? t("sending")
            : resendStatus === "success"
            ? t("sent")
            : resendStatus === "error"
            ? t("error")
            : t("resend")}
        </button>
      )}
    </div>
  );
};
