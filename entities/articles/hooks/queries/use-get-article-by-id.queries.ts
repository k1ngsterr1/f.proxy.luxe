import { useQuery } from "@tanstack/react-query";
import { getArticleById } from "../../api/get-articles.api";

export const useGetArticleById = (id: string, lang: "ru" | "en" = "ru") => {
  return useQuery({
    queryKey: ["article", id, lang],
    queryFn: () => getArticleById(id, lang),
    staleTime: 1000 * 60 * 3, // 3 minutes - shorter cache for better language switching
    retry: 2,
    enabled: !!id, // Only run the query if id is provided
  });
};
