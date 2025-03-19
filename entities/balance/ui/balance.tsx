"use client";

import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { FC, useEffect, useState } from "react";

export const Balance: FC = () => {
  const { data, isLoading } = useGetUser();

  return (
    <div className="balance">
      {isLoading ? (
        <>Загрузка...</>
      ) : (
        <>
          Баланс <span>{data?.balance} $</span>
        </>
      )}
    </div>
  );
};
