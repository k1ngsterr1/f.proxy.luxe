import { apiClient } from "@/shared/config/apiClient";

export interface Article {
  id: string;
  title: string;
  content: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  slug?: string;
}

export interface CreateArticleDto {
  title: string;
  content: string;
  images?: string[];
}

export interface UpdateArticleDto {
  title?: string;
  content?: string;
  images?: string[];
}

export interface ArticleResponse {
  data: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getArticles = async (
  lang: "ru" | "en",
  page: number = 1,
  limit: number = 9
): Promise<Article[] | ArticleResponse> => {
  // Fetch all articles with large limit for client-side pagination
  const response = await apiClient.get<Article[] | ArticleResponse>(
    `/api/v1/articles?lang=${lang}&limit=1000`
  );
  return response.data;
};

export const getArticleById = async (
  id: string,
  lang: "ru" | "en" = "ru"
): Promise<Article> => {
  const response = await apiClient.get<Article>(
    `/api/v1/articles/${id}?lang=${lang}`
  );
  return response.data;
};
