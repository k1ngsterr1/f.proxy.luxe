import { RegisterAuthForm } from "@/features/auth/register";
import { PopupLayout } from "@/shared/ui/popup-layout";
import React from "react";

export const RegisterForm = () => {
  return (
    <PopupLayout id="auth-reg" text="Регистрация">
      <RegisterAuthForm />
    </PopupLayout>
  );
};
