"use client";
import { FC, MouseEventHandler } from "react";
import { Services } from "@/services";
import { useAuthStore } from "@/store/use-auth-store";

export const LogoutButton: FC = () => {
  const { removeAccessToken, removeRefreshToken } = useAuthStore();

  const handleLogout = () => {
    removeAccessToken();
    removeRefreshToken();
  };

  return (
    <a href="#" onClick={handleLogout}>
      Выход
    </a>
  );
};
