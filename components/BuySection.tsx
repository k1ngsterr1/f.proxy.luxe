"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { ProxyBuyCard } from "@/components/ProxyBuyCard";
import { IspBuyForm } from "@/components/forms/isp-buy.form";
import { IpV6BuyForm } from "@/components/forms/ipv6-buy.form";
import { ResidentBuyForm } from "@/components/forms/resident-buy.form";
import { ResponseReference } from "@/interfaces/product.interface";
import { Services } from "@/services";

export const BuySection: FC = () => {
  const [reference, setReference] = useState<Omit<
    ResponseReference,
    "status"
  > | null>(null);
  const [ispLoaded, setIspLoaded] = useState<boolean>(false);
  const [ipv6Loaded, setIpv6Loaded] = useState<boolean>(false);
  const [residentLoaded, setResidentLoaded] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  const ispOnLoadedHandler = () => {
    setIspLoaded(true);
  };

  const ipv6OnLoadedHandler = () => {
    setIpv6Loaded(true);
  };

  const residentOnLoadedHandler = () => {
    setResidentLoaded(true);
  };

  if (reference && !error) {
    return (
      <div className="buy-inner">
        <ProxyBuyCard
          title="<span>ISP IPv4</span> ПРОКСИ <br /> СТАТИЧЕСКИЕ"
          description="Подходят для всех сайтов. Кроме платёжных систем."
        >
          <IspBuyForm
            amounts={reference.amounts}
            countries={reference.isp.country}
            periods={reference.isp.period}
            targets={reference.isp.targets}
            onLoaded={ispOnLoadedHandler}
          />
        </ProxyBuyCard>
        <ProxyBuyCard
          title="РЕЗИДЕНТНЫЕ <span>IPV4</span> ПРОКСИ <br /> ДИНАМИЧЕСКИЕ"
          description="Подходят для всех сайтов. Кроме платёжных систем."
        >
          <ResidentBuyForm
            amounts={reference.amounts}
            targets={reference.resident.targets}
            tariffs={reference.resident.tariffs}
            onLoaded={residentOnLoadedHandler}
          />
        </ProxyBuyCard>
        <ProxyBuyCard
          title="<span>IPv6</span> ПРОКСИ <br />"
          description="Подходят для сайтов с поддержкой IPv6. Кроме платёжных систем."
        >
          <IpV6BuyForm
            amounts={reference.amounts.filter((value, index) => index !== 0)}
            countries={reference.ipv6.country}
            periods={reference.ipv6.period}
            targets={reference.ipv6.targets}
            onLoaded={ipv6OnLoadedHandler}
          />
        </ProxyBuyCard>
      </div>
    );
  }
};
