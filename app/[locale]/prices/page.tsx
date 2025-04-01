"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Flags from "@/assets/images/flags.png";
import {
  LucideChevronRight,
  LucideTag,
  LucideServer,
  LucideGlobe,
} from "lucide-react";

export default function Prices() {
  const i18n = useTranslations("prices");

  return (
    <main
      style={{
        color: "#f5f5f5",
        marginTop: 256,
        minHeight: "100vh",
        padding: "2rem 0 4rem",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "Center",
          marginBottom: 32,
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: "16px",
            position: "relative",
            display: "inline-block",
            padding: "0 20px",
          }}
        >
          {i18n("header")}
        </h1>
      </div>
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #111111 25%, #1a1a1a 25%, #1a1a1a 50%, #111111 50%, #111111 75%, #1a1a1a 75%, #1a1a1a 100%)",
            backgroundSize: "20px 20px",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "3rem",
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
              fontSize: "1.8rem",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "2rem",
              color: "#ffffff",
            }}
          >
            {i18n("premiumSolutions")}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* IPv6 Proxy Card */}
            <div
              className="price-card"
              style={{
                backgroundColor: "rgba(20, 20, 20, 0.8)",
                borderRadius: "10px",
                padding: "2rem",
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
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(212,175,55,0.2)",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1rem",
                  }}
                >
                  <LucideGlobe size={24} color="#d4af37" />
                </div>
                <h3
                  style={{
                    fontSize: "1.4rem",
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
                  fontSize: "2.5rem",
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
                    fontSize: "1rem",
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
                    marginBottom: "0.8rem",
                    color: "#d0d0d0",
                  }}
                >
                  <LucideChevronRight
                    size={16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem" }}
                  />
                  {i18n("cards.ipv6.features.anonymity")}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.8rem",
                    color: "#d0d0d0",
                  }}
                >
                  <LucideChevronRight
                    size={16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem" }}
                  />
                  {i18n("cards.ipv6.features.bandwidth")}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.8rem",
                    color: "#d0d0d0",
                  }}
                >
                  <LucideChevronRight
                    size={16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem" }}
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
                padding: "2rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                border: "1px solid rgba(212,175,55,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(212,175,55,0.2)",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1rem",
                  }}
                >
                  <LucideServer size={24} color="#d4af37" />
                </div>
                <h3
                  style={{
                    fontSize: "1.4rem",
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
                  fontSize: "2.5rem",
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
                    fontSize: "1rem",
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
                    marginBottom: "0.8rem",
                    color: "#d0d0d0",
                  }}
                >
                  <LucideChevronRight
                    size={16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem" }}
                  />
                  {i18n("cards.ipv4.features.static")}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.8rem",
                    color: "#d0d0d0",
                  }}
                >
                  <LucideChevronRight
                    size={16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem" }}
                  />
                  {i18n("cards.ipv4.features.speed")}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.8rem",
                    color: "#d0d0d0",
                  }}
                >
                  <LucideChevronRight
                    size={16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem" }}
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
                padding: "2rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                border: "1px solid rgba(212,175,55,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(212,175,55,0.2)",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1rem",
                  }}
                >
                  <LucideTag size={24} color="#d4af37" />
                </div>
                <h3
                  style={{
                    fontSize: "1.4rem",
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
                  fontSize: "2.5rem",
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
                    fontSize: "1rem",
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
                    marginBottom: "0.8rem",
                    color: "#d0d0d0",
                  }}
                >
                  <LucideChevronRight
                    size={16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem" }}
                  />
                  {i18n("cards.ipv4shared.features.rotation")}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.8rem",
                    color: "#d0d0d0",
                  }}
                >
                  <LucideChevronRight
                    size={16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem" }}
                  />
                  {i18n("cards.ipv4shared.features.residential")}
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.8rem",
                    color: "#d0d0d0",
                  }}
                >
                  <LucideChevronRight
                    size={16}
                    color="#d4af37"
                    style={{ marginRight: "0.5rem" }}
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
            marginTop: "4rem",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "2rem",
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
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr",
                backgroundColor: "#1a1a1a",
                borderBottom: "1px solid rgba(212,175,55,0.2)",
                padding: "1rem 0",
              }}
            >
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.country")}
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.ipCount")}
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.singleIpCost")}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr",
                backgroundColor: "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                }}
              >
                🇷🇺 🇵🇭 🇺🇸 🇺🇦 🇰🇿 🇮🇹 🇨🇦 🇩🇰 🇷🇴 🇧🇪 🇬🇧 🇨🇭 🇧🇷 🇸🇨 🇧🇾 🇭🇺 🇬🇷 🇪🇬 🇧🇬 🇲🇦 🇸🇪
                🇱🇹 🇩🇪 🇨🇿 🇮🇱 🇿🇦 🇬🇪 🇰🇬 🇳🇬 🇸🇦 🇩🇰 🇦🇲 🇪🇸 🇲🇩 🇻🇳 🇫🇮 🇨🇳 🇰🇷 🇯🇵 🇹🇷 🇸🇬 🇭🇰
                🇸🇦 🇹🇼 🇨🇾
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  color: "#d0d0d0",
                }}
              >
                ∞
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "rgba(212,175,55,0.1)",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  {i18n("priceValues.ipv6.1month")}
                </div>
              </div>
            </div>
          </div>

          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "2rem",
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
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr",
                backgroundColor: "#1a1a1a",
                borderBottom: "1px solid rgba(212,175,55,0.2)",
                padding: "1rem 0",
              }}
            >
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.country")}
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.ipCount")}
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.singleIpCost")}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr",
                backgroundColor: "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                }}
              >
                🇷🇺 🇵🇭 🇺🇸 🇺🇦 🇰🇿 🇮🇹 🇨🇦 🇩🇰 🇷🇴 🇧🇪 🇬🇧 🇨🇭 🇧🇷 🇸🇨 🇧🇾 🇭🇺 🇬🇷 🇪🇬 🇧🇬 🇲🇦 🇸🇪
                🇱🇹 🇩🇪 🇨🇿 🇮🇱 🇿🇦 🇬🇪 🇰🇬 🇳🇬 🇸🇦 🇩🇰 🇦🇲 🇪🇸 🇲🇩 🇻🇳 🇫🇮 🇨🇳 🇰🇷 🇯🇵 🇹🇷 🇸🇬 🇭🇰
                🇸🇦 🇹🇼 🇨🇾
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  color: "#d0d0d0",
                }}
              >
                ∞
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "rgba(212,175,55,0.1)",
                    borderRadius: "5px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  {i18n("priceValues.ipv4shared.1month")}{" "}
                </div>
              </div>
            </div>
          </div>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "2rem",
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
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr",
                backgroundColor: "#1a1a1a",
                borderBottom: "1px solid rgba(212,175,55,0.2)",
                padding: "1rem 0",
              }}
            >
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.country")}
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.ipCount")}
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  fontWeight: "600",
                  color: "#d4af37",
                }}
              >
                {i18n("tableHeaders.singleIpCost")}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr",
                backgroundColor: "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                }}
              >
                🇷🇺 🇵🇭 🇺🇸 🇺🇦 🇰🇿 🇮🇹 🇨🇦 🇩🇰 🇷🇴 🇧🇪 🇬🇧 🇨🇭 🇧🇷 🇸🇨 🇧🇾 🇭🇺 🇬🇷 🇪🇬 🇧🇬 🇲🇦 🇸🇪
                🇱🇹 🇩🇪 🇨🇿 🇮🇱 🇿🇦 🇬🇪 🇰🇬 🇳🇬 🇸🇦 🇩🇰 🇦🇲 🇪🇸 🇲🇩 🇻🇳 🇫🇮 🇨🇳 🇰🇷 🇯🇵 🇹🇷 🇸🇬 🇭🇰
                🇸🇦 🇹🇼 🇨🇾
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  color: "#d0d0d0",
                }}
              >
                ∞
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "rgba(212,175,55,0.1)",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "all 0.3s ease",
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
