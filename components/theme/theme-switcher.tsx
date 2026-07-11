"use client";

import { THEMES, type ThemeId } from "@/lib/config";
import { useTheme } from "./theme-provider";

const THEME_META: Record<ThemeId, { label: string }> = {
  default: { label: "Clean White" },
  classical: { label: "Cinematic Navy" },
  cyberpunk: { label: "Neon Circuit" },
  space: { label: "Sky & Stars" },
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const cycle = (dir: 1 | -1) => {
    const i = THEMES.indexOf(theme);
    setTheme(THEMES[(i + dir + THEMES.length) % THEMES.length]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        role="radiogroup"
        aria-label="Color theme"
        className="surface flex flex-row items-center gap-2 rounded-full p-2"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            cycle(1);
          } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            cycle(-1);
          }
        }}
      >
        {THEMES.map((id, i) => (
          <button
            key={id}
            role="radio"
            aria-checked={theme === id}
            aria-label={`Theme ${i + 1}: ${THEME_META[id].label}`}
            title={THEME_META[id].label}
            onClick={() => setTheme(id)}
            className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium text-foreground transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ring))] ${
              theme === id
                ? "scale-110 ring-2 ring-[hsl(var(--ring))] ring-offset-2 ring-offset-transparent"
                : "opacity-70 hover:scale-105 hover:opacity-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
