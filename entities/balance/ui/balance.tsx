"use client";

import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const Balance: FC = () => {
  const { data, isLoading } = useGetUser();
  const i18n = useTranslations("pages.balance");

  return (
    <div className="balance">
      {isLoading ? (
        <>{i18n("loading")}</>
      ) : (
        <>
          {i18n("balance")} <span>{data?.balance} $</span>
        </>
      )}
    </div>
  );
};
