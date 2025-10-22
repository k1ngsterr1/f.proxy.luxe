import { useQuery } from "@tanstack/react-query";
import {
  getArticles,
  ArticleResponse,
  Article,
} from "../../api/get-articles.api";

export const useGetArticles = (
  lang: "ru" | "en",
  page: number = 1,
  limit: number = 9
) => {
  return useQuery<Article[] | ArticleResponse | null, Error>({
    queryKey: ["articles", lang, page, limit],
    queryFn: () => getArticles(lang, page, limit),
    staleTime: 1000 * 60 * 5, // Reduced to 5 minutes for better cache invalidation
    retry: 2,
  });
};
