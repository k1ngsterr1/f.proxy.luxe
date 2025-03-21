import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export const PartnersBlock = () => {
  const navigate = useRouter();

  return (
    <section className="partners section">
      <div className="scontainer">
        <h2 className="section-header">ПАРТНЕРСКАЯ ПРОГРАММА</h2>
        <div className="partners-inner">
          <div className="partners-text">
            <p>
              Наша партнерская программа позволит
              <br />
              Вам зарабатывать 15% от всех платежей привлеченных Вами клиентов.
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
              пользователь пожизненно закрепляется за Вами <br />и со всех его
              платежей вам будет идти процент;
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
          Партнерское вознаграждение можно выводить на WebMoney и Qiwi, <br />
          либо использовать на оплату любых услуг нашего сервиса.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button name="Подробнее" onClick={() => navigate.push("/faq")} />
        </div>
      </div>
    </section>
  );
};
