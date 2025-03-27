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
    },
  };
});
