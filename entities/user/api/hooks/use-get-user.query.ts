import { useQuery } from "@tanstack/react-query";
import { getUser } from "../get/get-user.api";
import { UserRDO } from "@/shared/interfaces/user.interface";

export const useGetUser = () => {
  return useQuery<UserRDO | null, Error>({
    queryKey: ["me"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
};
