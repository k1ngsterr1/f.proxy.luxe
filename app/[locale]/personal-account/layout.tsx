import "@/assets/styles/normalize.css";
import "@/assets/styles/lk.css";
import "@/assets/styles/style.css";
import { Sidebar } from "@/features/sidebar/sidebar";
import ClientLayout from "../client-layout";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const locale = (await params).locale;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the current locale
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
