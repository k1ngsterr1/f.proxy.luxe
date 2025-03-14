"use client";

import { useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useMenuStore } from "@/store/use-menu-store";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

export const BurgerMenu = () => {
  const { isOpen, toggle, close } = useMenuStore();

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
                  {item.label}
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
                  {item.label}
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
          <a
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
            ЛИЧНЫЙ КАБИНЕТ
          </a>
        </div>
      </div>
    </div>
  );
};

const menuItems = [
  { id: 1, label: "КУПИТЬ ПРОКСИ", href: "#" },
  { id: 2, label: "ЦЕНЫ", href: "#" },
  { id: 3, label: "ПАРТНЕРСКАЯ ПРОГРАММА", href: "#" },
  { id: 4, label: "СТАТЬИ", href: "#" },
  { id: 5, label: "FAQ", href: "#" },
];

const secondaryMenuItems = [
  { id: 1, label: "МОЙ IP", href: "#" },
  { id: 2, label: "ПРОКСИ ЧЕКЕР", href: "#" },
  { id: 3, label: "МОЯ АНОНИМНОСТЬ", href: "#" },
  { id: 4, label: "ПРОВЕРКА ПОРТОВ", href: "#" },
  { id: 5, label: "WHOIS", href: "#" },
  { id: 6, label: "БЛЭК ЛИСТЫ", href: "#" },
  { id: 7, label: "ПОДДЕРЖКА IPV6", href: "#" },
];
