type Language = "ru" | "en";

interface LocalizedArticle {
  lang: Language;
  slug?: string;
  translation?: { lang: Language; slug: string } | null;
}

export function articleLanguagePath(article: LocalizedArticle, target: Language): string {
  if (article.lang === target && article.slug) return `/articles/${article.slug}`;
  if (article.translation?.lang === target && article.translation.slug) {
    return `/articles/${article.translation.slug}`;
  }
  return "/articles";
}
