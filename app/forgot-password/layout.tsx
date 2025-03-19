"use client";
import { PropsWithChildren } from "react";
import "@/assets/styles/normalize.css";
import "@/assets/styles/lk.css";
import "@/assets/styles/style.css";
import { ExchangeRates } from "@/components/ExchangeRates";
import { LogoutButton } from "@/components/LogoutButton";
import ActiveLink from "@/components/ActiveLink";
import { QueryClientProvider } from "@tanstack/react-query";
import { Balance } from "@/entities/balance/ui/balance";
import reactQueryClient from "@/shared/config/query-client";
import { Sidebar } from "@/features/sidebar/sidebar";

type RootLayoutProps = PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <QueryClientProvider client={reactQueryClient}>
        {children}
      </QueryClientProvider>
    </>
  );
}
