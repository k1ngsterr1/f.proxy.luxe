import { useQuery } from "@tanstack/react-query";
import { Preferences } from "@/shared/types/preferences.types";
import { getPreferences } from "../../api/get/get-prefences.api";

export const useGetPreferences = () => {
  return useQuery<Preferences | null, Error>({
    queryKey: ["preferences"],
    queryFn: getPreferences,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
};
