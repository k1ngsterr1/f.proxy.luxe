"use client";

import { postWhoIs } from "@/entities/whois/api/post/post-whois.api";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("whois");
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
      setError(t("errors.empty"));
      return;
    }

    try {
      setLoading(true);
      const result = await postWhoIs(query);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errors.unknown"));
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
            <span>{t("title")}</span>
          </h1>
          <p className="blist-text">{t("description")}</p>

          <form action="#" className="blist-form" onSubmit={handleSubmit}>
            <p className="blist-hint">{t("form.hint")}</p>
            <div className="btn-wrap">
              <input
                type="text"
                className="blist-inp"
                onChange={onChangeHandler}
                value={ip}
                placeholder={t("form.placeholder")}
              />
            </div>
            <div className="btn-wrap">
              <button
                type="submit"
                className="blist-btn btn"
                disabled={loading}
              >
                {loading ? t("form.loading") : t("form.submit")}
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
                    {t("fields.ip")}:
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
                  {t("tabs.general")}
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
                  {t("tabs.technical")}
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
                  {t("tabs.contact")}
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
                        {t("fields.ip")}:
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
                        {t("fields.host")}:
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
                        {t("fields.status")}:
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
                        {t("fields.range")}:
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
                        {t("fields.netname")}:
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
                        {t("fields.descr")}:
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
                        {t("fields.route")}:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        <div>
                          {t("fields.route")}: {data.route.route}
                        </div>
                        <div>
                          {t("fields.origin")}: {data.route.origin}
                        </div>
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
                        {t("fields.source")}:
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
                        {t("fields.geolocation")}:
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
                        {t("fields.admin")}:
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
                        {t("fields.tech")}:
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
                        {t("fields.person")}:
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        <div>
                          {t("fields.name")}: {data.person.name}
                        </div>
                        <div>
                          {t("fields.address")}: {data.person.address}
                        </div>
                        <div>
                          {t("fields.phone")}: {data.person.phone}
                        </div>
                        <div>
                          {t("fields.nic")}: {data.person.nicHdl}
                        </div>
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
                        {t("fields.registrant")}:
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
                    {t("fields.maintained")}:
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
