import { useQuery } from "@tanstack/react-query";
import {
  getAllProxies,
  ProxyListResponse,
} from "../../api/get/get-all-proxies.api";

export const useProxyList = (type: string) => {
  return useQuery<ProxyListResponse | undefined, Error>({
    queryKey: ["proxyList", type],
    queryFn: () => getAllProxies(type),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
