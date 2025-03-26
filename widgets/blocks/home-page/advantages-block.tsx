import Prem1 from "@/assets/images/prem1.png";
import Prem2 from "@/assets/images/prem2.png";
import Prem3 from "@/assets/images/prem3.png";
import Prem4 from "@/assets/images/prem4.png";
import Prem5 from "@/assets/images/prem5.png";
import Prem6 from "@/assets/images/prem6.png";
import Prem7 from "@/assets/images/prem7.png";
import Prem8 from "@/assets/images/prem8.png";

import { AdvantageCard } from "@/shared/ui/advantage-card";
import { useTranslations } from "next-intl";

export const AdvantagesBlock = () => {
  const i18n = useTranslations("advantages");

  const advantages = [
    {
      image: Prem1,
      title: i18n("advantages.lowPrices.title"),
      description: i18n("advantages.lowPrices.description"),
      altText: i18n("advantages.lowPrices.altText"),
    },
    {
      image: Prem2,
      title: i18n("advantages.automation.title"),
      description: i18n("advantages.automation.description"),
      altText: i18n("advantages.automation.altText"),
    },
    {
      image: Prem3,
      title: i18n("advantages.exclusive.title"),
      description: i18n("advantages.exclusive.description"),
      altText: i18n("advantages.exclusive.altText"),
    },
    {
      image: Prem4,
      title: i18n("advantages.protocols.title"),
      description: i18n("advantages.protocols.description"),
      altText: i18n("advantages.protocols.altText"),
    },
    {
      image: Prem5,
      title: i18n("advantages.flexiblePurchases.title"),
      description: i18n("advantages.flexiblePurchases.description"),
      altText: i18n("advantages.flexiblePurchases.altText"),
    },
    {
      image: Prem6,
      title: i18n("advantages.periods.title"),
      description: i18n("advantages.periods.description"),
      altText: i18n("advantages.periods.altText"),
    },
    {
      image: Prem7,
      title: i18n("advantages.api.title"),
      description: i18n("advantages.api.description"),
      altText: i18n("advantages.api.altText"),
    },
    {
      image: Prem8,
      title: i18n("advantages.support.title"),
      description: i18n("advantages.support.description"),
      altText: i18n("advantages.support.altText"),
    },
  ];

  return (
    <section className="section advantages">
      <div className="container">
        <h2 className="section-header">
          <span>{i18n("header")}</span>
        </h2>
        <div className="advantages-inner">
          {advantages.map((adv, index) => (
            <AdvantageCard key={index} {...adv} />
          ))}
        </div>
        <div className="advantages-hint">
          {i18n("hint.part1")} <span>{i18n("hint.highlight")}</span>{" "}
          {i18n("hint.part2")}
        </div>
      </div>
    </section>
  );
};
