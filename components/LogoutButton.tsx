"use client";
import { FC } from "react";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/router";

export const LogoutButton: FC = () => {
  const { removeAccessToken, removeRefreshToken } = useAuthStore();
  const navigate = useRouter();

  const handleLogout = () => {
    removeAccessToken();
    removeRefreshToken();
    navigate.push("/");
  };

  return (
    <a href="#" onClick={handleLogout}>
      Выход
    </a>
  );
};
