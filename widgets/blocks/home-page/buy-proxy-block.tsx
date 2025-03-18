import { IPV6BuyCard } from "@/entities/ipv6/ui/ipv6-buy-card";
import { ISPBuyCard } from "@/entities/orders/isp-buy-card";
import { ResidentalProxyBuyCard } from "@/entities/residental-proxy/ui/residental-proxy-buy-card";
import React from "react";

export const BuyProxyBlock = () => {
  return (
    <section className="ibuy">
      <div className="scontainer">
        <h1 className="section-header">
          <span>Купить прокси</span>
        </h1>
        <div className="buy-inner">
          <ISPBuyCard />
          <ResidentalProxyBuyCard />
          <IPV6BuyCard />
        </div>
      </div>
    </section>
  );
};
