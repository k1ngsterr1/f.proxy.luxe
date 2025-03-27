import React from "react";
import { useTranslations } from "next-intl";
import { Star, Shield, Zap, Users, CheckCircle, Award } from "lucide-react";

export const AboutBlock = () => {
  const i18n = useTranslations("about");

  return (
    <div
      style={{
        padding: "4rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "radial-gradient(circle, rgba(212, 175, 55, 0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Introduction section with gold accent */}
        <div
          style={{
            marginBottom: "3rem",
            padding: "2rem",
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: "8px",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "5px",
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(212, 175, 55, 0.8), rgba(212, 175, 55, 0.3))",
            }}
          />

          <p
            style={{
              fontSize: "1.5rem",
              lineHeight: "1.6",
              color: "rgba(212, 175, 55, 0.9)",
              fontWeight: 500,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              marginBottom: 0,
            }}
          >
            {i18n("intro")}
          </p>
        </div>

        {/* Advantages section with icons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              padding: "2rem",
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "8px",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            className="advantage-card"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Award
                size={24}
                style={{
                  color: "rgba(212, 175, 55, 0.9)",
                  marginRight: "0.75rem",
                }}
              />
              <h3
                style={{
                  fontSize: "1.25rem",
                  color: "white",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {i18n("quality")}
              </h3>
            </div>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.8)",
                margin: 0,
              }}
            >
              {i18n("advantages.quality")}
            </p>
          </div>

          <div
            style={{
              padding: "2rem",
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "8px",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            className="advantage-card"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Shield
                size={24}
                style={{
                  color: "rgba(212, 175, 55, 0.9)",
                  marginRight: "0.75rem",
                }}
              />
              <h3
                style={{
                  fontSize: "1.25rem",
                  color: "white",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {i18n("security")}
              </h3>
            </div>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.8)",
                margin: "0 0 1rem 0",
              }}
            >
              {i18n("advantages.anonymity")}
            </p>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.8)",
                margin: "0 0 1rem 0",
              }}
            >
              {i18n("advantages.variety")}
            </p>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.8)",
                margin: 0,
              }}
            >
              {i18n("advantages.types")}
            </p>
          </div>

          <div
            style={{
              padding: "2rem",
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "8px",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            className="advantage-card"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Zap
                size={24}
                style={{
                  color: "rgba(212, 175, 55, 0.9)",
                  marginRight: "0.75rem",
                }}
              />
              <h3
                style={{
                  fontSize: "1.25rem",
                  color: "white",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {i18n("pricing")}
              </h3>
            </div>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.8)",
                margin: 0,
              }}
            >
              {i18n("advantages.prices")}
            </p>
          </div>
        </div>

        {/* Features section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              padding: "2rem",
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "8px",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "80px",
                height: "80px",
                background: "rgba(212, 175, 55, 0.1)",
                borderRadius: "0 0 0 80px",
                pointerEvents: "none",
              }}
            />

            <p
              style={{
                fontSize: "1.25rem",
                lineHeight: "1.6",
                color: "rgba(212, 175, 55, 0.9)",
                fontWeight: 500,
                marginBottom: "1rem",
              }}
            >
              {i18n("automation")}
            </p>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "1rem",
              }}
            >
              {i18n("support")}
            </p>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.8)",
                margin: 0,
              }}
            >
              {i18n("contacts")}
            </p>
          </div>

          <div
            style={{
              padding: "2rem",
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "8px",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "80px",
                height: "80px",
                background: "rgba(212, 175, 55, 0.1)",
                borderRadius: "0 0 0 80px",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Users
                size={24}
                style={{
                  color: "rgba(212, 175, 55, 0.9)",
                  marginRight: "0.75rem",
                }}
              />
              <h3
                style={{
                  fontSize: "1.25rem",
                  color: "white",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {i18n("suitability_title")}
              </h3>
            </div>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "1rem",
              }}
            >
              {i18n("suitability.general")}
            </p>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "1rem",
              }}
            >
              {i18n("suitability.ipv6")}
            </p>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.8)",
                margin: 0,
              }}
            >
              {i18n("suitability.isp")}
            </p>
          </div>
        </div>

        {/* Conclusion section */}
        <div
          style={{
            padding: "2rem",
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: "8px",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "100px",
              height: "100px",
              background:
                "radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <p
            style={{
              fontSize: "1.25rem",
              lineHeight: "1.6",
              color: "rgba(212, 175, 55, 0.9)",
              fontWeight: 500,
              marginBottom: "1rem",
            }}
          >
            {i18n("conclusion.intro")}
          </p>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.8)",
              margin: 0,
            }}
          >
            {i18n("conclusion.answer")}
          </p>
        </div>
      </div>

      {/* Hover effects for cards */}
      <style jsx>{`
        .advantage-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3),
            0 0 15px rgba(212, 175, 55, 0.2);
        }
      `}</style>
    </div>
  );
};
