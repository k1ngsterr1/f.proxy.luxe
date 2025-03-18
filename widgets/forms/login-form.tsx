import { LoginAuthForm } from "@/features/auth/login";
import { PopupLayout } from "@/shared/ui/popup-layout";
import React from "react";

export const LoginForm = () => {
  return (
    <PopupLayout id="auth-enter" text="Войти">
      <LoginAuthForm />
    </PopupLayout>
  );
};
