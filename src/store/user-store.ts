import { User } from "@/app/types/auth";
import {
  clearAuthSessionCookie,
  setAuthSessionCookie,
} from "@/lib/auth-session-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setUser: (user) => {
        set({ user });
      },

      setToken: (token) => {
        set({ token });
      },

      login: (user, token) => {
        set({ user, token });
        setAuthSessionCookie();
      },

      logout: () => {
        set({ user: null, token: null });
        clearAuthSessionCookie();
      },

      isAuthenticated: () => {
        const state = get();
        return !!(state.user && state.token);
      },
    }),
    {
      name: "askmi_admin",
      onRehydrateStorage: () => (state, error) => {
        if (error || typeof window === "undefined") return;
        if (state?.token) {
          setAuthSessionCookie();
        } else {
          clearAuthSessionCookie();
        }
      },
    }
  )
);
