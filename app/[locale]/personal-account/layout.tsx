// app/layouts/root-layout.tsx
"use client";

import { PropsWithChildren } from "react";
import "@/assets/styles/normalize.css";
import "@/assets/styles/lk.css";
import "@/assets/styles/style.css";
import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from "@/shared/config/query-client";
import { Sidebar } from "@/features/sidebar/sidebar";
import ClientLayout from "../client-layout";

interface RootLayoutProps extends PropsWithChildren {
  messages: Record<string, any>;
  locale: "ru" | "en";
}

export default function RootLayout({
  children,
  messages,
  locale,
}: RootLayoutProps) {
  return (
    <>
      <div className="header_offset"></div>
      <section className="personal_account paymant_section">
        <div className="mw">
          <div
            className="cont"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <QueryClientProvider client={reactQueryClient}>
              <ClientLayout messages={messages} locale={locale}>
                <Sidebar />
                {children}
              </ClientLayout>
            </QueryClientProvider>
          </div>
        </div>
      </section>
    </>
  );
}
