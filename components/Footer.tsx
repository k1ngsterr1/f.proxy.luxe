import {FC} from "react";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import TelegramIcon from "@/assets/images/vk-icon.png";
import Payment from "@/assets/images/payment.png";
import Link from "next/link";

export const Footer: FC = () => {
    return (
        <>
            <div className="payment">
                <Image src={Payment} alt="Payment" />
            </div>
            <footer className="footer">
                <div className="container">
                    <div className="footer-inner">
                        <div className="footer-logo">
                            <Link href="/" className="header-logo">
                                <Image
                                    src={Logo}
                                    alt="Proxy Luxe"
                                />
                            </Link>
                            <p className="footer-logo__text">Индивидуальные резидентные прокси</p>
                            <p className="footer-logo__text">© 2021 – {new Date().getFullYear()} «Proxy.Luxe»</p>
                        </div>
                        <div className="footer-menu">
                            <nav className="footer-menu__nav">
                                <a href="#">Купить прокси</a>
                                <a href="#">Цены</a>
                                <a href="#">FAQ</a>
                                <a href="#">Блог</a>
                                <a href="#">Мой IP</a>
                                <a href="#">Прокси чекер</a>
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
                            <a href="mailto:admin@proxy.luxe" className="footer-soc__link">admin@proxy.luxe</a>
                            <nav className="footer-soc__links">
                                <a href="#">
                                    <Image
                                        src={TelegramIcon}
                                        alt="Telegram"
                                        layout="response"
                                        width={TelegramIcon.width}
                                        height={TelegramIcon.height}
                                    />
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}