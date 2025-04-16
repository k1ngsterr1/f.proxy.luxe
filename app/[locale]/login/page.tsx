'use client'

import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { LoginAuthForm } from "@/features/auth/login";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const isMobile = useIsMobile();
  const t = useTranslations()


  return (
    <main className="inner-page">
      <title>{t("auths.title")}</title>
      <div
        style={{
          maxWidth: isMobile ? "100%" : "40%",
          margin: "auto",
          padding: isMobile ? "20px" : "40px 0",
        }}>
        <LoginAuthForm />
      </div>
    </main>
  );
}
