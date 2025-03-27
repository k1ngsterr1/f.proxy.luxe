import { IPV6BuyCard } from "@/entities/ipv6/ui/ipv6-buy-card";
import { ISPBuyCard } from "@/entities/isp/ui/isp-buy-card";
import { ResidentalProxyBuyCard } from "@/entities/residental-proxy/ui/residental-proxy-buy-card";
import React from "react";
import { useTranslations } from "next-intl";

export const BuyProxyBlock = () => {
  const i18n = useTranslations("buy-proxy");

  return (
    <section className="ibuy">
      <div className="scontainer">
        <div className="buy-inner">
          <ISPBuyCard />
          <ResidentalProxyBuyCard />
          <IPV6BuyCard />
        </div>
      </div>
    </section>
  );
};
