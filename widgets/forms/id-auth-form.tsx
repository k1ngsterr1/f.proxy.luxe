import IpAuthorizationForm from "@/features/auth/id-auth";

import { PopupLayout } from "@/shared/ui/popup-layout";
import React from "react";
import { useTranslations } from "next-intl";

export const IpAuthForm = () => {
  const t = useTranslations('proxyList.ipAuth');
  return (
    <PopupLayout id="ip-auth-enter" text={t('title')}>
      <IpAuthorizationForm />
    </PopupLayout>
  );
};
