import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../api/get-articles.api";

export const useGetArticles = (lang: "ru" | "en") => {
  return useQuery<any | null, Error>({
    queryKey: ["articles", lang],
    queryFn: () => getArticles(lang),
    staleTime: 1000 * 60 * 5, // Reduced to 5 minutes for better cache invalidation
    retry: 2,
  });
};
