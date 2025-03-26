"use client";

import { FC, useState } from "react";
import { ResponseReference } from "@/shared/interfaces/product.interface";
import { useTranslations } from "next-intl";

export const BuyPromoBlock: FC = () => {
  const i18n = useTranslations("buyPromo");
  const [reference, setReference] = useState<Omit<
    ResponseReference,
    "status"
  > | null>(null);

  return (
    <section className="buy section">
      <div className="scontainer">
        <h2 className="section-header">
          {i18n("header.part1")} <span>{i18n("header.isp")}</span>,{" "}
          {i18n("header.part2")} <span>{i18n("header.ips")}</span>
        </h2>

        <div className="buy-info">
          {[1, 2, 3, 4].map((item) => (
            <div key={item}>
              <span>•</span> {i18n(`features.${item}`)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
