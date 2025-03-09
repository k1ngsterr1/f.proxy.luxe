import { FC } from "react";
import Image from "next/image";

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">
            <a href="#" className="footer-logo__link">
              <Image
                src="/img/logo.png"
                alt="Proxy Luxe"
                layout="responsive"
                width={230}
                height={70}
              />
            </a>
            <p className="footer-logo__text">
              Индивидуальные резидентные прокси
            </p>
            <p className="footer-logo__text">© 2025 «Proxy.Luxe»</p>
          </div>
          <div className="footer-menu">
            <nav className="footer-menu__nav">
              <a href="#">Купить прокси</a>
              <a href="#">Цены</a>
              <a href="#">FAQ</a>
              <a href="#">Блог</a>
              <a href="/my-ip">Мой IP</a>
              <a href="/proxy-checker">Прокси чекер</a>
              <a href="#">API</a>
              <a href="#">Условия использования</a>
              <a href="#">Реквизиты</a>
            </nav>
            <div className="footer-menu__info">
              <a href="#">Политика конфиденциальности</a>
              <div className="separator"></div>
              <a href="#">Уведомление об ответственности</a>
            </div>
          </div>
          <div className="footer-soc">
            <p className="footer-soc__hint">Техническая поддержка:</p>
            <a href="mailto:admin@proxy.luxe" className="footer-soc__link">
              admin@proxy.luxe
            </a>
            <nav className="footer-soc__links">
              <a href="#">
                <Image
                  src="/img/telegram.png"
                  alt="twitter"
                  width={18}
                  height={14}
                />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
