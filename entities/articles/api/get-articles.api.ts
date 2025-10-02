import { apiClient } from "@/shared/config/apiClient";

export interface Article {
  id: string;
  title: string;
  content: string;
  images?: string[];
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

export const getArticles = async (lang: "ru" | "en"): Promise<Article[]> => {
  const response = await apiClient.get<Article[]>(
    `/api/v1/articles?lang=${lang}`
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
