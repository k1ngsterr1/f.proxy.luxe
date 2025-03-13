"use client";

import { FC, useEffect, useState } from "react";
import { Services } from "@/services";

export const Balance: FC = () => {
  const [balance, setBalance] = useState<number>(0);

  const fetchProfile = async () => {
    const r = await Services.Profile.getBalance();
    setBalance(r);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="balance">
      Баланс <span>{balance} ₽</span>
    </div>
  );
};
