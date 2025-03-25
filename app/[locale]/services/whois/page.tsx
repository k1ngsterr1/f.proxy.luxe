"use client";

import { postWhoIs } from "@/entities/whois/api/post/post-whois.api";
import { type ChangeEvent, type FormEvent, useState } from "react";

// Replace the WhoisData interface with this one to match your actual response structure
interface WhoisData {
  domain: string;
  host: string;
  geolocationProvider: string;
  inetnum: string;
  netname: string;
  descr: string;
  adminC: string;
  techC: string;
  status: string;
  mnt_by: string[];
  source: string;
  person: {
    name: string;
    address: string;
    phone: string;
    nicHdl: string;
  };
  route: {
    route: string;
    origin: string;
    mnt_by: string[];
  };
  registrant: {
    name: string;
  };
}

export default function Whois() {
  const [ip, setIp] = useState<string>("");
  const [data, setData] = useState<WhoisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("general");

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIp(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setData(null);

    const query = ip.trim();

    if (!query) {
      setError("Пожалуйста, введите IP или домен");
      return;
    }

    try {
      setLoading(true);
      const result = await postWhoIs(query);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  return (
    <main className="inner-page">
      <section className="blist">
        <div className="scontainer">
          <h1 className="section-header">
            <span>WHOIS</span>
          </h1>
          <p className="blist-text">
            Whois сервис (или whois service) - простой и бесплатный
            инструмент...
          </p>

          <form action="#" className="blist-form" onSubmit={handleSubmit}>
            <p className="blist-hint">IP адрес</p>
            <div className="btn-wrap">
              <input
                type="text"
                className="blist-inp"
                onChange={onChangeHandler}
                value={ip}
                placeholder="Введите IP или домен"
              />
            </div>
            <div className="btn-wrap">
              <button
                type="submit"
                className="blist-btn btn"
                disabled={loading}
              >
                {loading ? "Загрузка..." : "Проверить"}
              </button>
            </div>
          </form>

          {error && (
            <div
              className="blist-error"
              style={{ color: "red", marginTop: "1rem" }}
            >
              {error}
            </div>
          )}

          {/* Replace the data && (...) section with this updated version that matches your data structure */}
          {data && (
            <div
              style={{
                marginTop: "2rem",
                backgroundColor: "#000000",
                borderRadius: "8px",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                overflow: "hidden",
              }}
            >
              {/* Header with domain/IP and status */}
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
                  {data.domain}
                </h2>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "500",
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                    color: "#4CAF50",
                    border: "1px solid rgba(76, 175, 80, 0.3)",
                  }}
                >
                  {data.status}
                </span>
              </div>

              {/* Tabs navigation */}
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  padding: "0 20px",
                }}
              >
                <button
                  onClick={() => setActiveTab("general")}
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom:
                      activeTab === "general"
                        ? "2px solid #f3d675"
                        : "2px solid transparent",
                    color: activeTab === "general" ? "#f3d675" : "#999999",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Основная информация
                </button>
                <button
                  onClick={() => setActiveTab("technical")}
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom:
                      activeTab === "technical"
                        ? "2px solid #f3d675"
                        : "2px solid transparent",
                    color: activeTab === "technical" ? "#f3d675" : "#999999",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Техническая информация
                </button>
                <button
                  onClick={() => setActiveTab("contact")}
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom:
                      activeTab === "contact"
                        ? "2px solid #f3d675"
                        : "2px solid transparent",
                    color: activeTab === "contact" ? "#f3d675" : "#999999",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Контактная информация
                </button>
              </div>

              {/* Tab content */}
              <div style={{ padding: "20px" }}>
                {/* General Information Tab */}
                {activeTab === "general" && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        IP адрес:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data.domain}
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Хост:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data.host}
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Статус:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data.status}
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Диапазон IP:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data.inetnum}
                      </div>
                    </div>
                  </div>
                )}

                {/* Technical Information Tab */}
                {activeTab === "technical" && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Сетевое имя:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data.netname}
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Описание:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data.descr}
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                        gridColumn: "1 / -1",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "8px",
                        }}
                      >
                        Маршрут:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        <div>Маршрут: {data.route.route}</div>
                        <div>Происхождение: {data.route.origin}</div>
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Источник:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data.source}
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Геолокация:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data.geolocationProvider}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Information Tab */}
                {activeTab === "contact" && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Администратор:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data.adminC}
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Технический контакт:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data.techC}
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                        gridColumn: "1 / -1",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "8px",
                        }}
                      >
                        Контактное лицо:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        <div>Имя: {data.person.name}</div>
                        <div>Адрес: {data.person.address}</div>
                        <div>Телефон: {data.person.phone}</div>
                        <div>NIC Handle: {data.person.nicHdl}</div>
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(243, 214, 117, 0.05)",
                        border: "1px solid rgba(243, 214, 117, 0.1)",
                        borderRadius: "4px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Регистрант:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data.registrant.name}
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer with maintained by information */}
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  <div
                    style={{
                      color: "#999999",
                      fontSize: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    Поддерживается:
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                  >
                    {data.mnt_by.map((maintainer, index) => (
                      <span
                        key={index}
                        style={{
                          display: "inline-block",
                          padding: "4px 8px",
                          backgroundColor: "rgba(243, 214, 117, 0.1)",
                          border: "1px solid rgba(243, 214, 117, 0.2)",
                          borderRadius: "4px",
                          color: "#f3d675",
                          fontSize: "12px",
                        }}
                      >
                        {maintainer}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
