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
    retry: 0,
  });
};
