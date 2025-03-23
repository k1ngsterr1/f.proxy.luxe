import { useMutation } from "@tanstack/react-query";
import { CalcData } from "@/shared/types/calc.types";
import { proxyChecker } from "../../api/post/proxy-checker.api";

export const useProxyChecker = () => {
  return useMutation<any, Error, any>({
    mutationFn: proxyChecker,
    onSuccess: (data) => {
      console.log("✅ Proxy check successful:", data);
    },
    onError: (error) => {
      console.error("❌ Proxy check error:", error);
    },
  });
};
