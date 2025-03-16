import { create } from "zustand";

interface ThemeState {
  theme: string | any;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem("theme") || "luxury",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
