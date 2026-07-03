import type { LucideIcon } from "lucide-react";
import {
  GraduationCap,
  StampIcon,
  Award,
  BookOpenCheck,
  Compass,
  PlaneTakeoff,
} from "lucide-react";

/**
 * ALL page copy and data. Sections import their slice from here —
 * no marketing strings inside components (agent.md rule 4).
 */

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Destination {
  country: string;
  image: string;
  statLine: string;
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  destination: string;
  university: string;
  image: string;
}

export const NAV_LINKS = [
  { label: "Home", href: "#home", active: true },
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Stories", href: "#stories" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  // Emphasis segments render muted (and cursive in classical theme)
  headline: [
    { text: "Where " },
    { text: "ambition", em: true },
    { text: " finds " },
    { text: "its horizon.", em: true },
  ],
  subtext:
    "We guide students from first question to first day abroad — universities, visas, scholarships, and everything between. Calm, expert, end to end.",
  cta: "Begin Your Journey",
  // PLACEHOLDER — design-phase asset; production video TBD (architecture.md §10)
  videoSrc:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  poster: "/images/hero-poster.svg",
} as const;

// PLACEHOLDER — pending client BRD data
export const STATS: { eyebrow: string; title: string; body: string; items: Stat[] } = {
  eyebrow: "Our Impact",
  title: "Proven Guidance, Real Outcomes",
  body: "A decade of helping students cross borders with confidence — from application to arrival, every step handled with care.",
  items: [
    { value: 5000, suffix: "+", label: "Students placed worldwide" },
    { value: 98, suffix: "%", label: "Visa success rate" },
    { value: 12, suffix: "", label: "Destination countries" },
    { value: 250, suffix: "+", label: "Partner universities" },
  ],
};

export const SERVICES: { eyebrow: string; title: string; items: Service[] } = {
  eyebrow: "What we do",
  title: "Every step, handled.",
  items: [
    {
      icon: GraduationCap,
      title: "University Admissions",
      description:
        "Shortlisting, applications, and offer negotiation with universities that fit your goals.",
    },
    {
      icon: StampIcon,
      title: "Visa Guidance",
      description:
        "Document preparation, interview coaching, and end-to-end visa filing support.",
    },
    {
      icon: Award,
      title: "Scholarship Support",
      description:
        "Finding and winning funding — merit awards, grants, and tuition waivers.",
    },
    {
      icon: BookOpenCheck,
      title: "Test Preparation",
      description:
        "IELTS, TOEFL, SAT, and GRE prep with structured plans and mock testing.",
    },
    {
      icon: Compass,
      title: "Career Counseling",
      description:
        "Course and country choices mapped to the career you actually want.",
    },
    {
      icon: PlaneTakeoff,
      title: "Pre-Departure Briefing",
      description:
        "Housing, banking, culture, and arrival logistics — ready before you fly.",
    },
  ],
};

// PLACEHOLDER — pending client BRD data
export const DESTINATIONS: { eyebrow: string; title: string; items: Destination[] } = {
  eyebrow: "Where you can go",
  title: "Study Destinations",
  items: [
    {
      country: "United Kingdom",
      image: "/images/dest-uk.svg",
      statLine: "40+ partner universities",
      featured: true,
    },
    {
      country: "United States",
      image: "/images/dest-usa.svg",
      statLine: "60+ partner universities",
    },
    {
      country: "Canada",
      image: "/images/dest-canada.svg",
      statLine: "35+ partner universities",
    },
    {
      country: "Australia",
      image: "/images/dest-australia.svg",
      statLine: "30+ partner universities",
    },
    {
      country: "Germany",
      image: "/images/dest-germany.svg",
      statLine: "25+ partner universities",
    },
    {
      country: "Malaysia",
      image: "/images/dest-malaysia.svg",
      statLine: "20+ partner universities",
    },
  ],
};

export const COURSE_FINDER = {
  title: "Find the course that fits your future.",
  body: "Search thousands of programs across our partner universities — filtered by subject, budget, and destination.",
  cta: "Explore Course Finder",
} as const;

// PLACEHOLDER — fictional testimonials pending real student stories
export const TESTIMONIALS: { eyebrow: string; title: string; items: Testimonial[] } = {
  eyebrow: "Student stories",
  title: "They aspired. They arrived.",
  items: [
    {
      quote:
        "Aspire turned a mountain of paperwork into a checklist. I had my UK offer in six weeks.",
      name: "Nusrat Rahman",
      destination: "United Kingdom",
      university: "University of Manchester",
      image: "/images/student-1.svg",
    },
    {
      quote:
        "The visa interview coaching alone was worth it. I walked in prepared and walked out approved.",
      name: "Arif Chowdhury",
      destination: "Canada",
      university: "University of Toronto",
      image: "/images/student-2.svg",
    },
    {
      quote:
        "They found me a scholarship I did not know existed. Half my tuition, covered.",
      name: "Mahia Islam",
      destination: "Australia",
      university: "Monash University",
      image: "/images/student-3.svg",
    },
    {
      quote:
        "From IELTS prep to my first apartment in Berlin — one team handled everything.",
      name: "Tanvir Ahmed",
      destination: "Germany",
      university: "TU Berlin",
      image: "/images/student-4.svg",
    },
  ],
};

export const CONTACT = {
  eyebrow: "Get in touch",
  title: "Start the conversation.",
  body: "Tell us where you want to go. A counselor will reach out within one business day.",
  destinationOptions: [
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
    "Germany",
    "Malaysia",
    "Not sure yet",
  ],
} as const;

export const FOOTER = {
  tagline: "Guiding students from first question to first day abroad.",
  explore: NAV_LINKS.filter((l) => l.href !== "#home"),
  legal: [
    { label: "Privacy", href: "#" }, // PLACEHOLDER
    { label: "Terms", href: "#" }, // PLACEHOLDER
  ],
} as const;
