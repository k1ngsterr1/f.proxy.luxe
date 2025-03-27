import { apiClient } from "@/shared/config/apiClient";

export interface Article {
  id: string;
  title: string;
  content: string;
  image?: string;
}

export interface CreateArticleDto {
  title: string;
  content: string;
  image?: string;
}

export interface UpdateArticleDto {
  title?: string;
  content?: string;
  image?: string;
}

export const getArticles = async (): Promise<Article[]> => {
  const response = await apiClient.get<Article[]>("/api/v1/articles");
  return response.data;
};
