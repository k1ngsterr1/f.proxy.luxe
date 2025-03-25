"use client";
import { PropsWithChildren } from "react";
import "@/assets/styles/normalize.css";
import "@/assets/styles/lk.css";
import "@/assets/styles/style.css";
import { QueryClientProvider, useIsFetching } from "@tanstack/react-query";
import reactQueryClient from "@/shared/config/query-client";
import { Sidebar } from "@/features/sidebar/sidebar";
import { Loader } from "@/shared/ui/loader";

type RootLayoutProps = PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="header_offset"></div>
      <section className="personal_account paymant_section">
        <div className="mw">
          <div
            className="cont"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <QueryClientProvider client={reactQueryClient}>
              <Sidebar />
              {children}
            </QueryClientProvider>
          </div>
        </div>
      </section>
    </>
  );
}
