"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";

import Logo from "../assets/images/logo.png";
import RusFlag from "../assets/images/rus-lang.png";
import EngFlag from "../assets/images/eng-lang.png";
import Enter from "../assets/images/enter.svg";
import Link from "next/link";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { BurgerMenu } from "./BurgerMenu";

export const Header: FC = () => {
  const { token } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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
                  КУПИТЬ ПРОКСИ
                </Link>
                <Link className="nav-item" href="/prices">
                  ЦЕНЫ
                </Link>
                <Link className="nav-item" href="/partners">
                  ПАРТНЕРСКАЯ ПРОГРАММА
                </Link>
                <Link className="nav-item" href="/articles">
                  СТАТЬИ
                </Link>
                <Link className="nav-item" href="/faq">
                  FAQ
                </Link>
              </nav>
              <div className="header-lang">
                <a href="#" className="lang-item active">
                  <Image
                    src={RusFlag}
                    alt=""
                    layout="response"
                    width={40}
                    height={26}
                  />
                </a>
                <a href="#" className="lang-item">
                  <Image
                    src={EngFlag}
                    alt=""
                    layout="response"
                    width={40}
                    height={26}
                  />
                </a>
              </div>
              {token ? (
                <div onClick={() => navigate.push("/personal-account")}>
                  <a className="another-btn">
                    <span>Личный кабинет</span>
                  </a>
                </div>
              ) : (
                <div className="header-btn">
                  <a
                    data-fancybox="auth"
                    href="#"
                    data-src="#auth-enter"
                    className="btn-enter"
                  >
                    <Image
                      src={Enter}
                      alt=""
                      layout="response"
                      width={27}
                      height={27}
                    />
                    <span>войти</span>
                  </a>
                  <a
                    data-fancybox="reg"
                    href="#"
                    data-src="#auth-reg"
                    className="btn-reg"
                  >
                    <span>регистрация</span>
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
            Мой IP
          </Link>
          <Link href="/services/proxy-checker" className="submenu-item">
            Прокси чекер
          </Link>
          <Link href="/services/anonymity-checker" className="submenu-item">
            Моя анонимность
          </Link>
          <Link href="/services/port-checker" className="submenu-item">
            Проверка портов
          </Link>
          <Link href="/services/whois" className="submenu-item">
            Whois
          </Link>
          <Link href="/services/black-lists" className="submenu-item">
            Блэк листы
          </Link>
          <Link href="/services/ipv6-checker" className="submenu-item">
            Поддержка IPv6
          </Link>
        </nav>
      </div>
    </>
  );
};
