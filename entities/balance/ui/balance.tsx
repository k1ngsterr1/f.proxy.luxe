"use client";

import { FC, useEffect, useState } from "react";

export const Balance: FC = () => {
  const [balance, setBalance] = useState<number>(0);

  return (
    <div className="balance">
      Баланс <span>{balance} ₽</span>
    </div>
  );
};
