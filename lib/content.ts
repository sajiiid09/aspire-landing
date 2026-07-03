import type { LucideIcon } from "lucide-react";
import {
  GraduationCap,
  StampIcon,
  Award,
  BookOpenCheck,
  Compass,
  PlaneTakeoff,
  BadgeCheck,
  Route,
} from "lucide-react";

/**
 * ALL page copy and data. Sections import their slice from here —
 * no marketing strings inside components (AGENT.md rule 4).
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
  imageAlt: string;
  statLine: string;
  universities: string[];
  featured?: boolean;
}

export interface DestinationHighlight {
  icon: LucideIcon;
  title: string;
  description: string;
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
  // PLACEHOLDER — design-phase asset; production video TBD (ARCHITECTURE.md §10)
  videoSrc:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  poster:
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop",
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

// PLACEHOLDER — pending client BRD data (stat lines and partnership claims;
// university names are real, partnership status unconfirmed)
export const DESTINATIONS: {
  eyebrow: string;
  title: string;
  items: Destination[];
  highlights: DestinationHighlight[];
} = {
  eyebrow: "Where you can go",
  title: "Study Destinations",
  items: [
    {
      country: "United Kingdom",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1600&auto=format&fit=crop",
      imageAlt: "Tower Bridge and the London skyline along the Thames",
      statLine: "40+ partner universities",
      universities: [
        "University of Oxford",
        "UCL",
        "University of Manchester",
        "University of Edinburgh",
        "King's College London",
      ],
      featured: true,
    },
    {
      country: "United States",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1600&auto=format&fit=crop",
      imageAlt: "Times Square street view in New York City",
      statLine: "60+ partner universities",
      universities: [
        "New York University",
        "Boston University",
        "UIUC",
        "Arizona State University",
        "Northeastern University",
      ],
    },
    {
      country: "Canada",
      image:
        "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1600&auto=format&fit=crop",
      imageAlt: "Toronto skyline with the CN Tower at sunset",
      statLine: "35+ partner universities",
      universities: [
        "University of Toronto",
        "UBC",
        "McGill University",
        "University of Waterloo",
      ],
    },
    {
      country: "Australia",
      image:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop",
      imageAlt: "Sydney Harbour with the Opera House and city skyline",
      statLine: "30+ partner universities",
      universities: [
        "University of Melbourne",
        "Monash University",
        "UNSW Sydney",
        "University of Sydney",
      ],
    },
    {
      country: "Germany",
      image:
        "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1600&auto=format&fit=crop",
      imageAlt: "Brandenburg Gate in Berlin under a summer sky",
      statLine: "25+ partner universities",
      universities: [
        "TU Munich",
        "TU Berlin",
        "RWTH Aachen",
        "Heidelberg University",
      ],
    },
    {
      country: "Malaysia",
      image:
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1600&auto=format&fit=crop",
      imageAlt: "Petronas Towers rising over Kuala Lumpur at dusk",
      statLine: "20+ partner universities",
      universities: [
        "Universiti Malaya",
        "Taylor's University",
        "Sunway University",
        "UKM",
      ],
    },
  ],
  highlights: [
    {
      icon: BadgeCheck,
      title: "98% Visa Success",
      description:
        "Interview coaching and airtight document prep keep our approval rate among the highest in the region.",
    },
    {
      icon: Award,
      title: "Scholarships Secured",
      description:
        "Every intake, we match students with merit awards, grants, and tuition waivers they didn't know existed.",
    },
    {
      icon: Route,
      title: "End-to-End Support",
      description:
        "From your first consultation to airport pickup — one team, one plan, every step handled.",
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
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    },
    {
      quote:
        "The visa interview coaching alone was worth it. I walked in prepared and walked out approved.",
      name: "Arif Chowdhury",
      destination: "Canada",
      university: "University of Toronto",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    },
    {
      quote:
        "They found me a scholarship I did not know existed. Half my tuition, covered.",
      name: "Mahia Islam",
      destination: "Australia",
      university: "Monash University",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
    },
    {
      quote:
        "From IELTS prep to my first apartment in Berlin — one team handled everything.",
      name: "Tanvir Ahmed",
      destination: "Germany",
      university: "TU Berlin",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
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
