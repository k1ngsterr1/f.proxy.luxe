import { PropsWithChildren } from "react";
import { Suspense } from "react";
import "@/assets/styles/normalize.css";
import "@/assets/styles/main.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Fancybox from "@/components/Fancybox";
import { AuthForm } from "@/components/forms/auth.form";
import { RegisterForm } from "@/components/forms/register.form";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ru" }];
}

interface RootLayoutProps extends PropsWithChildren {
  params: {
    lang: string;
  };
}

export default function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  return (
    <html lang={lang}>
      <head>
        <title>Proxy Luxe</title>
        <link
          href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Fancybox options={{}} delegate="">
            <Header />
            {children}
            <Footer />
            <div className="auth" id="auth-enter" style={{ display: "none" }}>
              <h2 className="auth-header">войти</h2>
              <div className="separator"></div>
              <AuthForm />
            </div>
            <div className="auth" id="auth-reg" style={{ display: "none" }}>
              <h2 className="auth-header">РЕГИСТРАЦИЯ</h2>
              <div className="separator"></div>
              <RegisterForm />
            </div>
          </Fancybox>
        </Suspense>
        <script src="https://www.cbr-xml-daily.ru/money.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
      </body>
    </html>
  );
}
