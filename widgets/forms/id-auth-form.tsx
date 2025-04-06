import IpAuthorizationForm from "@/features/auth/id-auth";

import { PopupLayout } from "@/shared/ui/popup-layout";
import React from "react";

export const IpAuthForm = () => {
  return (
    <PopupLayout id="ip-auth-enter" text="Авторизация по IP">
      <IpAuthorizationForm />
    </PopupLayout>
  );
};
