"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useTranslations } from "next-intl";
import { useSendResetEmail } from "@/entities/auth/hooks/mutations/use-reset-email.mutations";
import { useChangePassword } from "@/entities/auth/hooks/mutations/use-change-password.mutation";
import { AlertMessage } from "@/shared/ui/alert";
import { ChangePasswordForm } from "@/features/auth/change-password";
import { sendResetEmail } from "@/entities/auth/api/post/send-reset-email.api";

export default function ChangePasswordPage() {
  const isMobile = useIsMobile();
  const t = useTranslations("forgot-password");

  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  useEffect(() => {
    sendResetEmail();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !emailCode || !newPassword || !confirmPassword) {
      setError(t("errors.required-fields"));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("errors.passwords-not-match"));
      return;
    }

    if (newPassword.length < 8) {
      setError(t("errors.password-length"));
      return;
    }

    changePassword(
      {
        code: emailCode,
        newPassword,
        //@ts-ignore
        confirmPassword,
        email,
      },
      {
        onSuccess: () => {
          setSuccess(t("success.password-changed"));
          setEmail("");
          setEmailCode("");
          setNewPassword("");
          setConfirmPassword("");
        },
        onError: (err) => {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(t("errors.generic-error"));
          }
        },
      }
    );
  };

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
          {t("changePassword")}
        </h1>
      </div>

      {error && <AlertMessage type="error" message={error} />}
      {success && <AlertMessage type="success" message={success} />}

      <ChangePasswordForm
        emailCode={emailCode}
        setEmailCode={setEmailCode}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        showNewPassword={showNewPassword}
        setShowNewPassword={setShowNewPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        isLoading={isChangingPassword}
        handleSubmit={handleSubmit}
        error={error}
        success={success}
        i18n={t}
      />

      <div
        style={{
          marginTop: "24px",
          fontSize: "14px",
          color: "#999999",
          textAlign: "center",
        }}
      >
        {t("changePasswordEmail")}{" "}
        <a
          href="mailto:admin@proxy.luxe"
          style={{
            color: "#f3d675",
            textDecoration: "none",
            borderBottom: "1px dotted #f3d675",
          }}
        >
          admin@proxy.luxe
        </a>
      </div>
    </div>
  );
}
