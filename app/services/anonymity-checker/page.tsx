"use client";

import { Loader } from "@/shared/ui/loader";
import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import {
  AlertCircle,
  CheckCircle,
  Globe,
  Shield,
  MapPin,
  Lock,
} from "lucide-react";

interface IpData {
  ip: string;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  postal?: string;
  timezone?: string;
  loc?: string;
  org?: string;
}

interface ProxyData {
  isProxy: boolean;
  isVPN: boolean;
  isTor: boolean;
}

interface BlacklistData {
  isBlacklisted: boolean;
  reports: number;
}

export default function AnonymityChecker() {
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [proxyData, setProxyData] = useState<ProxyData>({
    isProxy: false,
    isVPN: false,
    isTor: false,
  });
  const [blacklistData, setBlacklistData] = useState<BlacklistData>({
    isBlacklisted: false,
    reports: 0,
  });
  const [webRTC, setWebRTC] = useState(false);
  const [flash, setFlash] = useState(false);
  const [java, setJava] = useState(false);
  const [activeX, setActiveX] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [anonymityScore, setAnonymityScore] = useState(0);
  const isMobile = useIsMobile();

  // Получаем данные о IP
  useEffect(() => {
    const fetchIpData = async () => {
      try {
        const response = await fetch(
          "https://ipinfo.io/json?token=d81de8201144f2"
        );
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        const data = await response.json();
        setIpData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      }
    };

    fetchIpData();
  }, []);

  // Получаем данные о браузере и системе
  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    setUserData(result);
  }, []);

  // Проверка прокси, VPN, Tor
  useEffect(() => {
    const fetchProxyData = async () => {
      if (!ipData?.ip) return;

      try {
        const response = await fetch(
          `https://v2.api.iphub.info/ip/${ipData.ip}`,
          {
            headers: {
              "X-Key": "MjcwNTQ6eVdqOVFua0xSZ0hLZGtHbnRLcEJxaWFSTEVDOGVLN0Y=",
            },
          }
        );
        const data = await response.json();
        setProxyData({
          isProxy: data.proxy === 1,
          isVPN: data.vpn === 1,
          isTor: data.tor === 1,
        });
      } catch (err) {
        console.error("Ошибка при проверке прокси/VPN/Tor:", err);
      }
    };

    fetchProxyData();
  }, [ipData]);

  // Проверка черного списка
  useEffect(() => {
    const fetchBlacklistData = async () => {
      if (!ipData?.ip) return;

      try {
        const response = await fetch(
          `https://api.abuseipdb.com/api/v2/check?ipAddress=${ipData.ip}`,
          {
            headers: {
              Key: "94ae7b413f40717fa4812d85526f40892f6e9c041eaa9d6c558812349d5fe0ffece3f68b5e6fc61d",
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setBlacklistData({
          isBlacklisted: data.data.abuseConfidenceScore > 0,
          reports: data.data.totalReports,
        });
      } catch (err) {
        console.error("Ошибка при проверке черного списка:", err);
      }
    };

    fetchBlacklistData();
  }, [ipData]);

  // Проверка WebRTC
  useEffect(() => {
    const checkWebRTC = () => {
      return new Promise((resolve) => {
        const pc = new RTCPeerConnection({ iceServers: [] });
        pc.createDataChannel("");
        pc.createOffer()
          .then((offer) => pc.setLocalDescription(offer))
          .catch(() => {});

        pc.onicecandidate = (ice) => {
          if (!ice.candidate) {
            resolve(false);
            return;
          }
          const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
          const ipMatch = ipRegex.exec(ice.candidate.candidate);
          if (ipMatch) {
            resolve(true);
          } else {
            resolve(false);
          }
        };
      });
    };

    checkWebRTC().then(setWebRTC as any);
  }, []);

  // Проверка Flash, Java, ActiveX
  useEffect(() => {
    const checkFlash = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return Boolean(navigator.mimeTypes["application/x-shockwave-flash"]);
      } catch (e) {
        return false;
      }
    };

    const checkJava = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        return Boolean(navigator.javaEnabled());
      } catch (e) {
        return false;
      }
    };

    const checkActiveX = () => {
      try {
        // @ts-ignore
        return Boolean(window.ActiveXObject);
      } catch (e) {
        return false;
      }
    };

    setFlash(checkFlash());
    setJava(checkJava());
    setActiveX(checkActiveX());
  }, []);

  // Calculate anonymity score
  useEffect(() => {
    if (ipData && userData) {
      let score = 100;

      // Deduct points for each privacy issue
      if (proxyData.isProxy) score -= 5;
      if (proxyData.isVPN) score -= 5;
      if (proxyData.isTor) score -= 5;
      if (blacklistData.isBlacklisted) score -= 15;
      if (webRTC) score -= 20;
      if (flash) score -= 10;
      if (java) score -= 10;
      if (activeX) score -= 10;

      // Ensure score is between 0 and 100
      score = Math.max(0, Math.min(100, score));
      setAnonymityScore(score);

      setLoading(false);
    }
  }, [
    ipData,
    userData,
    proxyData,
    blacklistData,
    webRTC,
    flash,
    java,
    activeX,
  ]);

  if (loading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#000000",
          color: "#FF5252",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(255, 82, 82, 0.1)",
            padding: "16px 24px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 82, 82, 0.3)",
          }}
        >
          <AlertCircle size={24} />
          <span>Ошибка: {error}</span>
        </div>
      </div>
    );
  }

  if (!ipData || !userData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#000000",
          color: "#f3d675",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(243, 214, 117, 0.1)",
            padding: "16px 24px",
            borderRadius: "8px",
            border: "1px solid rgba(243, 214, 117, 0.2)",
          }}
        >
          <AlertCircle size={24} />
          <span>Данные не найдены</span>
        </div>
      </div>
    );
  }

  // Разделяем координаты на широту и долготу
  const [latitude, longitude] = ipData.loc
    ? ipData.loc.split(",")
    : [null, null];

  // Get anonymity level text and color
  const getAnonymityLevel = () => {
    if (anonymityScore >= 90) return { text: "Отличная", color: "#4CAF50" };
    if (anonymityScore >= 70) return { text: "Хорошая", color: "#8BC34A" };
    if (anonymityScore >= 50) return { text: "Средняя", color: "#FFC107" };
    if (anonymityScore >= 30) return { text: "Низкая", color: "#FF9800" };
    return { text: "Критическая", color: "#FF5252" };
  };

  const anonymityLevel = getAnonymityLevel();

  return (
    <main
      style={{
        backgroundColor: "#000000",
        color: "#FFFFFF",
        paddingTop: isMobile ? 356 : 256,
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
            <span style={{ color: "#f3d675" }}>ПРОВЕРКА АНОНИМНОСТИ</span>
          </h1>

          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              marginBottom: "24px",
              color: "#CCCCCC",
            }}
          >
            С помощью данного сервиса вы можете проверить, насколько вы анонимны
            в сети, насколько данные, предоставляемые вашим
            компьютером/браузером, совпадают с данными, предоставляемыми вашим
            IP-адресом.
          </p>

          {/* Anonymity Score Card */}
          <div
            style={{
              backgroundColor: "rgba(243, 214, 117, 0.05)",
              borderRadius: "8px",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              padding: isMobile ? "16px" : "24px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "space-between",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "16px" : "0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Shield
                size={isMobile ? 32 : 40}
                style={{ color: anonymityLevel.color }}
              />
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#999999",
                    marginBottom: "4px",
                  }}
                >
                  Уровень анонимности:
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "20px" : "24px",
                    fontWeight: "bold",
                    color: anonymityLevel.color,
                  }}
                >
                  {anonymityLevel.text} ({anonymityScore}%)
                </div>
              </div>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: "#f3d675",
                  color: "#000000",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Lock size={16} />
                Скрыть IP
              </button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "24px",
            }}
          >
            {/* Left Column - IP and System Information */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* IP Information Card */}
              <div
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
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
                    IP информация
                  </h3>
                </div>

                <div style={{ padding: "16px" }}>
                  {/* IP Address */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Мой IP
                    </div>
                    <div
                      style={{
                        color: "#f3d675",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      {ipData.ip}
                    </div>
                  </div>

                  {/* Hostname */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Хост
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
                        {ipData.hostname || "Неизвестно"}
                      </span>
                      <a
                        href="#"
                        style={{
                          backgroundColor: "rgba(243, 214, 117, 0.1)",
                          color: "#f3d675",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          textDecoration: "none",
                          border: "1px solid rgba(243, 214, 117, 0.2)",
                        }}
                      >
                        Whois
                      </a>
                    </div>
                  </div>

                  {/* Country */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Страна
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
                        {ipData.country} ({ipData.region})
                      </span>
                    </div>
                  </div>

                  {/* City */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Город
                    </div>
                    <div style={{ color: "#FFFFFF", fontSize: "14px" }}>
                      {ipData.city || "Неизвестно"}
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Почтовый индекс
                    </div>
                    <div style={{ color: "#FFFFFF", fontSize: "14px" }}>
                      {ipData.postal || "Неизвестно"}
                    </div>
                  </div>

                  {/* Coordinates */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Координаты
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
                        {ipData.loc || "Неизвестно"}
                      </span>
                      <a
                        href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: "rgba(243, 214, 117, 0.1)",
                          color: "#f3d675",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          textDecoration: "none",
                          border: "1px solid rgba(243, 214, 117, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <MapPin size={12} />
                        Карта
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Information Card */}
              <div
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
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
                    Системная информация
                  </h3>
                </div>

                <div style={{ padding: "16px" }}>
                  {/* OS */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>ОС</div>
                    <div style={{ color: "#FFFFFF", fontSize: "14px" }}>
                      {userData.os.name} {userData.os.version}
                    </div>
                  </div>

                  {/* Browser */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Браузер
                    </div>
                    <div style={{ color: "#FFFFFF", fontSize: "14px" }}>
                      {userData.browser.name} {userData.browser.version}
                    </div>
                  </div>

                  {/* User Agent */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: isMobile ? "flex-start" : "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? "8px" : "0",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      User Agent
                    </div>
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontSize: "12px",
                        maxWidth: isMobile ? "100%" : "300px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: isMobile ? "normal" : "nowrap",
                      }}
                    >
                      {navigator.userAgent}
                    </div>
                  </div>

                  {/* Language */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Язык
                    </div>
                    <div style={{ color: "#FFFFFF", fontSize: "14px" }}>
                      {navigator.language}
                    </div>
                  </div>

                  {/* Screen */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Экран
                    </div>
                    <div style={{ color: "#FFFFFF", fontSize: "14px" }}>
                      {window.screen.width}x{window.screen.height},{" "}
                      {window.screen.colorDepth} бит
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Information Card */}
              <div
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
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
                    Временная информация
                  </h3>
                </div>

                <div style={{ padding: "16px" }}>
                  {/* Timezone */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Временная зона IP
                    </div>
                    <div style={{ color: "#FFFFFF", fontSize: "14px" }}>
                      {ipData.timezone || "Неизвестно"}
                    </div>
                  </div>

                  {/* IP Time */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Время IP
                    </div>
                    <div style={{ color: "#FFFFFF", fontSize: "14px" }}>
                      {new Date().toLocaleString()}
                    </div>
                  </div>

                  {/* System Time */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Время системное
                    </div>
                    <div style={{ color: "#FFFFFF", fontSize: "14px" }}>
                      {new Date().toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Anonymity Status */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Anonymity Status Card */}
              <div
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
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
                    Статус анонимности
                  </h3>
                </div>

                <div style={{ padding: "16px" }}>
                  {/* Proxy */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Прокси
                    </div>
                    <div
                      style={{
                        backgroundColor: proxyData.isProxy
                          ? "rgba(255, 82, 82, 0.1)"
                          : "rgba(76, 175, 80, 0.1)",
                        color: proxyData.isProxy ? "#FF5252" : "#4CAF50",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        border: proxyData.isProxy
                          ? "1px solid rgba(255, 82, 82, 0.3)"
                          : "1px solid rgba(76, 175, 80, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {proxyData.isProxy ? (
                        <AlertCircle size={12} />
                      ) : (
                        <CheckCircle size={12} />
                      )}
                      {proxyData.isProxy ? "Обнаружено" : "Не обнаружено"}
                    </div>
                  </div>

                  {/* VPN */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      VPN
                    </div>
                    <div
                      style={{
                        backgroundColor: proxyData.isVPN
                          ? "rgba(255, 82, 82, 0.1)"
                          : "rgba(76, 175, 80, 0.1)",
                        color: proxyData.isVPN ? "#FF5252" : "#4CAF50",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        border: proxyData.isVPN
                          ? "1px solid rgba(255, 82, 82, 0.3)"
                          : "1px solid rgba(76, 175, 80, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {proxyData.isVPN ? (
                        <AlertCircle size={12} />
                      ) : (
                        <CheckCircle size={12} />
                      )}
                      {proxyData.isVPN ? "Обнаружено" : "Не обнаружено"}
                    </div>
                  </div>

                  {/* Tor */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Tor
                    </div>
                    <div
                      style={{
                        backgroundColor: proxyData.isTor
                          ? "rgba(255, 82, 82, 0.1)"
                          : "rgba(76, 175, 80, 0.1)",
                        color: proxyData.isTor ? "#FF5252" : "#4CAF50",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        border: proxyData.isTor
                          ? "1px solid rgba(255, 82, 82, 0.3)"
                          : "1px solid rgba(76, 175, 80, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {proxyData.isTor ? (
                        <AlertCircle size={12} />
                      ) : (
                        <CheckCircle size={12} />
                      )}
                      {proxyData.isTor ? "Обнаружено" : "Не обнаружено"}
                    </div>
                  </div>

                  {/* Blacklist */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Черный список
                    </div>
                    <div
                      style={{
                        backgroundColor: blacklistData.isBlacklisted
                          ? "rgba(255, 82, 82, 0.1)"
                          : "rgba(76, 175, 80, 0.1)",
                        color: blacklistData.isBlacklisted
                          ? "#FF5252"
                          : "#4CAF50",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        border: blacklistData.isBlacklisted
                          ? "1px solid rgba(255, 82, 82, 0.3)"
                          : "1px solid rgba(76, 175, 80, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {blacklistData.isBlacklisted ? (
                        <AlertCircle size={12} />
                      ) : (
                        <CheckCircle size={12} />
                      )}
                      {blacklistData.isBlacklisted
                        ? `Обнаружено (${blacklistData.reports} отчетов)`
                        : "Не обнаружено"}
                    </div>
                  </div>

                  {/* WebRTC */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      WebRTC
                    </div>
                    <div
                      style={{
                        backgroundColor: webRTC
                          ? "rgba(255, 82, 82, 0.1)"
                          : "rgba(76, 175, 80, 0.1)",
                        color: webRTC ? "#FF5252" : "#4CAF50",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        border: webRTC
                          ? "1px solid rgba(255, 82, 82, 0.3)"
                          : "1px solid rgba(76, 175, 80, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {webRTC ? (
                        <AlertCircle size={12} />
                      ) : (
                        <CheckCircle size={12} />
                      )}
                      {webRTC ? "Утечка" : "Защищено"}
                    </div>
                  </div>

                  {/* Flash */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Flash
                    </div>
                    <div
                      style={{
                        backgroundColor: flash
                          ? "rgba(255, 82, 82, 0.1)"
                          : "rgba(76, 175, 80, 0.1)",
                        color: flash ? "#FF5252" : "#4CAF50",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        border: flash
                          ? "1px solid rgba(255, 82, 82, 0.3)"
                          : "1px solid rgba(76, 175, 80, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {flash ? (
                        <AlertCircle size={12} />
                      ) : (
                        <CheckCircle size={12} />
                      )}
                      {flash ? "Включен" : "Отключен"}
                    </div>
                  </div>

                  {/* Java */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      Java
                    </div>
                    <div
                      style={{
                        backgroundColor: java
                          ? "rgba(255, 82, 82, 0.1)"
                          : "rgba(76, 175, 80, 0.1)",
                        color: java ? "#FF5252" : "#4CAF50",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        border: java
                          ? "1px solid rgba(255, 82, 82, 0.3)"
                          : "1px solid rgba(76, 175, 80, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {java ? (
                        <AlertCircle size={12} />
                      ) : (
                        <CheckCircle size={12} />
                      )}
                      {java ? "Включен" : "Отключен"}
                    </div>
                  </div>

                  {/* ActiveX */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                    }}
                  >
                    <div style={{ color: "#999999", fontSize: "14px" }}>
                      ActiveX
                    </div>
                    <div
                      style={{
                        backgroundColor: activeX
                          ? "rgba(255, 82, 82, 0.1)"
                          : "rgba(76, 175, 80, 0.1)",
                        color: activeX ? "#FF5252" : "#4CAF50",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        border: activeX
                          ? "1px solid rgba(255, 82, 82, 0.3)"
                          : "1px solid rgba(76, 175, 80, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {activeX ? (
                        <AlertCircle size={12} />
                      ) : (
                        <CheckCircle size={12} />
                      )}
                      {activeX ? "Включен" : "Отключен"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations Card */}
              <div
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
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
                    Рекомендации по улучшению анонимности
                  </h3>
                </div>

                <div style={{ padding: "16px" }}>
                  <ul
                    style={{
                      margin: 0,
                      padding: "0 0 0 20px",
                      color: "#FFFFFF",
                    }}
                  >
                    {webRTC && (
                      <li style={{ marginBottom: "8px" }}>
                        <span style={{ color: "#f3d675" }}>
                          Отключите WebRTC
                        </span>{" "}
                        в вашем браузере или используйте расширение для
                        блокировки WebRTC утечек.
                      </li>
                    )}
                    {(flash || java || activeX) && (
                      <li style={{ marginBottom: "8px" }}>
                        <span style={{ color: "#f3d675" }}>
                          Отключите устаревшие технологии
                        </span>{" "}
                        (Flash, Java, ActiveX), которые могут представлять
                        угрозу безопасности.
                      </li>
                    )}
                    {!proxyData.isVPN && (
                      <li style={{ marginBottom: "8px" }}>
                        <span style={{ color: "#f3d675" }}>
                          Используйте надежный VPN-сервис
                        </span>{" "}
                        для скрытия вашего реального IP-адреса.
                      </li>
                    )}
                    <li style={{ marginBottom: "8px" }}>
                      <span style={{ color: "#f3d675" }}>
                        Используйте режим инкогнито
                      </span>{" "}
                      или приватный режим браузера для минимизации отслеживания.
                    </li>
                    <li style={{ marginBottom: "8px" }}>
                      <span style={{ color: "#f3d675" }}>
                        Установите расширения для блокировки рекламы и трекеров
                      </span>
                      , такие как uBlock Origin или Privacy Badger.
                    </li>
                    <li>
                      <span style={{ color: "#f3d675" }}>
                        Рассмотрите возможность использования Tor Browser
                      </span>{" "}
                      для максимальной анонимности.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Additional Resources */}
              <div
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <Globe size={24} style={{ color: "#f3d675" }} />
                <div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "4px",
                    }}
                  >
                    Нужна дополнительная защита?
                  </div>
                  <div style={{ color: "#999999", fontSize: "12px" }}>
                    Используйте наши прокси-сервисы для повышения анонимности в
                    сети.
                  </div>
                </div>
                <button
                  style={{
                    marginLeft: isMobile ? "0" : "auto",
                    backgroundColor: "#f3d675",
                    color: "#000000",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    width: isMobile ? "100%" : "auto",
                    marginTop: isMobile ? "12px" : "0",
                  }}
                >
                  Купить прокси
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
