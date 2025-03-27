import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../api/get-articles.api";

export const useGetArticles = () => {
  return useQuery<any | null, Error>({
    queryKey: ["articles"],
    queryFn: getArticles,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
};
