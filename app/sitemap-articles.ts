import type { MetadataRoute } from "next";

interface SitemapArticle {
  lang: "ru" | "en";
  slug: string;
  updatedAt?: string;
}

export function articleSitemapEntries(articles: SitemapArticle[]): MetadataRoute.Sitemap {
  return articles.filter((article) => article.slug).map((article) => ({
    url: `https://proxy.luxe/${article.lang}/articles/${encodeURIComponent(article.slug)}`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : undefined,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}
