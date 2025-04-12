import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../api/get-articles.api";

export const useGetArticles = (lang: "ru" | "en") => {
  return useQuery<any | null, Error>({
    queryKey: ["articles"],
    queryFn: () => getArticles(lang),
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
};
