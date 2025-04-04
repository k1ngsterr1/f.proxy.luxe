import { useQuery } from "@tanstack/react-query";
import { getGeoReferences } from "../../api/geo-references.api";

export const useGetGeoReferences = () => {
  return useQuery<any, Error>({
    queryKey: ["geoReferences"],
    queryFn: () => getGeoReferences(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
