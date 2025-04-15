"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Users, Award, Gift, TrendingUp, CheckCircle } from "lucide-react";

export default function Partners() {
  const i18n = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation styles for fade-in effect
  const fadeIn = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
  });

  return (
    <main
      style={{
        overflowX: "hidden",
        backgroundColor: "#000000",
        color: "#FFFFFF",
        marginTop: 256,
        minHeight: "100vh",
        paddingTop: "40px",
        paddingBottom: "60px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <title>Proxy Luxe | Партнеры</title>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            ...fadeIn(0),
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
            <span style={{ color: "#f3d675" }}>{i18n("partners.header")}</span>
            <span
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "3px",
                background:
                  "linear-gradient(90deg, rgba(243, 214, 117, 0) 0%, rgba(243, 214, 117, 1) 50%, rgba(243, 214, 117, 0) 100%)",
              }}
            ></span>
          </h1>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <Users size={32} color="#f3d675" style={{ marginRight: "10px" }} />
          </div>

          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#CCCCCC",
              maxWidth: "800px",
              margin: "0 auto 20px",
            }}
          >
            {i18n("partners.description")} <br />
            {i18n("partners.participation")}
          </p>
        </div>

        {/* Separator */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(243, 214, 117, 0) 0%, rgba(243, 214, 117, 0.5) 50%, rgba(243, 214, 117, 0) 100%)",
            margin: "30px auto",
            maxWidth: "800px",
            ...fadeIn(0.1),
          }}
        ></div>

        {/* Steps */}
        <div
          style={{
            backgroundColor: "rgba(243, 214, 117, 0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(243, 214, 117, 0.2)",
            padding: "30px",
            marginBottom: "40px",
            ...fadeIn(0.2),
          }}
        >
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#FFFFFF",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                color: "#f3d675",
                fontSize: "18px",
              }}
            >
              {i18n("partners.step1")}
            </span>{" "}
            - {i18n("partners.step1Description")}
          </p>

          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#FFFFFF",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                color: "#f3d675",
                fontSize: "18px",
              }}
            >
              {i18n("partners.step2")}
            </span>{" "}
            - {i18n("partners.step2Description")}
          </p>

          <div
            style={{
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              borderLeft: "4px solid #f3d675",
              padding: "15px 20px",
              borderRadius: "0 8px 8px 0",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#f3d675",
                fontWeight: "500",
              }}
            >
              {i18n("partners.reward")}
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div
          style={{
            marginBottom: "40px",
            ...fadeIn(0.3),
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#f3d675",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Award size={24} style={{ marginRight: "10px" }} />
            {i18n("partners.benefitsHeader")}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            {[
              i18n("partners.benefit1"),
              i18n("partners.benefit2"),
              i18n("partners.benefit3"),
              i18n("partners.benefit4"),
            ].map((benefit, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(243, 214, 117, 0.1)",
                  padding: "20px",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 10px 0 rgba(243, 214, 117, 0.1)";
                  e.currentTarget.style.borderColor =
                    "rgba(243, 214, 117, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor =
                    "rgba(243, 214, 117, 0.1)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <CheckCircle
                    size={18}
                    color="#f3d675"
                    style={{
                      marginRight: "10px",
                      marginTop: "3px",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      lineHeight: "1.5",
                      color: "#FFFFFF",
                    }}
                  >
                    {benefit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution Methods */}
        <div
          style={{
            marginBottom: "40px",
            ...fadeIn(0.4),
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#f3d675",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TrendingUp size={24} style={{ marginRight: "10px" }} />
            {i18n("partners.distributionMethodsHeader")}
          </h2>

          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {[
              {
                title: i18n("partners.distributionMethod1"),
                desc: i18n("partners.distributionMethod1Description"),
              },
              {
                title: i18n("partners.distributionMethod2"),
                desc: i18n("partners.distributionMethod2Description"),
              },
              {
                title: i18n("partners.distributionMethod3"),
                desc: i18n("partners.distributionMethod3Description"),
              },
              {
                title: i18n("partners.distributionMethod4"),
                desc: i18n("partners.distributionMethod4Description"),
              },
              {
                title: i18n("partners.distributionMethod5"),
                desc: i18n("partners.distributionMethod5Description"),
              },
            ].map((method, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "16px",
                  padding: "16px",
                  backgroundColor:
                    index % 2 === 0
                      ? "rgba(243, 214, 117, 0.03)"
                      : "transparent",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(243, 214, 117, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    index % 2 === 0
                      ? "rgba(243, 214, 117, 0.03)"
                      : "transparent";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      border: "1px solid rgba(243, 214, 117, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f3d675",
                      fontWeight: "bold",
                      fontSize: "12px",
                      marginRight: "12px",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#f3d675",
                        fontSize: "16px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {method.title}
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        lineHeight: "1.5",
                        color: "#CCCCCC",
                      }}
                    >
                      - {method.desc}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Rules */}
        <div
          style={{
            width: "100%",
            marginBottom: "40px",
            ...fadeIn(0.5),
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#f3d675",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Gift size={24} style={{ marginRight: "10px" }} />
            {i18n("partners.rulesHeader")}
          </h2>

          <div
            style={{
              backgroundColor: "rgba(255, 82, 82, 0.1)",
              border: "1px solid rgba(255, 82, 82, 0.2)",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                lineHeight: "1.6",
                color: "#FF5252",
              }}
            >
              {i18n("partners.rule")}
            </p>
          </div>
        </div>

        {/* Banners */}
        <div
          style={{
            width: "100vw",
            ...fadeIn(0.6),
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              alignItems: "center",
            }}
          >
            {[
              { width: 900, height: 100 },
              { width: 728, height: 70 },
              { width: 480, height: 50 },
            ].map((banner, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    maxWidth: `${banner.width}px`,
                    height: `${banner.height}px`,
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "4px",
                    marginBottom: "10px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(45deg, rgba(243, 214, 117, 0.05) 25%, transparent 25%, transparent 50%, rgba(243, 214, 117, 0.05) 50%, rgba(243, 214, 117, 0.05) 75%, transparent 75%, transparent)",
                      backgroundSize: "20px 20px",
                      animation: "moveStripes 3s linear infinite",
                    }}
                  ></div>

                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#f3d675",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    PROXY.LUXE BANNER
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#999999",
                  }}
                >
                  {banner.width}x{banner.height}px
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes moveStripes {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 0;
          }
        }
      `}</style>
    </main>
  );
}
