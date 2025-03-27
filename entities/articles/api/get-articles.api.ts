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

export const articlesApi = async (): Promise<Article[]> => {
  const response = await apiClient.get<Article[]>("/articles");
  return response.data;
};
