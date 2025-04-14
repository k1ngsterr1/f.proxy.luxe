"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export const PrivacyBlock = () => {
  const i18n = useTranslations("privacyPolicy");

  // Check if the screen is mobile
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div
      style={{
        padding: isMobile ? "16px" : "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#000000",
        color: "#FFFFFF",
      }}
    >
      <div style={{ marginBottom: isMobile ? "24px" : "32px" }}>
        <h1
          style={{
            fontSize: isMobile ? "24px" : "32px",
            margin: 0,
            marginTop: isMobile ? 24 : 32,
            textAlign: "center",
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          {i18n("header")}
        </h1>
      </div>
      <div
        style={{
          backgroundColor: "rgba(243, 214, 117, 0.05)",
          borderRadius: "8px",
          border: "1px solid rgba(243, 214, 117, 0.2)",
          padding: isMobile ? "16px" : "24px",
          fontSize: isMobile ? "13px" : "14px",
          lineHeight: "1.6",
        }}
      >
        {/* Section 1 */}
        <section style={{ marginBottom: isMobile ? "20px" : "24px" }}>
          <h2
            style={{
              color: "#f3d675",
              fontSize: isMobile ? "16px" : "18px",
              marginBottom: isMobile ? "12px" : "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section1.title")}
          </h2>
          {[1, 2, 3, 4, 5].map((item) => (
            <p key={item} style={{ marginBottom: isMobile ? "10px" : "12px" }}>
              {i18n(`section1.point${item}`)}
            </p>
          ))}
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: isMobile ? "20px" : "24px" }}>
          <h2
            style={{
              color: "#f3d675",
              fontSize: isMobile ? "16px" : "18px",
              marginBottom: isMobile ? "12px" : "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section2.title")}
          </h2>
          <p style={{ marginBottom: isMobile ? "10px" : "12px" }}>
            {i18n("section2.point1")}
          </p>
          <p style={{ marginBottom: isMobile ? "10px" : "12px" }}>
            {i18n("section2.point2")}
          </p>
          <ul
            style={{
              marginLeft: isMobile ? "16px" : "20px",
              marginBottom: isMobile ? "10px" : "12px",
              listStyleType: "disc",
            }}
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <li key={item} style={{ marginBottom: isMobile ? "6px" : "8px" }}>
                {i18n(`section2.list.item${item}`)}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: isMobile ? "20px" : "24px" }}>
          <h2
            style={{
              color: "#f3d675",
              fontSize: isMobile ? "16px" : "18px",
              marginBottom: isMobile ? "12px" : "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section3.title")}
          </h2>
          {[1, 2, 3].map((item) => (
            <p key={item} style={{ marginBottom: isMobile ? "10px" : "12px" }}>
              {i18n(`section3.point${item}`)}
            </p>
          ))}
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: isMobile ? "20px" : "24px" }}>
          <h2
            style={{
              color: "#f3d675",
              fontSize: isMobile ? "16px" : "18px",
              marginBottom: isMobile ? "12px" : "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section4.title")}
          </h2>
          <p style={{ marginBottom: isMobile ? "10px" : "12px" }}>
            {i18n("section4.point1")}
          </p>
          <ul
            style={{
              marginLeft: isMobile ? "16px" : "20px",
              marginBottom: isMobile ? "10px" : "12px",
              listStyleType: "disc",
            }}
          >
            {[1, 2, 3, 4].map((item) => (
              <li key={item} style={{ marginBottom: isMobile ? "6px" : "8px" }}>
                {i18n(`section4.list.item${item}`)}
              </li>
            ))}
          </ul>
          <p style={{ marginBottom: isMobile ? "10px" : "12px" }}>
            {i18n("section4.point2")}
          </p>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: isMobile ? "20px" : "24px" }}>
          <h2
            style={{
              color: "#f3d675",
              fontSize: isMobile ? "16px" : "18px",
              marginBottom: isMobile ? "12px" : "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section5.title")}
          </h2>
          {[1, 2, 3].map((item) => (
            <p key={item} style={{ marginBottom: isMobile ? "10px" : "12px" }}>
              {i18n(`section5.point${item}`)}
            </p>
          ))}
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: isMobile ? "20px" : "24px" }}>
          <h2
            style={{
              color: "#f3d675",
              fontSize: isMobile ? "16px" : "18px",
              marginBottom: isMobile ? "12px" : "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section6.title")}
          </h2>
          {[1, 2].map((item) => (
            <p key={item} style={{ marginBottom: isMobile ? "10px" : "12px" }}>
              {i18n(`section6.point${item}`)}
            </p>
          ))}
        </section>

        {/* Section 7 */}
        <section>
          <h2
            style={{
              color: "#f3d675",
              fontSize: isMobile ? "16px" : "18px",
              marginBottom: isMobile ? "12px" : "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section7.title")}
          </h2>
          <p style={{ marginBottom: isMobile ? "10px" : "12px" }}>
            {i18n("section7.point1")}
          </p>
        </section>
      </div>
    </div>
  );
};
