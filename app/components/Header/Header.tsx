import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

export const Header: FC = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <Link href="/" className="header-logo">
              <Image
                src="/img/logo.png"
                alt="Proxy Luxe"
                layout="responsive"
                width={230}
                height={70}
              />
            </Link>
            <div id="menu" className="header-mobmenu">
              <nav className="header-menu">
                <Link className="nav-item" href="#">
                  КУПИТЬ ПРОКСИ
                </Link>
                <Link className="nav-item" href="#">
                  ЦЕНЫ
                </Link>
                <Link className="nav-item" href="#">
                  ПАРТНЕРСКАЯ ПРОГРАММА
                </Link>
                <Link className="nav-item" href="#">
                  СТАТЬИ
                </Link>
                <Link className="nav-item" href="#">
                  FAQ
                </Link>
              </nav>
              <div className="header-lang">
                <Link href="#" className="lang-item active">
                  <Image
                    src="/img/rus-lang.png"
                    alt=""
                    layout="responsive"
                    width={40}
                    height={26}
                  />
                </Link>
                <Link href="#" className="lang-item">
                  <Image
                    src="/img/eng-lang.png"
                    alt=""
                    layout="responsive"
                    width={40}
                    height={26}
                  />
                </Link>
              </div>
              <div className="header-btn">
                <a
                  data-fancybox
                  data-src="#auth-enter"
                  href="javascript:;"
                  className="btn-enter"
                >
                  <Image
                    src="img/enter.svg"
                    alt=""
                    layout="response"
                    width={27}
                    height={27}
                  />
                  <span>войти</span>
                </a>
                <a
                  data-fancybox
                  data-src="#auth-reg"
                  href="javascript:;"
                  className="btn-reg"
                >
                  <span>регистрация</span>
                </a>
              </div>
            </div>
            <div className="header-burger">
              <div className="burger" id="openMenu">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <nav className="submenu">
        <Link href="/my-ip" className="submenu-item">
          Мой IP
        </Link>
        <Link href="/proxy-checker" className="submenu-item">
          Прокси чекер
        </Link>
        <Link href="/anonymity-checker" className="submenu-item">
          Моя анонимность
        </Link>
        <Link href="/port-checker" className="submenu-item">
          Проверка портов
        </Link>
        <Link href="/whois" className="submenu-item">
          Whois
        </Link>
        <Link href="/black-lists" className="submenu-item">
          Блэк листы
        </Link>
        <Link href="/ipv6-checker" className="submenu-item">
          Поддержка IPv6
        </Link>
        <Link href="#" className="submenu-item">
          API
        </Link>
      </nav>
    </>
  );
};
