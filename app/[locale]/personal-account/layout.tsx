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
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <>
      <div className="header_offset"></div>
      <section className="personal_account paymant_section">
        <div className="mw personal-account-shell-width">
          <div className="cont personal-account-layout">
            <ClientLayout messages={messages} locale={locale}>
              <Sidebar />
              <main className="personal-account-content">{children}</main>
            </ClientLayout>
          </div>
        </div>
      </section>
    </>
  );
}
