"use client";

import { type FC, useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import Logo from "@/assets/images/logo.png";
import RusFlag from "@/assets/images/rus-lang.png";
import EngFlag from "@/assets/images/eng-lang.png";
import Enter from "@/assets/images/enter.svg";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { usePopupStore } from "@/shared/store/use-popup.store";
import { BurgerMenu } from "@/features/menu/ui/burger-menu";

export const Header: FC = () => {
  const i18n = useTranslations();
  const { token } = useAuthStore();
  const { openPopup } = usePopupStore();
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1100);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const getPathForLocale = (targetLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    const supportedLocales = ["en", "ru"];

    if (supportedLocales.includes(segments[0])) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }

    return "/" + segments.join("/");
  };

  const changeLanguage = (lang: string) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax; Secure`;
    const newPath = getPathForLocale(lang);
    router.push(newPath);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <Link href="/" className="header-logo">
              <Image
                src={Logo || "/placeholder.svg"}
                alt="Proxy Luxe"
                width={isMobile ? 140 : 400}
                height={isMobile ? 40 : 66}
              />
            </Link>
            <div id="menu" className="header-mobmenu">
              <nav className="header-menu">
                <Link className="nav-item" href="/buy-proxy">
                  {i18n("header.buyProxy")}
                </Link>
                <Link className="nav-item" href="/prices">
                  {i18n("header.prices")}
                </Link>
                <Link className="nav-item" href="/partners">
                  {i18n("header.partners")}
                </Link>
                <Link className="nav-item" href="/articles">
                  {i18n("header.articles")}
                </Link>
                <Link className="nav-item" href="/faq">
                  {i18n("header.faq")}
                </Link>
              </nav>
              <div className="header-lang">
                <span
                  onClick={() => changeLanguage("ru")}
                  className={`lang-item ${locale === "ru" ? "active" : ""}`}
                >
                  <Image
                    src={RusFlag || "/placeholder.svg"}
                    alt="Русский"
                    width={40}
                    height={26}
                  />
                </span>
                <span
                  onClick={() => changeLanguage("en")}
                  className={`lang-item ${locale === "en" ? "active" : ""}`}
                >
                  <Image
                    src={EngFlag || "/placeholder.svg"}
                    alt="English"
                    width={40}
                    height={26}
                  />
                </span>
              </div>
              {token ? (
                <div
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => router.push(`/${locale}/personal-account`)}
                >
                  <a className="another-btn">
                    <span>{i18n("header.account")}</span>
                  </a>
                </div>
              ) : (
                <div className="header-btn">
                  <span
                    onClick={() => openPopup("auth-enter")}
                    className="btn-enter"
                  >
                    <Image
                      src={Enter || "/placeholder.svg"}
                      alt=""
                      width={27}
                      height={27}
                    />
                    <span>{i18n("header.login")}</span>
                  </span>
                  <span
                    onClick={() => openPopup("auth-reg")}
                    className="btn-reg"
                  >
                    <span>{i18n("header.register")}</span>
                  </span>
                </div>
              )}
            </div>
            {isMobile && (
              <div
                className="header-right-section"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row-reverse",
                }}
              >
                <div
                  className="header-lang"
                  style={{
                    display: "flex",
                    marginRight: "15px",
                  }}
                >
                  <span
                    onClick={() => changeLanguage("ru")}
                    className={`lang-item ${locale === "ru" ? "active" : ""}`}
                  >
                    <Image
                      src={RusFlag || "/placeholder.svg"}
                      alt="Русский"
                      width={40}
                      height={26}
                    />
                  </span>
                  <span
                    onClick={() => changeLanguage("en")}
                    className={`lang-item ${locale === "en" ? "active" : ""}`}
                  >
                    <Image
                      src={EngFlag || "/placeholder.svg"}
                      alt="English"
                      width={40}
                      height={26}
                    />
                  </span>
                </div>
                <div className="header-burger">
                  <BurgerMenu />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {!isMobile && (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <nav className="submenu">
            <Link href="/services/my-ip" className="submenu-item">
              {i18n("nav-bar.my-ip")}
            </Link>
            <Link href="/services/proxy-checker" className="submenu-item">
              {i18n("nav-bar.proxy-checker")}
            </Link>
            <Link href="/services/anonymity-checker" className="submenu-item">
              {i18n("nav-bar.anonymity-checker")}
            </Link>
            <Link href="/services/port-checker" className="submenu-item">
              {i18n("nav-bar.port-checker")}
            </Link>
            <Link href="/services/whois" className="submenu-item">
              {i18n("nav-bar.whois")}
            </Link>
            <Link href="/services/black-lists" className="submenu-item">
              {i18n("nav-bar.black-lists")}
            </Link>
            <Link href="/services/ipv6-checker" className="submenu-item">
              {i18n("nav-bar.ipv6-checker")}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};
