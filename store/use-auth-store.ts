import reactQueryClient from "@/hooks/apiClient/query-client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  role: string | null;
  saveAccessToken: (token: string) => void;
  removeAccessToken: () => void;
  saveRefreshToken: (token: string) => void;
  removeRefreshToken: () => void;
  loadToken: () => Promise<string | null>;
  saveRole: (role: string) => void;
  removeRole: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      role: null,

      saveAccessToken: (token: string) => set({ token }),

      removeAccessToken: () => {
        set({ token: null });
        localStorage.removeItem("auth-storage"); // ✅ Ensure full removal
        reactQueryClient.resetQueries();
        reactQueryClient.clear();
      },

      saveRefreshToken: (token: string) => set({ token }),

      removeRefreshToken: () => {
        set({ token: null });
        localStorage.removeItem("auth-storage"); // ✅ Ensure full removal
        reactQueryClient.resetQueries();
        reactQueryClient.clear();
      },

      loadToken: async () => {
        return get().token;
      },

      saveRole: (role: string) => {
        set({ role });
      },

      removeRole: () => {
        set({ role: null });

        setTimeout(() => {
          localStorage.removeItem("role");
          localStorage.setItem(
            "auth-storage",
            JSON.stringify({ state: get(), version: 0 })
          );
        }, 0);

        reactQueryClient.resetQueries();
        reactQueryClient.clear();
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
