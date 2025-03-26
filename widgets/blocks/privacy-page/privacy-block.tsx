import React from "react";
import { useTranslations } from "next-intl";

export const PrivacyBlock = () => {
  const i18n = useTranslations("privacyPolicy");

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#000000",
        color: "#FFFFFF",
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "32px",
            margin: 0,
            marginTop: 32,
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
          padding: "24px",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      >
        {/* Section 1 */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              color: "#f3d675",
              fontSize: "18px",
              marginBottom: "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section1.title")}
          </h2>
          {[1, 2, 3, 4, 5].map((item) => (
            <p key={item} style={{ marginBottom: "12px" }}>
              {i18n(`section1.point${item}`)}
            </p>
          ))}
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              color: "#f3d675",
              fontSize: "18px",
              marginBottom: "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section2.title")}
          </h2>
          <p style={{ marginBottom: "12px" }}>{i18n("section2.point1")}</p>
          <p style={{ marginBottom: "12px" }}>{i18n("section2.point2")}</p>
          <ul
            style={{
              marginLeft: "20px",
              marginBottom: "12px",
              listStyleType: "disc",
            }}
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <li key={item} style={{ marginBottom: "8px" }}>
                {i18n(`section2.list.item${item}`)}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              color: "#f3d675",
              fontSize: "18px",
              marginBottom: "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section3.title")}
          </h2>
          {[1, 2, 3].map((item) => (
            <p key={item} style={{ marginBottom: "12px" }}>
              {i18n(`section3.point${item}`)}
            </p>
          ))}
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              color: "#f3d675",
              fontSize: "18px",
              marginBottom: "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section4.title")}
          </h2>
          <p style={{ marginBottom: "12px" }}>{i18n("section4.point1")}</p>
          <ul
            style={{
              marginLeft: "20px",
              marginBottom: "12px",
              listStyleType: "disc",
            }}
          >
            {[1, 2, 3, 4].map((item) => (
              <li key={item} style={{ marginBottom: "8px" }}>
                {i18n(`section4.list.item${item}`)}
              </li>
            ))}
          </ul>
          <p style={{ marginBottom: "12px" }}>{i18n("section4.point2")}</p>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              color: "#f3d675",
              fontSize: "18px",
              marginBottom: "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section5.title")}
          </h2>
          {[1, 2, 3].map((item) => (
            <p key={item} style={{ marginBottom: "12px" }}>
              {i18n(`section5.point${item}`)}
            </p>
          ))}
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              color: "#f3d675",
              fontSize: "18px",
              marginBottom: "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section6.title")}
          </h2>
          {[1, 2].map((item) => (
            <p key={item} style={{ marginBottom: "12px" }}>
              {i18n(`section6.point${item}`)}
            </p>
          ))}
        </section>

        {/* Section 7 */}
        <section>
          <h2
            style={{
              color: "#f3d675",
              fontSize: "18px",
              marginBottom: "16px",
              fontWeight: "600",
            }}
          >
            {i18n("section7.title")}
          </h2>
          <p style={{ marginBottom: "12px" }}>{i18n("section7.point1")}</p>
        </section>
      </div>
    </div>
  );
};
