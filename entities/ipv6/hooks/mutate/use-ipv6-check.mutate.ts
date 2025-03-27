// src/entities/ipv6/hooks/use-check-ipv6.ts
import { useMutation } from "@tanstack/react-query";
import { checkIpv6 } from "../../api/post/ipv6-check.api";

export const useCheckIpv6 = () => {
  return useMutation({
    mutationKey: ["check-ipv6"],
    mutationFn: checkIpv6,
  });
};
