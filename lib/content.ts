import type { LucideIcon } from "lucide-react";
import {
  GraduationCap,
  StampIcon,
  Award,
  Compass,
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
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Stories", href: "/#stories" },
  { label: "Contact", href: "/#contact" },
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
  backgroundImage: { src: string; alt: string };
  videoSrc: string;
  videoSrcCyberpunk: string;
  poster: string;
  collage: readonly { src: string; alt: string }[];
  terminalLines: readonly string[];
} = {
  eyebrow: "UK · USA · Canada · Australia · New Zealand · Europe",
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
  // PLACEHOLDER — BRD V2 §5 brief: wide-angle campus lifestyle shot, historic
  // architecture + glass innovation labs, soft natural morning light
  backgroundImage: {
    src: "/images/hero-campus.jpg",
    alt: "Wide-angle view of a modern university campus in soft morning light",
  },
  avatars: [
    { src: "/images/student-1.jpg", alt: "Aspire student" },
    { src: "/images/student-2.jpg", alt: "Aspire student" },
    { src: "/images/student-3.jpg", alt: "Aspire student" },
  ],
  // PLACEHOLDER — design-phase asset; production video TBD (ARCHITECTURE.md §10)
  videoSrc:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  // PLACEHOLDER — design-phase asset; production video TBD (ARCHITECTURE.md §10)
  videoSrcCyberpunk: "https://cdn.pixabay.com/video/2024/06/12/216369_large.mp4",
  poster:
    "/images/hero-poster.jpg",
  collage: [
    {
      src: "/images/hero-campus.jpg",
      alt: "Wide-angle view of a university campus quadrangle in soft morning light",
    },
    { src: "/images/dest-uk.jpg", alt: "London skyline along the Thames" },
    { src: "/images/student-4.jpg", alt: "Student settled abroad" },
  ],
  terminalLines: [
    "> init aspire_global --mode=student",
    "> scanning 750+ partner universities … ok",
    "> indexing 75,000+ courses … ok",
    "> visa_success_rate: 98%",
    "> destination_matrix: [UK, USA, CA, AU, NZ, DE, SE, ES, GR, CY, LV, LT, MT]",
  ],
};

export const STATS: { eyebrow: string; title: string; body: string; items: Stat[] } = {
  eyebrow: "Our Impact",
  title: "Proven Guidance, Real Outcomes",
  body: "Enterprise-grade infrastructure behind every application — from first counseling session to arrival, every step handled with care.",
  items: [
    { value: 750, suffix: "+", label: "Partner universities" },
    { value: 75000, suffix: "+", label: "Courses worldwide" },
    { value: 98, suffix: "%", label: "Visa success rate" },
    { value: 13, suffix: "+", label: "Destination countries" },
  ],
};

