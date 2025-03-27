import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";

export const PartnersBlock = () => {
  const i18n = useTranslations("partnersBlock");
  const navigate = useRouter();

  return (
    <section className="partners section">
      <div className="scontainer">
        <h2 className="section-header">{i18n("header")}</h2>
        <div className="partners-inner">
          <div className="partners-text">
            <p>
              {i18n("intro.line1")}
              <br />
              {i18n("intro.line2")}
              <br />
              {i18n("intro.line3")}
            </p>
            <div className="separator"></div>
            <h3 className="partners-header">
              {i18n("steps.referral.line1")} <br />
              {i18n("steps.referral.line2")}
            </h3>
            <p>
              {i18n("steps.referral.details.line1")} <br />
              {i18n("steps.referral.details.line2")} <br />
              {i18n("steps.referral.details.line3")}
            </p>
            <h3 className="partners-header">{i18n("steps.coupon.title")}</h3>
            <p>
              {i18n("steps.coupon.details.line1")} <br />
              {i18n("steps.coupon.details.line2")} <br />
              {i18n("steps.coupon.details.line3")}
            </p>
          </div>
          <div className="partners-discount">
            <div className="partners-num">
              {i18n("percentage.value")}
              <div className="partners-num__percent">%</div>
            </div>
          </div>
        </div>

        <p className="partners-hint">
          {i18n("payout.line1")} <br />
          {i18n("payout.line2")}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            name={i18n("detailsButton")}
            onClick={() => navigate.push("/faq")}
          />
        </div>
      </div>
    </section>
  );
};
