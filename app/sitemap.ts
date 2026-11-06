import type { MetadataRoute } from "next";
import { articleSitemapEntries } from "./sitemap-articles";

export const revalidate = 3600;

const paths = [
  "", "/buy-proxy", "/prices", "/partners", "/articles", "/faq",
  "/services/my-ip", "/services/proxy-checker", "/services/anonymity-checker",
  "/services/port-checker", "/services/whois", "/services/black-lists",
  "/services/ipv6-checker", "/contacts", "/privacy-policy",
  "/responsibility-principle", "/public-offer",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = (["ru", "en"] as const).flatMap((lang) =>
    paths.map((path) => ({
      url: `https://proxy.luxe/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
  );

  try {
    const lists = await Promise.all((["ru", "en"] as const).map(async (lang) => {
      const response = await fetch(`https://api.proxy.luxe/api/v1/articles?lang=${lang}&all=true`, {
        next: { revalidate: 3600 },
      });
      if (!response.ok) throw new Error(`Article list returned ${response.status}`);
      return response.json() as Promise<Array<{ lang: "ru" | "en"; slug: string; updatedAt?: string }>>;
    }));
    return [...staticEntries, ...articleSitemapEntries(lists.flat())];
  } catch {
    return staticEntries;
  }
}
