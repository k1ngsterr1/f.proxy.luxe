import { LoginAuthForm } from "@/features/auth/login";
import { PopupLayout } from "@/shared/ui/popup-layout";
import React from "react";
import { useTranslations } from "next-intl";

export const LoginForm = () => {
  const i18n = useTranslations("forms.login");
  return (
    <PopupLayout id="auth-enter" text={i18n("title")}>
      <LoginAuthForm />
    </PopupLayout>
  );
};
