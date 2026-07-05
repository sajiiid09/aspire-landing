import type { Metadata } from "next";
import Script from "next/script";
import {
  Cormorant_Garamond,
  EB_Garamond,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Orbitron,
  Pinyon_Script,
  Sora,
  Space_Grotesk,
} from "next/font/google";
import { SITE, THEME_STORAGE_KEY, THEMES } from "@/lib/config";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";
import "../styles/themes.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});
const ebGaramond = EB_Garamond({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});
const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});
const orbitron = Orbitron({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
const sora = Sora({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const fontVariables = [
  instrumentSerif,
  inter,
  cormorant,
  ebGaramond,
  pinyonScript,
  orbitron,
  spaceGrotesk,
  jetbrainsMono,
  sora,
]
  .map((f) => f.variable)
  .join(" ");

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

/**
 * Sets data-theme before first paint — must stay tiny and dependency-free.
 * Non-default saved themes also paint-gate the body (html.theme-boot) until
 * the ThemeProvider swaps in the right section order; a 3s timeout guarantees
 * content is never stranded hidden (PLAN.md §3.3).
 */
const noFlashScript = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(${JSON.stringify(THEMES)}.indexOf(t)>-1){document.documentElement.dataset.theme=t;if(t!=="default"){var d=document.documentElement;d.classList.add("theme-boot");setTimeout(function(){d.classList.remove("theme-boot")},3000)}}}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  email: SITE.email, // PLACEHOLDER — pending client data
  telephone: SITE.phone,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        <noscript>
          <style>{`html.theme-boot body{visibility:visible !important}`}</style>
        </noscript>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
