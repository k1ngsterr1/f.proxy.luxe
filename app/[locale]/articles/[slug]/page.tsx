"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  Tag,
  ChevronUp,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Loader,
} from "lucide-react";
import { useGetArticleById } from "@/entities/articles/hooks/queries/use-get-article-by-id.queries";
import { useTranslations } from "next-intl";

// Helper function to extract date from content (simplified example)
function extractDateFromContent(content?: string): string | null {
  if (!content) return null;
  // This is a simplified example - you might want to implement a more robust solution
  const dateRegex = /(\d{2})\.(\d{2})\.(\d{4})/;
  const match = content.match(dateRegex);
  return match ? match[0] : null;
}

// Helper function to extract tags from content
function extractTagsFromContent(content?: string) {
  if (!content) return [{ id: 1, name: "статья", slug: "article" }];

  // Categories for tag extraction
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

export default function ArticlePage() {
  const t = useTranslations("article-slug");
  const params = useParams();
  const articleId = params.slug as string;

  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useGetArticleById(articleId);

  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = article?.content ? article.content.split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Handle scroll for reading progress and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;

      const totalHeight = articleRef.current.clientHeight;
      const windowHeight = window.innerHeight;
      const scrolled = window.scrollY;

      const progress = Math.min(
        (scrolled / (totalHeight - windowHeight)) * 100,
        100
      );
      setReadingProgress(progress);

      setShowScrollTop(scrolled > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Share functionality
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      className="inner-page"
      style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
    >
      {/* Reading Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: `${readingProgress}%`,
          backgroundColor: "#f3d675",
          zIndex: 1000,
          transition: "width 0.2s ease",
        }}
      />

      <section className="article" style={{ padding: "60px 0" }}>
        <div
          className="scontainer"
          style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}
        >
          {isLoading ? (
            <div
              style={{
                backgroundColor: "rgba(243, 214, 117, 0.05)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "8px",
                padding: "40px 20px",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              <Loader
                size={40}
                className="animate-spin"
                style={{ color: "#f3d675", marginBottom: "16px" }}
              />
              <h3 style={{ color: "#f3d675", marginBottom: "8px" }}>
                {t("article.loading")}
              </h3>
            </div>
          ) : isError ? (
            <div
              style={{
                backgroundColor: "rgba(255, 82, 82, 0.1)",
                border: "1px solid rgba(255, 82, 82, 0.2)",
                borderRadius: "8px",
                padding: "40px 20px",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              <Tag
                size={40}
                style={{ color: "#FF5252", marginBottom: "16px" }}
              />
              <h3 style={{ color: "#FF5252", marginBottom: "8px" }}>
                {t("article.error_title")}
              </h3>
              <p style={{ color: "#999999" }}>
                {error?.message || t("article.error_description")}
              </p>
            </div>
          ) : (
            <>
              {/* Article Header */}
              <h1
                className="section-header"
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  marginBottom: "32px",
                  textAlign: "center",
                  position: "relative",
                  lineHeight: 1.2,
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
                  {article?.title || t("article.not_found")}
                </span>
              </h1>

              {/* Article Metadata */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "24px",
                  marginBottom: "40px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#999999",
                  }}
                >
                  <Calendar size={16} style={{ color: "#f3d675" }} />
                  <span style={{ fontSize: "14px" }}>
                    {extractDateFromContent(article?.content) || "01.01.2023"}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#999999",
                  }}
                >
                  <User size={16} style={{ color: "#f3d675" }} />
                  <span style={{ fontSize: "14px" }}>{t("article.author")}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#999999",
                  }}
                >
                  <Clock size={16} style={{ color: "#f3d675" }} />
                  <span style={{ fontSize: "14px" }}>
                    {t("article.reading_time", { count: readingTime })}
                  </span>
                </div>
              </div>

              {/* Featured Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "400px",
                  marginBottom: "40px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                }}
              >
                <Image
                  src={
                    article?.images && article.images.length > 0
                      ? article.images[0]
                      : "/placeholder.svg?height=800&width=1200"
                  }
                  alt={article?.title || t("article.image_alt")}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Article Content */}
              <div
                className="article-body"
                ref={articleRef}
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.03)",
                  borderRadius: "12px",
                  border: "1px solid rgba(243, 214, 117, 0.1)",
                  padding: "40px",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#E0E0E0",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: article?.content || t("article.content_not_found"),
                  }}
                />

                {/* Article Footer */}
                <div
                  className="article-footer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "40px",
                    paddingTop: "20px",
                    borderTop: "1px solid rgba(243, 214, 117, 0.2)",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}
                >
                  <div
                    className="article-tags"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Tag size={18} style={{ color: "#f3d675" }} />
                    {extractTagsFromContent(article?.content).map(
                      (tag, index) => (
                        <Link
                          key={index}
                          href={`/tags/${tag.slug}`}
                          className="article-tags__link"
                          style={{
                            color: "#f3d675",
                            textDecoration: "none",
                            fontSize: "14px",
                            padding: "4px 12px",
                            backgroundColor: "rgba(243, 214, 117, 0.1)",
                            borderRadius: "20px",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "rgba(243, 214, 117, 0.2)";
                            e.currentTarget.style.transform =
                              "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "rgba(243, 214, 117, 0.1)";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          {tag.name === "Общее"
                            ? t("tags.general")
                            : tag.name}
                          {index <
                          extractTagsFromContent(article?.content).length - 1
                            ? ","
                            : ""}
                        </Link>
                      )
                    )}
                  </div>

                  <Link
                    href="/articles"
                    className="article-more"
                    style={{
                      color: "#f3d675",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#f3d675";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {t("article.all_articles")}
                  </Link>
                </div>
              </div>

              {/* Share Section */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "16px",
                  marginTop: "40px",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ color: "#999999", fontSize: "14px" }}>
                  {t("article.share")}
                </span>
                <div style={{ display: "flex", gap: "12px" }}>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      borderRadius: "50%",
                      color: "#f3d675",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 214, 117, 0.2)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 214, 117, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      borderRadius: "50%",
                      color: "#f3d675",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 214, 117, 0.2)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 214, 117, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Twitter size={16} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      borderRadius: "50%",
                      color: "#f3d675",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 214, 117, 0.2)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 214, 117, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Linkedin size={16} />
                  </a>
                  <button
                    onClick={copyToClipboard}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      borderRadius: "50%",
                      color: "#f3d675",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!copied) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(243, 214, 117, 0.2)";
                        e.currentTarget.style.transform = "translateY(-3px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!copied) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(243, 214, 117, 0.1)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#f3d675",
            color: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "none",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            opacity: showScrollTop ? 1 : 0,
            transform: showScrollTop ? "scale(1)" : "scale(0.8)",
            visibility: showScrollTop ? "visible" : "hidden",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = showScrollTop
              ? "scale(1)"
              : "scale(0.8)";
          }}
        >
          <ChevronUp size={24} />
        </button>
      )}
    </main>
  );
}
