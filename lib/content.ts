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

export interface HeadlinePart {
  text: string;
  em?: boolean;
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

/**
 * Superset hero data — each theme's hero variant renders only the fields it
 * needs (PLAN.md §6). `cta` stays the primary CTA label for all variants.
 */
export const HERO: {
  eyebrow: string;
  headline: readonly HeadlinePart[];
  subtext: string;
  cta: string;
  secondaryCta: { label: string; href: string };
  trustStats: readonly Stat[];
  avatars: readonly { src: string; alt: string }[];
  videoSrc: string;
  poster: string;
  collage: readonly { src: string; alt: string }[];
  terminalLines: readonly string[];
} = {
  // PLACEHOLDER — pending client BRD data (eyebrow, trust copy, terminal log)
  eyebrow: "UK · USA · Canada · Australia · Germany · Malaysia",
  // Emphasis segments render muted (and italic-serif in default theme)
  headline: [
    { text: "Where " },
    { text: "ambition", em: true },
    { text: " finds " },
    { text: "its horizon.", em: true },
  ],
  subtext:
    "We guide students from first question to first day abroad — universities, visas, scholarships, and everything between. Calm, expert, end to end.",
  cta: "Begin Your Journey",
  secondaryCta: { label: "Explore Destinations", href: "#destinations" },
  trustStats: [{ value: 98, suffix: "%", label: "Visa success rate" }],
  avatars: [
    { src: "/images/student-1.jpg", alt: "Aspire student" },
    { src: "/images/student-2.jpg", alt: "Aspire student" },
    { src: "/images/student-3.jpg", alt: "Aspire student" },
  ],
  // PLACEHOLDER — design-phase asset; production video TBD (ARCHITECTURE.md §10)
  videoSrc:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  poster:
    "/images/hero-poster.jpg",
  collage: [
    { src: "/images/hero-poster.jpg", alt: "University campus at golden hour" },
    { src: "/images/dest-uk.jpg", alt: "London skyline along the Thames" },
    { src: "/images/student-4.jpg", alt: "Student settled abroad" },
  ],
  terminalLines: [
    "> init aspire_global --mode=student",
    "> scanning 250+ partner universities … ok",
    "> visa_success_rate: 98%",
    "> destination_matrix: [UK, USA, CA, AU, DE, MY]",
  ],
};

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
        "/images/dest-uk.jpg",
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
        "/images/dest-usa.jpg",
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
        "/images/dest-canada.jpg",
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
        "/images/dest-australia.jpg",
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
        "/images/dest-germany.jpg",
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
        "/images/dest-malaysia.jpg",
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
        "/images/student-1.jpg",
    },
    {
      quote:
        "The visa interview coaching alone was worth it. I walked in prepared and walked out approved.",
      name: "Arif Chowdhury",
      destination: "Canada",
      university: "University of Toronto",
      image:
        "/images/student-2.jpg",
    },
    {
      quote:
        "They found me a scholarship I did not know existed. Half my tuition, covered.",
      name: "Mahia Islam",
      destination: "Australia",
      university: "Monash University",
      image:
        "/images/student-3.jpg",
    },
    {
      quote:
        "From IELTS prep to my first apartment in Berlin — one team handled everything.",
      name: "Tanvir Ahmed",
      destination: "Germany",
      university: "TU Berlin",
      image:
        "/images/student-4.jpg",
    },
  ],
};

