import { useTranslations } from "next-intl";

export default function Faq() {
  const i18n = useTranslations();
  return (
    <main className="inner-page">
      <section className="faq">
        <div className="scontainer">
          <h1 className="section-header">
            <span>{i18n("faq.faqtext1")}</span>
          </h1>
          <div className="faq-list">
            <ul>
              <li>
                <a href="#">{i18n("faq.faqtext2")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext3")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext4")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext5")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext6")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext7")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext8")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext9")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext10")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext11")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext12")}</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">{i18n("faq.faqtext13")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext14")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext15")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext16")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext17")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext18")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext19")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext20")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext21")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext22")}</a>
              </li>
              <li>
                <a href="#">{i18n("faq.faqtext23")}</a>
              </li>
            </ul>
          </div>
          <div className="faq-inner">
            <h2 className="faq-header">{i18n("faq.faqtext24")}</h2>
            <p className="faq-text">
              <b>{i18n("faq.faqtext25")}</b>
              {i18n("faq.faqtext26")}
              <br />
              <b>{i18n("faq.faqtext27")}</b>
              {i18n("faq.faqtext28")}
              <br />
              <b>{i18n("faq.faqtext29")}</b>
              {i18n("faq.faqtext30")}
              <br />
              <b>{i18n("faq.faqtext31")}</b>
              {i18n("faq.faqtext32")}
            </p>

            <h2 className="faq-header">{i18n("faq.faqtext33")}</h2>
            <p className="faq-text">
              <b>{i18n("faq.faqtext34")}</b> <br />
              {i18n("faq.faqtext35")}
            </p>

            <h2 className="faq-header">{i18n("faq.faqtext36")}</h2>
            <p className="faq-text">
              {i18n("faq.faqtext37")}
              <br />
              {i18n("faq.faqtext38")}
              <br />
              {i18n("faq.faqtext39")}
              <br />
              {i18n("faq.faqtext40")}
              <br />
              {i18n("faq.faqtext41")}
            </p>

            <h2 className="faq-header">{i18n("faq.faqtext42")}</h2>
            <p className="faq-text">
              {i18n("faq.faqtext43")}
              <span>&#34;{i18n("faq.faqtext44")}&#34;</span>
              {i18n("faq.faqtext45")}
              <span>&#34;{i18n("faq.faqtext46")}&#34;</span>
              {i18n("faq.faqtext47")}
            </p>

            <h2 className="faq-header">{i18n("faq.faqtext48")}</h2>
            <p className="faq-text">{i18n("faq.faqtext49")}</p>

            <h2 className="faq-header">
              {i18n("faq.faqtext50")}
              <br />
              {i18n("faq.faqtext51")}
            </h2>
            <p className="faq-text">{i18n("faq.faqtext52")}</p>

            <h2 className="faq-header">{i18n("faq.faqtext53")}</h2>
            <p className="faq-text">
              {i18n("faq.faqtext54")}
              <br />
              {i18n("faq.faqtext55")}
              <br />
              {i18n("faq.faqtext56")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
