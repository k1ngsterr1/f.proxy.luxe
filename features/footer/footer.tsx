import Logo from "@/assets/images/logo.png";
import TelegramIcon from "@/assets/images/telegram.png";
import VkIcon from "@/assets/images/vk-icon.png";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <Link href="/" className="header-logo">
                <Image src={Logo} alt="Proxy Luxe" />
              </Link>
              <p className="footer-logo__text">
                Индивидуальные резидентные прокси
              </p>
              <p className="footer-logo__text">
                © 2021 – {new Date().getFullYear()} «Proxy.Luxe»
              </p>
            </div>
            <div className="footer-menu">
              <nav className="footer-menu__nav">
                <Link href="/buy-proxy">Купить прокси</Link>
                <Link href="/prices">Цены</Link>
                <Link href="/partners">FAQ</Link>
                <Link href="/blog">Блог</Link>
                <Link href="/services/my-ip">Мой IP</Link>
                <Link href="/services/proxy-checker">Прокси чекер</Link>
                <Link href="/conditions">Условия использования</Link>
                <Link href="#">Реквизиты</Link>
              </nav>
              <div className="footer-menu__info">
                <Link href="/privacy-policy">Политика конфиденциальности</Link>
                <div className="separator"></div>
                <Link href="/notifications">
                  Уведомление об ответственности
                </Link>
              </div>
            </div>
            <div className="footer-soc">
              <p className="footer-soc__hint">Техническая поддержка:</p>
              <a href="mailto:admin@proxy.luxe" className="footer-soc__link">
                admin@proxy.luxe
              </a>
              <nav className="footer-soc__links">
                <a href="https://vk.com/proxy_luxe " target="_blank">
                  <Image
                    src={VkIcon}
                    alt="Telegram"
                    layout="response"
                    style={{ width: 28, height: 16 }}
                  />
                </a>
                <a href="https://t.me/proxy_luxe" target="_blank">
                  <Image
                    src={TelegramIcon}
                    alt="Telegram"
                    layout="response"
                    style={{ width: 24, height: 24 }}
                  />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
