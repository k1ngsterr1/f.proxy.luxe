"use client";

import { postPortChecker } from "@/entities/port-checker/api/port-checker.api";
import { type FormEvent, useState } from "react";
import { AlertCircle, Loader, Lock, Unlock } from "lucide-react";
import { useTranslations } from "next-intl";

interface PortCheckResult {
  ip: string;
  port: number;
  status: "open" | "closed" | string;
  responseTime: number;
  timestamp: string;
}

export default function PortChecker() {
  const t = useTranslations("portChecker");
  const [ip, setIP] = useState<string>("");
  const [port, setPort] = useState<string>("");
  const [result, setResult] = useState<PortCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!ip || !port) {
      setError(t("errors.fillFields"));
      return;
    }

    const portNumber = Number.parseInt(port, 10);
    if (isNaN(portNumber)) {
      setError(t("errors.portMustBeNumber"));
      return;
    }

    if (portNumber < 1 || portNumber > 65535) {
      setError(t("errors.portRange"));
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data: PortCheckResult = await postPortChecker({
        ip,
        port: portNumber,
      });
      setResult(data);
    } catch (err) {
      let errorMessage = t("errors.checkError");
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setResult(null);
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
      second: "2-digit",
    });
  };

  return (
    <main className="inner-page">
      <title>Proxy Luxe | Проверка Портов</title>

      <section className="prcheck">
        <div className="scontainer">
          <h1 className="section-header">
            <span>{t("title")}</span>
          </h1>

          <p className="prcheck-text">{t("description")}</p>

          <div className="port" style={{ marginTop: "24px" }}>
            <form
              className="port-form"
              onSubmit={handleSubmit}
              style={{
                backgroundColor: "rgba(243, 214, 117, 0.05)",
                borderRadius: "8px",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                padding: "24px",
                marginBottom: "24px",
              }}
            >
              <div
                className="port-form__inner"
                style={{
                  marginBottom: "16px",
                }}
              >
                <p
                  className="port-form__hint"
                  style={{
                    color: "#f3d675",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  {t("form.ipAddress")}
                </p>
                <input
                  name="ip"
                  type="text"
                  className="port-inp"
                  placeholder="98.108.185.177"
                  value={ip}
                  onChange={(e) => setIP(e.target.value)}
                  required
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
              <div
                className="port-form__inner"
                style={{
                  marginBottom: "16px",
                }}
              >
                <p
                  className="port-form__hint"
                  style={{
                    color: "#f3d675",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  {t("form.port")}
                </p>
                <input
                  name="port"
                  type="text"
                  className="port-inp"
                  placeholder="8080"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  required
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
              <button
                type="submit"
                className="btn port-btn"
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
                }}
              >
                {isLoading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    {t("status.checking")}
                  </>
                ) : (
                  t("form.check")
                )}
              </button>
            </form>

            {/* Loading state */}
            {isLoading && (
              <div
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.1)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "8px",
                  padding: "24px",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  color: "#f3d675",
                }}
              >
                <Loader size={24} className="animate-spin" />
                <span>{t("status.checking")}</span>
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
                  marginBottom: "24px",
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
                  marginBottom: "24px",
                }}
              >
                {/* Header with IP, port and status */}
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
                      IP
                    </span>
                    {result.ip}
                    <span style={{ color: "#f3d675", margin: "0 8px" }}>
                      {t("results.port")}:
                    </span>
                    {result.port}
                  </h2>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "500",
                      backgroundColor:
                        result.status === "open"
                          ? "rgba(76, 175, 80, 0.1)"
                          : "rgba(255, 82, 82, 0.1)",
                      color: result.status === "open" ? "#4CAF50" : "#FF5252",
                      border:
                        result.status === "open"
                          ? "1px solid rgba(76, 175, 80, 0.3)"
                          : "1px solid rgba(255, 82, 82, 0.3)",
                    }}
                  >
                    {result.status === "open"
                      ? t("results.open")
                      : t("results.closed")}
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
                    {result.status === "open" ? (
                      <Unlock size={24} color="#4CAF50" />
                    ) : (
                      <Lock size={24} color="#FF5252" />
                    )}
                    <span
                      style={{
                        fontSize: "16px",
                        color: result.status === "open" ? "#4CAF50" : "#FF5252",
                        fontWeight: "500",
                      }}
                    >
                      {t("results.port")} {result.port} {t("results.on")}{" "}
                      {result.ip}{" "}
                      {result.status === "open"
                        ? t("results.open")
                        : t("results.closed")}
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: "rgba(243, 214, 117, 0.05)",
                      border: "1px solid rgba(243, 214, 117, 0.1)",
                      borderRadius: "4px",
                      padding: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        color: "#999999",
                        fontSize: "12px",
                        marginBottom: "4px",
                      }}
                    >
                      {t("results.responseTime")}
                    </div>
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {result.responseTime} {t("results.ms")}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "#999999",
                      textAlign: "right",
                      marginTop: "16px",
                    }}
                  >
                    {t("results.checkCompleted")}:{" "}
                    {formatDate(result.timestamp)}
                  </div>
                </div>
              </div>
            )}

            <ul
              className="port-list"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "12px",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {[
                { port: "80", service: "HTTP" },
                { port: "115", service: "SFTP" },
                { port: "25", service: "SMTP" },
                { port: "8080", service: "HTTP" },
                { port: "21", service: "FTP" },
                { port: "22", service: "SSH" },
                { port: "143", service: "IMAP" },
                { port: "443", service: "HTTPS" },
                { port: "873", service: "RSYNC" },
                { port: "993", service: "IMAPS" },
                { port: "110", service: "POP3" },
              ].map((item) => (
                <li key={item.port}>
                  <button
                    onClick={() => setPort(item.port)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      border: "1px solid rgba(243, 214, 117, 0.2)",
                      borderRadius: "4px",
                      color: "#f3d675",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 214, 117, 0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 214, 117, 0.1)";
                    }}
                  >
                    {item.service} - {item.port}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
