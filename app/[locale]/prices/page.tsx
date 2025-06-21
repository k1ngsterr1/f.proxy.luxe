"use client";

import { useTranslations } from "next-intl";
import {
  LucideChevronRight,
  LucideTag,
  LucideServer,
  LucideGlobe,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Prices() {
  const t = useTranslations();
  const i18n = useTranslations("prices");
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Responsive styles based on screen width
  const iconSize = isMobile ? 18 : 24;
  const cardPadding = isMobile ? "1.25rem" : "2rem";
  const headingFontSize = isMobile ? "1.5rem" : "1.8rem";
  const headerTitleSize = isMobile ? "28px" : "36px";
  const cardTitleSize = isMobile ? "1.1rem" : "1.4rem";
  const priceFontSize = isMobile ? "2rem" : "2.5rem";
  const perIpFontSize = isMobile ? "0.8rem" : "1rem";
  const gridGap = isMobile ? "1rem" : "1.5rem";
  const sectionPadding = isMobile ? "0 1rem" : "0 1.5rem";
  const countryFlagsFontSize = isMobile ? "10px" : "14px";
  const cardFeaturesMargin = isMobile ? "0.5rem" : "0.8rem";
  const cardFeaturesFontSize = isMobile ? "0.9rem" : "1rem";
  const tableGridColumns = isMobile ? "1fr" : "1fr 1fr 2fr";
  const priceCellGridColumns = isMobile ? "1fr" : "repeat(4, 1fr)";
  const tableCellPadding = isMobile ? "0.6rem 1rem" : "0.8rem 1.5rem";
  const marginTop = isMobile ? 180 : 256;

  return (
    <main
      style={{
        color: "#f5f5f5",
        marginTop: marginTop,
        minHeight: "100vh",
        padding: isMobile ? "1rem 0 2rem" : "2rem 0 4rem",
      }}
    >
      <title>{t("price.title")}</title>
      <meta
        name="keywords"
        content="купить прокси, ipv6 прокси, ipv4 прокси, индивидуальные прокси, персональные прокси, анонимные прокси, прокси дешево, купить proxy, proxy ru, https прокси, socks5 прокси, быстрые прокси, стабильные прокси, резидентские прокси, ISP, резидентные"
      />
      <meta
        name="description"
        content="Купить прокси дешево, индивидуальные резидентские и анонимные. IPv4, IPv6, резидентские прокси. HTTPs, Socks5 прокси. Прокси для социальных сетей."
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "Center",
          marginBottom: isMobile ? 20 : 32,
        }}
      >
        <h1
          style={{
            fontSize: headerTitleSize,
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: isMobile ? "12px" : "16px",
            position: "relative",
            display: "inline-block",
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          {i18n("header")}
        </h1>
      </div>
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: sectionPadding,
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #111111 25%, #1a1a1a 25%, #1a1a1a 50%, #111111 50%, #111111 75%, #1a1a1a 75%, #1a1a1a 100%)",
            backgroundSize: "20px 20px",
            padding: isMobile ? "1rem" : "1.5rem",
            borderRadius: "8px",
            marginBottom: isMobile ? "2rem" : "3rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            border: "1px solid rgba(212,175,55,0.3)",
            animation: "moveStripes 20s linear infinite",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <style jsx>{`
            @keyframes moveStripes {
              0% {
                background-position: 0 0;
              }
              100% {
                background-position: 40px 40px;
              }
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .price-card {
              animation: fadeIn 0.5s ease-out forwards;
              opacity: 0;
            }
            .price-card:nth-child(1) {
              animation-delay: 0.1s;
            }
            .price-card:nth-child(2) {
              animation-delay: 0.2s;
            }
            .price-card:nth-child(3) {
              animation-delay: 0.3s;
            }
          `}</style>

          <h2
            style={{
              fontSize: headingFontSize,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: isMobile ? "1.5rem" : "2rem",
              color: "#ffffff",
            }}
          >
            {i18n("premiumSolutions")}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(300px, 1fr))",
              gap: gridGap,
            }}
          >
            {/* IPv6 Proxy Card */}
            <div
              className="price-card"
              style={{
                backgroundColor: "rgba(20, 20, 20, 0.8)",
                borderRadius: "10px",
                padding: cardPadding,
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                border: "1px solid rgba(212,175,55,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: isMobile ? "1rem" : "1.5rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(212,175,55,0.2)",
                    borderRadius: "50%",
                    width: isMobile ? "40px" : "50px",
                    height: isMobile ? "40px" : "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1rem",
                  }}
                >
                  <LucideGlobe size={iconSize} color="#d4af37" />
                </div>
                <h3
                  style={{
                    fontSize: cardTitleSize,
                    fontWeight: "600",
                    margin: "0",
                    color: "#ffffff",
                  }}
                >
                  {i18n("cards.ipv6.title")}
                </h3>
              </div>

              <div
                style={{
                  fontSize: priceFontSize,
                  fontWeight: "700",
                  color: "#d4af37",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                {i18n("cards.ipv6.price")}{" "}
                <span
                  style={{
                    fontSize: perIpFontSize,
                    marginLeft: "0.5rem",
                    color: "#a0a0a0",
                  }}
                >
                  {i18n("cards.perIp")}
                </span>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: "0",
                  margin: "0 0 1.5rem 0",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: cardFeaturesMargin,
                    color: "#d0d0d0",
                    fontSize: cardFeaturesFontSize,
                  }}
                >
                  <LucideChevronRight
                    size={isMobile ? 14 : 16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem", flexShrink: 0 }}
                  />
                  {i18n("cards.ipv6.features.anonymity")}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: cardFeaturesMargin,
                    color: "#d0d0d0",
                    fontSize: cardFeaturesFontSize,
                  }}
                >
                  <LucideChevronRight
                    size={isMobile ? 14 : 16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem", flexShrink: 0 }}
                  />
                  {i18n("cards.ipv6.features.bandwidth")}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: cardFeaturesMargin,
                    color: "#d0d0d0",
                    fontSize: cardFeaturesFontSize,
                  }}
                >
                  <LucideChevronRight
                    size={isMobile ? 14 : 16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem", flexShrink: 0 }}
                  />
                  {i18n("cards.ipv6.features.uptime")}
                </li>
              </ul>
            </div>

            {/* ISP IPv4 Static Proxy Card */}
            <div
              className="price-card"
              style={{
                backgroundColor: "rgba(20, 20, 20, 0.8)",
                borderRadius: "10px",
                padding: cardPadding,
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                border: "1px solid rgba(212,175,55,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: isMobile ? "1rem" : "1.5rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(212,175,55,0.2)",
                    borderRadius: "50%",
                    width: isMobile ? "40px" : "50px",
                    height: isMobile ? "40px" : "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1rem",
                  }}
                >
                  <LucideServer size={iconSize} color="#d4af37" />
                </div>
                <h3
                  style={{
                    fontSize: cardTitleSize,
                    fontWeight: "600",
                    margin: "0",
                    color: "#ffffff",
                  }}
                >
                  {i18n("cards.ipv4.title")}
                </h3>
              </div>

              <div
                style={{
                  fontSize: priceFontSize,
                  fontWeight: "700",
                  color: "#d4af37",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                {i18n("cards.ipv4.price")}{" "}
                <span
                  style={{
                    fontSize: perIpFontSize,
                    marginLeft: "0.5rem",
                    color: "#a0a0a0",
                  }}
                >
                  {i18n("cards.perIp")}
                </span>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: "0",
                  margin: "0 0 1.5rem 0",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: cardFeaturesMargin,
                    color: "#d0d0d0",
                    fontSize: cardFeaturesFontSize,
                  }}
                >
                  <LucideChevronRight
                    size={isMobile ? 14 : 16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem", flexShrink: 0 }}
                  />
                  {i18n("cards.ipv4.features.static")}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: cardFeaturesMargin,
                    color: "#d0d0d0",
                    fontSize: cardFeaturesFontSize,
                  }}
                >
                  <LucideChevronRight
                    size={isMobile ? 14 : 16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem", flexShrink: 0 }}
                  />
                  {i18n("cards.ipv4.features.speed")}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: cardFeaturesMargin,
                    color: "#d0d0d0",
                    fontSize: cardFeaturesFontSize,
                  }}
                >
                  <LucideChevronRight
                    size={isMobile ? 14 : 16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem", flexShrink: 0 }}
                  />
                  {i18n("cards.ipv4.features.support")}
                </li>
              </ul>
            </div>

            {/* Residential IPv4 Dynamic Proxy Card */}
            <div
              className="price-card"
              style={{
                backgroundColor: "rgba(20, 20, 20, 0.8)",
                borderRadius: "10px",
                padding: cardPadding,
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                border: "1px solid rgba(212,175,55,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: isMobile ? "1rem" : "1.5rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(212,175,55,0.2)",
                    borderRadius: "50%",
                    width: isMobile ? "40px" : "50px",
                    height: isMobile ? "40px" : "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1rem",
                    flexShrink: 0,
                  }}
                >
                  <LucideTag size={iconSize} color="#d4af37" />
                </div>
                <h3
                  style={{
                    fontSize: cardTitleSize,
                    fontWeight: "600",
                    margin: "0",
                    color: "#ffffff",
                  }}
                >
                  {i18n("cards.ipv4shared.title")}
                </h3>
              </div>

              <div
                style={{
                  fontSize: priceFontSize,
                  fontWeight: "700",
                  color: "#d4af37",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                {i18n("cards.ipv4.price")}{" "}
                <span
                  style={{
                    fontSize: perIpFontSize,
                    marginLeft: "0.5rem",
                    color: "#a0a0a0",
                  }}
                >
                  {i18n("cards.perIp")}
                </span>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: "0",
                  margin: "0 0 1.5rem 0",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: cardFeaturesMargin,
                    color: "#d0d0d0",
                    fontSize: cardFeaturesFontSize,
                  }}
                >
                  <LucideChevronRight
                    size={isMobile ? 14 : 16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem", flexShrink: 0 }}
                  />
                  {i18n("cards.ipv4shared.features.rotation")}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: cardFeaturesMargin,
                    color: "#d0d0d0",
                    fontSize: cardFeaturesFontSize,
                  }}
                >
                  <LucideChevronRight
                    size={isMobile ? 14 : 16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem", flexShrink: 0 }}
                  />
                  {i18n("cards.ipv4shared.features.residential")}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: cardFeaturesMargin,
                    color: "#d0d0d0",
                    fontSize: cardFeaturesFontSize,
                  }}
                >
                  <LucideChevronRight
                    size={isMobile ? 14 : 16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem", flexShrink: 0 }}
                  />
                  {i18n("cards.ipv4shared.features.geo")}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed pricing table */}
        <div
          style={{
            marginTop: isMobile ? "2rem" : "4rem",
            marginBottom: isMobile ? "1.5rem" : "2rem",
          }}
        >
          <h2
            style={{
              fontSize: headingFontSize,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: isMobile ? "1.5rem" : "2rem",
              position: "relative",
              display: "inline-block",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <span
              style={{
                color: "#d4af37",
                fontWeight: "300",
                marginRight: "0.5rem",
              }}
            >
              {i18n("ipv6.headerPrefix")}
            </span>
            {i18n("ipv6.header")}
            <span
              style={{
                position: "absolute",
                height: "2px",
                background:
                  "linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,1) 50%, rgba(212,175,55,0) 100%)",
                width: "120%",
                bottom: "-10px",
                left: "-10%",
              }}
            ></span>
          </h2>

          <div
            style={{
              backgroundColor: "rgba(20, 20, 20, 0.8)",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              border: "1px solid rgba(212,175,55,0.2)",
              marginBottom: isMobile ? "2rem" : "3rem",
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: isMobile ? "none" : "grid",
                gridTemplateColumns: tableGridColumns,
                backgroundColor: "#1a1a1a",
                borderBottom: "1px solid rgba(212,175,55,0.2)",
                padding: "1rem 0",
              }}
            >
              <div
                style={{
                  padding: tableCellPadding,
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.country")}
              </div>
              <div
                style={{
                  padding: tableCellPadding,
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.ipCount")}
              </div>
              <div
                style={{
                  padding: tableCellPadding,
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.singleIpCost")}
              </div>
            </div>

            {/* Mobile Table Header */}
            {isMobile && (
              <div
                style={{
                  backgroundColor: "#1a1a1a",
                  borderBottom: "1px solid rgba(212,175,55,0.2)",
                  padding: "0.8rem 1rem",
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("ipv6.header")}
              </div>
            )}

            {/* Table Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: tableGridColumns,
                backgroundColor: "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  padding: tableCellPadding,
                  display: "flex",
                  fontSize: countryFlagsFontSize,
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: isMobile ? "2px" : "4px",
                }}
              >
                {isMobile ? (
                  <div
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    {i18n("tableHeaders.country")}:
                  </div>
                ) : null}
                🇷🇺 🇵🇭 🇺🇸 🇺🇦 🇰🇿 🇮🇹 🇨🇦 🇩🇰 🇷🇴 🇧🇪 🇬🇧 🇨🇭 🇧🇷 🇸🇨 🇧🇾 🇭🇺 🇬🇷{" "}
                {isMobile ? <br /> : null} 🇪🇬 🇧🇬 🇲🇦 🇸🇪 🇱🇹 🇩🇪 🇨🇿 🇮🇱 🇿🇦 🇬🇪 🇰🇬 🇳🇬{" "}
                {isMobile ? <br /> : null} 🇸🇦 🇩🇰 🇦🇲 🇪🇸 🇲🇩 🇻🇳 🇫🇮 🇨🇳 🇰🇷 🇯🇵 🇹🇷 🇸🇬{" "}
                {isMobile ? <br /> : null} 🇭🇰 🇸🇦 🇹🇼 🇨🇾
              </div>
              <div
                style={{
                  padding: tableCellPadding,
                  color: "#d0d0d0",
                }}
              >
                {isMobile ? (
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: "12px",
                      marginBottom: "5px",
                    }}
                  >
                    {i18n("tableHeaders.ipCount")}:
                  </div>
                ) : null}
                ∞
              </div>
              <div
                style={{
                  padding: tableCellPadding,
                  display: "grid",
                  gridTemplateColumns: priceCellGridColumns,
                  gap: "0.5rem",
                }}
              >
                {isMobile ? (
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: "12px",
                      marginBottom: "5px",
                      gridColumn: "1 / -1",
                    }}
                  >
                    {i18n("tableHeaders.singleIpCost")}:
                  </div>
                ) : null}
                <div
                  style={{
                    padding: isMobile ? "0.4rem" : "0.5rem",
                    backgroundColor: "rgba(212,175,55,0.1)",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  {i18n("priceValues.ipv6.1month")}
                </div>
              </div>
            </div>
          </div>

          <h2
            style={{
              fontSize: headingFontSize,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: isMobile ? "1.5rem" : "2rem",
              position: "relative",
              display: "inline-block",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <span
              style={{
                color: "#d4af37",
                fontWeight: "300",
                marginRight: "0.5rem",
              }}
            >
              {i18n("ipv4.headerPrefix")}
            </span>
            {i18n("ipv4.header")}
            <span
              style={{
                position: "absolute",
                height: "2px",
                background:
                  "linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,1) 50%, rgba(212,175,55,0) 100%)",
                width: "120%",
                bottom: "-10px",
                left: "-10%",
              }}
            ></span>
          </h2>

          <div
            style={{
              backgroundColor: "rgba(20, 20, 20, 0.8)",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              border: "1px solid rgba(212,175,55,0.2)",
              marginBottom: isMobile ? "2rem" : "3rem",
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: isMobile ? "none" : "grid",
                gridTemplateColumns: tableGridColumns,
                backgroundColor: "#1a1a1a",
                borderBottom: "1px solid rgba(212,175,55,0.2)",
                padding: "1rem 0",
              }}
            >
              <div
                style={{
                  padding: tableCellPadding,
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.country")}
              </div>
              <div
                style={{
                  padding: tableCellPadding,
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.ipCount")}
              </div>
              <div
                style={{
                  padding: tableCellPadding,
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.singleIpCost")}
              </div>
            </div>

            {/* Mobile Table Header */}
            {isMobile && (
              <div
                style={{
                  backgroundColor: "#1a1a1a",
                  borderBottom: "1px solid rgba(212,175,55,0.2)",
                  padding: "0.8rem 1rem",
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("ipv4.header")}
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: tableGridColumns,
                backgroundColor: "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  padding: tableCellPadding,
                  display: "flex",
                  fontSize: countryFlagsFontSize,
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: isMobile ? "2px" : "4px",
                }}
              >
                {isMobile ? (
                  <div
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    {i18n("tableHeaders.country")}:
                  </div>
                ) : null}
                🇷🇺 🇵🇭 🇺🇸 🇺🇦 🇰🇿 🇮🇹 🇨🇦 🇩🇰 🇷🇴 🇧🇪 🇬🇧 🇨🇭 🇧🇷 🇸🇨 🇧🇾 🇭🇺 🇬🇷{" "}
                {isMobile ? <br /> : null} 🇪🇬 🇧🇬 🇲🇦 🇸🇪 🇱🇹 🇩🇪 🇨🇿 🇮🇱 🇿🇦 🇬🇪 🇰🇬 🇳🇬{" "}
                {isMobile ? <br /> : null} 🇸🇦 🇩🇰 🇦🇲 🇪🇸 🇲🇩 🇻🇳 🇫🇮 🇨🇳 🇰🇷 🇯🇵 🇹🇷 🇸🇬{" "}
                {isMobile ? <br /> : null} 🇭🇰 🇸🇦 🇹🇼 🇨🇾
              </div>
              <div
                style={{
                  padding: tableCellPadding,
                  color: "#d0d0d0",
                }}
              >
                {isMobile ? (
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: "12px",
                      marginBottom: "5px",
                    }}
                  >
                    {i18n("tableHeaders.ipCount")}:
                  </div>
                ) : null}
                ∞
              </div>
              <div
                style={{
                  padding: tableCellPadding,
                  display: "grid",
                  gridTemplateColumns: priceCellGridColumns,
                  gap: "0.5rem",
                }}
              >
                {isMobile ? (
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: "12px",
                      marginBottom: "5px",
                      gridColumn: "1 / -1",
                    }}
                  >
                    {i18n("tableHeaders.singleIpCost")}:
                  </div>
                ) : null}
                <div
                  style={{
                    padding: isMobile ? "0.4rem" : "0.5rem",
                    backgroundColor: "rgba(212,175,55,0.1)",
                    borderRadius: "5px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  {i18n("priceValues.ipv4shared.1month")}{" "}
                </div>
              </div>
            </div>
          </div>

          <h2
            style={{
              fontSize: headingFontSize,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: isMobile ? "1.5rem" : "2rem",
              position: "relative",
              display: "inline-block",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <span
              style={{
                color: "#d4af37",
                fontWeight: "300",
                marginRight: "0.5rem",
              }}
            >
              {i18n("ipv4shared.headerPrefix")}
            </span>
            {i18n("ipv4shared.header")}
            <span
              style={{
                position: "absolute",
                height: "2px",
                background:
                  "linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,1) 50%, rgba(212,175,55,0) 100%)",
                width: "120%",
                bottom: "-10px",
                left: "-10%",
              }}
            ></span>
          </h2>

          <div
            style={{
              backgroundColor: "rgba(20, 20, 20, 0.8)",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              border: "1px solid rgba(212,175,55,0.2)",
              marginBottom: isMobile ? "2rem" : "3rem",
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: isMobile ? "none" : "grid",
                gridTemplateColumns: tableGridColumns,
                backgroundColor: "#1a1a1a",
                borderBottom: "1px solid rgba(212,175,55,0.2)",
                padding: "1rem 0",
              }}
            >
              <div
                style={{
                  padding: tableCellPadding,
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.country")}
              </div>
              <div
                style={{
                  padding: tableCellPadding,
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.ipCount")}
              </div>
              <div
                style={{
                  padding: tableCellPadding,
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.singleIpCost")}
              </div>
            </div>

            {/* Mobile Table Header */}
            {isMobile && (
              <div
                style={{
                  backgroundColor: "#1a1a1a",
                  borderBottom: "1px solid rgba(212,175,55,0.2)",
                  padding: "0.8rem 1rem",
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("ipv4shared.header")}
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: tableGridColumns,
                backgroundColor: "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  padding: tableCellPadding,
                  display: "flex",
                  fontSize: countryFlagsFontSize,
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: isMobile ? "2px" : "4px",
                }}
              >
                {isMobile ? (
                  <div
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    {i18n("tableHeaders.country")}:
                  </div>
                ) : null}
                🇷🇺 🇵🇭 🇺🇸 🇺🇦 🇰🇿 🇮🇹 🇨🇦 🇩🇰 🇷🇴 🇧🇪 🇬🇧 🇨🇭 🇧🇷 🇸🇨 🇧🇾 🇭🇺 🇬🇷{" "}
                {isMobile ? <br /> : null} 🇪🇬 🇧🇬 🇲🇦 🇸🇪 🇱🇹 🇩🇪 🇨🇿 🇮🇱 🇿🇦 🇬🇪 🇰🇬 🇳🇬{" "}
                {isMobile ? <br /> : null} 🇸🇦 🇩🇰 🇦🇲 🇪🇸 🇲🇩 🇻🇳 🇫🇮 🇨🇳 🇰🇷 🇯🇵 🇹🇷 🇸🇬{" "}
                {isMobile ? <br /> : null} 🇭🇰 🇸🇦 🇹🇼 🇨🇾
              </div>
              <div
                style={{
                  padding: tableCellPadding,
                  color: "#d0d0d0",
                }}
              >
                {isMobile ? (
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: "12px",
                      marginBottom: "5px",
                    }}
                  >
                    {i18n("tableHeaders.ipCount")}:
                  </div>
                ) : null}
                ∞
              </div>
              <div
                style={{
                  padding: tableCellPadding,
                  display: "grid",
                  gridTemplateColumns: priceCellGridColumns,
                  gap: "0.5rem",
                }}
              >
                {isMobile ? (
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: "12px",
                      marginBottom: "5px",
                      gridColumn: "1 / -1",
                    }}
                  >
                    {i18n("tableHeaders.singleIpCost")}:
                  </div>
                ) : null}
                <div
                  style={{
                    padding: isMobile ? "0.4rem" : "0.5rem",
                    backgroundColor: "rgba(212,175,55,0.1)",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  {i18n("priceValues.ipv4shared.1month")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