export const SERVICES: {
  eyebrow: string;
  title: string;
  cta: { label: string; href: string };
  items: Service[];
} = {
  eyebrow: "What we do",
  title: "Every step, handled.",
  cta: { label: "Explore our services in depth", href: "/services" },
  items: [
    {
      icon: Compass,
      title: "Personalized Global Counseling",
      description:
        "Data-driven profile evaluation mapping your academic history and career aspirations against high-growth global trajectories — comparing Tier-1 nations with cost-effective European Union options.",
    },
    {
      icon: GraduationCap,
      title: "Admission & Documentation Support",
      description:
        "Meticulous application processing, from structural refinement of SOPs to strategic alignment of LORs. We deal directly with our 750+ university partners to expedite fast-track offers.",
    },
    {
      icon: StampIcon,
      title: "Global Visa Application Guidance",
      description:
        "High-tier navigation of changing compliance codes — Schengen requirements, UKVI regulations, US F-1 pathways — with stringent mock interviews modeled on embassy guidelines.",
    },
    {
      icon: Award,
      title: "Scholarship & Financial Mapping",
      description:
        "Comprehensive evaluation of institutional aid, state-sponsored European grants, and merit-based bursaries to significantly lower the financial overhead of your education.",
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
      country: "New Zealand",
      image:
        "/images/dest-new-zealand.jpg",
      imageAlt: "Auckland skyline with the Sky Tower across the harbour",
      statLine: "15+ partner universities",
      universities: [
        "University of Auckland",
        "University of Otago",
        "Victoria University of Wellington",
        "Massey University",
      ],
    },
    {
      country: "Europe (Schengen)",
      image:
        "/images/dest-europe.jpg",
      imageAlt: "Cobbled old-town street with half-timbered houses in Europe at dusk",
      statLine: "7 more Schengen destinations",
      universities: [
        "Sweden",
        "Spain",
        "Greece",
        "Cyprus",
        "Latvia",
        "Lithuania",
        "Malta",
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
    "New Zealand",
    "Germany",
    "Europe (Schengen)",
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

export const ABOUT: {
  eyebrow: string;
  title: readonly HeadlinePart[];
  paragraphs: string[];
  image: string;
  imageAlt: string;
  statBadge: Stat;
  tags: string[];
  cta: { label: string; href: string };
} = {
  eyebrow: "About Aspire",
  title: [
    { text: "Democratizing " },
    { text: "elite international education", em: true },
    { text: " across the globe." },
  ],
  paragraphs: [
    "Aspire Global Education stands at the forefront of global student mobility. Founded on the principles of absolute transparency and operational excellence, we serve as a definitive pipeline to the world's leading universities — spanning the classic educational centers of the UK, USA, Canada, Australia, and New Zealand, alongside a strong presence in mainland Europe's premier destinations including Germany, Sweden, Spain, Greece, Cyprus, Latvia, Lithuania, and Malta.",
    "We remove the geographic and bureaucratic friction from international admissions, matching ambitious minds with over 75,000 premium courses worldwide. By combining deep human expertise with enterprise-grade digital infrastructure, we ensure your transition from local ambition to international success is swift, secure, and certain.",
  ],
  image: "/images/dest-uk.jpg",
  imageAlt: "Students walking through a historic university campus",
  statBadge: { value: 750, suffix: "+", label: "University partners" },
  tags: ["Global Counseling", "Admissions & Documentation", "Visa Guidance", "Scholarship Mapping", "Tier-1 Destinations", "Schengen & EU"],
  cta: { label: "Learn more about us", href: "/about" },
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

export interface OfferPoster {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
}

// Client-supplied promo posters (BRD V2 delivery, Jul 2026)
export const OFFERS: {
  eyebrow: string;
  title: string;
  body: string;
  items: OfferPoster[];
} = {
  eyebrow: "University Spotlights",
  title: "Current offers from our partners.",
  body: "Live intakes, scholarships, and early-bird discounts across our partner universities — tap any card to see the full details.",
  items: [
    {
      src: "/posters/8.jpeg",
      alt: "Arden University UK early-bird discount — save GBP 2,500 on tuition for September 2026 enrolment: Manchester GBP 10,000, London GBP 11,000.",
      label: "Arden University — Early-Bird Offer",
      width: 1080,
      height: 1350,
    },
    {
      src: "/posters/1.jpeg",
      alt: "University of Hull, London — MSc Business Management, Digital Marketing, and AI & Data Science; bachelor's with 50%+, IELTS 6.0, tuition GBP 17,000–18,000 with GBP 3,000 scholarship; intakes Sep 2026, Jan and May 2027.",
      label: "University of Hull, London",
      width: 899,
      height: 1599,
    },
    {
      src: "/posters/3.jpeg",
      alt: "Aston University, London — MSc Business Analytics, Data Science, Cyber Security Management, and Project Management; tuition GBP 13,950 after scholarship, scholarships available for all programmes.",
      label: "Aston University, London",
      width: 1080,
      height: 1350,
    },
    {
      src: "/posters/5.jpeg",
      alt: "Think big, think Germany — continue with a second master's in Germany after a UK master's: affordable quality education, high visa success, and a streamlined process.",
      label: "UK to Germany Pathway",
      width: 1280,
      height: 1600,
    },
    {
      src: "/posters/2.jpeg",
      alt: "Kingston University — MSc International Business, Accounting and Finance, and Data Science; IELTS 6.0–6.5, tuition GBP 19,700–25,000 with scholarships up to GBP 5,000; PG application deadline 3 Jul 2026.",
      label: "Kingston University",
      width: 810,
      height: 1440,
    },
    {
      src: "/posters/6.jpeg",
      alt: "University of East London — TEF Silver rated with flexible payment plans; tuition GBP 16,000–19,500, scholarships up to GBP 5,000, initial deposit GBP 1,500.",
      label: "University of East London",
      width: 810,
      height: 1440,
    },
    {
      src: "/posters/7.jpeg",
      alt: "Study in Canada — Fairleigh Dickinson University, Vancouver: Master of Administrative Science with specialisations in Computer Security & Forensic Administration and Global Technology Administration.",
      label: "FDU Vancouver — Study in Canada",
      width: 899,
      height: 1599,
    },
    {
      src: "/posters/4.jpeg",
      alt: "Highly-ranked UK universities with low deposits — minimum deposits from GBP 500 at Roehampton, Birmingham City, Buckinghamshire New, East London, Chester, and Ulster.",
      label: "UK Universities — Low Deposits",
      width: 899,
      height: 1599,
    },
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
    { year: "2023", title: "750+ partner universities", description: "Scholarship-first filing becomes standard for every profile." },
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
    { value: 75000, suffix: "+", label: "courses_indexed" },
    { value: 98, suffix: "%", label: "visa_success" },
    { value: 750, suffix: "+", label: "partner_nodes" },
    { value: 13, suffix: "+", label: "destinations" },
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
    { label: "Auckland", sub: "15+ universities", x: 26, y: 48 },
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
  explore: NAV_LINKS.filter((l) => l.href !== "/"),
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

/* ------------------------------------------------------------------ */
/* Inner pages (/about, /services) — BRD V2 §4A/§4B copy.              */
/* Skin-only pages: fixed layout, themed via CSS variables.            */
/* ------------------------------------------------------------------ */

export interface PageHero {
  eyebrow: string;
  title: readonly HeadlinePart[];
  intro: string;
}

export interface ServiceDetail {
  icon: LucideIcon;
  title: string;
  description: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
}

export interface PageCta {
  title: string;
  body: string;
  label: string;
  href: string;
}

export const ABOUT_PAGE: {
  meta: { title: string; description: string };
  hero: PageHero;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  stats: readonly Stat[];
  destinations: {
    eyebrow: string;
    title: string;
    tier1: { label: string; description: string; countries: string[] };
    europe: { label: string; description: string; countries: string[] };
  };
  cta: PageCta;
} = {
  meta: {
    title: "About Us — Aspire Global Education",
    description:
      "Aspire Global Education stands at the forefront of global student mobility — a definitive pipeline to the world's leading universities across 13+ destinations.",
  },
  hero: {
    eyebrow: "About Aspire",
    title: [
      { text: "Democratizing " },
      { text: "elite international education", em: true },
      { text: " across the globe." },
    ],
    intro:
      "Founded on the principles of absolute transparency and operational excellence, we serve as a definitive pipeline to the world's leading universities.",
  },
  // BRD V2 §4A body copy
  paragraphs: [
    "Aspire Global Education stands at the forefront of global student mobility. Founded on the principles of absolute transparency and operational excellence, we serve as a definitive pipeline to the world's leading universities.",
    "Our dynamic platform bridges boundaries — spanning the classic educational centers of the UK, USA, Canada, Australia, and New Zealand, alongside a strong presence in mainland Europe's premier destinations including Germany, Sweden, Spain, Greece, Cyprus, Latvia, Lithuania, and Malta.",
    "We remove the geographic and bureaucratic friction from international admissions, matching ambitious minds with over 75,000 premium courses worldwide. By combining deep human expertise with an enterprise-grade digital infrastructure, we ensure that your transition from local ambition to international success is swift, secure, and certain.",
  ],
  // PLACEHOLDER — §5 brief: diverse students walking an international campus quadrant
  image: "/images/hero-campus.jpg",
  imageAlt: "Students walking through an international campus quadrant in morning light",
  stats: [
    { value: 750, suffix: "+", label: "Partner universities" },
    { value: 75000, suffix: "+", label: "Courses worldwide" },
    { value: 98, suffix: "%", label: "Visa success rate" },
    { value: 13, suffix: "+", label: "Destination countries" },
  ],
  destinations: {
    eyebrow: "Global reach",
    title: "A truly global scale.",
    tier1: {
      label: "Tier-1 English Speaking Destinations",
      description:
        "Direct access to elite educational institutions in major global tech hubs.",
      countries: [
        "United Kingdom",
        "United States",
        "Australia",
        "Canada",
        "New Zealand",
      ],
    },
    europe: {
      label: "Schengen & European Union Destinations",
      description:
        "Robust European academic centers and emerging academic hubs.",
      countries: [
        "Germany",
        "Sweden",
        "Spain",
        "Greece",
        "Cyprus",
        "Latvia",
        "Lithuania",
        "Malta",
      ],
    },
  },
  cta: {
    title: "From local ambition to international success.",
    body: "Tell us where you want to go — a counselor will reach out within one business day.",
    label: "Start the Conversation",
    href: "/#contact",
  },
};

export const SERVICES_PAGE: {
  meta: { title: string; description: string };
  hero: PageHero;
  items: ServiceDetail[];
  cta: PageCta;
} = {
  meta: {
    title: "Our Services — Aspire Global Education",
    description:
      "Personalized global counseling, admission and documentation support, visa guidance, and scholarship mapping — every step of your journey abroad, handled.",
  },
  hero: {
    eyebrow: "Services deep-dive",
    title: [
      { text: "Every step, " },
      { text: "handled with precision.", em: true },
    ],
    intro:
      "Four service domains cover your journey end to end — from the first profile evaluation to the day your visa is approved.",
  },
  // BRD V2 §4B table copy (full deep-dive versions)
  items: [
    {
      icon: Compass,
      title: "Personalized Global Counseling",
      description:
        "Data-driven profile evaluation mapping your unique academic history and career aspirations against high-growth global trajectories. We look specifically at multi-destination eligibility, allowing you to compare benefits between Tier-1 nations and cost-effective European Union options.",
      deliverables: [
        "Data-driven profile evaluation",
        "Career-trajectory mapping",
        "Multi-destination eligibility comparison",
        "Tier-1 vs. EU cost-benefit analysis",
      ],
      // PLACEHOLDER — §5 brief imagery pending
      image: "/images/student-1.jpg",
      imageAlt: "Counselor reviewing a student profile in consultation",
    },
    {
      icon: GraduationCap,
      title: "University Admission & Documentation Support",
      description:
        "Meticulous processing of university applications, including structural refinement of Statements of Purpose (SOPs) and strategic alignment of Letters of Recommendation (LORs). We handle institutional communication directly with our 750+ university partners to expedite fast-track letter releases.",
      deliverables: [
        "Structural SOP refinement",
        "Strategic LOR alignment",
        "Direct institutional communication",
        "Fast-track offer-letter releases",
      ],
      // PLACEHOLDER — §5 brief imagery pending
      image: "/images/dest-uk.jpg",
      imageAlt: "Historic university architecture",
    },
    {
      icon: StampIcon,
      title: "Global Visa Application Guidance",
      description:
        "High-tier navigating of changing international compliance codes across multiple regions — Schengen requirements, UKVI regulations, US F-1 pathways. Our compliance team conducts stringent mock visa interviews modeled exactly after embassy guidelines to maximize your success ratios.",
      deliverables: [
        "Schengen, UKVI, and US F-1 expertise",
        "Compliance-code monitoring across regions",
        "Embassy-modeled mock interviews",
        "Maximized visa success ratios",
      ],
      // PLACEHOLDER — §5 brief imagery pending
      image: "/images/student-2.jpg",
      imageAlt: "Student at a visa approval milestone",
    },
    {
      icon: Award,
      title: "Scholarship & Financial Mapping",
      description:
        "Comprehensive evaluation of available institutional aid, state-sponsored European grants, and merit-based bursaries to significantly lower the financial overhead of your international education.",
      deliverables: [
        "Institutional aid evaluation",
        "State-sponsored European grants",
        "Merit-based bursary matching",
        "Lower total financial overhead",
      ],
      // PLACEHOLDER — §5 brief imagery pending
      image: "/images/student-3.jpg",
      imageAlt: "Student celebrating a scholarship award",
    },
  ],
  cta: {
    title: "Ready to map your route abroad?",
    body: "Initial counseling is free. A counselor will reach out within one business day.",
    label: "Talk to a Counselor",
    href: "/#contact",
  },
};
