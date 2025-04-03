import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru"],
  defaultLocale: "ru",
  pathnames: {
    "/": "/",
    "/buy-proxy": "/buy-proxy",
    "/prices": "/prices",
    "/partners": "/partners",
    "/articles": "/articles",
    "/faq": "/faq",
    "/services/my-ip": "/services/my-ip",
    "/services/proxy-checker": "/services/proxy-checker",
    "/services/anonymity-checker": "/services/anonymity-checker",
    "/services/port-checker": "/services/port-checker",
    "/services/whois": "/services/whois",
    "/services/black-lists": "/services/black-lists",
    "/services/ipv6-checker": "/services/ipv6-checker",
    "/personal-account": "/personal-account",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {
  Link,
  permanentRedirect,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);
