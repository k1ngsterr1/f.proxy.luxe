"use client";
import { create } from "zustand";
import { useEffect } from "react";

// Define the store type
interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
}

// Create Zustand store with types
export const useAuthStore = create<AuthState>((set) => ({
  token: null, // Start with `null` to prevent SSR issues

  setToken: (token) => {
    if (typeof window !== "undefined") {
      // Ensure it's running in the browser
      if (token) {
        localStorage.setItem("accessToken", token);
      } else {
        localStorage.removeItem("accessToken");
      }
    }
    set({ token });
  },

  clearToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
    set({ token: null });
  },
}));

// Hook to load token from localStorage on the client
export const useLoadAuth = () => {
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [setToken]);
};
