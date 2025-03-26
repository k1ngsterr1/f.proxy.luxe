import Flags from "@/assets/images/flags.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Prices() {
  const i18n = useTranslations("prices");

  return (
    <main className="inner-page">
      <section className="price">
        <div className="scontainer">
          <h1 className="section-header">
            <span>{i18n("header")}</span>
          </h1>
          <p className="price-text">
            {i18n("description.line1")} <br />
            {i18n("description.line2")}
          </p>
          <h2 className="price-header">
            <span>{i18n("ipv6.headerPrefix")}</span> {i18n("ipv6.header")}
          </h2>
          <div className="table-wrap">
            <div className="price-table">
              <div className="price-table__row price-table__row--header">
                <div className="tcountry">{i18n("tableHeaders.country")}</div>
                <div className="tcount">{i18n("tableHeaders.ipCount")}</div>
                <div className="tprice">
                  {i18n("tableHeaders.singleIpCost")}
                </div>
              </div>
              <div className="price-table__row price-table__row--subheader">
                <div className="tcountry"></div>
                <div className="tcount"></div>
                <div className="tprice tprice-header">
                  <div className="tprice-item">{i18n("duration.3days")}</div>
                  <div className="tprice-item">{i18n("duration.1week")}</div>
                  <div className="tprice-item">{i18n("duration.2weeks")}</div>
                  <div className="tprice-item">{i18n("duration.1month")}</div>
                </div>
              </div>
              <div className="price-table__row">
                <div className="tcountry">
                  <Image src={Flags} alt="" />
                </div>
                <div className="tcount">{i18n("ipRange.1-9")}</div>
                <div className="tprice">
                  <div className="tprice-item">
                    {i18n("priceValues.ipv6.3days")}
                  </div>
                  <div className="tprice-item">
                    {i18n("priceValues.ipv6.1week")}
                  </div>
                  <div className="tprice-item">
                    {i18n("priceValues.ipv6.2weeks")}
                  </div>
                  <div className="tprice-item">
                    {i18n("priceValues.ipv6.1month")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="price-header">
            <span>{i18n("ipv4.headerPrefix")}</span> {i18n("ipv4.header")}
          </h2>

          <div className="table-wrap">
            <div className="price-table">
              <div className="price-table__row price-table__row--header">
                <div className="tcountry">{i18n("tableHeaders.country")}</div>
                <div className="tcount">{i18n("tableHeaders.ipCount")}</div>
                <div className="tprice">
                  {i18n("tableHeaders.singleIpCost")}
                </div>
              </div>
              <div className="price-table__row price-table__row--subheader">
                <div className="tcountry"></div>
                <div className="tcount"></div>
                <div className="tprice tprice-header">
                  <div className="tprice-item">{i18n("duration.3days")}</div>
                  <div className="tprice-item">{i18n("duration.1week")}</div>
                  <div className="tprice-item">{i18n("duration.2weeks")}</div>
                  <div className="tprice-item">{i18n("duration.1month")}</div>
                </div>
              </div>
              <div className="price-table__row">
                <div className="tcountry">
                  <Image src={Flags} alt="" />
                </div>
                <div className="tcount">{i18n("ipRange.1-9")}</div>
                <div className="tprice">
                  <div className="tprice-item">
                    {i18n("priceValues.ipv4.3days")}
                  </div>
                  <div className="tprice-item">
                    {i18n("priceValues.ipv4.1week")}
                  </div>
                  <div className="tprice-item">
                    {i18n("priceValues.ipv4.2weeks")}
                  </div>
                  <div className="tprice-item">
                    {i18n("priceValues.ipv4.1month")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="price-header">
            <span>{i18n("ipv4shared.headerPrefix")}</span>{" "}
            {i18n("ipv4shared.header")}
          </h2>

          <div className="table-wrap">
            <div className="price-table">
              <div className="price-table__row price-table__row--header">
                <div className="tcountry">{i18n("tableHeaders.country")}</div>
                <div className="tcount">{i18n("tableHeaders.ipCount")}</div>
                <div className="tprice">
                  {i18n("tableHeaders.singleIpCost")}
                </div>
              </div>
              <div className="price-table__row price-table__row--subheader">
                <div className="tcountry"></div>
                <div className="tcount"></div>
                <div className="tprice tprice-header">
                  <div className="tprice-item">{i18n("duration.3days")}</div>
                  <div className="tprice-item">{i18n("duration.1week")}</div>
                  <div className="tprice-item">{i18n("duration.2weeks")}</div>
                  <div className="tprice-item">{i18n("duration.1month")}</div>
                </div>
              </div>
              <div className="price-table__row">
                <div className="tcountry">
                  <Image src={Flags} alt="" />
                </div>
                <div className="tcount">{i18n("ipRange.1-9")}</div>
                <div className="tprice">
                  <div className="tprice-item">
                    {i18n("priceValues.ipv4shared.3days")}
                  </div>
                  <div className="tprice-item">
                    {i18n("priceValues.ipv4shared.1week")}
                  </div>
                  <div className="tprice-item">
                    {i18n("priceValues.ipv4shared.2weeks")}
                  </div>
                  <div className="tprice-item">
                    {i18n("priceValues.ipv4shared.1month")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
