import type { Article } from "@/entities/articles/api/get-articles.api";

export function resolveArticleRoute(article: Pick<Article, "lang" | "slug" | "translation">, locale: "ru" | "en"): string | null {
  if (article.lang === locale) return null;
  if (article.translation?.lang === locale && article.translation.slug) {
    return `/${locale}/articles/${article.translation.slug}`;
  }
  return `/${article.lang}/articles/${article.slug}`;
}
