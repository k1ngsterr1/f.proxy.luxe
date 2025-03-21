"use client";

import { HomeSlider } from "@/components/home/HomeSlider";

import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from "@/shared/config/query-client";
import { AdvantagesBlock } from "@/widgets/blocks/home-page/advantages-block";
import { BuyProxyBlock } from "@/widgets/blocks/home-page/buy-proxy-block";
import { BuyPromoBlock } from "@/widgets/blocks/home-page/buy-promo-block";
import { PartnersBlock } from "@/widgets/blocks/home-page/partners-block";
import { FaqBlock } from "@/widgets/blocks/home-page/faq-block";

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
        <div className="about">
          <div className="container">
            <div className="about-item">
              <p className="about-text about-text--gold">
                Наша компания с 2016 года занимается продажами анонимных
                прокси-серверов. Почему Вам стоит купить прокси у нас:
              </p>
            </div>
            <div className="about-item">
              <p className="about-text">
                Высокое качество и скорость работы - прокси качественные быстрые
                и стабильные;
              </p>
              <p className="about-text">
                Полная анонимность - прокси полностью анонимные Большой <br />
                выбор прокси для разных задач - индивидуальные прокси выдаются
                строго в один руки; <br /> В продаже есть резидентные
                динамические прокси и ISP статические прокси.
              </p>
              <p className="about-text">
                Низкие цены - у нас одни из самых дешевых прокси на рынке IPv6 и
                IPv4 прокси;
              </p>
            </div>
            <div className="about-item">
              <p className="about-text about-text--gold">
                Полная автоматизация - мгновенная выдача и возможность продления
                в личном кабинете.
              </p>
              <p className="about-text">
                Быстрая поддержка - мы проконсультируем Вас по техническим и
                рабочим вопросам, касаемо наших прокси.
              </p>
              <p className="about-text">
                Связаться с нами можно по email, telegram, либо через онлайн
                консультант;
              </p>
            </div>
            <div className="about-item">
              <p className="about-text">
                Наши прокси подойдут Вам для работ на большинстве сайтах и решат
                Ваши задачи.
              </p>
              <p className="about-text">
                Прокси IPv6 хорошо подходят для работы в социальных сетях, таких
                как: facebook, instagram, youtube и с множеством других сайтов,
                с поддержкой IPv6;
              </p>
              <p className="about-text">
                ISP прокси IPv4 и резидентные прокси, подойдут для работы с
                любыми сайтами и сервисами, кроме платёжных систем;
              </p>
            </div>
            <div className="about-item">
              <p className="about-text about-text--gold">
                Наши недорогие и высокоскоростные прокси, позволят вам работать
                в сети комфортно и безопасно. Если вы еще задаетесь вопросом:
              </p>
              <p className="about-text">
                Где купить прокси? - то ответ на него - PROXY.LUXE
              </p>
            </div>
          </div>
        </div>
      </QueryClientProvider>
      ;
    </>
  );
}
