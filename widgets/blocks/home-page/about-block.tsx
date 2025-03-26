import React from "react";
import { useTranslations } from "next-intl";

export const AboutBlock = () => {
  const i18n = useTranslations("about");

  return (
    <div className="about">
      <div className="container">
        <div className="about-item">
          <p className="about-text about-text--gold">{i18n("intro")}</p>
        </div>

        <div className="about-item">
          <p className="about-text">{i18n("advantages.quality")}</p>
          <p className="about-text">
            {i18n("advantages.anonymity")}
            <br />
            {i18n("advantages.variety")}
            <br />
            {i18n("advantages.types")}
          </p>
          <p className="about-text">{i18n("advantages.prices")}</p>
        </div>

        <div className="about-item">
          <p className="about-text about-text--gold">{i18n("automation")}</p>
          <p className="about-text">{i18n("support")}</p>
          <p className="about-text">{i18n("contacts")}</p>
        </div>

        <div className="about-item">
          <p className="about-text">{i18n("suitability.general")}</p>
          <p className="about-text">{i18n("suitability.ipv6")}</p>
          <p className="about-text">{i18n("suitability.isp")}</p>
        </div>

        <div className="about-item">
          <p className="about-text about-text--gold">
            {i18n("conclusion.intro")}
          </p>
          <p className="about-text">{i18n("conclusion.answer")}</p>
        </div>
      </div>
    </div>
  );
};
