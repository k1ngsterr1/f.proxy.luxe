"use client";
import { FC } from "react";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePopupStore } from "@/shared/store/use-popup.store";

export const LogoutButton: FC = () => {
  const { removeAccessToken, removeRefreshToken } = useAuthStore();
  const { closePopup } = usePopupStore();
  const navigate = useRouter();
  const i18n = useTranslations("auth.logout");

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();

    // Close any open popups first
    closePopup("non-auth");

    // Clear auth tokens
    removeAccessToken();
    removeRefreshToken();

    // Use window.location for a full page refresh instead of client-side navigation
    // This ensures the app state is completely reset
    navigate.push("/");
  };

  return <span onClick={handleLogout}>{i18n("button")}</span>;
};
