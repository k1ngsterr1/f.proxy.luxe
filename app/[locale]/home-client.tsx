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
export default function HomeClient() {
  const i18n = useTranslations();
  return (
    <>
      {" "}
      <QueryClientProvider client={reactQueryClient}>
        {" "}
        <HomeSlider /> <BuyPromoBlock /> <BuyProxyBlock /> <AdvantagesBlock />{" "}
        <PartnersBlock /> <FaqBlock /> <PaymentMethodsBlock /> <AboutBlock />{" "}
      </QueryClientProvider>{" "}
    </>
  );
}
