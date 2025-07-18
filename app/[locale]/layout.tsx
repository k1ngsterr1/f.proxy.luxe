// src/app/[locale]/layout.tsx
import { Suspense } from "react";
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
import Script from "next/script";
import { IpAuthForm } from "@/widgets/forms/id-auth-form";
import YandexMetrika from "@/components/yandex-metrika/yandex-metrika";

export default async function LocaleLayout({
  children,
  params: { locale },
}: // title = "",
{
  children: React.ReactNode;
  params: { locale: "en" | "ru" };
  // title?: string;
}) {
  // 1. Validate locale
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // 2. Load translation messages for the current locale
  const messages = await getMessages();

  // 3. Define page titles based on locale
  const pageTitle =
    locale === "ru"
      ? "Купить прокси, резидентные прокси цена, приватные прокси недорого, резидентские индивидуальные IPv4, IPv6, ISP proxies серверы | Proxy.luxe"
      : "Buy proxy, residential proxy price, private proxy inexpensive, residential individual IPv4, IPv6, ISP proxies servers | Proxy.luxe";

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <meta name="yandex-verification" content="ff41c4cfcb5e125c" />
        <link rel="icon" href="/favicon.ico" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E6J21WMMJF"
          strategy="afterInteractive"
          async
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WCRHTCJHGJ');
          `}
        </Script>
      </head>
      <body>
        <YandexMetrika />

        <ClientLayout messages={messages} locale={locale}>
          <Suspense fallback={<Loader />}>
            <Header />
            {children}
            <Footer />
            <NonAuthorizedPopup />
            <LoginForm />
            <IpAuthForm />
            <RegisterForm />
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}
