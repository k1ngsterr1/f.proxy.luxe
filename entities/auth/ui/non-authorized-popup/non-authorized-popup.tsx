"use client";
import { usePopupStore } from "@/shared/store/use-popup.store";
import { Button } from "@/shared/ui/button";
import { PopupLayout } from "@/shared/ui/popup-layout";
import React from "react";
import { useTranslations } from "next-intl";

export const NonAuthorizedPopup = () => {
  const { closePopup, openPopup } = usePopupStore();
  const i18n = useTranslations("pages.non-authorized");

  const handleOpenAuthPopup = (id: string) => {
    openPopup(id);
    closePopup("non-auth");
  };

  return (
    <PopupLayout text={i18n("title")} id="non-auth">
      <div>
        <Button
          onClick={() => handleOpenAuthPopup("auth-enter")}
          name={i18n("login")}
          style={{
            marginTop: 32,
          }}
        />
        <Button
          onClick={() => handleOpenAuthPopup("auth-reg")}
          name={i18n("createAccount")}
          style={{
            marginTop: 16,
          }}
        />
      </div>
    </PopupLayout>
  );
};
