"use client";
import { NextIntlClientProvider } from "next-intl";

export default function ClientLayout({ children, locale, messages }: any) {
  function onError(error: any) {
    if (error.code === "MISSING_MESSAGE") return;
    console.error(error);
  }

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      onError={onError}
    >
      {children}
    </NextIntlClientProvider>
  );
}
