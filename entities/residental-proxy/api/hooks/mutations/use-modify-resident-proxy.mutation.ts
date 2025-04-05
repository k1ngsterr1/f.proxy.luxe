import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/config/apiClient";

interface ModifyProxyPayload {
  package_key: string;
  ports: number;
  whitelist: string;
  title: string;
  rotation: number;
  geo: {
    country: string;
    region: string;
    city: string;
    isp: string;
  };
}

const modifyResidentProxy = async (payload: ModifyProxyPayload) => {
  const { data } = await apiClient.post(
    "/api/v1/products/modify-proxy/resident",
    payload
  );
  return data;
};

export const useModifyResidentProxy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: modifyResidentProxy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proxyList"] });
    },
  });
};
