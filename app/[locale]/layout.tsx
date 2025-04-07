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

  <Script id="yandex-metrika" strategy="afterInteractive">
    {`
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < e.scripts.length; j++) {if (e.scripts[j].src === r) return;}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(100819580, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor:true
    });
  `}
  </Script>;

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <title>{title}</title> */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Script id="chatra" strategy="afterInteractive">
          {`
            (function(d, w, c) {
              w.ChatraID = 'GMyCm92jsrf54TFEN';
              var s = d.createElement('script');
              w[c] = w[c] || function() {
                (w[c].q = w[c].q || []).push(arguments);
              };
              s.async = true;
              s.src = 'https://call.chatra.io/chatra.js';
              if (d.head) d.head.appendChild(s);
            })(document, window, 'Chatra');
          `}
        </Script>
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
