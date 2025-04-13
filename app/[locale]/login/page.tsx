'use client'

import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { LoginAuthForm } from "@/features/auth/login";

export default function LoginPage() {
  const isMobile = useIsMobile();


  return (
    <main className="inner-page">
      <title>Proxy Luxe | Авторизация</title>
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
