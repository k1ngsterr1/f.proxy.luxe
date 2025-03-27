import { RegisterAuthForm } from "@/features/auth/register";
import { PopupLayout } from "@/shared/ui/popup-layout";
import React from "react";
import { useTranslations } from "next-intl";

export const RegisterForm = () => {
  const i18n = useTranslations("forms.register");
  return (
    <PopupLayout id="auth-reg" text={i18n("title")}>
      <RegisterAuthForm />
    </PopupLayout>
  );
};
