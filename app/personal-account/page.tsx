"use client";
import "@/assets/styles/style.css";
import { PayForm } from "@/components/forms/pay.form";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PersonalAccount() {
  const navigate = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      navigate.push("/");
    }
  }, [token]);

  return (
    <div
      className="personal_account"
      style={{ display: "flex", flexDirection: "row", width: "75%" }}
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
