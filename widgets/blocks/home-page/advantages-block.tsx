import Prem1 from "@/assets/images/prem1.png";
import Prem2 from "@/assets/images/prem2.png";
import Prem3 from "@/assets/images/prem3.png";
import Prem4 from "@/assets/images/prem4.png";
import Prem5 from "@/assets/images/prem5.png";
import Prem6 from "@/assets/images/prem6.png";
import Prem7 from "@/assets/images/prem7.png";
import Prem8 from "@/assets/images/prem8.png";

import { AdvantageCard } from "@/shared/ui/advantage-card";

const advantages = [
  {
    image: Prem1,
    title: "НИЗКИЕ ЦЕНЫ",
    description: "У нас одни из самых низких цен на рынке.",
    altText: "Дешевые цены",
  },
  {
    image: Prem2,
    title: "ВСЕ АВТОМАТИЗИРОВАНО",
    description: "Прокси активируются сразу же после оплаты.",
    altText: "Автоматическая активация",
  },
  {
    image: Prem3,
    title: "В ОДНИ РУКИ",
    description: "Продажа прокси ведется исключительно в одни руки.",
    altText: "Эксклюзивные прокси",
  },
  {
    image: Prem4,
    title: "HTTPS / SOCKS5",
    description:
      "Прокси переключаются с HTTPS на SOCKS5 и обратно в личном кабинете.",
    altText: "Переключение прокси",
  },
  {
    image: Prem5,
    title: "ПОКУПКА ОТ 1-ГО IP",
    description: "Вы можете купить хоть один прокси, кол-во не имеет значения.",
    altText: "Гибкие покупки",
  },
  {
    image: Prem6,
    title: "НЕСКОЛЬКО ПЕРИОДОВ",
    description: "Возможность покупки прокси на 30 дней, 60 дней либо 90 дней.",
    altText: "Гибкие тарифы",
  },
  {
    image: Prem7,
    title: "API ДЛЯ РАЗРАБОТЧИКОВ",
    description:
      "Api позволит вам интегрировать покупку и продление прокси в ваш сервис.",
    altText: "API интеграция",
  },
  {
    image: Prem8,
    title: "БЫСТРАЯ ПОДДЕРЖКА",
    description: "Мы стараемся отвечать на все ваши вопросы как можно быстрее.",
    altText: "Поддержка клиентов",
  },
];

export const AdvantagesBlock = () => {
  return (
    <section className="section advantages">
      <div className="container">
        <h2 className="section-header">
          <span>НАШИ ПРЕИМУЩЕСТВА</span>
        </h2>
        <div className="advantages-inner">
          {advantages.map((adv, index) => (
            <AdvantageCard key={index} {...adv} />
          ))}
        </div>
        <div className="advantages-hint">
          БОЛЬШЕ <span>329 ТЫСЯЧ</span> КЛИЕНТОВ УЖЕ ВЫБРАЛИ НАС
        </div>
      </div>
    </section>
  );
};
