"use client";
import "@/assets/styles/style.css";
import { PayForm } from "@/components/forms/pay.form";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PersonalAccount() {
  const navigate = useRouter();
  const { token } = useAuthStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!token) {
      const timeout = setTimeout(() => {
        navigate.push("/");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [token, navigate]);

  return (
    <div
      className="personal_account"
      style={{
        display: "flex",
        flexDirection: "row",
        width: isMobile ? "100%" : "75%",
      }}
    >
      <div
        className="main_cont"
        style={{
          width: "100%",
        }}
      >
        <PayForm />
      </div>
    </div>
  );
}
