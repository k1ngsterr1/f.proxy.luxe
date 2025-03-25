"use client";

import { proxyChecker } from "@/entities/proxy/api/post/proxy-checker.api";
import { useState } from "react";
import {
  Loader,
  CheckCircle,
  XCircle,
  Globe,
  Info,
  AlertTriangle,
} from "lucide-react";
import { useIsMobile } from "@/shared/utils/use-is-mobile";

interface ProxyResult {
  ip: string;
  port: number;
  isActive: boolean;
  protocol: string;
  country?: string;
  anonymityLevel?: string;
  supportsIPv6?: boolean;
  authRequired: boolean;
  responseTime?: number;
  error?: string;
}

export default function ProxyCheckerPage() {
  const [proxyList, setProxyList] = useState<string>("");
  const [checkLocation, setCheckLocation] = useState<boolean>(false);
  const [results, setResults] = useState<ProxyResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleCheckProxies = async () => {
    if (!proxyList) {
      setError("Пожалуйста, введите список прокси");
      return;
    }

    const proxies = proxyList
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    if (proxies.length === 0) {
      setError("Список прокси пуст или некорректный");
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
      console.error("Ошибка запроса:", err);
      setError("Произошла ошибка при проверке прокси");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate stats
  const activeProxies = results.filter((r) => r.isActive).length;
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
            <span style={{ color: "#f3d675" }}>ПРОКСИ ЧЕКЕР</span>
          </h1>

          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              marginBottom: "24px",
              color: "#CCCCCC",
            }}
          >
            Бесплатный онлайн сервис для проверки работоспособности прокси
            серверов. Анализ каждого прокси на доступность, тип и страну.{" "}
            {!isMobile && <br />}
            Возможность проверки анонимных (индивидуальных) прокси с
            авторизацией по логину и паролю. Проверка IPv6 прокси.
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
                placeholder="Список прокси (каждый прокси с новой строки)"
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
                  Определять локацию прокси
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
                В каком формате добавлять прокси в прокси-чекер?
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
                Если у вас публичные прокси (без логина и пароля), то{" "}
                <span style={{ color: "#f3d675", fontWeight: "500" }}>
                  IP:PORT
                </span>{" "}
                <br />
                Если у вас приватные прокси (с авторизацией по логину и паролю),
                то{" "}
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
                P.S.: Если вы купили прокси у нас, то они приватные!
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
                    Проверка...
                  </>
                ) : (
                  "Проверить прокси"
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
                  }}
                >
                  Результаты проверки
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
                      {activeProxies} активных
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
                      {totalProxies - activeProxies} неактивных
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
                    {successRate}% успешных
                  </div>
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
                        style={{ padding: isMobile ? "10px 8px" : "12px 16px" }}
                      >
                        IP:Порт
                      </th>
                      <th
                        style={{ padding: isMobile ? "10px 8px" : "12px 16px" }}
                      >
                        Статус
                      </th>
                      {!isMobile && (
                        <th style={{ padding: "12px 16px" }}>Протокол</th>
                      )}
                      {checkLocation && !isMobile && (
                        <th style={{ padding: "12px 16px" }}>Страна</th>
                      )}
                      {!isMobile && (
                        <th style={{ padding: "12px 16px" }}>Время отклика</th>
                      )}
                      <th
                        style={{ padding: isMobile ? "10px 8px" : "12px 16px" }}
                      >
                        {isMobile ? "Детали" : "Дополнительно"}
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
                            index % 2 === 0
                              ? "transparent"
                              : "rgba(243, 214, 117, 0.03)",
                        }}
                      >
                        <td
                          style={{
                            padding: isMobile ? "10px 8px" : "12px 16px",
                            fontFamily: "monospace",
                            color: "#f3d675",
                            fontWeight: "500",
                            fontSize: isMobile ? "11px" : "14px",
                          }}
                        >
                          {result.ip}:{result.port}
                        </td>
                        <td
                          style={{
                            padding: isMobile ? "10px 8px" : "12px 16px",
                          }}
                        >
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: isMobile ? "3px 6px" : "4px 8px",
                              borderRadius: "4px",
                              fontSize: isMobile ? "10px" : "12px",
                              fontWeight: "500",
                              backgroundColor: result.isActive
                                ? "rgba(76, 175, 80, 0.1)"
                                : "rgba(255, 82, 82, 0.1)",
                              color: result.isActive ? "#4CAF50" : "#FF5252",
                              border: result.isActive
                                ? "1px solid rgba(76, 175, 80, 0.3)"
                                : "1px solid rgba(255, 82, 82, 0.3)",
                            }}
                          >
                            {result.isActive ? (
                              <CheckCircle size={isMobile ? 10 : 12} />
                            ) : (
                              <XCircle size={isMobile ? 10 : 12} />
                            )}
                            {result.isActive ? "Активен" : "Неактивен"}
                          </div>
                        </td>
                        {!isMobile && (
                          <td
                            style={{ padding: "12px 16px", color: "#FFFFFF" }}
                          >
                            {result.protocol || "—"}
                          </td>
                        )}
                        {checkLocation && !isMobile && (
                          <td style={{ padding: "12px 16px" }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              {result.country ? (
                                <>
                                  <Globe size={14} color="#f3d675" />
                                  <span style={{ color: "#FFFFFF" }}>
                                    {result.country}
                                  </span>
                                </>
                              ) : (
                                <span style={{ color: "#999999" }}>—</span>
                              )}
                            </div>
                          </td>
                        )}
                        {!isMobile && (
                          <td
                            style={{ padding: "12px 16px", color: "#FFFFFF" }}
                          >
                            {result.responseTime
                              ? `${result.responseTime} мс`
                              : "—"}
                          </td>
                        )}
                        <td
                          style={{
                            padding: isMobile ? "10px 8px" : "12px 16px",
                          }}
                        >
                          {isMobile ? (
                            <div style={{ fontSize: "11px", color: "#CCCCCC" }}>
                              {result.protocol && <div>{result.protocol}</div>}
                              {result.country && checkLocation && (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  <Globe size={10} color="#f3d675" />
                                  {result.country}
                                </div>
                              )}
                              {result.responseTime && (
                                <div>{result.responseTime} мс</div>
                              )}
                            </div>
                          ) : result.error ? (
                            <div
                              style={{
                                color: "#FF5252",
                                fontSize: "12px",
                                maxWidth: "200px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                              title={result.error}
                            >
                              {result.error}
                            </div>
                          ) : result.anonymityLevel ? (
                            <div style={{ color: "#4CAF50", fontSize: "12px" }}>
                              {result.anonymityLevel}
                            </div>
                          ) : (
                            <span style={{ color: "#999999" }}>—</span>
                          )}
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
              Возможности прокси чекера:
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
                "Проверка доступности IPv4 и IPv6 прокси",
                "Возможность проверки анонимных прокси с авторизацией по логину и паролю",
                "Проверка HTTP(-s) и SOCKS прокси",
                "Автоматическое определение протокола прокси",
                "Определение страны прокси-сервера",
                "Измерение времени отклика прокси",
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

            {/* Info Box */}
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
                  Наш прокси чекер позволяет быстро проверить работоспособность
                  ваших прокси серверов. Вы можете проверить как публичные, так
                  и приватные прокси с авторизацией.
                </p>
                <p
                  style={{
                    color: "#CCCCCC",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  Для получения наиболее точных результатов рекомендуем
                  проверять не более 50 прокси за один раз.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
