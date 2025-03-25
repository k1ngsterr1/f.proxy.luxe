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
import payments from "@/assets/images/payments.png";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <QueryClientProvider client={reactQueryClient}>
        <HomeSlider />
        <BuyPromoBlock />
        <BuyProxyBlock />
        <AdvantagesBlock />
        <PartnersBlock />
        <FaqBlock />
        <Image
          src={payments}
          style={{
            height: 100,
            filter: "grayscale(100%)",
          }}
          alt="Payments"
        />
        <AboutBlock />
      </QueryClientProvider>
    </>
  );
}
