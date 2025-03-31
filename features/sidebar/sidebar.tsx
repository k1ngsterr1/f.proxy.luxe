"use client";

import { useState } from "react";
import "@/assets/styles/normalize.css";
import "@/assets/styles/lk.css";
import "@/assets/styles/style.css";
import { ExchangeRates } from "@/components/ExchangeRates";
import ActiveLink from "@/components/ActiveLink";
import { Balance } from "@/entities/balance/ui/balance";
import { LogoutButton } from "@/entities/auth/ui/logout/logout-button";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const i18n = useTranslations("sidebar");
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Base styles
  const sidebarStyle = {
    backgroundColor: "#000000",
    color: "#ffffff",
    width: "280px",
    minHeight: "100vh",
    padding: "24px 0",
    display: "flex",
    flexDirection: "column" as const,
    borderRight: "1px solid rgba(243, 214, 117, 0.1)",
  };

  const sidebarHeaderStyle = {
    fontSize: "18px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    padding: "0 24px 16px",
    borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
    marginBottom: "24px",
    color: "#f3d675",
  };

  const balanceWrapperStyle = {
    padding: "0 24px",
    marginBottom: "32px",
  };

  const balanceLinkStyle = {
    display: "block",
    backgroundColor: "rgba(243, 214, 117, 0.1)",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#f3d675",
    textDecoration: "none",
    fontWeight: 600,
    transition: "all 0.2s ease",
  };

  const navStyle = {
    flex: 1,
    padding: "0 24px",
  };

  const ulStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    position: "relative" as const,
  };

  const verticalLineStyle = {
    position: "absolute" as const,
    top: "10px",
    bottom: "10px",
    left: "-12px",
    width: "2px",
    backgroundColor: "#f3d675",
    borderRadius: "4px",
    opacity: 0.5,
  };

  const getItemStyle = (path: string) => {
    const isActive = pathname.includes(path);
    const isHovered = hoveredItem === path;

    return {
      marginBottom: "16px",
      position: "relative" as const,
      transition: "all 0.2s ease",
    };
  };

  const getActiveIndicatorStyle = (path: string) => {
    const isActive = pathname.includes(path);

    return isActive
      ? {
          position: "absolute" as const,
          top: 0,
          bottom: 0,
          left: "-12px",
          width: "2px",
          backgroundColor: "#f3d675",
          borderRadius: "4px",
        }
      : {};
  };

  const getLinkStyle = (path: string) => {
    const isActive = pathname.includes(path);
    const isHovered = hoveredItem === path;

    return {
      color: isActive || isHovered ? "#f3d675" : "#ffffff",
      textDecoration: "none",
      display: "block",
      padding: "8px 0",
      fontSize: "15px",
      transition: "all 0.2s ease",
      textTransform: "uppercase" as const,
      fontWeight: isActive ? 600 : 500,
    };
  };

  const logoutItemStyle = {
    marginTop: "32px",
  };

  const logoutButtonStyle = {
    background: "none",
    border: "none",
    color: hoveredItem === "logout" ? "#f3d675" : "#ffffff",
    padding: "8px 0",
    fontSize: "15px",
    cursor: "pointer",
    textTransform: "uppercase" as const,
    fontWeight: 500,
    transition: "all 0.2s ease",
    width: "100%",
    textAlign: "left" as const,
  };

  const exchangeHeaderStyle = {
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    padding: "16px 24px",
    borderTop: "1px solid rgba(243, 214, 117, 0.1)",
    marginTop: "24px",
    color: "#f3d675",
  };

  const exchangeContainerStyle = {
    padding: "0 24px",
  };

  return (
    <div style={sidebarStyle}>
      <div style={sidebarHeaderStyle}>{i18n("title")}</div>

      <div style={balanceWrapperStyle}>
        <ActiveLink href="/personal-account" activeClassName="active">
          <div style={balanceLinkStyle}>
            <Balance />
          </div>
        </ActiveLink>
      </div>

      <div style={navStyle}>
        <ul style={ulStyle}>
          <div style={verticalLineStyle}></div>

          <li
            style={getItemStyle("/personal-account/proxy")}
            onMouseEnter={() => setHoveredItem("/personal-account/proxy")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {pathname.includes("/personal-account/proxy") && (
              <div
                style={getActiveIndicatorStyle("/personal-account/proxy")}
              ></div>
            )}
            <ActiveLink activeClassName="active" href="/personal-account/proxy">
              <div style={getLinkStyle("/personal-account/proxy")}>
                {i18n("menu.proxy")}
              </div>
            </ActiveLink>
          </li>

          <li
            style={getItemStyle("/personal-account/orders")}
            onMouseEnter={() => setHoveredItem("/personal-account/orders")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {pathname.includes("/personal-account/orders") && (
              <div
                style={getActiveIndicatorStyle("/personal-account/orders")}
              ></div>
            )}
            <ActiveLink
              activeClassName="active"
              href="/personal-account/orders"
            >
              <div style={getLinkStyle("/personal-account/orders")}>
                {i18n("menu.orders")}
              </div>
            </ActiveLink>
          </li>

          <li
            style={getItemStyle("/personal-account/payments")}
            onMouseEnter={() => setHoveredItem("/personal-account/payments")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {pathname.includes("/personal-account/payments") && (
              <div
                style={getActiveIndicatorStyle("/personal-account/payments")}
              ></div>
            )}
            <ActiveLink
              activeClassName="active"
              href="/personal-account/payments"
            >
              <div style={getLinkStyle("/personal-account/payments")}>
                {i18n("menu.payments")}
              </div>
            </ActiveLink>
          </li>

          <li
            style={getItemStyle("/personal-account/profile")}
            onMouseEnter={() => setHoveredItem("/personal-account/profile")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {pathname.includes("/personal-account/profile") && (
              <div
                style={getActiveIndicatorStyle("/personal-account/profile")}
              ></div>
            )}
            <ActiveLink
              activeClassName="active"
              href="/personal-account/profile"
            >
              <div style={getLinkStyle("/personal-account/profile")}>
                {i18n("menu.profile")}
              </div>
            </ActiveLink>
          </li>

          <li
            style={getItemStyle("/partners")}
            onMouseEnter={() => setHoveredItem("/partners")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {pathname.includes("/partners") && (
              <div style={getActiveIndicatorStyle("/partners")}></div>
            )}
            <ActiveLink activeClassName="active" href="/partners">
              <div style={getLinkStyle("/partners")}>
                {i18n("menu.partners")}
              </div>
            </ActiveLink>
          </li>

          <li
            style={logoutItemStyle}
            onMouseEnter={() => setHoveredItem("logout")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div style={logoutButtonStyle}>
              <LogoutButton />
            </div>
          </li>
        </ul>
      </div>

      <div style={exchangeHeaderStyle}>{i18n("exchangeRates")}</div>
      <div style={exchangeContainerStyle}>
        <ExchangeRates />
      </div>
    </div>
  );
};
