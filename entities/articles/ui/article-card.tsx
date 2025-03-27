"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import { useState } from "react";

export interface ArticleTag {
  id: string | number;
  name: string;
  slug: string;
}

export interface ArticleCardProps {
  /**
   * Article image URL
   */
  imageUrl: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Article title
   */
  title: string;
  /**
   * Publication date
   */
  date: string;
  /**
   * Article summary or excerpt
   */
  summary: string;
  /**
   * Article tags
   */
  tags: ArticleTag[];
  /**
   * URL to the full article
   */
  url: string;
  /**
   * Optional className for custom styling
   */
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  imageUrl,
  imageAlt = "Article thumbnail",
  title,
  date,
  summary,
  tags,
  url,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`article-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000000",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(243, 214, 117, 0.2)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 10px 0 rgba(243, 214, 117, 0.1)"
          : "0 0 0 0 rgba(0, 0, 0, 0)",
      }}
    >
      {/* Article Image */}
      <div
        className="article-card-image"
        style={{
          position: "relative",
          width: "100%",
          height: "200px",
          overflow: "hidden",
        }}
      >
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={imageAlt}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* Article Content */}
      <div
        className="article-card-content"
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* Title and Date */}
        <div
          className="article-card-header"
          style={{
            marginBottom: "12px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#f3d675",
              marginBottom: "8px",
              lineHeight: 1.3,
            }}
          >
            {title}
          </h2>
          <div
            className="article-card-date"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#999999",
              fontSize: "12px",
            }}
          >
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        </div>

        {/* Summary */}
        <p
          className="article-card-summary"
          style={{
            fontSize: "14px",
            color: "#FFFFFF",
            lineHeight: 1.5,
            marginBottom: "16px",
            flexGrow: 1,
          }}
          dangerouslySetInnerHTML={{ __html: summary }}
        ></p>

        {/* Footer with Tags and Read More */}
        <div
          className="article-card-footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
            borderTop: "1px solid rgba(243, 214, 117, 0.1)",
            paddingTop: "12px",
          }}
        >
          {/* Tags */}
          <div
            className="article-card-tags"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <Tag size={14} style={{ color: "#f3d675" }} />
            {tags.map((tag, index) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                style={{
                  color: "#f3d675",
                  fontSize: "12px",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#f3d675";
                }}
              >
                {tag.name}
                {index < tags.length - 1 ? "," : ""}
              </Link>
            ))}
          </div>

          {/* Read More Link */}
          <Link
            href={url}
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "#f3d675",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.transform = "translateX(3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#f3d675";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            Читать далее...
          </Link>
        </div>
      </div>
    </article>
  );
};
