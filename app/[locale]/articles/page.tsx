"use client";

import { useState, useEffect } from "react";
import { Tag, Loader } from "lucide-react";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { ArticleGrid } from "@/widgets/blocks/articles-page/articles-grid";
import { useGetArticles } from "@/entities/articles/hooks/queries/use-get-articles.queries";
import { useLocale, useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { Pagination } from "@/shared/ui/pagination";

export default function Articles() {
  const t = useTranslations();
  const isMobile = useIsMobile();
  const lang = useLocale();
  const queryClient = useQueryClient();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Force cache invalidation when language changes
  useEffect(() => {
    // Invalidate all articles queries to ensure fresh data
    queryClient.invalidateQueries({ queryKey: ["articles"] });
    setCurrentPage(1); // Reset to first page when language changes
  }, [lang, queryClient]);

  // Reset page when selected tags change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags]);

  // Fetch articles using React Query with pagination
  const {
    data: articlesResponse,
    isLoading,
    isError,
    error,
  } = useGetArticles(lang as "ru" | "en", currentPage, articlesPerPage);

  // Check if response is array (current API) or object with pagination (future API)
  const isArrayResponse = Array.isArray(articlesResponse);
  const allArticles = isArrayResponse
    ? articlesResponse
    : articlesResponse?.data || [];

  // Client-side pagination for current API format
  const totalArticles = allArticles.length;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = isArrayResponse
    ? allArticles.slice(startIndex, endIndex)
    : allArticles;

  // Format API articles to match the ArticleGrid component requirements
  const formattedApiArticles = paginatedArticles.map((article: any) => ({
    id: article.slug || article.id,
    images: article.images || [],
    mainImage: article.mainImage,
    title: article.title,
    // Use createdAt field from the database
    date: formatArticleDate(article),
    // Use first 150 characters of content as summary
    summary:
      article.content.substring(0, 150) +
      (article.content.length > 150 ? "..." : ""),
    url: `/articles/${article.slug}`,
    tags: article.tags || [],
  }));

  // Filter articles by selected tags
  // When filtering by tags, we show all matching articles without pagination
  const allFormattedArticles = allArticles.map((article: any) => ({
    id: article.slug || article.id,
    images: article.images || [],
    mainImage: article.mainImage,
    title: article.title,
    date: formatArticleDate(article),
    summary:
      article.content.substring(0, 150) +
      (article.content.length > 150 ? "..." : ""),
    url: `/articles/${article.slug}`,
    tags: article.tags || [],
  }));

  const filteredArticles =
    selectedTags.length > 0
      ? allFormattedArticles.filter((article: any) =>
          article.tags?.some((tag: any) => selectedTags.includes(tag.id))
        )
      : formattedApiArticles;

  // Handle tag click
  const handleTagClick = (tag: any) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag.id)) {
        // Remove tag if already selected
        return prev.filter((id) => id !== tag.id);
      } else {
        // Add tag if not selected
        return [...prev, tag.id];
      }
    });
  };

  // Get all unique tags from all articles (not just current page)
  const allTags = allFormattedArticles.reduce((acc: any[], article: any) => {
    article.tags?.forEach((tag: any) => {
      if (!acc.find((t) => t.id === tag.id)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper function to format article date from createdAt field
  function formatArticleDate(article: any): string {
    // Use createdAt field from the database
    const createdAt = article.createdAt;

    if (createdAt) {
      try {
        const date = new Date(createdAt);
        return date.toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      } catch (e) {
        console.warn("Invalid createdAt date format:", createdAt);
      }
    }

    // Fallback to current date if createdAt is not available
    const now = new Date();
    return now.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <>
      <title>{t("articless.title")}</title>
      {/* Full screen loading overlay */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Loader
              size={80}
              className="animate-spin"
              style={{ color: "#f3d675", marginBottom: "24px" }}
            />
            <h3
              style={{
                color: "#f3d675",
                fontSize: "20px",
                fontWeight: "500",
                margin: 0,
              }}
            >
              {t("articles.loading")}
            </h3>
          </div>
        </div>
      )}
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
                  <>
                    {/* Tags Filter */}
                    {allTags.length > 0 && (
                      <div
                        style={{
                          marginBottom: "32px",
                          padding: "20px",
                          backgroundColor: "rgba(243, 214, 117, 0.05)",
                          borderRadius: "12px",
                          border: "1px solid rgba(243, 214, 117, 0.2)",
                        }}
                      >
                        <h3
                          style={{
                            color: "#f3d675",
                            marginBottom: "16px",
                            fontSize: "18px",
                            fontWeight: 600,
                          }}
                        >
                          {t("articles.filter.by-tags", {
                            defaultValue: "Фильтр по тегам",
                          })}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                          }}
                        >
                          {allTags.map((tag: any) => (
                            <button
                              key={tag.id}
                              onClick={() => handleTagClick(tag)}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "8px 16px",
                                fontSize: "14px",
                                fontWeight: 500,
                                background: selectedTags.includes(tag.id)
                                  ? "linear-gradient(135deg, rgba(243, 214, 117, 0.3) 0%, rgba(243, 214, 117, 0.2) 100%)"
                                  : "linear-gradient(135deg, rgba(243, 214, 117, 0.1) 0%, rgba(243, 214, 117, 0.05) 100%)",
                                color: "#f3d675",
                                border: selectedTags.includes(tag.id)
                                  ? "2px solid rgba(243, 214, 117, 0.6)"
                                  : "1px solid rgba(243, 214, 117, 0.3)",
                                borderRadius: "20px",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                              }}
                            >
                              <Tag size={14} />
                              {tag.name}
                            </button>
                          ))}
                          {selectedTags.length > 0 && (
                            <button
                              onClick={() => setSelectedTags([])}
                              style={{
                                padding: "8px 16px",
                                fontSize: "14px",
                                fontWeight: 500,
                                background: "rgba(255, 0, 0, 0.1)",
                                color: "#ff6b6b",
                                border: "1px solid rgba(255, 0, 0, 0.3)",
                                borderRadius: "20px",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {t("articles.filter.clear", {
                                defaultValue: "Очистить фильтры",
                              })}
                            </button>
                          )}
                        </div>
                        {selectedTags.length > 0 && (
                          <p
                            style={{
                              marginTop: "12px",
                              color: "#999999",
                              fontSize: "14px",
                            }}
                          >
                            {t("articles.filter.count", {
                              defaultValue:
                                "Показано: {{filtered}} из {{total}} статей",
                              filtered: filteredArticles.length,
                              total: allFormattedArticles.length,
                            })}
                          </p>
                        )}
                      </div>
                    )}
                    <ArticleGrid
                      articles={filteredArticles}
                      columns={isMobile ? 1 : 3}
                      onTagClick={handleTagClick}
                    />

                    {/* Pagination - only show if no tag filters are active */}
                    {selectedTags.length === 0 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    )}
                  </>
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
                      {selectedTags.length > 0
                        ? t("articles.filtered.empty.title", {
                            defaultValue:
                              "Статьи с выбранными тегами не найдены",
                          })
                        : t("articles.empty.title", {
                            defaultValue: "Статьи не найдены",
                          })}
                    </h3>
                    <p style={{ color: "#999999" }}>
                      {selectedTags.length > 0
                        ? t("articles.filtered.empty.message", {
                            defaultValue:
                              "Попробуйте изменить фильтры или очистить их",
                          })
                        : t("articles.empty.message", {
                            defaultValue: "Статьи появятся здесь позже",
                          })}
                    </p>
                    {selectedTags.length > 0 && (
                      <button
                        onClick={() => setSelectedTags([])}
                        style={{
                          marginTop: "16px",
                          padding: "12px 24px",
                          fontSize: "14px",
                          fontWeight: 500,
                          background:
                            "linear-gradient(135deg, rgba(243, 214, 117, 0.2) 0%, rgba(243, 214, 117, 0.1) 100%)",
                          color: "#f3d675",
                          border: "1px solid rgba(243, 214, 117, 0.3)",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {t("articles.filter.show-all", {
                          defaultValue: "Показать все статьи",
                        })}
                      </button>
                    )}
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
