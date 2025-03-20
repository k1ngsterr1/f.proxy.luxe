import { PropsWithChildren } from "react";
import { Suspense } from "react";
import "@/assets/styles/normalize.css";
import "@/assets/styles/main.css";
import { Footer } from "@/features/footer/footer";
import { LoginForm } from "@/widgets/forms/login-form";
import { RegisterForm } from "@/widgets/forms/register-form";
import { Loader } from "@/shared/ui/loader";
import { Header } from "@/features/header/ui/header";

export default function RootLayout({ children }: any) {
  return (
    <html lang="ru">
      <head>
        <title>Proxy Luxe</title>
      </head>
      <body>
        <Suspense fallback={<Loader />}>
          <Header />
          {children}
          <Footer />
          <LoginForm />
          <RegisterForm />
        </Suspense>
      </body>
    </html>
  );
}
