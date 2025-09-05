"use client";

import type React from "react";

import { useState } from "react";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useTranslations } from "next-intl";
import {
  Phone,
  Mail,
  Globe,
  FileText,
  User,
  Copy,
  Check,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

export default function ContactsPage() {
  const i18n = useTranslations("contacts");
  const t = useTranslations();
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const contactInfo = [
    {
      id: "website",
      icon: <Globe size={20} />,
      label: i18n("website"),
      value: "proxy.luxe",
      link: "https://proxy.luxe",
    },
    {
      id: "name",
      icon: <User size={20} />,
      label: i18n("name"),
      value: i18n("name_value"),
    },
    {
      id: "inn",
      icon: <FileText size={20} />,
      label: i18n("inn"),
      value: "590621469075",
    },
    {
      id: "phone",
      icon: <Phone size={20} />,
      label: i18n("phone"),
      value: "+79155472727",
      link: "tel:+79155472727",
    },
    {
      id: "email",
      icon: <Mail size={20} />,
      label: "E-mail",
      value: "admin@proxy.luxe",
      link: "mailto:admin@proxy.luxe",
    },
    {
      id: "telegram",
      icon: <MessageSquare size={20} />,
      label: "Telegram",
      value: "@andreyproxy",
      link: "https://t.me/andreyproxy",
    },
  ];

  const handleCopy = (id: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <main
      style={{
        paddingTop: isMobile ? 112 : 256,
        backgroundColor: "#000000",
        color: "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      <title>{t("contactss.title")}</title>
      <section style={{ padding: isMobile ? "20px 16px" : "40px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Hero Section */}
          <div
            style={{
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: isMobile ? "28px" : "42px",
                fontWeight: "bold",
                marginBottom: "16px",
                color: "#f3d675",
                position: "relative",
                display: "inline-block",
              }}
            >
              {i18n("title")}
              <span
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80px",
                  height: "3px",
                  background:
                    "linear-gradient(90deg, rgba(243,214,117,0) 0%, rgba(243,214,117,1) 50%, rgba(243,214,117,0) 100%)",
                }}
              ></span>
            </h1>
          </div>
          <div
            style={{
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "40px",
              alignItems: "start",
            }}
          >
            {/* Contact Information */}
            <div
              style={{
                backgroundColor: "rgba(243, 214, 117, 0.05)",
                borderRadius: "12px",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                padding: "32px",
                height: "fit-content",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {contactInfo.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      padding: "16px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      transition: "all 0.2s ease",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        minWidth: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(243, 214, 117, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#f3d675",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#999999",
                          marginBottom: "4px",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                        }}
                      >
                        {item.link ? (
                          <a
                            href={item.link}
                            target={
                              item.id === "website" || item.id === "telegram"
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              item.id === "website" || item.id === "telegram"
                                ? "noopener noreferrer"
                                : undefined
                            }
                            style={{
                              color: "#FFFFFF",
                              textDecoration: "none",
                              fontSize: "16px",
                              fontWeight: "500",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            {item.value}
                            {(item.id === "website" ||
                              item.id === "telegram") && (
                              <ExternalLink
                                size={14}
                                style={{ opacity: 0.6 }}
                              />
                            )}
                          </a>
                        ) : (
                          <span
                            style={{
                              color: "#FFFFFF",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            {item.value}
                          </span>
                        )}
                        <button
                          onClick={() => handleCopy(item.id, item.value)}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "4px",
                            borderRadius: "4px",
                            color: copied === item.id ? "#4CAF50" : "#999999",
                            transition: "all 0.2s ease",
                          }}
                          title={i18n("copy")}
                        >
                          {copied === item.id ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