export const CONTACT = {
  eyebrow: "Get in touch",
  title: "Start the conversation.",
  body: "Tell us where you want to go. A counselor will reach out within one business day.",
  backgroundImage: "/images/contact-bg.jpg",
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

/* ------------------------------------------------------------------ */
/* Structural-variant slices (PLAN.md §6). All PLACEHOLDER until BRD.  */
/* ------------------------------------------------------------------ */

// PLACEHOLDER — pending client BRD data (real partner names/logos)
export const TRUST_LOGOS: { eyebrow: string; items: { name: string; logo: string }[] } = {
  eyebrow: "Trusted by partner universities worldwide",
  items: [
    { name: "University of Manchester", logo: "/logos/manchester.svg" },
    { name: "University of Toronto", logo: "/logos/toronto.svg" },
    { name: "Monash University", logo: "/logos/monash.svg" },
    { name: "TU Berlin", logo: "/logos/tu-berlin.svg" },
    { name: "UNSW Sydney", logo: "/logos/unsw-sydney.png" },
    { name: "Universiti Malaya", logo: "/logos/universiti-malaya.svg" },
    { name: "University of Oxford", logo: "/logos/oxford.svg" },
    { name: "NUS Singapore", logo: "/logos/nus-singapore.svg" },
  ],
};

// PLACEHOLDER — pending client BRD data
export const ABOUT: {
  eyebrow: string;
  title: readonly HeadlinePart[];
  paragraphs: string[];
  image: string;
  imageAlt: string;
  statBadge: Stat;
  tags: string[];
} = {
  eyebrow: "About Aspire",
  title: [{ text: "Be a part of " }, { text: "our success.", em: true }],
  paragraphs: [
    "Aspire Global Education is a full-service study-abroad consultancy. From your first counseling session to your first day on campus, one dedicated team plans, prepares, and files everything with you.",
    "We match students to universities and scholarships across six destination countries, coach every visa interview, and stay reachable long after you land.",
  ],
  image: "/images/dest-uk.jpg",
  imageAlt: "Students walking through a historic university campus",
  statBadge: { value: 5000, suffix: "+", label: "Students placed" },
  tags: ["Admissions", "Visa Filing", "Scholarships", "Test Prep", "Career Counseling", "Pre-Departure"],
};

// PLACEHOLDER — pending client BRD data
export const WHY_CHOOSE_US: {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  items: { title: string; description: string }[];
} = {
  eyebrow: "Why choose us",
  title: "An honest, practical path abroad.",
  body: "We pride ourselves on straight answers, airtight paperwork, and counselors who stay with you from shortlist to arrival.",
  cta: { label: "Talk to a Counselor", href: "#contact" },
  items: [
    {
      title: "Dedicated Counselor",
      description: "One expert owns your case end to end — no handoffs, no repeated stories.",
    },
    {
      title: "Airtight Applications",
      description: "Document prep and review that keeps our visa success rate at 98%.",
    },
    {
      title: "Scholarship-First",
      description: "Every profile is screened against funding options before we file.",
    },
    {
      title: "After-Landing Support",
      description: "Housing, banking, and arrival logistics arranged before you fly.",
    },
  ],
};

// PLACEHOLDER — pending client BRD data
export const PROCESS_STEPS: {
  eyebrow: string;
  title: string;
  body: string;
  steps: { title: string; description: string }[];
} = {
  eyebrow: "How it works",
  title: "Your journey, step by step.",
  body: "A clear, guided path from first consultation to your first day abroad.",
  steps: [
    { title: "Profile Assessment", description: "Free consultation to map goals, budget, and eligibility." },
    { title: "University Shortlist", description: "Programs matched to your career plan across six countries." },
    { title: "Applications Filed", description: "Documents, essays, and offers handled with you." },
    { title: "Visa Approved", description: "Coaching and airtight filing for a confident interview." },
    { title: "Pre-Departure", description: "Housing, banking, and culture briefing before you fly." },
    { title: "Arrival & Beyond", description: "Airport pickup coordination and on-the-ground support." },
  ],
};

// PLACEHOLDER — reuses existing imagery pending client gallery
export const GALLERY: {
  eyebrow: string;
  title: string;
  items: { image: string; alt: string; caption?: string }[];
} = {
  eyebrow: "Moments",
  title: "Achievements & departures.",
  items: [
    { image: "/images/student-1.jpg", alt: "Student celebrating an offer letter", caption: "UK offer secured" },
    { image: "/images/student-2.jpg", alt: "Student at visa approval", caption: "Canada visa approved" },
    { image: "/images/student-3.jpg", alt: "Student before departure", caption: "Off to Australia" },
    { image: "/images/student-4.jpg", alt: "Student settled abroad", caption: "First week in Berlin" },
  ],
};

// PLACEHOLDER — pending client BRD data
export const FAQ_ITEMS: {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  items: { question: string; answer: string }[];
} = {
  eyebrow: "FAQ",
  title: "Frequently asked questions.",
  image: "/images/dest-usa.jpg",
  imageAlt: "City view of a study destination",
  items: [
    {
      question: "How early should I start my application?",
      answer:
        "Ideally 10–12 months before your target intake. That leaves time for tests, shortlisting, applications, and visa processing without rush fees.",
    },
    {
      question: "Do you help with scholarships?",
      answer:
        "Yes — every profile is screened against merit awards, grants, and tuition waivers before we file a single application.",
    },
    {
      question: "What does your service cost?",
      answer:
        "Initial counseling is free. Service fees depend on destination and package — a counselor will share the full breakdown up front.",
    },
    {
      question: "Which English tests do you prepare students for?",
      answer: "IELTS, TOEFL, SAT, and GRE — with structured plans and mock testing.",
    },
    {
      question: "Do you support students after arrival?",
      answer:
        "Yes. Housing, banking, and airport pickup are arranged pre-departure, and your counselor stays reachable after you land.",
    },
  ],
};

// PLACEHOLDER — fictional milestones pending real company history
export const HERITAGE_MILESTONES: {
  eyebrow: string;
  title: string;
  items: { year: string; title: string; description: string }[];
} = {
  eyebrow: "Our heritage",
  title: "A decade of departures.",
  items: [
    { year: "2015", title: "Founded in Dhaka", description: "A two-desk office and a promise: honest guidance, end to end." },
    { year: "2017", title: "First 500 students placed", description: "Partnerships signed across the UK and Malaysia." },
    { year: "2020", title: "Six destinations", description: "Canada, Australia, Germany, and the USA join the map." },
    { year: "2023", title: "250+ partner universities", description: "Scholarship-first filing becomes standard for every profile." },
    { year: "2026", title: "5,000 students and counting", description: "One team, one plan — every step still handled with care." },
  ],
};

// PLACEHOLDER — pending client BRD data
export const SYSTEM_STATUS: {
  eyebrow: string;
  title: string;
  statusLabel: string;
  readouts: Stat[];
  logLines: string[];
} = {
  eyebrow: "Live telemetry",
  title: "System status: operational.",
  statusLabel: "SYSTEM ONLINE",
  readouts: [
    { value: 5000, suffix: "+", label: "students_placed" },
    { value: 98, suffix: "%", label: "visa_success" },
    { value: 250, suffix: "+", label: "partner_nodes" },
    { value: 12, suffix: "", label: "destinations" },
  ],
  logLines: [
    "[ok] admissions_pipeline … active",
    "[ok] visa_filing_queue … clear",
    "[ok] scholarship_scanner … 41 matches today",
    "[ok] counselor_uplink … 1 business day",
  ],
};

// PLACEHOLDER — node positions are layout coordinates (% of container)
export const JOURNEY_NODES: {
  eyebrow: string;
  title: string;
  nodes: { label: string; sub?: string; x: number; y: number }[];
} = {
  eyebrow: "Mission path",
  title: "Chart your constellation.",
  nodes: [
    { label: "Dhaka", sub: "Launch", x: 8, y: 72 },
    { label: "Kuala Lumpur", sub: "20+ universities", x: 26, y: 48 },
    { label: "Berlin", sub: "25+ universities", x: 42, y: 26 },
    { label: "London", sub: "40+ universities", x: 58, y: 52 },
    { label: "Toronto", sub: "35+ universities", x: 74, y: 24 },
    { label: "Sydney", sub: "30+ universities", x: 90, y: 60 },
  ],
};

// PLACEHOLDER — pending real phone/WhatsApp numbers (SITE.phone in lib/config.ts)
export const HEADER_CONTACT = {
  phoneLabel: "+880 1XXX-XXXXXX",
  phoneHref: "tel:+8801XXXXXXXXX",
  whatsappHref: "https://wa.me/8801XXXXXXXXX",
} as const;

export const FOOTER = {
  tagline: "Guiding students from first question to first day abroad.",
  explore: NAV_LINKS.filter((l) => l.href !== "#home"),
  legal: [
    { label: "Privacy", href: "#" }, // PLACEHOLDER
    { label: "Terms", href: "#" }, // PLACEHOLDER
  ],
  // PLACEHOLDER — social profiles pending client handles
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
  ],
} as const;
