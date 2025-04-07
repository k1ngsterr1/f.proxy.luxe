"use client";

import { proxyChecker } from "@/entities/proxy/api/post/proxy-checker.api";
import { useEffect, useState } from "react";
import {
  Loader,
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useTranslations } from "next-intl";

interface ProxyResult {
  ip: string;
  raw: string;
  port: number;
  status: string;
  type: string;
  country?: string;
  anonymityLevel?: string;
  supportsIPv6?: boolean;
  authRequired: boolean;
  responseTime?: number;
  error?: string;
}

export default function ProxyCheckerPage() {
  const i18n = useTranslations("proxyChecker");
  const [proxyList, setProxyList] = useState<string>("");
  const [checkLocation, setCheckLocation] = useState<boolean>(false);
  const [results, setResults] = useState<ProxyResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleCheckProxies = async () => {
    if (!proxyList) {
      setError(i18n("errors.emptyList"));
      return;
    }

    const proxies = proxyList
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    if (proxies.length === 0) {
      setError(i18n("errors.invalidList"));
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await proxyChecker({
        proxies,
        addCountry: checkLocation,
      });

      setResults(response); // если response = ProxyResult[]
    } catch (err) {
      console.error("Request error:", err);
      setError(i18n("errors.checkError"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("results:", results);
  }, [results]);

  // Calculate stats
  const activeProxies = results.filter((r) => r.status === "valid").length;
  const totalProxies = results.length;
  const successRate =
    totalProxies > 0 ? Math.round((activeProxies / totalProxies) * 100) : 0;

  return (
    <main
      style={{
        paddingTop: isMobile ? 356 : 256,
        backgroundColor: "#000000",
        color: "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      <title>Proxy Luxe | Проверка Прокси</title>

      <section style={{ padding: isMobile ? "20px 16px" : "40px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: isMobile ? "24px" : "32px",
              fontWeight: "bold",
              marginBottom: "16px",
              color: "#FFFFFF",
            }}
          >
            <span style={{ color: "#f3d675" }}>{i18n("title")}</span>
          </h1>

          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              marginBottom: "24px",
              color: "#CCCCCC",
            }}
          >
            {i18n("description.line1")} {!isMobile && <br />}
            {i18n("description.line2")}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "20px" : "24px",
              marginBottom: "32px",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              backgroundColor: "rgba(243, 214, 117, 0.05)",
              padding: isMobile ? "16px" : "24px",
            }}
          >
            {/* Left Column - Input Form */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <textarea
                placeholder={i18n("form.proxyListPlaceholder")}
                value={proxyList}
                onChange={(e) => setProxyList(e.target.value)}
                style={{
                  width: "100%",
                  height: isMobile ? "150px" : "200px",
                  padding: "12px 16px",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: "14px",
                  resize: "vertical",
                  fontFamily: "monospace",
                }}
              />

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checkLocation}
                    onChange={(e) => setCheckLocation(e.target.checked)}
                    style={{
                      position: "absolute",
                      opacity: 0,
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  />
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "1px solid rgba(243, 214, 117, 0.5)",
                      borderRadius: "4px",
                      backgroundColor: checkLocation
                        ? "rgba(243, 214, 117, 0.2)"
                        : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    {checkLocation && <CheckCircle size={14} color="#f3d675" />}
                  </div>
                </div>
                <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
                  {i18n("form.determineLocation")}
                </span>
              </label>
            </div>

            {/* Right Column - Info and Button */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "16px" : "18px",
                  fontWeight: "600",
                  color: "#f3d675",
                  marginBottom: "8px",
                }}
              >
                {i18n("form.formatTitle")}
              </h2>

              <div
                style={{
                  height: "1px",
                  backgroundColor: "rgba(243, 214, 117, 0.2)",
                  margin: "0 0 16px 0",
                }}
              ></div>

              <p
                style={{
                  fontSize: "14px",
                  color: "#CCCCCC",
                  lineHeight: "1.6",
                  marginBottom: "8px",
                }}
              >
                {i18n("form.formatPublic")}{" "}
                <span style={{ color: "#f3d675", fontWeight: "500" }}>
                  IP:PORT
                </span>{" "}
                <br />
                {i18n("form.formatPrivate")}{" "}
                <span style={{ color: "#f3d675", fontWeight: "500" }}>
                  IP:PORT:USER:PASS
                </span>
              </p>

              <p
                style={{
                  fontSize: "14px",
                  color: "#f3d675",
                  fontStyle: "italic",
                  marginBottom: isMobile ? "16px" : "24px",
                }}
              >
                {i18n("form.privateNote")}
              </p>

              <button
                onClick={handleCheckProxies}
                disabled={isLoading}
                style={{
                  backgroundColor: isLoading
                    ? "rgba(243, 214, 117, 0.5)"
                    : "#f3d675",
                  color: "#000000",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: isMobile ? "0" : "auto",
                }}
              >
                {isLoading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    {i18n("form.checking")}
                  </>
                ) : (
                  i18n("form.checkButton")
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                backgroundColor: "rgba(255, 82, 82, 0.1)",
                border: "1px solid rgba(255, 82, 82, 0.2)",
                borderRadius: "4px",
                padding: "16px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#FF5252",
              }}
            >
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Results Section */}
          {results.length > 0 && (
            <div
              style={{
                backgroundColor: "rgba(243, 214, 117, 0.05)",
                borderRadius: "8px",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                overflow: "hidden",
                marginBottom: "32px",
              }}
            >
              {/* Results Header */}
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "12px" : "0",
                  backgroundColor: "rgba(243, 214, 117, 0.1)",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#f3d675",
                    textTransform: "uppercase",
                  }}
                >
                  {i18n("results.title")}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "8px" : "16px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CheckCircle size={16} color="#4CAF50" />
                    <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
                      {activeProxies} {i18n("results.activeCount")}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <XCircle size={16} color="#FF5252" />
                    <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
                      {totalProxies - activeProxies}{" "}
                      {i18n("results.inactiveCount")}
                    </span>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(243, 214, 117, 0.2)",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      color: "#f3d675",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {successRate}% {i18n("results.successRate")}
                  </div>
                </div>
              </div>

              {/* Valid/Invalid Sections */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "20px",
                  padding: "20px",
                }}
              >
                {/* Valid Proxies */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <CheckCircle size={18} color="#4CAF50" />
                    <span style={{ color: "#4CAF50", fontWeight: "500" }}>
                      {i18n("results.valid")}
                    </span>
                  </div>
                  <textarea
                    readOnly
                    value={results
                      .filter((r) => r.status === "valid")
                      .map((r) => `${r.ip}:${r.port}`)
                      .join("\n")}
                    style={{
                      width: "100%",
                      height: "120px",
                      padding: "12px",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(76, 175, 80, 0.3)",
                      borderRadius: "4px",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      resize: "none",
                      fontFamily: "monospace",
                    }}
                  />
                </div>

                {/* Invalid Proxies */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <XCircle size={18} color="#FF5252" />
                    <span style={{ color: "#FF5252", fontWeight: "500" }}>
                      {i18n("results.invalid")}
                    </span>
                  </div>
                  <textarea
                    readOnly
                    value={results
                      .filter((r: any) => r.status != "valid")
                      .map((r) => `${r.raw}`)
                      .join("\n")}
                    style={{
                      width: "100%",
                      height: "120px",
                      padding: "12px",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(255, 82, 82, 0.3)",
                      borderRadius: "4px",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      resize: "none",
                      fontFamily: "monospace",
                    }}
                  />
                </div>
              </div>

              {/* Results Table */}
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        color: "#f3d675",
                        textAlign: "left",
                      }}
                    >
                      <th
                        style={{
                          padding: isMobile ? "10px 8px" : "12px 16px",
                          width: "40px",
                          textAlign: "center",
                        }}
                      >
                        {i18n("results.status")}
                      </th>
                      <th
                        style={{
                          padding: isMobile ? "10px 8px" : "12px 16px",
                          width: "40px",
                          textAlign: "center",
                        }}
                      >
                        {/* Country Flag Column */}
                      </th>
                      <th
                        style={{ padding: isMobile ? "10px 8px" : "12px 16px" }}
                      >
                        {i18n("results.ipPort")}
                      </th>
                      <th
                        style={{ padding: isMobile ? "10px 8px" : "12px 16px" }}
                      >
                        {i18n("results.login")}
                      </th>
                      <th
                        style={{ padding: isMobile ? "10px 8px" : "12px 16px" }}
                      >
                        {i18n("results.password")}
                      </th>
                      <th
                        style={{ padding: isMobile ? "10px 8px" : "12px 16px" }}
                      >
                        {i18n("results.type")}
                      </th>
                      <th
                        style={{ padding: isMobile ? "10px 8px" : "12px 16px" }}
                      >
                        {i18n("results.responseTime")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr
                        key={index}
                        style={{
                          borderTop: "1px solid rgba(243, 214, 117, 0.1)",
                          backgroundColor:
                            result.status !== "valid"
                              ? "rgba(255, 82, 82, 0.05)"
                              : index % 2 === 0
                              ? "transparent"
                              : "rgba(243, 214, 117, 0.03)",
                        }}
                      >
                        <td
                          style={{
                            padding: isMobile ? "10px 8px" : "12px 16px",
                            textAlign: "center",
                          }}
                        >
                          {result.status === "valid" ? (
                            <CheckCircle
                              size={isMobile ? 16 : 18}
                              color="#4CAF50"
                            />
                          ) : (
                            <XCircle
                              size={isMobile ? 16 : 18}
                              color="#FF5252"
                            />
                          )}
                        </td>
                        <td
                          style={{
                            padding: isMobile ? "10px 8px" : "12px 16px",
                            textAlign: "center",
                          }}
                        >
                          {result.country && (
                            <div
                              style={{
                                display: "inline-block",
                                width: "24px",
                                height: "16px",
                                backgroundColor: "#333",
                                borderRadius: "2px",
                                overflow: "hidden",
                                fontSize: "12px",
                                textAlign: "center",
                                color: "#fff",
                              }}
                            >
                              {/* Display first two letters of country code or a flag emoji */}
                              {result.country.substring(0, 2)}
                            </div>
                          )}
                        </td>
                        <td
                          style={{
                            padding: isMobile ? "10px 8px" : "12px 16px",
                            fontFamily: "monospace",
                            color:
                              result.status === "valid" ? "#f3d675" : "#999",
                            fontWeight: "500",
                            fontSize: isMobile ? "11px" : "14px",
                          }}
                        >
                          {`${
                            result.status !== "valid"
                              ? result.raw
                              : `${result.ip}:${result.port}`
                          }`}
                        </td>
                        <td
                          style={{
                            padding: isMobile ? "10px 8px" : "12px 16px",
                            color: "#CCCCCC",
                          }}
                        >
                          {result.authRequired ? "—" : "—"}
                        </td>
                        <td
                          style={{
                            padding: isMobile ? "10px 8px" : "12px 16px",
                            color: "#CCCCCC",
                          }}
                        >
                          {result.authRequired ? "—" : "—"}
                        </td>
                        <td
                          style={{
                            padding: isMobile ? "10px 8px" : "12px 16px",
                            color: "#FFFFFF",
                          }}
                        >
                          {result.supportsIPv6
                            ? `${result.type || "HTTP(s)"} + IPv6`
                            : result.type ||
                              (result.status === "valid" ? "HTTP(s)" : "Error")}
                        </td>
                        <td
                          style={{
                            padding: isMobile ? "10px 8px" : "12px 16px",
                            color: "#FFFFFF",
                          }}
                        >
                          {result.responseTime
                            ? `${result.responseTime}${i18n("results.ms")}`
                            : result.status === "valid"
                            ? "—"
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Features Section */}
          <div style={{ marginTop: "32px" }}>
            <h3
              style={{
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: "600",
                color: "#f3d675",
                marginBottom: "16px",
              }}
            >
              {i18n("features.title")}
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {[
                i18n("features.ipv4ipv6"),
                i18n("features.anonymousProxy"),
                i18n("features.httpSocks"),
                i18n("features.autoProtocol"),
                i18n("features.country"),
                i18n("features.responseTime"),
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "rgba(243, 214, 117, 0.05)",
                    border: "1px solid rgba(243, 214, 117, 0.1)",
                    borderRadius: "4px",
                    padding: isMobile ? "12px" : "16px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      minWidth: isMobile ? "20px" : "24px",
                      height: isMobile ? "20px" : "24px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      border: "1px solid rgba(243, 214, 117, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f3d675",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: isMobile ? "13px" : "14px",
                    }}
                  >
                    {feature}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                backgroundColor: "rgba(243, 214, 117, 0.05)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "8px",
                padding: isMobile ? "12px" : "16px",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <Info
                size={isMobile ? 18 : 20}
                style={{ color: "#f3d675", flexShrink: 0, marginTop: "2px" }}
              />
              <div>
                <p
                  style={{
                    color: "#FFFFFF",
                    fontSize: isMobile ? "13px" : "14px",
                    marginBottom: "8px",
                  }}
                >
                  {i18n("info.description")}
                </p>
                <p
                  style={{
                    color: "#CCCCCC",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  {i18n("info.recommendation")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
