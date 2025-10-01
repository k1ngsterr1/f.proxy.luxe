"use client";

import { useState } from "react";
import { Tag, Loader } from "lucide-react";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { ArticleGrid } from "@/widgets/blocks/articles-page/articles-grid";
import { useGetArticles } from "@/entities/articles/hooks/queries/use-get-articles.queries";
import { useLocale, useTranslations } from "next-intl";

// Categories for navigation
const getCategories = (t: (key: string) => string) => [
  { id: 1, name: t("articles.categories.instructions"), slug: "instructions" },
  { id: 2, name: t("articles.categories.android"), slug: "android" },
  { id: 3, name: t("articles.categories.smtp"), slug: "smtp" },
  { id: 4, name: t("articles.categories.proxy"), slug: "proxy" },
  { id: 5, name: t("articles.categories.mail"), slug: "mail" },
  { id: 6, name: t("articles.categories.ssh"), slug: "ssh" },
  { id: 7, name: t("articles.categories.imap"), slug: "imap" },
  { id: 8, name: t("articles.categories.apple"), slug: "apple" },
  { id: 9, name: t("articles.categories.dns"), slug: "dns" },
  { id: 10, name: t("articles.categories.vk"), slug: "vk" },
  { id: 11, name: t("articles.categories.pop3"), slug: "pop3" },
];

export default function Articles() {
  const t = useTranslations();
  const isMobile = useIsMobile();
  const lang = useLocale();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Fetch articles using React Query
  const {
    data: articles,
    isLoading,
    isError,
    error,
  } = useGetArticles(lang as "ru" | "en");

  // Static GRASS article (always first)
  const grassArticle = {
    id: "grass",
    images: ["/assets/images/grass_cover.jpg"],
    title: "GRASS – как заработать, используя прокси и анти-детект браузер.",
    date: "01.01.2023",
    summary:
      "GRASS — легендарный и надежный проект среди DePIN-проектов. После листинга токена GRASS притом удивил многих, поскольку...",
    tags: [
      {
        id: 1,
        name: t("articles.categories.instructions"),
        slug: "instructions",
      },
    ],
    url: "/articles/grass",
  };

  // Format API articles to match the ArticleGrid component requirements
  const formattedApiArticles =
    articles?.map((article: any) => ({
      id: article.slug || article.id,
      images: article.images || [],
      title: article.title,
      // Extract date from content or use a placeholder
      date: extractDateFromContent(article.content) || "01.01.2023",
      // Use first 150 characters of content as summary
      summary:
        article.content.substring(0, 150) +
        (article.content.length > 150 ? "..." : ""),
      // Extract tags from content or use default tags
      tags: extractTagsFromContent(article.content) || [
        { id: 1, name: t("articles.categories.general"), slug: "general" },
      ],
      url: `/articles/${article.slug || article.id}`,
    })) || [];

  // Combine GRASS article with API articles
  const allArticles = [grassArticle, ...formattedApiArticles];

  // Filter articles by category if one is selected
  const filteredArticles = activeCategory
    ? allArticles.filter((article: any) =>
        article.tags.some((tag: any) => tag.slug === activeCategory)
      )
    : allArticles;

  // Helper function to extract date from content (simplified example)
  function extractDateFromContent(content: string): string | null {
    // This is a simplified example - you might want to implement a more robust solution
    const dateRegex = /(\d{2})\.(\d{2})\.(\d{4})/;
    const match = content.match(dateRegex);
    return match ? match[0] : null;
  }

  // Helper function to extract tags from content (simplified example)
  function extractTagsFromContent(content: string) {
    // This is a simplified example - you might want to implement a more robust solution
    // For now, we'll just check if content contains certain keywords and map them to categories
    const tags = [];

    const categories = getCategories(t);
    categories.forEach((category) => {
      if (content.toLowerCase().includes(category.name.toLowerCase())) {
        tags.push({
          id: category.id,
          name: category.name,
          slug: category.slug,
        });
      }
    });

    // If no tags were found, add a default tag
    if (tags.length === 0) {
      tags.push({
        id: 999,
        name: t("articles.categories.general"),
        slug: "general",
      });
    }

    return tags;
  }

  return (
    <>
      <title>{t("articless.title")}</title>
      <main
        className="inner-page"
        style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
      >
        <section className="articles" style={{ padding: "40px 0" }}>
          <div
            className="scontainer"
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
          >
            <h1
              className="section-header"
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "32px",
                textTransform: "uppercase",
                textAlign: "center",
                position: "relative",
              }}
            >
              <span
                style={{
                  color: "#f3d675",
                  position: "relative",
                  display: "inline-block",
                  padding: "0 20px",
                }}
              >
                {t("articles.title")}
              </span>
            </h1>
            {isLoading && (
              <div
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "8px",
                  padding: "40px 20px",
                  textAlign: "center",
                }}
              >
                <Loader
                  size={40}
                  className="animate-spin"
                  style={{ color: "#f3d675", marginBottom: "16px" }}
                />
                <h3 style={{ color: "#f3d675", marginBottom: "8px" }}>
                  {t("articles.loading")}
                </h3>
              </div>
            )}
            {isError && (
              <div
                style={{
                  backgroundColor: "rgba(255, 82, 82, 0.1)",
                  border: "1px solid rgba(255, 82, 82, 0.2)",
                  borderRadius: "8px",
                  padding: "40px 20px",
                  textAlign: "center",
                }}
              >
                <Tag
                  size={40}
                  style={{ color: "#FF5252", marginBottom: "16px" }}
                />
                <h3 style={{ color: "#FF5252", marginBottom: "8px" }}>
                  {t("articles.error.title")}
                </h3>
                <p style={{ color: "#999999" }}>
                  {error?.message || t("articles.error.message")}
                </p>
              </div>
            )}
            {!isLoading && !isError && (
              <div className="articles-inner">
                {filteredArticles.length > 0 ? (
                  <ArticleGrid
                    articles={filteredArticles}
                    columns={isMobile ? 1 : 3}
                  />
                ) : (
                  <div
                    style={{
                      backgroundColor: "rgba(243, 214, 117, 0.05)",
                      border: "1px solid rgba(243, 214, 117, 0.2)",
                      borderRadius: "8px",
                      padding: "40px 20px",
                      textAlign: "center",
                    }}
                  >
                    <Tag
                      size={40}
                      style={{ color: "#f3d675", marginBottom: "16px" }}
                    />
                    <h3 style={{ color: "#f3d675", marginBottom: "8px" }}>
                      {t("articles.empty.title")}
                    </h3>
                    <p style={{ color: "#999999" }}>
                      {t("articles.empty.message")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
