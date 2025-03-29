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

export const getArticles = async (): Promise<Article[]> => {
  const response = await apiClient.get<Article[]>("/api/v1/articles");
  return response.data;
};

export const getArticleById = async (id: string): Promise<Article> => {
  const response = await apiClient.get<Article>(`/api/v1/articles/${id}`);
  return response.data;
};
