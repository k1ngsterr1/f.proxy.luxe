"use client";

import type React from "react";

import { postBlacklists } from "@/entities/blacklists/api/post-blacklists.api";
import { useState } from "react";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

interface BlacklistResult {
  ip: string;
  isListed: boolean;
  blacklists: string[];
  blacklistCount: number;
  timestamp: string;
}

export default function BlackListPage() {
  const [ip, setIP] = useState<string>("");
  const [result, setResult] = useState<BlacklistResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateIP = (ip: string) => {
    const ipv4Pattern =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Pattern.test(ip);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ip) {
      setError("Пожалуйста, введите IP-адрес");
      return;
    }

    if (!validateIP(ip)) {
      setError("Введите корректный IPv4-адрес");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data: BlacklistResult = await postBlacklists(ip);
      setResult(data);
    } catch (err) {
      let errorMessage = "Произошла ошибка при проверке";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Format the timestamp to a readable date
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="inner-page">
      <section className="blist">
        <div className="scontainer">
          <h1 className="section-header">
            <span>ЧЕРНЫЙ СПИСОК</span>
          </h1>

          <p className="blist-text">
            Бесплатный инструмент, с помощью которого вы можете проверить
            наличие вашего, либо любого другого IP-адреса в базах данных
            антиспама. <br />
            Будут ли заблокированы ваши электронные сообщения или чаты форума?
            Проверка происходит по более 50 базам, которые отслеживают черные
            списки IP-адресов.
          </p>

          <form onSubmit={handleSubmit} className="blist">
            <p className="blist-hint">IP адрес</p>
            <div className="btn-wrap">
              <input
                type="text"
                className="blist-inp"
                value={ip}
                onChange={(e) => setIP(e.target.value)}
                placeholder="98.108.185.177"
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.1)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  color: "#f3d675",
                  padding: "12px 16px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  width: "100%",
                }}
              />
            </div>
            <div className="btn-wrap">
              <button
                type="submit"
                className="blist-btn btn"
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
                }}
              >
                {isLoading ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Loader size={16} className="animate-spin" />
                    Проверка...
                  </span>
                ) : (
                  "Проверить"
                )}
              </button>
            </div>
          </form>

          {/* Loading state */}
          {isLoading && (
            <div
              style={{
                backgroundColor: "rgba(243, 214, 117, 0.1)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "8px",
                padding: "24px",
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                color: "#f3d675",
              }}
            >
              <Loader size={24} className="animate-spin" />
              <span>Проверка IP-адреса...</span>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div
              style={{
                backgroundColor: "rgba(255, 82, 82, 0.1)",
                border: "1px solid rgba(255, 82, 82, 0.2)",
                borderRadius: "8px",
                padding: "16px",
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#FF5252",
              }}
            >
              <AlertCircle size={24} />
              <span>{error}</span>
            </div>
          )}

          {/* Results */}
          {result && (
            <div
              style={{
                backgroundColor: "#000000",
                borderRadius: "8px",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                overflow: "hidden",
                marginTop: "24px",
              }}
            >
              {/* Header with IP and status */}
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
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  <span style={{ color: "#f3d675", marginRight: "8px" }}>
                    IP:
                  </span>
                  {result.ip}
                </h2>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "500",
                    backgroundColor: result.isListed
                      ? "rgba(255, 82, 82, 0.1)"
                      : "rgba(76, 175, 80, 0.1)",
                    color: result.isListed ? "#FF5252" : "#4CAF50",
                    border: result.isListed
                      ? "1px solid rgba(255, 82, 82, 0.3)"
                      : "1px solid rgba(76, 175, 80, 0.3)",
                  }}
                >
                  {result.isListed ? "В черном списке" : "Не в черном списке"}
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
                  {result.isListed ? (
                    <AlertCircle size={24} color="#FF5252" />
                  ) : (
                    <CheckCircle size={24} color="#4CAF50" />
                  )}
                  <span
                    style={{
                      fontSize: "16px",
                      color: result.isListed ? "#FF5252" : "#4CAF50",
                      fontWeight: "500",
                    }}
                  >
                    {result.isListed
                      ? `IP ${result.ip} найден в ${result.blacklistCount} чёрных списках`
                      : `IP ${result.ip} не найден в чёрных списках`}
                  </span>
                </div>

                {/* Blacklist details if listed */}
                {result.isListed && result.blacklists.length > 0 && (
                  <div
                    style={{
                      backgroundColor: "rgba(255, 82, 82, 0.05)",
                      border: "1px solid rgba(255, 82, 82, 0.1)",
                      borderRadius: "4px",
                      padding: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 12px 0",
                        fontSize: "16px",
                        color: "#FFFFFF",
                      }}
                    >
                      Найден в следующих списках:
                    </h3>
                    <ul
                      style={{
                        margin: 0,
                        padding: "0 0 0 20px",
                        color: "#FFFFFF",
                      }}
                    >
                      {result.blacklists.map((list, index) => (
                        <li
                          key={index}
                          style={{
                            marginBottom: "8px",
                            color: "#FF5252",
                          }}
                        >
                          {list}
                        </li>
                      ))}
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
                  Проверка выполнена: {formatDate(result.timestamp)}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
