"use client";

import { FC, useState } from "react";
import { ResponseReference } from "@/shared/interfaces/product.interface";

export const BuyPromoBlock: FC = () => {
  const [reference, setReference] = useState<Omit<
    ResponseReference,
    "status"
  > | null>(null);

  return (
    <section className="buy section">
      <div className="scontainer">
        <h2 className="section-header">
          КУПИТЬ ПРОКСИ <span>ISP</span>, РЕЗИДЕНТНЫЕ <span>IPV4 / IPV6</span>
        </h2>

        <div className="buy-info">
          <div>
            <span>•</span> Всё автоматизированно
          </div>
          <div>
            <span>•</span> Прокси выдаются автоматически, сразу после оплаты
          </div>
          <div>
            <span>•</span> Наши прокси продаются исключительно в одни руки - это
            означает, что ими пользуетесь только Вы
          </div>
          <div>
            <span>•</span> Наши прокси элитные и полностью анонимные
          </div>
        </div>
      </div>
    </section>
  );
};
