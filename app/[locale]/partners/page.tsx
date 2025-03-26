import { useTranslations } from "next-intl";

export default function Partners() {
  const i18n = useTranslations();

  return (
    <main className="inner-page">
      <section className="ipartn">
        <div className="scontainer">
          <h1 className="section-header">
            <span>{i18n("partners.header")}</span>
          </h1>
          <p className="ipartn-text">
            {i18n("partners.description")} <br />
            {i18n("partners.participation")}
          </p>
          <div className="separator"></div>
          <p className="ipartn-text">
            <b>{i18n("partners.step1")}</b> -{" "}
            {i18n("partners.step1Description")}
          </p>
          <br />
          <p className="ipartn-text">
            <b>{i18n("partners.step2")}</b> -{" "}
            {i18n("partners.step2Description")}
          </p>
          <br />
          <p className="ipartn-text">{i18n("partners.reward")}</p>
          <h2 className="ipartn-subheader">
            {i18n("partners.benefitsHeader")}
          </h2>
          <div className="info-list">
            <div>
              <span>•</span> {i18n("partners.benefit1")}
            </div>
            <div>
              <span>•</span> {i18n("partners.benefit2")}
            </div>
            <div>
              <span>•</span> {i18n("partners.benefit3")}
            </div>
            <div>
              <span>•</span> {i18n("partners.benefit4")}
            </div>
          </div>
          <h2 className="ipartn-subheader">
            {i18n("partners.distributionMethodsHeader")}
          </h2>
          <ul className="ipartn-list">
            <li>
              <span>{i18n("partners.distributionMethod1")}</span> -{" "}
              {i18n("partners.distributionMethod1Description")}
            </li>
            <li>
              <span>{i18n("partners.distributionMethod2")}</span> -{" "}
              {i18n("partners.distributionMethod2Description")}
            </li>
            <li>
              <span>{i18n("partners.distributionMethod3")}</span> -{" "}
              {i18n("partners.distributionMethod3Description")}
            </li>
            <li>
              <span>{i18n("partners.distributionMethod4")}</span> -{" "}
              {i18n("partners.distributionMethod4Description")}
            </li>
            <li>
              <span>{i18n("partners.distributionMethod5")}</span> -{" "}
              {i18n("partners.distributionMethod5Description")}
            </li>
          </ul>
          <h2 className="ipartn-subheader">{i18n("partners.rulesHeader")}</h2>
          <p className="ipartn-text">{i18n("partners.rule")}</p>
          <h2 className="ipartn-subheader">{i18n("partners.bannersHeader")}</h2>
          <div className="pbanner">
            <div
              className="pbanner-inner"
              style={{
                width: 900,
                height: 100,
              }}
            ></div>
            <div className="pbanner-text">900x100px</div>
          </div>
          <div className="pbanner">
            <div
              className="pbanner-inner"
              style={{
                width: 728,
                height: 70,
              }}
            ></div>
            <div className="pbanner-text">728x70px</div>
          </div>
          <div className="pbanner">
            <div
              className="pbanner-inner"
              style={{
                width: 480,
                height: 50,
              }}
            ></div>
            <div className="pbanner-text">480x50px</div>
          </div>
        </div>
      </section>
    </main>
  );
}
