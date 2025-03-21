"use client";
import MailGlow from "@/assets/images/mail-glow.png";
import Image from "next/image";
import { BuyProxyBlock } from "@/widgets/blocks/home-page/buy-proxy-block";
import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from "@/shared/config/query-client";

export default function BuyProxy() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <main className="inner-page">
        <section className="ibuy">
          <div className="scontainer">
            <h1 className="section-header">
              <span>Купить прокси</span>
            </h1>
            <div className="ibuy-info">
              Наши прокси предоставляются исключительно в одни руки. Не являются
              публичными - где доступ к ним может купить любой желающий. <br />
              Приобретая IP адреса у нас, вы можете быть уверены, что
              используете их только вы в своих целях, и никто кроме Вас ими не
              пользуется.
            </div>
            <div className="ibuy-footer">
              <div className="ibuy-img">
                <Image src={MailGlow} alt="" />
              </div>
              <div className="ibuy-text">
                Если вам нужны прокси для другой страны, либо большее кол-во,
                напишите нам:{" "}
                <a href="amilto:support@proxy.luxe">support@proxy.luxe</a>
              </div>
            </div>
          </div>
        </section>
        <BuyProxyBlock />
      </main>
    </QueryClientProvider>
  );
}
