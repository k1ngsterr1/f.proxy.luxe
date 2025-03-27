"use client";

import "@/assets/styles/normalize.css";
import "@/assets/styles/lk.css";
import "@/assets/styles/style.css";
import { ExchangeRates } from "@/components/ExchangeRates";
import ActiveLink from "@/components/ActiveLink";
import { Balance } from "@/entities/balance/ui/balance";
import { LogoutButton } from "@/entities/auth/ui/logout/logout-button";
import { useTranslations } from "next-intl";

export const Sidebar = () => {
  const i18n = useTranslations("sidebar");

  return (
    <div className="sidebar">
      <div className="h5">{i18n("title")}</div>
      <ActiveLink href="/personal-account" activeClassName="active">
        <Balance />
      </ActiveLink>
      <div className="sidebar_nav">
        <ul>
          <li>
            <ActiveLink activeClassName="active" href="/personal-account/proxy">
              {i18n("menu.proxy")}
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              activeClassName="active"
              href="/personal-account/orders"
            >
              {i18n("menu.orders")}
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              activeClassName="active"
              href="/personal-account/payments"
            >
              {i18n("menu.payments")}
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              activeClassName="active"
              href="/personal-account/profile"
            >
              {i18n("menu.profile")}
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="active" href="/partners">
              {i18n("menu.partners")}
            </ActiveLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>

      <div className="exchange_rates">{i18n("exchangeRates")}</div>
      <ExchangeRates />
    </div>
  );
};
