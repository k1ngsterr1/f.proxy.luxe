"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  ChevronUp,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Loader,
} from "lucide-react";
import { useGetArticleById } from "@/entities/articles/hooks/queries/use-get-article-by-id.queries";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

// Helper function to extract date from content (simplified example)
function extractDateFromContent(content?: string): string | null {
  if (!content) return null;
  // This is a simplified example - you might want to implement a more robust solution
  const dateRegex = /(\d{2})\.(\d{2})\.(\d{4})/;
  const match = content.match(dateRegex);
  return match ? match[0] : null;
}

export default function ArticlePage() {
  const t = useTranslations();
  const params = useParams();
  const articleId = params.slug as string;

  const locale = useLocale();
  const router = useRouter();

  // Reset component state when language changes
  useEffect(() => {
    // This will trigger a re-fetch of the article in the new language
    router.refresh();
  }, [locale, router]);

  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useGetArticleById(articleId, locale as "ru" | "en");

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
              <Loader
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
              </div>
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
                ></div>
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
