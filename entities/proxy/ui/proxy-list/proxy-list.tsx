"use client";

import type React from "react";
import { useState } from "react";
import { AlertCircle, Download, FileJson, FileText } from "lucide-react";
import { countryFlags } from "../../content/flags";

interface ProxyListItem {
  export: { ports: number; ext: string };
  login: string;
  password: string;
}
interface Proxy {
  id: string;
  ip: string;
  type: string;
  ports: number[];
  protocol: string;
  port_http: number | string;
  port_socks: number | string;
  country: string;
  login: string;
  password: string;
  package_list: ProxyListItem[];
}

export interface Props {
  proxies: Proxy[] | undefined;
}

const ProxyList: React.FC<Props> = ({ proxies }) => {
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  // Function to get protocol badge styles
  const getProtocolStyles = (protocol: string): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: 500,
      border: "1px solid",
    };

    switch (protocol?.toLowerCase()) {
      case "http":
        return {
          ...baseStyle,
          backgroundColor: "rgba(243, 214, 117, 0.1)",
          color: "#f3d675",
          borderColor: "rgba(243, 214, 117, 0.3)",
        };
      case "https":
        return {
          ...baseStyle,
          backgroundColor: "rgba(243, 214, 117, 0.15)",
          color: "#f3d675",
          borderColor: "rgba(243, 214, 117, 0.4)",
        };
      case "socks5":
        return {
          ...baseStyle,
          backgroundColor: "rgba(243, 214, 117, 0.2)",
          color: "#f3d675",
          borderColor: "rgba(243, 214, 117, 0.5)",
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          color: "#999999",
          borderColor: "rgba(255, 255, 255, 0.2)",
        };
    }
  };

  // Get country flag emoji
  const getCountryFlag = (countryCode: string): string => {
    if (!countryCode || typeof countryCode !== "string") return "🌐";

    const code = countryCode.toUpperCase().substring(0, 2);

    const specialCases: Record<string, string> = {
      UK: "GB",
      AN: "NL",
      SU: "RU",
    };

    const normalizedCode = specialCases[code] || code;

    if (countryFlags[normalizedCode]) {
      return countryFlags[normalizedCode];
    }

    try {
      const regionalIndicatorA = 0x1f1e6;
      const asciiA = "A".charCodeAt(0);

      // Проверяем что код состоит из 2 букв A-Z
      if (normalizedCode.length === 2 && /^[A-Z]{2}$/.test(normalizedCode)) {
        const firstChar =
          normalizedCode.charCodeAt(0) - asciiA + regionalIndicatorA;
        const secondChar =
          normalizedCode.charCodeAt(1) - asciiA + regionalIndicatorA;

        return String.fromCodePoint(firstChar, secondChar);
      }
    } catch (e) {
      console.warn(`Couldn't generate flag for ${countryCode}:`, e);
    }

    return "🌐";
  };

  // Export functions
  const exportToTxt = () => {
    if (!proxies || proxies.length === 0) return;

    let contentHttpFirstFormat = "";
    let contentHttpSecondFormat = "";
    console.log(proxies);

    proxies.forEach((proxy, index) => {
      if (proxy.type === "resident" && Array.isArray(proxy.package_list)) {
        if (index > 0) return;
        proxy.package_list.forEach((item) => {
          const ip = "104.22.51.115";
          const login = item.login;
          const password = item.password;
          for (let port = 10000; port < 10000 + item.export.ports; port++) {
            contentHttpFirstFormat += `${ip}:${port}:${login}:${password}\n`;
            contentHttpSecondFormat += `${login}:${password}@${ip}:${port}\n`;
          }
        });
      } else {
        const login = proxy.login || "user";
        const password = proxy.password || "pass";
        const ip = proxy.ip;
        const portHttp = proxy.port_http;

        if (portHttp) {
          contentHttpFirstFormat += `${ip}:${portHttp}:${login}:${password}\n`;
          contentHttpSecondFormat += `${login}:${password}@${ip}:${portHttp}\n`;
        }
      }
    });

    const fullContent = `${contentHttpFirstFormat}\n${contentHttpSecondFormat}`;

    const createAndDownloadFile = (content: string, fileName: string) => {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const dateStr = new Date().toISOString().split("T")[0];

    if (fullContent.trim()) {
      createAndDownloadFile(fullContent, `proxy-http-${dateStr}.txt`);
    }

    setExportMenuOpen(false);
  };

  const exportSocksToTxt = () => {
    if (!proxies || proxies.length === 0) return;

    let contentSocksFirstFormat = "";
    let contentSocksSecondFormat = "";

    proxies.forEach((proxy, index) => {
      if (proxy.type === "resident" && Array.isArray(proxy.package_list)) {
        if (index > 0) return;
        proxy.package_list.forEach((item) => {
          const ip = "104.22.51.115";
          const login = item.login;
          const password = item.password;
          for (let port = 10000; port < 10000 + item.export.ports; port++) {
            contentSocksFirstFormat += `${ip}:${port}:${login}:${password}\n`;
            contentSocksSecondFormat += `socks5://${login}:${password}@${ip}:${port}\n`;
          }
        });
      } else {
        const ip = proxy.ip;
        const portSocks = proxy.port_socks;
        const login = proxy.login || "user";
        const password = proxy.password || "pass";

        if (portSocks) {
          contentSocksFirstFormat += `${ip}:${portSocks}:${login}:${password}\n`;
          contentSocksSecondFormat += `socks5://${login}:${password}@${ip}:${portSocks}\n`;
        }
      }
    });

    const fullContent = `${contentSocksFirstFormat}\n${contentSocksSecondFormat}`;

    const createAndDownloadFile = (content: string, fileName: string) => {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const dateStr = new Date().toISOString().split("T")[0];

    if (fullContent.trim()) {
      createAndDownloadFile(fullContent, `proxy-socks-${dateStr}.txt`);
    }

    setExportMenuOpen(false);
  };

  console.log(proxies);

  // Styles - Black and Gold theme
  const cardStyle: React.CSSProperties = {
    backgroundColor: "#000000",
    borderRadius: "8px",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    overflow: "hidden",
  };

  const cardHeaderStyle: React.CSSProperties = {
    padding: "16px 24px",
    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: 600,
    color: "#FFFFFF",
    margin: 0,
  };

  const cardDescriptionStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#f3d675",
    marginTop: "4px",
    marginBottom: 0,
  };

  const cardContentStyle: React.CSSProperties = {
    padding: "0", // Remove padding to allow table to fill the space
  };

  const tableContainerStyle: React.CSSProperties = {
    maxHeight: "400px", // Fixed height for scrolling
    overflow: "auto",
    // Custom scrollbar for Firefox
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(243, 214, 117, 0.3) rgba(0, 0, 0, 0.1)",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
  };

  const tableHeadStyle: React.CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.95)", // Slightly transparent to show content underneath
    position: "sticky",
    top: 0,
    zIndex: 10, // Ensure header stays above table content
    backdropFilter: "blur(4px)", // Add blur effect for modern browsers
  };

  const tableHeaderCellStyle: React.CSSProperties = {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: 500,
    color: "#f3d675",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
  };

  const tableBodyStyle: React.CSSProperties = {};

  const tableRowStyle: React.CSSProperties = {
    borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
    transition: "background-color 0.2s",
  };

  const tableCellStyle: React.CSSProperties = {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#FFFFFF",
  };

  const tableCellEmphasisStyle: React.CSSProperties = {
    ...tableCellStyle,
    fontWeight: 500,
    color: "#f3d675",
  };

  const tableCellMonoStyle: React.CSSProperties = {
    ...tableCellStyle,
    fontFamily: "monospace",
  };

  const countryContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
  };

  const flagStyle: React.CSSProperties = {
    marginRight: "8px",
  };

  // Export button styles
  const exportButtonStyle: React.CSSProperties = {
    backgroundColor: "rgba(243, 214, 117, 0.1)",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "4px",
    color: "#f3d675",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    position: "relative",
  };

  const exportMenuStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: "4px",
    backgroundColor: "#111111",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "4px",
    padding: "8px 0",
    zIndex: 20,
    minWidth: "150px",
    display: exportMenuOpen ? "block" : "none",
  };

  const exportMenuItemStyle: React.CSSProperties = {
    padding: "8px 16px",
    color: "#FFFFFF",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  // Loading skeleton styles
  const skeletonStyle: React.CSSProperties = {
    height: "16px",
    backgroundColor: "rgba(243, 214, 117, 0.1)",
    borderRadius: "4px",
    animation: "pulse 1.5s ease-in-out infinite",
  };

  // Empty state styles
  const emptyStateContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 16px",
    textAlign: "center",
  };

  const emptyStateIconStyle: React.CSSProperties = {
    width: "48px",
    height: "48px",
    color: "#f3d675",
    marginBottom: "16px",
  };

  const emptyStateTitleStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: 500,
    color: "#FFFFFF",
    margin: 0,
  };

  const emptyStateDescriptionStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#999999",
    marginTop: "4px",
  };

  // Custom scrollbar styles
  const scrollbarStyles = `
    /* Webkit browsers like Chrome/Safari/Edge */
    .proxy-table-container::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    .proxy-table-container::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
    
    .proxy-table-container::-webkit-scrollbar-thumb {
      background: rgba(243, 214, 117, 0.3);
      border-radius: 4px;
    }
    
    .proxy-table-container::-webkit-scrollbar-thumb:hover {
      background: rgba(243, 214, 117, 0.5);
    }

    @keyframes pulse {
      0% {
        opacity: 0.6;
      }
      50% {
        opacity: 0.3;
      }
      100% {
        opacity: 0.6;
      }
    }
  `;

  // Loading state
  if (proxies === undefined) {
    return (
      <div style={cardStyle}>
        <style>{scrollbarStyles}</style>
        <div style={cardHeaderStyle}>
          <div>
            <h3 style={cardTitleStyle}>Список прокси</h3>
            <p style={cardDescriptionStyle}>
              Загрузка доступных прокси-серверов...
            </p>
          </div>
        </div>
        <div style={cardContentStyle}>
          <div className="proxy-table-container" style={tableContainerStyle}>
            <table style={tableStyle}>
              <thead style={tableHeadStyle}>
                <tr>
                  <th style={tableHeaderCellStyle}>IP-адрес</th>
                  <th style={tableHeaderCellStyle}>Протокол</th>
                  <th style={tableHeaderCellStyle}>Порт HTTP</th>
                  <th style={tableHeaderCellStyle}>Порт SOCKS</th>
                  <th style={tableHeaderCellStyle}>Страна</th>
                </tr>
              </thead>
              <tbody style={tableBodyStyle}>
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index} style={tableRowStyle}>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "120px" }}></div>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "80px" }}></div>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "60px" }}></div>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "60px" }}></div>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ ...skeletonStyle, width: "100px" }}></div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (proxies?.length === 0) {
    return (
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>
          <div>
            <h3 style={cardTitleStyle}>Список прокси</h3>
            <p style={cardDescriptionStyle}>Управление прокси-серверами</p>
          </div>
        </div>
        <div style={emptyStateContainerStyle}>
          <AlertCircle style={emptyStateIconStyle} />
          <h3 style={emptyStateTitleStyle}>Прокси не найдены</h3>
          <p style={emptyStateDescriptionStyle}>
            В данный момент нет доступных прокси-серверов.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div style={cardStyle}>
      <style>{scrollbarStyles}</style>
      <div style={cardHeaderStyle}>
        <div>
          <h3 style={cardTitleStyle}>Список прокси</h3>
          <p style={cardDescriptionStyle}>Управление прокси-серверами</p>
        </div>
        <div style={{ position: "relative" }}>
          <button
            style={exportButtonStyle}
            onClick={() => setExportMenuOpen(!exportMenuOpen)}
          >
            <Download size={16} />
            <span>Экспорт</span>
          </button>
          <div style={exportMenuStyle}>
            <div
              style={exportMenuItemStyle}
              onClick={exportToTxt}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(243, 214, 117, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <FileText size={16} />
              <span>Сохранить HTTP(s)</span>
            </div>
            <div
              style={exportMenuItemStyle}
              onClick={exportSocksToTxt}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(243, 214, 117, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <FileJson size={16} />
              <span>Сохранить SOCKS</span>
            </div>
          </div>
        </div>
      </div>
      <div style={cardContentStyle}>
        <div className="proxy-table-container" style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead style={tableHeadStyle}>
              <tr>
                <th style={tableHeaderCellStyle}>IP-адрес</th>
                <th style={tableHeaderCellStyle}>Протокол</th>
                <th style={tableHeaderCellStyle}>Порт HTTP</th>
                <th style={tableHeaderCellStyle}>Порт SOCKS</th>
                <th style={tableHeaderCellStyle}>Логин</th>
                <th style={tableHeaderCellStyle}>Пароль</th>
                <th style={tableHeaderCellStyle}>Страна</th>
              </tr>
            </thead>
            <tbody style={tableBodyStyle}>
              {proxies.map((proxy, index) => (
                <tr
                  key={index}
                  style={
                    index % 2 === 0
                      ? tableRowStyle
                      : {
                          ...tableRowStyle,
                          backgroundColor: "rgba(243, 214, 117, 0.03)",
                        }
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(243, 214, 117, 0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "" : "rgba(243, 214, 117, 0.03)";
                  }}
                >
                  <td style={tableCellEmphasisStyle}>{proxy.ip}</td>
                  <td style={tableCellStyle}>
                    <span style={getProtocolStyles(proxy.protocol)}>
                      {proxy.protocol?.toUpperCase()}
                    </span>
                  </td>
                  <td style={tableCellMonoStyle}>{proxy.ports || "—"}</td>
                  <td style={tableCellMonoStyle}>{proxy.ports || "—"}</td>
                  <td style={tableCellMonoStyle}>{proxy.login || "—"}</td>
                  <td style={tableCellMonoStyle}>{proxy.password || "—"}</td>
                  <td style={tableCellStyle}>
                    <div style={countryContainerStyle}>
                      <span style={flagStyle}>
                        {getCountryFlag(proxy.country)}
                      </span>
                      {proxy.country}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProxyList;
