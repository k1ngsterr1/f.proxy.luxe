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
        backgroundColor: "#0f0f0f",
        color: "#f5f5f5",
        marginTop: 256,
        minHeight: "100vh",
        padding: "2rem 0 4rem",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Header with gold accent */}
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            textAlign: "center",
            margin: "2rem 0 3rem",
            position: "relative",
            color: "#ffffff",
          }}
        >
          <span
            style={{
              position: "relative",
              display: "inline-block",
              zIndex: "1",
            }}
          >
            {i18n("header")}
            <span
              style={{
                position: "absolute",
                height: "12px",
                background:
                  "linear-gradient(90deg, rgba(212,175,55,0.7) 0%, rgba(212,175,55,0.9) 50%, rgba(212,175,55,0.7) 100%)",
                width: "100%",
                bottom: "-4px",
                left: "0",
                zIndex: "-1",
                borderRadius: "6px",
              }}
            ></span>
          </span>
        </h1>

        {/* Description with improved typography */}
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto 3rem",
            color: "#d0d0d0",
          }}
        >
          {i18n("description.line1")} <br />
          {i18n("description.line2")}
        </p>

        {/* Animated banner */}
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
            Our Premium Proxy Solutions
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
                  IPv6 Proxies
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
                $0.08{" "}
                <span
                  style={{
                    fontSize: "1rem",
                    marginLeft: "0.5rem",
                    color: "#a0a0a0",
                  }}
                >
                  / IP
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
                  High anonymity
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
                  Unlimited bandwidth
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
                  99.9% uptime
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
                  ISP IPv4 Static
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
                $2.40{" "}
                <span
                  style={{
                    fontSize: "1rem",
                    marginLeft: "0.5rem",
                    color: "#a0a0a0",
                  }}
                >
                  / IP
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
                  Static IP addresses
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
                  High-speed connection
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
                  24/7 technical support
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
                  Residential IPv4 Dynamic
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
                $2.40{" "}
                <span
                  style={{
                    fontSize: "1rem",
                    marginLeft: "0.5rem",
                    color: "#a0a0a0",
                  }}
                >
                  / IP
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
                  Dynamic IP rotation
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
                  Residential IP addresses
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
                  Geo-targeting available
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
                  alignItems: "center",
                }}
              >
                <Image
                  src={Flags || "/placeholder.svg"}
                  alt="Country flags"
                  width={400}
                  height={20}
                  style={{ marginRight: "0.5rem", borderRadius: "3px" }}
                />
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  color: "#d0d0d0",
                }}
              >
                {i18n("ipRange.1-9")}
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
                    transition: "all 0.3s ease",
                  }}
                >
                  $0.08
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
                  alignItems: "center",
                }}
              >
                <Image
                  src={Flags || "/placeholder.svg"}
                  alt="Country flags"
                  width={400}
                  height={20}
                  style={{ marginRight: "0.5rem", borderRadius: "3px" }}
                />
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  color: "#d0d0d0",
                }}
              >
                {i18n("ipRange.1-9")}
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
                    transition: "all 0.3s ease",
                  }}
                >
                  $2.40
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
                  alignItems: "center",
                }}
              >
                <Image
                  src={Flags || "/placeholder.svg"}
                  alt="Country flags"
                  width={400}
                  height={20}
                  style={{ marginRight: "0.5rem", borderRadius: "3px" }}
                />
              </div>
              <div
                style={{
                  padding: "0.8rem 1.5rem",
                  color: "#d0d0d0",
                }}
              >
                {i18n("ipRange.1-9")}
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
                    transition: "all 0.3s ease",
                  }}
                >
                  $2.40
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
