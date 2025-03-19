"use client";
import { PropsWithChildren } from "react";
import "@/assets/styles/normalize.css";
import "@/assets/styles/lk.css";
import "@/assets/styles/style.css";
import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from "@/shared/config/query-client";

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
