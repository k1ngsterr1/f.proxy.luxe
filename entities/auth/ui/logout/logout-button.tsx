"use client";
import { FC } from "react";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const LogoutButton: FC = () => {
  const { removeAccessToken, removeRefreshToken } = useAuthStore();
  const navigate = useRouter();

  const handleLogout = () => {
    removeAccessToken();
    removeRefreshToken();
    navigate.push("/");
  };

  return (
    <Link href="#" onClick={handleLogout}>
      Выход
    </Link>
  );
};
