// app/layouts/root-layout.tsx
import { PropsWithChildren } from "react";
import "@/assets/styles/normalize.css";
import "@/assets/styles/lk.css";
import "@/assets/styles/style.css";
import { Sidebar } from "@/features/sidebar/sidebar";
import ClientLayout from "../client-layout";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: "en" | "ru" };
}) {
  const locale = params.locale;
  const messages = await getMessages();

  return (
    <>
      <div className="header_offset"></div>
      <section className="personal_account paymant_section">
        <div className="mw">
          <div
            className="cont"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <ClientLayout messages={messages} locale={locale}>
              <Sidebar />
              {children}
            </ClientLayout>
          </div>
        </div>
      </section>
    </>
  );
}
