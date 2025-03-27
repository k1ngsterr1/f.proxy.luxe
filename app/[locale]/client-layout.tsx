"use client";

import { NextIntlClientProvider } from "next-intl";
import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from "@/shared/config/query-client";

export default function ClientLayout({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryClientProvider client={reactQueryClient}>
        {children}
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
