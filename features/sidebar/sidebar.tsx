"use client";

import { useState, useEffect } from "react";
import "@/assets/styles/normalize.css";
import "@/assets/styles/lk.css";
import "@/assets/styles/style.css";
import ActiveLink from "@/components/ActiveLink";
import { Balance } from "@/entities/balance/ui/balance";
import { LogoutButton } from "@/entities/auth/ui/logout/logout-button";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { useExchangeRates } from "@/entities/exchange-rates/api/hooks/use-get-crypto-rates.query";
import { useQueryClient } from "@tanstack/react-query";

export const Sidebar = () => {
  const queryClient = useQueryClient();
  const i18n = useTranslations("sidebar");
  const pathname = usePathname();
  const { data: userData } = useGetUser();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const {
    data: ratesData,
    isLoading: ratesLoading,
    isError: ratesError,
  } = useExchangeRates();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["me"],
    });
  }, [userData]);

  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine if mobile based on window width
  const isMobile = windowWidth < 768;

  // Responsive styles
  const sidebarWidth = isMobile ? "240px" : "280px";
  const fontSize = isMobile ? "13px" : "14px";
  const headerFontSize = isMobile ? "14px" : "16px";
  const iconSize = isMobile ? "18px" : "20px";
  const padding = isMobile ? "16px 16px" : "24px 24px";
  const itemPadding = isMobile ? "12px 16px" : "16px 24px";
  const verticalLineLeft = isMobile ? "28px" : "32px";
  const gapSize = isMobile ? "10px" : "12px";

  const sidebarStyle = {
    backgroundColor: "#0A0A0A",
    color: "#ffffff",
    width: sidebarWidth,
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column" as const,
    position: "relative" as const,
    overflowY: "auto" as const,
    overflowX: "hidden" as const,
  };

  const sidebarHeaderStyle = {
    fontSize: headerFontSize,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    padding: padding,
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    color: "#F3D675",
    display: "flex",
    alignItems: "center",
    gap: gapSize,
  };

  const userIconStyle = {
    width: iconSize,
    height: iconSize,
    color: "#F3D675",
  };

  const balanceWrapperStyle = {
    padding: isMobile ? "12px 16px" : "16px 24px",
    marginBottom: isMobile ? "16px" : "24px",
  };

  const balanceLinkStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(20, 20, 20, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "8px",
    padding: isMobile ? "12px" : "16px",
    color: "#F3D675",
    textDecoration: "none",
    fontWeight: 600,
    gap: gapSize,
    fontSize: fontSize,
  };

  const walletIconStyle = {
    width: iconSize,
    height: iconSize,
    color: "#F3D675",
  };

  const navStyle = {
    flex: 1,
    padding: "0",
  };

  const ulStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    position: "relative" as const,
  };

  const verticalLineStyle = {
    position: "absolute" as const,
    top: "0",
    bottom: "0",
    left: verticalLineLeft,
    width: "1px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  };

  const getItemStyle = (path: string) => {
    return {
      position: "relative" as const,
    };
  };

  const getLinkStyle = (path: string) => {
    const isActive = pathname.includes(path);

    return {
      color: isActive ? "#F3D675" : "#ffffff",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      padding: itemPadding,
      fontSize: fontSize,
      fontWeight: isActive ? 600 : 500,
      position: "relative" as const,
      gap: gapSize,
    };
  };

  const getIconContainerStyle = {
    width: iconSize,
    height: iconSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const getIconStyle = (path: string) => {
    const isActive = pathname.includes(path);

    return {
      width: iconSize,
      height: iconSize,
      color: isActive ? "#F3D675" : "#ffffff",
    };
  };

  const getChevronStyle = (path: string) => {
    const isActive = pathname.includes(path);

    return {
      marginLeft: "auto",
      color: "#F3D675",
      width: isMobile ? "14px" : "16px",
      height: isMobile ? "14px" : "16px",
      opacity: isActive ? 1 : 0,
    };
  };

  const logoutButtonStyle = {
    background: "none",
    border: "none",
    color: "#ffffff",
    padding: itemPadding,
    fontSize: fontSize,
    cursor: "pointer",
    fontWeight: 500,
    width: "100%",
    textAlign: "left" as const,
    display: "flex",
    alignItems: "center",
    gap: gapSize,
  };

  const logoutIconStyle = {
    width: iconSize,
    height: iconSize,
    color: "#ffffff",
  };

  const exchangeRatesHeaderStyle = {
    fontSize: fontSize,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    padding: isMobile ? "16px 16px 12px" : "24px 24px 16px",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    marginTop: isMobile ? "16px" : "24px",
    color: "#F3D675",
    display: "flex",
    alignItems: "center",
    gap: gapSize,
  };

  const exchangeRatesContainerStyle = {
    padding: isMobile ? "0 16px 12px" : "0 24px 16px",
  };

  // Exchange rates styles
  const ratesListStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
  };

  const rateItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isMobile ? "8px 0" : "10px 0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    fontSize: fontSize,
    color: "#ffffff",
  };

  const rateValueStyle = {
    color: "#F3D675",
    fontWeight: 500,
  };

  const loadingContainerStyle = {
    padding: isMobile ? "16px 0" : "20px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: fontSize,
  };

  const errorContainerStyle = {
    padding: isMobile ? "16px 0" : "20px 0",
    color: "#ff6b6b",
    fontSize: fontSize,
    textAlign: "center" as const,
  };

  const currencyRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const formatNumber = (value: number): string => {
    // Format with commas for thousands and limit to 2 decimal places
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // SVG icons as components
  const UserIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={userIconStyle}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const WalletIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={walletIconStyle}
    >
      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
      <path d="M20 12v4H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h14z"></path>
    </svg>
  );

  const GlobeIcon = ({ isActive }: { isActive: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        ...getIconStyle("/personal-account/proxy"),
        color: isActive ? "#F3D675" : "#ffffff",
      }}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );

  const CartIcon = ({ isActive }: { isActive: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        ...getIconStyle("/personal-account/orders"),
        color: isActive ? "#F3D675" : "#ffffff",
      }}
    >
      <circle cx="8" cy="21" r="1"></circle>
      <circle cx="19" cy="21" r="1"></circle>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
    </svg>
  );

  const CreditCardIcon = ({ isActive }: { isActive: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        ...getIconStyle("/personal-account/payments"),
        color: isActive ? "#F3D675" : "#ffffff",
      }}
    >
      <rect x="2" y="5" width="20" height="14" rx="2"></rect>
      <line x1="2" y1="10" x2="22" y2="10"></line>
    </svg>
  );

  const ProfileIcon = ({ isActive }: { isActive: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        ...getIconStyle("/personal-account/profile"),
        color: isActive ? "#F3D675" : "#ffffff",
      }}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const UsersIcon = ({ isActive }: { isActive: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        ...getIconStyle("/partners"),
        color: isActive ? "#F3D675" : "#ffffff",
      }}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const LogoutIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={logoutIconStyle}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  );

  const DollarIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F3D675"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: iconSize, height: iconSize }}
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );

  // Currency icons for exchange rates
  const UsdIcon = () => (
    <svg
      width={isMobile ? "14" : "16"}
      height={isMobile ? "14" : "16"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 1V23"
        stroke="#F3D675"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
        stroke="#F3D675"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const BtcIcon = () => (
    <svg
      width={isMobile ? "14" : "16"}
      height={isMobile ? "14" : "16"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 2V4M9.5 20V22M13.5 2V4M13.5 20V22M7.5 4H14.5C16.7091 4 18.5 5.79086 18.5 8V10C18.5 12.2091 16.7091 14 14.5 14H8.5C6.29086 14 4.5 15.7909 4.5 18V18C4.5 20.2091 6.29086 22 8.5 22H15.5M4.5 8H18.5"
        stroke="#F3D675"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const LtcIcon = () => (
    <svg
      width={isMobile ? "14" : "16"}
      height={isMobile ? "14" : "16"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#F3D675"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 14.5L15.5 8.5M8.5 8.5H12.5V16.5"
        stroke="#F3D675"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Exchange rates rendering
  const renderExchangeRates = () => {
    if (ratesLoading) {
      return (
        <div style={loadingContainerStyle}>
          <svg
            width={isMobile ? "16" : "20"}
            height={isMobile ? "16" : "20"}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ animation: "spin 1s linear infinite", marginRight: "8px" }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#F3D675"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="32"
              strokeDashoffset="10"
            />
          </svg>
          Loading rates...
        </div>
      );
    }

    if (ratesError || !ratesData) {
      return (
        <div style={errorContainerStyle}>
          <svg
            width={isMobile ? "14" : "16"}
            height={isMobile ? "14" : "16"}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "6px" }}
          >
            <circle cx="12" cy="12" r="10" stroke="#ff6b6b" strokeWidth="2" />
            <path
              d="M12 8V12"
              stroke="#ff6b6b"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="#ff6b6b" />
          </svg>
          Error fetching rates
        </div>
      );
    }

    return (
      <ul style={ratesListStyle}>
        <li style={rateItemStyle}>
          <div style={currencyRowStyle}>
            <UsdIcon />1 USD =
          </div>
          <span style={rateValueStyle}>{formatNumber(ratesData.USD)} RUB</span>
        </li>
        <li style={rateItemStyle}>
          <div style={currencyRowStyle}>
            <BtcIcon />1 BTC =
          </div>
          <span style={rateValueStyle}>{formatNumber(ratesData.BTC)} USD</span>
        </li>
        <li style={rateItemStyle}>
          <div style={currencyRowStyle}>
            <LtcIcon />1 LTC =
          </div>
          <span style={rateValueStyle}>{formatNumber(ratesData.LTC)} USD</span>
        </li>
      </ul>
    );
  };

  return (
    <div style={sidebarStyle}>
      <div style={sidebarHeaderStyle}>
        <UserIcon />
        {i18n("title")}
      </div>
      <div style={sidebarHeaderStyle}>ID: {userData?.id}</div>
      <div style={balanceWrapperStyle}>
        <ActiveLink href="/personal-account" activeClassName="active">
          <div style={balanceLinkStyle}>
            <WalletIcon />
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
            <ActiveLink activeClassName="active" href="/personal-account/proxy">
              <div style={getLinkStyle("/personal-account/proxy")}>
                <div style={getIconContainerStyle}>
                  <GlobeIcon
                    isActive={pathname.includes("/personal-account/proxy")}
                  />
                </div>
                {i18n("menu.proxy")}
                {pathname.includes("/personal-account/proxy") && (
                  <ChevronRight
                    style={getChevronStyle("/personal-account/proxy")}
                  />
                )}
              </div>
            </ActiveLink>
          </li>

          <li
            style={getItemStyle("/personal-account/orders")}
            onMouseEnter={() => setHoveredItem("/personal-account/orders")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <ActiveLink
              activeClassName="active"
              href="/personal-account/orders"
            >
              <div style={getLinkStyle("/personal-account/orders")}>
                <div style={getIconContainerStyle}>
                  <CartIcon
                    isActive={pathname.includes("/personal-account/orders")}
                  />
                </div>
                {i18n("menu.orders")}
                {pathname.includes("/personal-account/orders") && (
                  <ChevronRight
                    style={getChevronStyle("/personal-account/orders")}
                  />
                )}
              </div>
            </ActiveLink>
          </li>

          <li
            style={getItemStyle("/personal-account/payments")}
            onMouseEnter={() => setHoveredItem("/personal-account/payments")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <ActiveLink
              activeClassName="active"
              href="/personal-account/payments"
            >
              <div style={getLinkStyle("/personal-account/payments")}>
                <div style={getIconContainerStyle}>
                  <CreditCardIcon
                    isActive={pathname.includes("/personal-account/payments")}
                  />
                </div>
                {i18n("menu.payments")}
                {pathname.includes("/personal-account/payments") && (
                  <ChevronRight
                    style={getChevronStyle("/personal-account/payments")}
                  />
                )}
              </div>
            </ActiveLink>
          </li>

          <li
            style={getItemStyle("/personal-account/profile")}
            onMouseEnter={() => setHoveredItem("/personal-account/profile")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <ActiveLink
              activeClassName="active"
              href="/personal-account/profile"
            >
              <div style={getLinkStyle("/personal-account/profile")}>
                <div style={getIconContainerStyle}>
                  <ProfileIcon
                    isActive={pathname.includes("/personal-account/profile")}
                  />
                </div>
                {i18n("menu.profile")}
                {pathname.includes("/personal-account/profile") && (
                  <ChevronRight
                    style={getChevronStyle("/personal-account/profile")}
                  />
                )}
              </div>
            </ActiveLink>
          </li>

          <li
            style={getItemStyle("/partners")}
            onMouseEnter={() => setHoveredItem("/partner")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <ActiveLink
              activeClassName="active"
              href="/personal-account/partner"
            >
              <div style={getLinkStyle("/personal-account/partner")}>
                <div style={getIconContainerStyle}>
                  <UsersIcon isActive={pathname.includes("/partner")} />
                </div>
                {i18n("menu.partners")}
                {pathname.includes("/partner") && (
                  <ChevronRight style={getChevronStyle("/partner")} />
                )}
              </div>
            </ActiveLink>
          </li>

          <li
            style={getItemStyle("logout")}
            onMouseEnter={() => setHoveredItem("logout")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div style={logoutButtonStyle}>
              <div style={getIconContainerStyle}>
                <LogoutIcon />
              </div>
              <LogoutButton />
            </div>
          </li>
        </ul>
      </div>

      <div style={exchangeRatesHeaderStyle}>
        <DollarIcon />
        {i18n("exchangeRates")}
      </div>
      <div style={exchangeRatesContainerStyle}>{renderExchangeRates()}</div>
    </div>
  );
};
