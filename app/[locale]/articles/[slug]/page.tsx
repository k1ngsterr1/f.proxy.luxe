import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import type { Article } from "@/entities/articles/api/get-articles.api";
import { resolveArticleRoute } from "./article-route";
import ArticleClient from "./article-client";

type Params = Promise<{ locale: "ru" | "en"; slug: string }>;

async function loadArticle(slug: string): Promise<Article | null> {
  const response = await fetch(`https://api.proxy.luxe/api/v1/articles/${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Article API returned ${response.status}`);
  return response.json();
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) return { title: "Article not found" };

  const canonical = `https://proxy.luxe/${article.lang}/articles/${article.slug}`;
  const languages: Record<string, string> = { [article.lang]: canonical };
  if (article.translation?.slug) {
    languages[article.translation.lang] = `https://proxy.luxe/${article.translation.lang}/articles/${article.translation.slug}`;
  }
  const description = article.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  return {
    title: `${article.title} | Proxy.Luxe`,
    description,
    alternates: { canonical, languages },
    openGraph: { type: "article", title: article.title, description, url: canonical },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (locale !== "ru" && locale !== "en") notFound();
  const article = await loadArticle(slug);
  if (!article) notFound();
  const destination = resolveArticleRoute(article, locale);
  if (destination) redirect(destination);
  return <ArticleClient initialArticle={article} />;
}
