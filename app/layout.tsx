import { PropsWithChildren } from "react";
import { Suspense } from "react";
import "@/assets/styles/normalize.css";
import "@/assets/styles/main.css";
import Fancybox from "@/components/Fancybox";
import { Header } from "@/features/header/header";
import { Footer } from "@/features/footer/footer";
import { LoginForm } from "@/widgets/forms/login-form";
import { RegisterForm } from "@/widgets/forms/register-form";
import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from "@/shared/config/query-client";
import { Loader } from "@/shared/ui/loader";

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
        <Suspense fallback={<Loader />}>
          <Fancybox options={{}} delegate="">
            <Header />
            {children}
            <Footer />
            <LoginForm />
            <RegisterForm />
          </Fancybox>
        </Suspense>
        <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
      </body>
    </html>
  );
}
