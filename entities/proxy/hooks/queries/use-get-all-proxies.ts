import { useQuery } from "@tanstack/react-query";
import {
  getAllProxies,
  ProxyListResponse,
} from "../../api/get/get-all-proxies";

export const useProxyList = () => {
  return useQuery<ProxyListResponse | undefined, Error>({
    queryKey: ["proxyList"],
    queryFn: getAllProxies,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false, // Prevents refetching when switching tabs
    refetchOnReconnect: false, // Prevents refetching on network reconnect
    retry: 2,
  });
};
