import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  Compass,
  FileCheck2,
  GraduationCap,
  Handshake,
  Route,
  Search,
  ShieldCheck,
  StampIcon,
  Users,
} from "lucide-react";

export interface HeadlinePart {
  text: string;
  em?: boolean;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface PageHeroContent {
  title: readonly HeadlinePart[];
  intro: string;
}

export interface PageCtaContent {
  title: string;
  body: string;
  label: string;
  href: string;
}

export const STORIES: readonly never[] = [];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Destinations", href: "/destinations" },
  { label: "Partners", href: "/partners" },
  ...(STORIES.length ? [{ label: "Stories", href: "/stories" }] : []),
  { label: "Contact", href: "/contact" },
] as const;

export const HERO = {
  headline: [
    { text: "Where " },
    { text: "ambition", em: true },
    { text: " finds its horizon." },
  ] satisfies readonly HeadlinePart[],
  subtext:
    "Explore global courses and get clear support from your first shortlist to your visa application.",
  cta: "Talk to a Counselor",
  videoSrc:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  poster: "/images/hero-poster.jpg",
} as const;

export const STATS = {
  title: "Global reach. Personal support.",
  body: "A broad course network, supported by counselors who understand each application in detail.",
  items: [
    { value: 750, suffix: "+", label: "Universities in the network" },
    { value: 75000, suffix: "+", label: "Courses to explore" },
    { value: 13, suffix: "", label: "Study destinations" },
  ] satisfies Stat[],
} as const;

export const HOW_IT_WORKS = {
  title: "How Aspire works.",
  body: "One connected service from course discovery to application processing.",
  items: [
    {
      icon: Search,
      title: "Explore and enquire",
      description:
        "Compare courses and destinations, then share your goals with an Aspire counselor.",
    },
    {
      icon: FileCheck2,
      title: "Prepare and submit",
      description:
        "Your counselor coordinates shortlisting, documents, applications, and compliance checks.",
    },
    {
      icon: ShieldCheck,
      title: "Track and progress",
      description:
        "Use the Aspire portal while admissions, compliance, and visa teams move your case forward.",
    },
  ],
} as const;

export const ABOUT = {
  title: [
    { text: "International education, " },
    { text: "made navigable.", em: true },
  ] satisfies readonly HeadlinePart[],
  paragraphs: [
    "Aspire Global Education connects ambitious students with international study options across major English-speaking and European destinations.",
    "Human guidance and digital infrastructure work together, giving each student a clear route through course selection, documentation, admissions, and visa preparation.",
  ],
  image: "/images/about-home.webp",
  imageAlt: "Students walking across a university campus after class",
  statBadge: { value: 75000, suffix: "+", label: "Courses to explore" } satisfies Stat,
  cta: { label: "About Aspire", href: "/about" },
} as const;

