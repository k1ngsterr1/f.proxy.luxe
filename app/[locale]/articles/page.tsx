"use client";

import { useState } from "react";
import { Tag, Loader } from "lucide-react";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { ArticleGrid } from "@/widgets/blocks/articles-page/articles-grid";
import { useGetArticles } from "@/entities/articles/hooks/queries/use-get-articles.queries";
import { useTranslations } from "next-intl";
import Head from "next/head";

// Categories for navigation
const categories = [
  { id: 1, name: "Инструкции", slug: "instructions" },
  { id: 2, name: "Android", slug: "android" },
  { id: 3, name: "SMTP - 25", slug: "smtp" },
  { id: 4, name: "Proxy", slug: "proxy" },
  { id: 5, name: "Mail", slug: "mail" },
  { id: 6, name: "SSH - 22", slug: "ssh" },
  { id: 7, name: "IMAP - 143", slug: "imap" },
  { id: 8, name: "Apple", slug: "apple" },
  { id: 9, name: "Dns", slug: "dns" },
  { id: 10, name: "Вконтакте", slug: "vk" },
  { id: 11, name: "POP3 - 110", slug: "pop3" },
];

export default function Articles() {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Fetch articles using React Query
  const { data: articles, isLoading, isError, error } = useGetArticles();

  // Format API articles to match the ArticleGrid component requirements
  const formattedArticles =
    articles?.map((article: any) => ({
      id: article.id,
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
        { id: 1, name: "статья", slug: "article" },
      ],
      url: `/articles/${article.id}`,
    })) || [];

  // Filter articles by category if one is selected
  const filteredArticles = activeCategory
    ? formattedArticles.filter((article: any) =>
        article.tags.some((tag: any) => tag.slug === activeCategory)
      )
    : formattedArticles;

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
        name: "Общее",
        slug: "general",
      });
    }

    return tags;
  }

  return (
    <>
      <Head>
        <title>Proxy Luxe | Статьи</title>
      </Head>
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
                статьи
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
                  Загрузка статей...
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
                  Ошибка загрузки статей
                </h3>
                <p style={{ color: "#999999" }}>
                  {error?.message ||
                    "Произошла ошибка при загрузке статей. Пожалуйста, попробуйте позже."}
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
                      Статьи не найдены
                    </h3>
                    <p style={{ color: "#999999" }}>
                      По выбранной категории статей пока нет
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
