"use client";

import { useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useMenuStore } from "@/features/menu/store/use-menu-store";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { useTranslations } from "next-intl";

export const BurgerMenu = () => {
  const { isOpen, toggle, close } = useMenuStore();
  const { token } = useAuthStore();
  const i18n = useTranslations();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [close]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div style={{ position: "relative", zIndex: 50 }}>
      <button
        onClick={toggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        style={{
          position: "relative",
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#f3d675",
          padding: 0,
        }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
        />
      )}

      {/* Mobile Menu */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          backgroundColor: "#000000",
          transform: isOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          padding: "20px 20px 24px",
          overflowY: "auto",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <Image src={logo} alt="Logo" />
        </div>

        <nav style={{ marginBottom: "32px" }}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  style={{
                    color: "#f3d675",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: "block",
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    transition: "color 0.2s ease",
                  }}
                  onClick={close}
                >
                  {i18n(item.i18nKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Secondary menu */}
        <div
          style={{
            backgroundColor: "rgba(243, 214, 117, 0.1)",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "32px",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {secondaryMenuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  style={{
                    color: "#f3d675",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                    display: "block",
                    padding: "8px 0",
                  }}
                  onClick={close}
                >
                  {i18n(item.i18nKey)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {token ? (
            <>
              {" "}
              <Link
                href="/login"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 24px",
                  backgroundColor: "#f3d675",
                  color: "#000000",
                  borderRadius: "50px",
                  fontWeight: 600,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  fontSize: "14px",
                  letterSpacing: "1px",
                  width: "100%",
                }}
              >
                {i18n("header.account")}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => close()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 24px",
                  backgroundColor: "#f3d675",
                  color: "#000000",
                  borderRadius: "50px",
                  fontWeight: 600,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  fontSize: "14px",
                  letterSpacing: "1px",
                  width: "100%",
                }}
              >
                {i18n("header.login")}
              </Link>
              <Link
                href="/registration"
                onClick={() => close()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 24px",
                  backgroundColor: "#f3d675",
                  color: "#000000",
                  borderRadius: "50px",
                  fontWeight: 600,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  fontSize: "14px",
                  letterSpacing: "1px",
                  width: "100%",
                }}
              >
                {i18n("header.register")}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const menuItems = [
  {
    id: 1,
    label: "КУПИТЬ ПРОКСТИ",
    href: "/buy-proxy",
    i18nKey: "header.buyProxy",
  },
  { id: 2, label: "ЦЕНЫ", href: "/prices", i18nKey: "header.prices" },
  {
    id: 3,
    label: "ПАРТНЕРСКАЯ ПРОГРАММА",
    href: "/partners",
    i18nKey: "header.partners",
  },
  { id: 4, label: "СТАТЬИ", href: "/articles", i18nKey: "header.articles" },
  { id: 5, label: "FAQ", href: "/faq", i18nKey: "header.faq" },
];

const secondaryMenuItems = [
  { id: 1, label: "МОЙ IP", href: "/services/my-ip", i18nKey: "nav-bar.my-ip" },
  {
    id: 2,
    label: "ПРОКСИ ЧЕКЕР",
    href: "/services/proxy-checker",
    i18nKey: "nav-bar.proxy-checker",
  },
  {
    id: 3,
    label: "МОЯ АНОНИМНОСТЬ",
    href: "/services/anonymity-checker",
    i18nKey: "nav-bar.anonymity-checker",
  },
  {
    id: 4,
    label: "ПРОВЕРКА ПОРТОВ",
    href: "/services/port-checker",
    i18nKey: "nav-bar.port-checker",
  },
  { id: 5, label: "WHOIS", href: "/services/whois", i18nKey: "nav-bar.whois" },
  {
    id: 6,
    label: "БЛЭК ЛИСТЫ",
    href: "/services/black-lists",
    i18nKey: "nav-bar.black-lists",
  },
  {
    id: 7,
    label: "ПОДДЕРЖКА IPV6",
    href: "/services/ipv6-checker",
    i18nKey: "nav-bar.ipv6-checker",
  },
];
