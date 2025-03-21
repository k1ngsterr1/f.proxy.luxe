"use client";

import "@/assets/styles/normalize.css";
import "@/assets/styles/lk.css";
import "@/assets/styles/style.css";
import { ExchangeRates } from "@/components/ExchangeRates";
import ActiveLink from "@/components/ActiveLink";
import { Balance } from "@/entities/balance/ui/balance";
import { LogoutButton } from "@/entities/auth/ui/logout/logout-button";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="h5">ЛИЧНЫЙ КАБИНЕТ</div>
      <ActiveLink href="/personal-account" activeClassName="active">
        <Balance />
      </ActiveLink>
      <div className="sidebar_nav">
        <ul>
          <li>
            <ActiveLink activeClassName="active" href="/personal-account/proxy">
              Прокси
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              activeClassName="active"
              href="/personal-account/orders"
            >
              Заказы
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              activeClassName="active"
              href="/personal-account/payments"
            >
              Платежи
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              activeClassName="active"
              href="/personal-account/profile"
            >
              Профиль
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              activeClassName="active"
              href="/personal-account/partners"
            >
              Партнерская программа
            </ActiveLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>

      <div className="exchange_rates">курсы валют</div>
      <ExchangeRates />
    </div>
  );
};
