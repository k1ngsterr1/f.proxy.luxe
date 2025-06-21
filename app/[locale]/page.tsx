"use client";

import { HomeSlider } from "@/components/home/HomeSlider";
import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from "@/shared/config/query-client";
import { AdvantagesBlock } from "@/widgets/blocks/home-page/advantages-block";
import { BuyProxyBlock } from "@/widgets/blocks/home-page/buy-proxy-block";
import { BuyPromoBlock } from "@/widgets/blocks/home-page/buy-promo-block";
import { PartnersBlock } from "@/widgets/blocks/home-page/partners-block";
import { FaqBlock } from "@/widgets/blocks/home-page/faq-block";
import { AboutBlock } from "@/widgets/blocks/home-page/about-block";
import { PaymentMethodsBlock } from "@/widgets/blocks/home-page/payments-block";
import { useTranslations } from "next-intl";

export default function Home() {
  const i18n = useTranslations();
  return (
    <>
      <QueryClientProvider client={reactQueryClient}>
        <title>{i18n("homeSlider.title")}</title>
        <meta
          name="keywords"
          content="купить прокси, ipv6 прокси, ipv4 прокси, индивидуальные прокси, персональные прокси, анонимные прокси, прокси дешево, купить proxy, proxy ru, https прокси, socks5 прокси, быстрые прокси, стабильные прокси, резидентские прокси, ISP, резидентные"
        />
        <meta
          name="description"
          content="Купить прокси дешево, индивидуальные резидентские и анонимные. IPv4, IPv6, резидентские прокси. HTTPs, Socks5 прокси. Прокси для социальных сетей."
        />
        <HomeSlider />
        <BuyPromoBlock />
        <BuyProxyBlock />
        <AdvantagesBlock />
        <PartnersBlock />
        <FaqBlock />
        <PaymentMethodsBlock />
        <AboutBlock />
      </QueryClientProvider>
    </>
  );
}
