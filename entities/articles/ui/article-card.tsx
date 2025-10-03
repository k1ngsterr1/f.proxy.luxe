"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export interface ArticleTag {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleCardProps {
  /**
   * Article image URL
   */
  imageUrl?: string;
  /**
   * Main image URL
   */
  mainImage?: string;
  /**
   * Array of image URLs
   */
  images?: string[];
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
   * URL to the full article
   */
  url: string;
  /**
   * Article tags
   */
  tags?: ArticleTag[];
  /**
   * Callback when tag is clicked
   */
  onTagClick?: (tag: ArticleTag) => void;
  /**
   * Optional className for custom styling
   */
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  imageUrl,
  mainImage,
  images = [],
  imageAlt = "Article thumbnail",
  title,
  date,
  summary,
  url,
  tags = [],
  onTagClick,
  className = "",
}) => {
  const i18n = useTranslations("personal-announcements");
  const [isHovered, setIsHovered] = useState(false);

  // Логика выбора главного изображения
  const getMainImage = () => {
    if (mainImage) return mainImage;
    if (imageUrl) return imageUrl;
    if (images.length > 0) return images[0];
    return null;
  };

  const displayImage = getMainImage();

  const handleTagClick = (e: React.MouseEvent, tag: ArticleTag) => {
    e.preventDefault();
    e.stopPropagation();
    onTagClick?.(tag);
  };

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
      {/* Article Image - only show if displayImage exists */}
      {displayImage && (
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
            src={displayImage}
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
      )}

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

        {/* Tags */}
        {tags.length > 0 && (
          <div
            className="article-card-tags"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={(e) => handleTagClick(e, tag)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: 500,
                  background:
                    "linear-gradient(135deg, rgba(243, 214, 117, 0.1) 0%, rgba(243, 214, 117, 0.05) 100%)",
                  color: "#f3d675",
                  border: "1px solid rgba(243, 214, 117, 0.3)",
                  borderRadius: "20px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(243, 214, 117, 0.2) 0%, rgba(243, 214, 117, 0.1) 100%)";
                  e.currentTarget.style.borderColor =
                    "rgba(243, 214, 117, 0.5)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 5px 15px rgba(243, 214, 117, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(243, 214, 117, 0.1) 0%, rgba(243, 214, 117, 0.05) 100%)";
                  e.currentTarget.style.borderColor =
                    "rgba(243, 214, 117, 0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Tag size={12} />
                {tag.name}
              </button>
            ))}
          </div>
        )}

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

        {/* Footer with Read More */}
        <div
          className="article-card-footer"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "auto",
            borderTop: "1px solid rgba(243, 214, 117, 0.1)",
            paddingTop: "12px",
          }}
        >
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
            {i18n("read-more")}
          </Link>
        </div>
      </div>
    </article>
  );
};
