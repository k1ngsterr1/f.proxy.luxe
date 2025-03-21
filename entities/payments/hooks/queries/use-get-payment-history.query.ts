import { useQuery } from "@tanstack/react-query";
import { getPaymentsHistory } from "../../api/get/get-payments-history.api";

export const useGetPaymentHistory = () => {
  return useQuery<any, Error>({
    queryKey: ["payments"],
    queryFn: () => getPaymentsHistory(),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
};
