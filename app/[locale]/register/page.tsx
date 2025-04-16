'use client'

import { RegisterAuthForm } from "@/features/auth/register";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const i18n = useTranslations();
  const isMobile = useIsMobile();

  return (
    <main className="inner-page">
      <title>{i18n("registers.title")}</title>
      <div
        style={{
          maxWidth: isMobile ? "90%" : "40%",
          margin: "auto",
          padding: isMobile ? "20px 0" : "40px 0",
        }}
      >
        <RegisterAuthForm />
      </div>
    </main>
  );
}