import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "he";

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
  isRTL: boolean;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language: Language) => {
        set({ language, isRTL: language === "he" });
        // Update HTML dir attribute
        if (typeof document !== "undefined") {
          document.documentElement.dir = language === "he" ? "rtl" : "ltr";
          document.documentElement.lang = language;
        }
      },
      isRTL: false,
    }),
    {
      name: "language-storage",
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== "undefined") {
          document.documentElement.dir = state.language === "he" ? "rtl" : "ltr";
          document.documentElement.lang = state.language;
          state.isRTL = state.language === "he";
        }
      },
    }
  )
);

