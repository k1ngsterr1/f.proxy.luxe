"use client";

import { ArticleCard, ArticleTag } from "@/entities/articles/ui/article-card";
import type React from "react";
import "../../../assets/images/grass_cover.jpg";

export interface Article {
  id: string | number;
  images: string[];
  imageAlt?: string;
  title: string;
  date: string;
  summary: string;
  tags: ArticleTag[];
  url: string;
}

interface ArticleGridProps {
  articles: Article[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  columns = 3,
  className = "",
}) => {
  return (
    <div
      className={`article-grid ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "24px",
      }}
    >
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          imageUrl=""
          imageAlt={article?.imageAlt}
          title={article.title}
          date={article.date}
          summary={article.summary}
          tags={article.tags}
          url="/articles/grass"
        />
      ))}
    </div>
  );
};
