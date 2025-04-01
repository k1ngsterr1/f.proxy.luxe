"use client";
import Logo from "@/assets/images/logo.png";
import TelegramIcon from "@/assets/images/telegram.png";
import VkIcon from "@/assets/images/vk-icon.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const Footer: FC = () => {
  const i18n = useTranslations();
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <Link href="/" className="header-logo">
                <Image src={Logo} alt="Proxy Luxe" />
              </Link>
              <p className="footer-logo__text">{i18n("footer.paragraph")}</p>
              <p className="footer-logo__text">
                © 2021 – {new Date().getFullYear()} «Proxy.Luxe»
              </p>
            </div>
            <div className="footer-menu">
              <nav className="footer-menu__nav">
                <Link href="/buy-proxy">{i18n("footer.buyProxy")}</Link>
                <Link href="/prices">{i18n("footer.prices")}</Link>
                <Link href="/faq">{i18n("footer.faq")}</Link>
                <Link href="/articles">{i18n("footer.articles")}</Link>
                <Link href="/services/my-ip">{i18n("footer.myIp")}</Link>
                <Link href="/services/proxy-checker">
                  {i18n("footer.proxyChecker")}
                </Link>
                {/* <Link href="/conditions">Условия использования</Link> */}
                {/* <Link href="#">Реквизиты</Link> */}
              </nav>
              <div className="footer-menu__info">
                <Link href="/privacy-policy">
                  {i18n("footer.privacyPolicy")}
                </Link>
                <div className="separator"></div>
                <Link href="/responsibility-principle">
                  {i18n("footer.noticeOfResponsibility")}
                </Link>
                <div className="separator"></div>
                <Link href="/public-offer">{i18n("footer.publicOffer")}</Link>
              </div>
            </div>
            <div className="footer-soc">
              <p className="footer-soc__hint">
                {i18n("footer.technicalSupport")}
              </p>
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