export interface ServiceSummary {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SERVICES = {
  title: "Every important step, supported.",
  cta: { label: "View Services", href: "/services" },
  items: [
    {
      icon: Compass,
      title: "Global Counseling",
      description:
        "Profile evaluation and destination comparisons based on your academic history, goals, and budget.",
    },
    {
      icon: GraduationCap,
      title: "Admissions and Documents",
      description:
        "Application coordination, statement review, recommendation guidance, and university communication.",
    },
    {
      icon: StampIcon,
      title: "Visa Guidance",
      description:
        "Document checks and interview preparation aligned with the requirements of your destination.",
    },
    {
      icon: Award,
      title: "Scholarship Mapping",
      description:
        "A practical review of institutional aid, grants, bursaries, and merit-based funding options.",
    },
  ] satisfies ServiceSummary[],
} as const;

export interface Destination {
  country: string;
  region: "English-speaking" | "Europe";
  image: string;
  imageAlt: string;
}

export const DESTINATIONS = {
  title: "A wider world of study.",
  body: "Explore established education systems and emerging European study destinations.",
  cta: { label: "View Destinations", href: "/destinations" },
  items: [
    { country: "United Kingdom", region: "English-speaking", image: "/images/dest-uk.jpg", imageAlt: "London skyline beside the River Thames" },
    { country: "United States", region: "English-speaking", image: "/images/dest-usa.jpg", imageAlt: "New York City street and skyline" },
    { country: "Canada", region: "English-speaking", image: "/images/dest-canada.jpg", imageAlt: "Toronto skyline beside Lake Ontario" },
    { country: "Australia", region: "English-speaking", image: "/images/dest-australia.jpg", imageAlt: "Sydney Harbour and the Opera House" },
    { country: "New Zealand", region: "English-speaking", image: "/images/dest-new-zealand.jpg", imageAlt: "Auckland skyline across the harbour" },
    { country: "Germany", region: "Europe", image: "/images/dest-germany.jpg", imageAlt: "Brandenburg Gate in Berlin" },
    { country: "Sweden", region: "Europe", image: "/images/dest-sweden.jpg", imageAlt: "Stockholm old town waterfront at dusk" },
    { country: "Spain", region: "Europe", image: "/images/dest-spain.jpg", imageAlt: "Gran Via boulevard in Madrid at sunset" },
    { country: "Greece", region: "Europe", image: "/images/dest-greece.jpg", imageAlt: "The Parthenon on the Acropolis of Athens" },
    { country: "Cyprus", region: "Europe", image: "/images/dest-europe.jpg", imageAlt: "Mediterranean coastal architecture" },
    { country: "Latvia", region: "Europe", image: "/images/dest-europe.jpg", imageAlt: "Northern European old town" },
    { country: "Lithuania", region: "Europe", image: "/images/dest-europe.jpg", imageAlt: "Northern European university city" },
    { country: "Malta", region: "Europe", image: "/images/dest-europe.jpg", imageAlt: "Maltese waterfront architecture" },
  ] satisfies Destination[],
} as const;

export const PARTNERS = {
  title: "Built for education partners too.",
  body: "Sub-agents can introduce student profiles, coordinate applications, and work with Aspire's admissions and compliance teams.",
  cta: { label: "Partner With Us", href: "/partners" },
  benefits: [
    { icon: Users, title: "Shared student support", description: "Coordinate cases with specialist counselors and processing teams." },
    { icon: Route, title: "Broad destination access", description: "Explore suitable routes across 13 international study destinations." },
    { icon: Handshake, title: "Clear coordination", description: "Use one Aspire-branded workflow for profiles, documents, and progress updates." },
  ],
} as const;

export const COURSE_FINDER = {
  title: "Find the right course for your next step.",
  body: "Search international programs by subject, destination, and study preference.",
  cta: "Explore Courses",
} as const;

export const HOME_CONTACT_CTA = {
  title: "Ready to plan your route?",
  body: "Share your goals and get a practical next step from an Aspire counselor.",
  label: "Talk to a Counselor",
  href: "/contact",
} satisfies PageCtaContent;

export interface OfferPoster {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
}

export const OFFERS = {
  title: "Current university offers.",
  body: "Review current intake, scholarship, and tuition information supplied by the client.",
  items: [
    { src: "/posters/8.jpeg", alt: "Arden University UK early-bird tuition offer for September 2026", label: "Arden University Early-Bird Offer", width: 1080, height: 1350 },
    { src: "/posters/1.jpeg", alt: "University of Hull London postgraduate course and scholarship information", label: "University of Hull London", width: 899, height: 1599 },
    { src: "/posters/3.jpeg", alt: "Aston University London postgraduate program and scholarship information", label: "Aston University London", width: 1080, height: 1350 },
    { src: "/posters/5.jpeg", alt: "Information about continuing to a second master's degree in Germany", label: "UK to Germany Pathway", width: 1280, height: 1600 },
    { src: "/posters/2.jpeg", alt: "Kingston University postgraduate course and scholarship information", label: "Kingston University", width: 810, height: 1440 },
    { src: "/posters/6.jpeg", alt: "University of East London tuition, scholarship, and payment information", label: "University of East London", width: 810, height: 1440 },
    { src: "/posters/7.jpeg", alt: "Fairleigh Dickinson University Vancouver study information", label: "FDU Vancouver", width: 899, height: 1599 },
    { src: "/posters/4.jpeg", alt: "UK university deposit information", label: "UK Universities Low Deposits", width: 899, height: 1599 },
  ] satisfies OfferPoster[],
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

// PLACEHOLDER: replace with client-approved copy
export const FAQ = {
  badge: "FAQ",
  title: [{ text: "Frequently asked " }, { text: "questions.", em: true }] satisfies readonly HeadlinePart[],
  image: "/images/faq-library.webp",
  imageAlt: "Students working quietly at a long table in a university library",
  items: [
    {
      question: "Which destinations and programs can Aspire help with?",
      answer: "We guide applications to universities across 13 destinations, including the UK, USA, Canada, Australia, and Europe. This covers undergraduate, postgraduate, and pathway programs in most major disciplines.",
    },
    {
      question: "How does the application process work?",
      answer: "It starts with a free counseling session to map your goals, budget, and academic profile. We then shortlist universities, prepare and submit your applications, and coordinate directly with institutions until you hold an offer.",
    },
    {
      question: "Are scholarships or financial aid available?",
      answer: "Many partner universities offer merit awards, early-bird tuition discounts, and bursaries. We review every profile against current scholarship criteria and build funding options into your university shortlist.",
    },
    {
      question: "Do you support the student visa process?",
      answer: "Yes. We prepare your document checklist, review financial evidence, and run mock interviews so your visa application is submitted correctly the first time.",
    },
    {
      question: "How early should I start planning?",
      answer: "Ideally 6-12 months before your target intake. That leaves comfortable time for admissions tests, scholarship deadlines, and visa processing. We also handle tighter timelines when intakes allow.",
    },
    {
      question: "What support do I get after I arrive?",
      answer: "Pre-departure briefings cover accommodation, banking, and enrolment, and our counselors stay reachable during your first term to help you settle in.",
    },
  ] satisfies readonly FaqItem[],
} as const;

export const CONTACT = {
  title: "Talk to a Counselor.",
  body: "Tell us what you are planning. The Aspire team will respond using the contact details you provide.",
  backgroundImage: "/images/contact-library.webp",
  inquiryTypes: ["Student inquiry", "Partner inquiry"] as const,
  form: {
    inquiryType: "Inquiry type",
    destination: "Destination interest",
    destinationPrompt: "Select a destination",
    name: "Full name",
    email: "Email address",
    phone: "Phone number",
    message: "How can we help?",
    consent: "By submitting this form, you agree that Aspire may contact you about this inquiry.",
    submit: "Send Inquiry",
    sending: "Sending...",
    success: "Your inquiry was sent successfully.",
    error: "The form is unavailable. Please use the published contact details.",
  },
  destinations: [
    ...DESTINATIONS.items.map((item) => item.country),
    "Not sure yet",
  ],
} as const;

export const FOOTER = {
  tagline: "Clear guidance for international study and education partnerships.",
  explore: NAV_LINKS.filter((link) => link.href !== "/"),
  legal: [] as readonly { label: string; href: string }[],
} as const;

export const ABOUT_PAGE = {
  meta: {
    title: "About Aspire Global Education",
    description: "Learn how Aspire combines student guidance with a connected international admissions workflow.",
  },
  hero: {
    title: [
      { text: "A clearer route to " },
      { text: "international education.", em: true },
    ],
    intro: "Aspire combines human guidance with a connected application workflow across 13 destinations.",
  } satisfies PageHeroContent,
  paragraphs: [
    "Aspire Global Education supports students who want to study in the United Kingdom, United States, Canada, Australia, New Zealand, and selected European destinations.",
    "Counselors help students compare options, prepare documentation, coordinate applications, and understand visa requirements. The Aspire portal keeps course exploration and case progress connected to the same service.",
  ],
  cta: { title: "Plan your next step.", body: "Share your study goals with an Aspire counselor.", label: "Talk to a Counselor", href: "/contact" } satisfies PageCtaContent,
} as const;

export const SERVICES_PAGE = {
  meta: {
    title: "Study Abroad Services",
    description: "Explore Aspire's counseling, admissions, visa, and scholarship support.",
  },
  hero: {
    title: [{ text: "Support for every " }, { text: "important decision.", em: true }],
    intro: "Four connected services take you from early comparison to a prepared application.",
  } satisfies PageHeroContent,
  items: [
    { ...SERVICES.items[0], deliverables: ["Profile evaluation", "Career and subject mapping", "Destination comparison", "Budget-aware shortlisting"], image: "/images/service-counseling.webp", imageAlt: "University students discussing their work together in a lecture hall" },
    { ...SERVICES.items[1], deliverables: ["Application coordination", "Statement review", "Recommendation guidance", "Institution communication"], image: "/images/dest-uk.jpg", imageAlt: "Historic international university buildings" },
    { ...SERVICES.items[2], deliverables: ["Requirement review", "Document preparation", "Mock interview practice", "Submission guidance"], image: "/images/service-applications.webp", imageAlt: "Two people reviewing application information together on a laptop" },
    { ...SERVICES.items[3], deliverables: ["Aid and grant search", "Merit award review", "Bursary matching", "Cost comparison"], image: "/images/service-funding.webp", imageAlt: "Open books and handwritten study notes arranged on a library table" },
  ],
  cta: { title: "Start with a clear assessment.", body: "Tell us your academic background, destination interests, and study goals.", label: "Talk to a Counselor", href: "/contact" } satisfies PageCtaContent,
} as const;

export const DESTINATIONS_PAGE = {
  meta: { title: "Study Destinations", description: "Explore 13 study destinations across English-speaking countries and Europe." },
  hero: {
    title: [{ text: "Thirteen destinations. " }, { text: "One place to begin.", em: true }],
    intro: "Compare established study systems and growing European education hubs.",
  } satisfies PageHeroContent,
  groups: {
    english: {
      title: "English-speaking destinations",
      body: "Established study systems with broad subject choice and internationally recognized qualifications.",
    },
    europe: {
      title: "European destinations",
      body: "A diverse mix of major academic centers and growing international study hubs.",
    },
  },
  cta: { title: "Compare your options with a counselor.", body: "Get help shortlisting destinations and courses that fit your goals.", label: "Talk to a Counselor", href: "/contact" } satisfies PageCtaContent,
} as const;

export const PARTNERS_PAGE = {
  meta: { title: "Education Partners", description: "Learn how sub-agents can coordinate student applications through Aspire Global Education." },
  hero: {
    title: [{ text: "A connected route for " }, { text: "education partners.", em: true }],
    intro: "Introduce student profiles and coordinate with Aspire's admissions, compliance, and visa teams.",
  } satisfies PageHeroContent,
  workflow: [
    { title: "Introduce the profile", description: "Share the student's goals, academic background, and destination interests." },
    { title: "Build the route", description: "Coordinate course options, required documents, and application priorities with Aspire." },
    { title: "Follow the case", description: "Use the portal and Aspire team updates to track admissions, compliance, and visa progress." },
  ],
  workflowTitle: "A straightforward partner workflow.",
  cta: { title: "Discuss a partner relationship.", body: "Tell us about your student network and the destinations you support.", label: "Partner With Us", href: "/contact?type=partner" } satisfies PageCtaContent,
} as const;

export const STORIES_PAGE = {
  meta: { title: "Student Stories", description: "Verified Aspire student stories will be published here after client approval." },
  hero: {
    title: [{ text: "Real journeys, " }, { text: "shared responsibly.", em: true }],
    intro: "We will publish student stories here after each student and outcome has been verified and approved.",
  } satisfies PageHeroContent,
  emptyTitle: "Verified stories are being prepared.",
  emptyBody: "We do not publish invented testimonials. Speak with a counselor if you would like to understand the application process.",
  cta: { label: "Talk to a Counselor", href: "/contact" },
} as const;

export const CONTACT_PAGE = {
  meta: { title: "Contact Aspire", description: "Contact Aspire Global Education about studying abroad or becoming an education partner." },
  hero: {
    title: [{ text: "Tell us what you are " }, { text: "planning next.", em: true }],
    intro: "Choose a student or partner inquiry and share the details needed for a useful response.",
  } satisfies PageHeroContent,
} as const;
