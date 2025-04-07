"use client";

import { checkIpv6 } from "@/entities/ipv6/api/post/ipv6-check.api";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCheckIpv6 } from "@/entities/ipv6/hooks/mutate/use-ipv6-check.mutate";

export default function Page() {
  const t = useTranslations("ipv6");
  const [domain, setDomain] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const {
    mutateAsync: checkIpv6Mutate,
    data: result,
    isPending: isLoading,
  } = useCheckIpv6();

  useEffect(() => {
    if (result) {
      setError(null);
    }
  }, [result]);

  const handleCheck = async () => {
    if (!domain) {
      setError(t("errors.empty"));
      return;
    }

    const cleanDomain = domain.replace(/^https?:\/\//, "");
    setError(null);

    try {
      await checkIpv6Mutate(cleanDomain); // теперь используется мутация
    } catch (err) {
      let errorMessage = t("errors.request");
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    }
  };

  // Format the timestamp to a readable date
  const formatDate = (timestamp: string) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="inner-page">
      <title>Proxy Luxe | Проверка IPV6</title>

      <section className="prcheck">
        <div className="scontainer">
          <h1 className="section-header">
            <span>{t("title")}</span>
          </h1>
          <p className="prcheck-text">{t("description")}</p>

          {/* Response Section - Styled with black and gold theme */}
          {isLoading && (
            <div
              style={{
                marginTop: 32,
                backgroundColor: "rgba(243, 214, 117, 0.1)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#f3d675",
              }}
            >
              <Loader size={20} className="animate-spin" />
              <span>{t("form.checking")}</span>
            </div>
          )}

          {error && (
            <div
              style={{
                marginTop: 32,
                backgroundColor: "rgba(255, 82, 82, 0.1)",
                border: "1px solid rgba(255, 82, 82, 0.2)",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#FF5252",
              }}
            >
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {result && (
            <div
              style={{
                marginTop: 32,
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                borderRadius: "8px",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                overflow: "hidden",
                marginBottom: "24px",
              }}
            >
              {/* Header with domain and status */}
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  <span style={{ color: "#f3d675", marginRight: "8px" }}>
                    {t("result.domain")}
                  </span>
                  {result.domain}
                </h2>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "500",
                    backgroundColor: result.hasIpv6
                      ? "rgba(76, 175, 80, 0.1)"
                      : "rgba(255, 82, 82, 0.1)",
                    color: result.hasIpv6 ? "#4CAF50" : "#FF5252",
                    border: result.hasIpv6
                      ? "1px solid rgba(76, 175, 80, 0.3)"
                      : "1px solid rgba(255, 82, 82, 0.3)",
                  }}
                >
                  {result.hasIpv6
                    ? t("result.status.supported")
                    : t("result.status.notSupported")}
                </span>
              </div>

              {/* Result content */}
              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  {result.hasIpv6 ? (
                    <CheckCircle size={24} color="#4CAF50" />
                  ) : (
                    <AlertCircle size={24} color="#FF5252" />
                  )}
                  <span
                    style={{
                      fontSize: "16px",
                      color: result.hasIpv6 ? "#4CAF50" : "#FF5252",
                      fontWeight: "500",
                    }}
                  >
                    {result.hasIpv6
                      ? t("result.summary.supported", { domain: result.domain })
                      : t("result.summary.notSupported", {
                          domain: result.domain,
                        })}
                  </span>
                </div>
                {result.hasIPv6 && result.ipv6Addresses.length > 0 && (
                  <div
                    style={{
                      backgroundColor: "rgba(243, 214, 117, 0.05)",
                      border: "1px solid rgba(243, 214, 117, 0.1)",
                      borderRadius: "4px",
                      padding: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        color: "#f3d675",
                        fontSize: "14px",
                        marginBottom: "8px",
                      }}
                    >
                      {t("result.addresses")}
                    </div>
                    <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
                      {result.ipv6Addresses.map(
                        (address: any, index: number) => (
                          <li
                            key={index}
                            style={{
                              color: "#FFFFFF",
                              fontSize: "14px",
                              fontFamily: "monospace",
                              marginBottom: "4px",
                            }}
                          >
                            {address}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* Timestamp */}
                <div
                  style={{
                    fontSize: "12px",
                    color: "#999999",
                    textAlign: "right",
                    marginTop: "16px",
                  }}
                >
                  {t("result.timestamp")} {formatDate(result.timestamp)}
                </div>
              </div>
            </div>
          )}

          <div className="ipvs">
            <div className="ipvs-hint">{t("form.hint")}</div>
            <input
              type="text"
              className="ipvs-inp"
              placeholder={t("form.placeholder")}
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCheck();
                }
              }}
            />
          </div>
          <div className="btn-wrap">
            <button className="btn" onClick={handleCheck} disabled={isLoading}>
              {isLoading ? t("form.checking") : t("form.check")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
