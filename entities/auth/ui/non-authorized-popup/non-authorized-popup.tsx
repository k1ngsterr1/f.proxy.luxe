"use client";
import { usePopupStore } from "@/shared/store/use-popup.store";
import { Button } from "@/shared/ui/button";
import { PopupLayout } from "@/shared/ui/popup-layout";
import React from "react";

export const NonAuthorizedPopup = () => {
  const { closePopup, openPopup } = usePopupStore();

  const handleOpenAuthPopup = (id: string) => {
    openPopup(id);
    closePopup("non-auth");
  };

  return (
    <PopupLayout text="Вы не авторизованы!" id="non-auth">
      <div>
        <Button
          onClick={() => handleOpenAuthPopup("auth-enter")}
          name="Войти"
          style={{
            marginTop: 32,
          }}
        />
        <Button
          onClick={() => handleOpenAuthPopup("auth-reg")}
          name="Создать аккаунт"
          style={{
            marginTop: 16,
          }}
        />
      </div>
    </PopupLayout>
  );
};
