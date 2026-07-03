"use client";

import { useEffect, useRef, useState } from "react";
import { Palette } from "lucide-react";
import { THEMES, type ThemeId } from "@/lib/config";
import { useTheme } from "./theme-provider";

const THEME_META: Record<ThemeId, { label: string; swatch: string }> = {
  default: {
    label: "Cinematic Navy",
    swatch: "linear-gradient(135deg, hsl(201 100% 13%), hsl(201 60% 30%))",
  },
  classical: {
    label: "Academic Manuscript",
    swatch: "linear-gradient(135deg, hsl(39 32% 89%), hsl(30 25% 65%))",
  },
  cyberpunk: {
    label: "Neon Circuit",
    swatch: "linear-gradient(135deg, hsl(320 100% 60%), hsl(180 100% 50%))",
  },
  space: {
    label: "Sky & Stars",
    swatch: "linear-gradient(135deg, hsl(240 45% 8%), hsl(255 85% 72%))",
  },
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Collapse on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const cycle = (dir: 1 | -1) => {
    const i = THEMES.indexOf(theme);
    setTheme(THEMES[(i + dir + THEMES.length) % THEMES.length]);
  };

  return (
    <div ref={rootRef} className="fixed bottom-6 right-6 z-50">
      <div className="liquid-glass flex flex-col items-center gap-3 rounded-full p-2">
        {open && (
          <div
            role="radiogroup"
            aria-label="Color theme"
            className="flex flex-col gap-2"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                cycle(1);
              } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                cycle(-1);
              }
            }}
          >
            {THEMES.map((id) => (
              <button
                key={id}
                role="radio"
                aria-checked={theme === id}
                aria-label={THEME_META[id].label}
                title={THEME_META[id].label}
                onClick={() => {
                  setTheme(id);
                  setOpen(false);
                }}
                className={`h-8 w-8 rounded-full transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ring))] ${
                  theme === id
                    ? "scale-110 ring-2 ring-[hsl(var(--ring))] ring-offset-2 ring-offset-transparent"
                    : "hover:scale-110"
                }`}
                style={{ background: THEME_META[id].swatch }}
              />
            ))}
          </div>
        )}
        <button
          aria-label={open ? "Close theme picker" : "Open theme picker"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ring))]"
          style={{ background: THEME_META[theme].swatch }}
        >
          <Palette className="h-5 w-5 text-white drop-shadow" />
        </button>
      </div>
    </div>
  );
}
