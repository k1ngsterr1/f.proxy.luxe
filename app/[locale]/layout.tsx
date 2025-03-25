// src/app/[locale]/layout.tsx
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import "@/assets/styles/normalize.css";
import "@/assets/styles/main.css";

import { Header } from "@/features/header/ui/header";
import { Footer } from "@/features/footer/footer";
import { LoginForm } from "@/widgets/forms/login-form";
import { RegisterForm } from "@/widgets/forms/register-form";
import { Loader } from "@/shared/ui/loader";
import { NonAuthorizedPopup } from "@/entities/auth/ui/non-authorized-popup/non-authorized-popup";
import ClientLayout from "./client-layout";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: "en" | "ru" };
}) {
  // 1. Validate locale
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // 2. Load translation messages for the current locale
  const messages = await getMessages();

  console.log("messages:", messages);

  return (
    <html lang={locale}>
      <head>
        <title>Proxy Luxe</title>
      </head>
      <body>
        <ClientLayout messages={messages} locale={locale}>
          <Suspense fallback={<Loader />}>
            <Header />
            {children}
            <Footer />
            <NonAuthorizedPopup />
            <LoginForm />
            <RegisterForm />
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}
