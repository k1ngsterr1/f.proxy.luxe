import {AxiosError, InternalAxiosRequestConfig} from "axios";
import { BaseService } from "./base.service";
import type {
    RegisterDto,
    LoginDto,
    TokensResponse,
    UserResponse
} from "@/types/auth.types";

export class AuthService extends BaseService {
    constructor() {
        super();
        this.initializeInterceptors();
    }

    private initializeInterceptors() {
        this.http.interceptors.request.use((config) => {
            const token = this.getAccessToken();
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        this.http.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

                if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const newTokens = await this.refreshTokens();
                        this.setAccessToken(newTokens.accessToken);
                        return this.http.request(originalRequest);
                    } catch (refreshError) {
                        this.clearAuthData();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    async register(data: RegisterDto): Promise<UserResponse> {
        const response = await this.http.post<UserResponse>("/v1/auth/register", data);
        return response.data;
    }

    async login(data: LoginDto): Promise<TokensResponse> {
        const response = await this.http.post<TokensResponse>("/v1/auth/login", data);
        this.setAuthData(response.data);
        return response.data;
    }

    async refreshTokens(): Promise<TokensResponse> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const response = await this.http.post<TokensResponse>("/v1/auth/refresh", {
            refreshToken
        });
        this.setAuthData(response.data);
        return response.data;
    }

    async signOut(): Promise<void> {
        await this.http.post("/v1/auth/sign-out");
        this.clearAuthData();
    }

    private setAuthData(tokens: TokensResponse) {
        if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", tokens.accessToken);
            localStorage.setItem("refreshToken", tokens.refreshToken);
        }
    }

    private clearAuthData() {
        if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    }

    getAccessToken(): string | null {
        return typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    }

    getRefreshToken(): string | null {
        return typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
    }

    private setAccessToken(token: string) {
        if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", token);
        }
    }
}