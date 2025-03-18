import { useQuery } from "@tanstack/react-query";
import { getExchangeRate } from "../get/get-exchange-rate.api";

export const useGetExchangeRate = () => {
  return useQuery<number | null, Error>({
    queryKey: ["exchangeRate"],
    queryFn: getExchangeRate,
    staleTime: 1000 * 60 * 10, // ✅ Cache data for 10 minutes
    retry: 2, // ✅ Retry twice if it fails
    refetchOnWindowFocus: false, // ✅ Prevent unnecessary refetches
  });
};
