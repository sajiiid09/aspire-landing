"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { THEMES, THEME_STORAGE_KEY, type ThemeId } from "@/lib/config";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  /** True once the saved theme has been read post-hydration. Until then
   *  consumers must render the default tree (SSR/hydration parity). */
  resolved: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("default");
  const [resolved, setResolved] = useState(false);

  // Sync with the attribute the no-flash script set before hydration
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (isThemeId(current)) setThemeState(current);
    setResolved(true);
  }, []);

  // Runs after the resolved (re-ordered) tree has committed — safe to reveal
  useEffect(() => {
    if (resolved) document.documentElement.classList.remove("theme-boot");
  }, [resolved]);

  // Switching swaps the whole section order, so a full reload keeps SSR,
  // scroll position, and animation state coherent (PLAN.md §3.4).
  const setTheme = useCallback((next: ThemeId) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // storage unavailable (private mode) — theme still applies for session
    }
    document.documentElement.dataset.theme = next;
    window.location.reload();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolved }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
