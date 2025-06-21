"use client";
import MailGlow from "@/assets/images/mail-glow.png";
import Image from "next/image";
import { BuyProxyBlock } from "@/widgets/blocks/home-page/buy-proxy-block";
import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from "@/shared/config/query-client";
import { useTranslations } from "next-intl";

export default function BuyProxy() {
  const i18n = useTranslations();
  return (
    <QueryClientProvider client={reactQueryClient}>
      <title>{i18n("buyProxy.title")}</title>
      <meta
        name="keywords"
        content="купить прокси, ipv6 прокси, ipv4 прокси, индивидуальные прокси, персональные прокси, анонимные прокси, прокси дешево, купить proxy, proxy ru, https прокси, socks5 прокси, быстрые прокси, стабильные прокси, резидентские прокси, ISP, резидентные"
      />
      <meta
        name="description"
        content="Купить прокси дешево, индивидуальные резидентские и анонимные. IPv4, IPv6, резидентские прокси. HTTPs, Socks5 прокси. Прокси для социальных сетей."
      />
      <main className="inner-page">
        <section className="ibuy">
          <div className="scontainer">
            <h1 className="section-header">
              <span>{i18n("buy-proxy.buy-proxy1")}</span>
            </h1>
            <BuyProxyBlock />
            <div className="ibuy-info">
              {i18n("buy-proxy.iBuyInfo1")} <br />
              {i18n("buy-proxy.iBuyInfo2")}
            </div>
            <div className="ibuy-footer">
              <div className="ibuy-img">
                <Image src={MailGlow} alt="" />
              </div>
              <div className="ibuy-text">
                {i18n("buy-proxy.iBuyTest")}{" "}
                <a href="mailto:admin@proxy.luxe">admin@proxy.luxe</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </QueryClientProvider>
  );
}
