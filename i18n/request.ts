import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`../messages/${locale}/header.json`)),
      ...(await import(`../messages/${locale}/personal-orders.json`)),
      ...(await import(`../messages/${locale}/nav-bar.json`)),
      ...(await import(`../messages/${locale}/footer.json`)),
      ...(await import(`../messages/${locale}/buy-proxy.json`)),
      ...(await import(`../messages/${locale}/faq.json`)),
      ...(await import(`../messages/${locale}/forgot-password.json`)),
      ...(await import(`../messages/${locale}/partners.json`)),
      ...(await import(`../messages/${locale}/prices.json`)),
      ...(await import(`../messages/${locale}/privacy-policy.json`)),
      ...(await import(`../messages/${locale}/myIp.json`)),
      ...(await import(`../messages/${locale}/about-block.json`)),
      ...(await import(`../messages/${locale}/advantages-block.json`)),
      ...(await import(`../messages/${locale}/buy-promo-block.json`)),
      ...(await import(`../messages/${locale}/faq-block.json`)),
      ...(await import(`../messages/${locale}/partners-block.json`)),
      ...(await import(`../messages/${locale}/proxy-cards.json`)),
      ...(await import(`../messages/${locale}/forms.json`)),
      ...(await import(`../messages/${locale}/pages.json`)),
      ...(await import(`../messages/${locale}/validation.json`)),
      ...(await import(`../messages/${locale}/home-slider.json`)),
      ...(await import(`../messages/${locale}/auth.json`)),
      ...(await import(`../messages/${locale}/buy-forms.json`)),
      ...(await import(`../messages/${locale}/services.json`)),
      ...(await import(`../messages/${locale}/partner.json`)),
      ...(await import(`../messages/${locale}/services-translations.json`)),
      ...(await import(`../messages/${locale}/port-checker.json`)),
      ...(await import(`../messages/${locale}/proxy-checker-page.json`)),
      ...(await import(`../messages/${locale}/anonymity-checker.json`)),
      ...(await import(`../messages/${locale}/whois.json`)),
      ...(await import(`../messages/${locale}/blacklist.json`)),
      ...(await import(`../messages/${locale}/ipv6.json`)),
      ...(await import(`../messages/${locale}/payments-block.json`)),
    },
  };
});
