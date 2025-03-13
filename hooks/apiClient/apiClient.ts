import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/store/use-auth-store";

const BASE_URL = "https://aproxyluxe-production.up.railway.app";

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Required for cookies (refresh token)
});

// Helper to check if JWT token expired
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (err) {
    console.error("Failed to decode JWT:", err);
    return true;
  }
};

// Refresh JWT Token function
const refreshJwtToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/refresh`, {
      withCredentials: true,
    });

    const { jwt } = response.data;
    useAuthStore.getState().saveAccessToken(jwt); // Persist new token in Zustand
    return jwt;
  } catch (error) {
    console.error("Unable to refresh JWT:", error);
    useAuthStore.getState().removeAccessToken();
    return null;
  }
};

// Axios Request Interceptor: Attach JWT from Zustand
apiClient.interceptors.request.use(
  async (config) => {
    let jwtToken = useAuthStore.getState().token;

    if (jwtToken) {
      if (isTokenExpired(jwtToken)) {
        jwtToken = await refreshJwtToken();
      }
      if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Axios Response Interceptor: Automatically refresh JWT if 401 encountered
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !(originalRequest as any)._retry
    ) {
      (originalRequest as any)._retry = true;

      const newJwtToken = await refreshJwtToken();

      if (newJwtToken) {
        originalRequest.headers.Authorization = `Bearer ${newJwtToken}`;
        return apiClient(originalRequest);
      } else {
        useAuthStore.getState().removeAccessToken();
      }
    }

    return Promise.reject(error);
  }
);
