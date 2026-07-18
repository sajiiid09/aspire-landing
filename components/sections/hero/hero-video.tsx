"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom";

export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  preload(poster, { as: "image", fetchPriority: "high" });
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (media.matches) {
        ref.current?.pause();
      } else {
        void ref.current?.play().catch(() => undefined);
      }
    };
    syncPlayback();
    media.addEventListener("change", syncPlayback);
    return () => media.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <video ref={ref} className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata" poster={poster} aria-hidden>
      <source src={src} type="video/mp4" />
    </video>
  );
}
