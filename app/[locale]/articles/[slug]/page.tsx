"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";

export default function ArticlePage() {
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  // Calculate reading time
  const articleText =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus fuga laboriosam perspiciatis sequi numquam odio veritatis amet non repellat, fugit vel, praesentium perferendis molestiae doloremque ea, voluptates aspernatur explicabo hic eaque obcaecati magni minima similique. Hic perspiciatis voluptate sunt nostrum, ab neque natus dolorum, laborum quis voluptatum alias maiores optio.";
  const wordsPerMinute = 200;
  const wordCount = articleText.split(/\s+/).length;
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
              РЕКОМЕНДАЦИИ ПО АККАУНТАМ INSTAGRAM
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
              <span style={{ fontSize: "14px" }}>15 марта 2023</span>
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
              <span style={{ fontSize: "14px" }}>Администратор</span>
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
                {readingTime} мин. чтения
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
              src="/placeholder.svg?height=800&width=1200"
              alt="Instagram Recommendations"
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
            <h2
              className="article-sheader"
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#f3d675",
                marginBottom: "24px",
                paddingBottom: "12px",
                borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
              }}
            >
              Основные рекомендации
            </h2>

            <p style={{ marginBottom: "20px" }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
              fuga laboriosam perspiciatis sequi numquam odio veritatis amet non
              repellat, fugit vel, praesentium perferendis molestiae doloremque
              ea, voluptates aspernatur explicabo hic eaque obcaecati magni
              minima similique. Hic perspiciatis voluptate sunt nostrum, ab
              neque natus dolorum, laborum quis voluptatum alias maiores optio.
            </p>

            {/* Styled Quote */}
            <div
              style={{
                backgroundColor: "rgba(243, 214, 117, 0.08)",
                borderLeft: "4px solid #f3d675",
                padding: "20px 24px",
                margin: "30px 0",
                fontSize: "18px",
                fontStyle: "italic",
                color: "#f3d675",
                borderRadius: "0 8px 8px 0",
              }}
            >
              "Instagram требует особого подхода к созданию и управлению
              аккаунтами. Следуйте нашим рекомендациям для достижения наилучших
              результатов."
            </div>

            <p style={{ marginBottom: "20px" }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing, elit. Nam
              deleniti magnam cupiditate laudantium itaque accusantium a vel sit
              earum assumenda.
            </p>

            <h3
              className="article-subsheader"
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#f3d675",
                marginTop: "32px",
                marginBottom: "20px",
              }}
            >
              Безопасность аккаунта
            </h3>

            <p style={{ marginBottom: "20px" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing, elit. Possimus
              libero voluptatibus ratione saepe dolore inventore ipsa beatae,
              quod excepturi natus distinctio quibusdam repellendus quas vitae{" "}
              <strong style={{ color: "#f3d675" }}>dolores</strong> quisquam
              laudantium corrupti aliquam?
            </p>

            <p style={{ marginBottom: "20px" }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Blanditiis dolorem temporibus at delectus accusantium ab ut ex
              consequuntur vitae, cupiditate aperiam quia a corporis commodi sit
              beatae officiis eveniet eligendi non asperiores laboriosam
              quisquam impedit aspernatur ipsum iste! Architecto, nemo?
            </p>

            {/* Info Box */}
            <div
              style={{
                backgroundColor: "rgba(33, 150, 243, 0.1)",
                border: "1px solid rgba(33, 150, 243, 0.3)",
                borderRadius: "8px",
                padding: "20px",
                margin: "30px 0",
                fontSize: "15px",
              }}
            >
              <h4
                style={{
                  color: "#64B5F6",
                  marginBottom: "10px",
                  fontSize: "18px",
                }}
              >
                Важная информация
              </h4>
              <p style={{ color: "#BBDEFB" }}>
                Всегда используйте уникальные пароли для каждого аккаунта и
                включайте двухфакторную аутентификацию для повышения
                безопасности.
              </p>
            </div>

            <p style={{ marginBottom: "20px" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing, elit. Possimus
              libero voluptatibus ratione saepe dolore inventore ipsa beatae,
              quod excepturi natus distinctio quibusdam repellendus quas vitae
              dolores quisquam laudantium corrupti aliquam?
            </p>

            <p style={{ marginBottom: "20px" }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Blanditiis dolorem temporibus at delectus accusantium ab ut ex
              consequuntur vitae, cupiditate aperiam quia a corporis commodi sit
              beatae officiis eveniet eligendi non asperiores{" "}
              <a
                href="#"
                style={{
                  color: "#f3d675",
                  textDecoration: "none",
                  borderBottom: "1px dotted #f3d675",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderBottomColor = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#f3d675";
                  e.currentTarget.style.borderBottomColor = "#f3d675";
                }}
              >
                laboriosam
              </a>{" "}
              quisquam impedit aspernatur ipsum iste! Architecto, nemo?
            </p>

            {/* Code Block */}
            <pre
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "8px",
                padding: "20px",
                overflowX: "auto",
                fontFamily: "monospace",
                fontSize: "14px",
                lineHeight: 1.5,
                margin: "30px 0",
                color: "#E0E0E0",
              }}
            >
              Сайт:{" "}
              <a
                href="#"
                style={{
                  color: "#f3d675",
                  textDecoration: "none",
                }}
              >
                https://developers.google.com/speed/public-dns/
              </a>
              <br /># Для IPv4: 8.8.8.8 8.8.4.4 <br /># Для IPv6:
              2001:4860:4860::8888 2001:4860:4860::8844
            </pre>

            <h3
              className="article-subsheader"
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#f3d675",
                marginTop: "32px",
                marginBottom: "20px",
              }}
            >
              Рекомендации по контенту
            </h3>

            <ul
              className="article-list"
              style={{
                listStyleType: "none",
                padding: "0",
                margin: "20px 0 30px",
              }}
            >
              {[
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, facere?",
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, atque!",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, reiciendis.",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, porro!",
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, porro.",
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    position: "relative",
                    paddingLeft: "28px",
                    marginBottom: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "8px",
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#f3d675",
                      borderRadius: "50%",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <p style={{ marginBottom: "20px" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing, elit. Possimus
              libero voluptatibus ratione saepe dolore inventore ipsa beatae,
              quod excepturi natus distinctio quibusdam repellendus quas vitae
              dolores quisquam laudantium corrupti aliquam?
            </p>

            <p style={{ marginBottom: "20px" }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Blanditiis dolorem temporibus at delectus accusantium ab ut ex
              consequuntur vitae, cupiditate aperiam quia a corporis commodi sit
              beatae officiis eveniet eligendi non asperiores laboriosam
              quisquam impedit aspernatur ipsum iste! Architecto, nemo?
            </p>

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
                {["инструкции", "instagram", "настройка"].map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tags/${tag}`}
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
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 214, 117, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {tag}
                    {index < 2 ? "," : ""}
                  </Link>
                ))}
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
                Все статьи
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
              Поделиться статьей:
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
        </div>
      </section>

      {/* Scroll to Top Button */}
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
    </main>
  );
}
