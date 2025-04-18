import reactQueryClient from "@/shared/config/query-client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  role: string | null;
  saveAccessToken: (token: string) => void;
  removeAccessToken: () => void;
  saveRefreshToken: (token: string) => void;
  removeRefreshToken: () => void;
  loadToken: () => string | null;
  saveRole: (role: string) => void;
  removeRole: () => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      role: null,

      saveAccessToken: (token: string) => set({ token }),

      removeAccessToken: () => {
        set({ token: null });
      },

      saveRefreshToken: (token: string) => {
        // Store refresh token in localStorage separately
        // This avoids overwriting the access token
        if (typeof window !== "undefined") {
          localStorage.setItem("refresh-token", token);
        }
      },

      removeRefreshToken: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("refresh-token");
        }
      },

      loadToken: () => {
        return get().token;
      },

      saveRole: (role: string) => {
        set({ role });
      },

      removeRole: () => {
        set({ role: null });
      },

      logout: () => {
        // Clear all auth state
        set({ token: null, role: null });

        // Clear refresh token
        if (typeof window !== "undefined") {
          localStorage.removeItem("refresh-token");
        }

        // Clear React Query cache
        reactQueryClient.resetQueries();
        reactQueryClient.clear();
      },

      isAuthenticated: () => {
        return !!get().token;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        role: state.role,
      }),
    }
  )
);
