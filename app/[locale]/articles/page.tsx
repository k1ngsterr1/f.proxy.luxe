"use client";

import { useState, useEffect } from "react";
import { Tag, Loader } from "lucide-react";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { ArticleGrid } from "@/widgets/blocks/articles-page/articles-grid";
import { useGetArticles } from "@/entities/articles/hooks/queries/use-get-articles.queries";
import { useLocale, useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";

export default function Articles() {
  const t = useTranslations();
  const isMobile = useIsMobile();
  const lang = useLocale();
  const queryClient = useQueryClient();

  // Force cache invalidation when language changes
  useEffect(() => {
    // Invalidate all articles queries to ensure fresh data
    queryClient.invalidateQueries({ queryKey: ["articles"] });
  }, [lang, queryClient]);

  // Fetch articles using React Query
  const {
    data: articles,
    isLoading,
    isError,
    error,
  } = useGetArticles(lang as "ru" | "en");

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
      url: `/articles/${article.slug || article.id}`,
    })) || [];

  // Helper function to extract date from content (simplified example)
  function extractDateFromContent(content: string): string | null {
    // This is a simplified example - you might want to implement a more robust solution
    const dateRegex = /(\d{2})\.(\d{2})\.(\d{4})/;
    const match = content.match(dateRegex);
    return match ? match[0] : null;
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
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(243, 214, 117, 0.05)",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "12px",
                    padding: "40px 60px",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Loader
                    size={60}
                    className="animate-spin"
                    style={{ color: "#f3d675", marginBottom: "20px" }}
                  />
                  <h3
                    style={{
                      color: "#f3d675",
                      marginBottom: "8px",
                      fontSize: "18px",
                    }}
                  >
                    {t("articles.loading")}
                  </h3>
                </div>
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
                {formattedApiArticles.length > 0 ? (
                  <ArticleGrid
                    articles={formattedApiArticles}
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
