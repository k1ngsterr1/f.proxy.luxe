"use client";

import { HomeSlider } from "@/components/home/HomeSlider";
import { BuySection } from "@/components/BuySection";
import Image from "next/image";
import Prem1 from "@/assets/images/prem1.png";
import Prem2 from "@/assets/images/prem2.png";
import Prem3 from "@/assets/images/prem3.png";
import Prem4 from "@/assets/images/prem4.png";
import Prem5 from "@/assets/images/prem5.png";
import Prem6 from "@/assets/images/prem6.png";
import Prem7 from "@/assets/images/prem7.png";
import Prem8 from "@/assets/images/prem8.png";
import Chat from "@/assets/images/chat-icon.png";
import Mail from "@/assets/images/mail-icon.png";
import { CallbackForm } from "@/components/forms/callback.form";
import { IPV6BuyCard } from "@/entities/ipv6/ui/ipv6-buy-card";
import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from "@/shared/config/query-client";
import { AdvantagesBlock } from "@/widgets/blocks/home-page/advantages-block";
import { ResidentalProxyBuyCard } from "@/entities/residental-proxy/ui/residental-proxy-buy-card";
import { ISPBuyCard } from "@/entities/orders/isp-buy-card";
import { BuyProxyBlock } from "@/widgets/blocks/home-page/buy-proxy-block";

export default function Home() {
  return (
    <>
      <QueryClientProvider client={reactQueryClient}>
        <HomeSlider />
        <section className="buy section">
          <div className="scontainer">
            <h2 className="section-header">
              КУПИТЬ ПРОКСИ <span>ISP</span>, РЕЗИДЕНТНЫЕ{" "}
              <span>IPV4 / IPV6</span>
            </h2>
            <BuySection />
            <div className="buy-info">
              <div>
                <span>•</span> Всё автоматизированно
              </div>
              <div>
                <span>•</span> Прокси выдаются автоматически, сразу после оплаты
              </div>
              <div>
                <span>•</span> Наши прокси продаются исключительно в одни руки -
                это означает, что ими пользуетесь только Вы
              </div>
              <div>
                <span>•</span> Наши прокси элитные и полностью анонимные
              </div>
            </div>
          </div>
        </section>
        <BuyProxyBlock />
        <AdvantagesBlock />
        <section className="partners section">
          <div className="scontainer">
            <h2 className="section-header">ПАРТНЕРСКАЯ ПРОГРАММА</h2>
            <div className="partners-inner">
              <div className="partners-text">
                <p>
                  Наша партнерская программа позволит
                  <br />
                  Вам зарабатывать 15% от всех платежей привлеченных Вами
                  клиентов.
                  <br />
                  Для участия в программе Вам всего лишь нужно:
                </p>
                <div className="separator"></div>
                <h3 className="partners-header">
                  Привлекать к нам новых клиентов <br />
                  по реферальной ссылке
                </h3>
                <p>
                  - зарегистрировавшийся по вашей ссылке <br />
                  пользователь пожизненно закрепляется за Вами <br />и со всех
                  его платежей вам будет идти процент;
                </p>
                <h3 className="partners-header">
                  Распространять партнерский купон на скидку -{" "}
                </h3>
                <p>
                  пользователь, использовавший ваш купон, получает <br />
                  5% скидку при покупке, а так же пожизненно закрепляется <br />
                  за Вами и со всех его платежей вам будет идти процент.
                </p>
              </div>
              <div className="partners-discount">
                <div className="partners-num">
                  15
                  <div className="partners-num__percent">%</div>
                </div>
              </div>
            </div>
            <h2 className="section-header partners-subheader">
              НАШИ ПАРТНЕРЫ УЖЕ ЗАРАБОТАЛИ <span>27 434 698,20 руб.</span>
            </h2>
            <p className="partners-hint">
              Партнерское вознаграждение можно выводить на WebMoney и Qiwi,{" "}
              <br />
              либо использовать на оплату любых услуг нашего сервиса.
            </p>
            <div className="btn-wrap">
              <a href="#" className="btn">
                Подробнее
              </a>
            </div>
          </div>
        </section>
        <section className="question section">
          <div className="container">
            <div className="question-inner">
              <CallbackForm />
              <div className="question-info">
                <h2 className="question-header">ОСТАЛИСЬ ВОПРОСЫ?</h2>
                <p className="question-text">
                  Напишите нам и мы постараемся максимально <br />
                  быстро вам помочь и проконсультировать.
                </p>
                <div className="separator"></div>
                <a href="#" className="question-chat question-link">
                  <span className="img-wrap">
                    <Image
                      src={Chat}
                      alt=""
                      layout="response"
                      width={Chat.width}
                      height={Chat.height}
                    />
                  </span>
                  <span>Live Chat</span>
                </a>
                <a href="#" className="question-mail question-link">
                  <span className="img-wrap">
                    <Image
                      src={Mail}
                      alt=""
                      layout="response"
                      width={Mail.width}
                      height={Mail.height}
                    />
                  </span>
                  <span>admin@proxy.luxe</span>
                </a>
              </div>
            </div>
          </div>
        </section>
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
