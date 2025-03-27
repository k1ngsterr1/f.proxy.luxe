"use client";
import { FC, useState } from "react";
import Image from "next/image";

import Logo from "@/assets/images/logo.png";
import RusFlag from "@/assets/images/rus-lang.png";
import EngFlag from "@/assets/images/eng-lang.png";
import Enter from "@/assets/images/enter.svg";
import Link from "next/link";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { useRouter } from "next/navigation";
import { usePopupStore } from "@/shared/store/use-popup.store";
import { BurgerMenu } from "@/features/menu/ui/burger-menu";
import { useTranslations } from "next-intl";

export const Header: FC = () => {
  const i18n = useTranslations();
  const { token } = useAuthStore();
  const { openPopup } = usePopupStore();
  const navigate = useRouter();

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <Link href="/" className="header-logo">
              <Image src={Logo} alt="Proxy Luxe" />
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
                <Link href="/ru" className="lang-item active">
                  <Image
                    src={RusFlag}
                    alt=""
                    layout="response"
                    width={40}
                    height={26}
                  />
                </Link>
                <Link href="/en" className="lang-item">
                  <Image
                    src={EngFlag}
                    alt=""
                    layout="response"
                    width={40}
                    height={26}
                  />
                </Link>
              </div>
              {token ? (
                <div onClick={() => navigate.push("/personal-account")}>
                  <a className="another-btn">
                    <span>{i18n("header.account")}</span>
                  </a>
                </div>
              ) : (
                <div className="header-btn">
                  <a
                    onClick={() => openPopup("auth-enter")}
                    className="btn-enter"
                  >
                    <Image
                      src={Enter}
                      alt=""
                      layout="response"
                      width={27}
                      height={27}
                    />
                    <span>{i18n("header.login")}</span>
                  </a>
                  <a onClick={() => openPopup("auth-reg")} className="btn-reg">
                    <span>{i18n("header.register")}</span>
                  </a>
                </div>
              )}
            </div>
            <div className="header-burger">
              <BurgerMenu />
            </div>
          </div>
        </div>
      </header>
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
            {i18n("nav-bar.anonimity-checker")}
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
    </>
  );
};
