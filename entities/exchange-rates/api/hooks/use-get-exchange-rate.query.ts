import { useQuery } from "@tanstack/react-query";
import { getExchangeRate } from "../get/get-exchange-rate.api";
type Params = {
  amount: number;
  from: string;
  to: string;
};
export const useGetExchangeRate = ({ amount, from, to }: Params) => {
  return useQuery<number | null, Error>({
    queryKey: ["exchangeRate", amount, from, to],
    queryFn: () => getExchangeRate(amount, from, to),
    enabled: !!amount && !!from && !!to,
    staleTime: 1000 * 60 * 10, // ✅ Cache data for 10 minutes
    retry: 2, // ✅ Retry twice if it fails
    refetchOnWindowFocus: false, // ✅ Prevent unnecessary refetches
  });
};
