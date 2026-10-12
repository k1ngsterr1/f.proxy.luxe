import axios from "axios";
import { TokensResponse } from "@/shared/types/auth.types";

export const requestRefreshedTokens = async (
  baseUrl: string,
  refreshToken: string
): Promise<TokensResponse> => {
  const response = await axios.post<TokensResponse>(
    `${baseUrl}/api/v1/auth/refresh`,
    { refreshToken },
    { withCredentials: true }
  );
  return response.data;
};
