import { useQuery } from "@tanstack/react-query";
import { getArticleById } from "../../api/get-articles.api";

export const useGetArticleById = (id: string) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id),
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    enabled: !!id, // Only run the query if id is provided
  });
};
