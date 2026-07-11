/**
 * Shared, structured content for COBRR TECH LABS.
 * Consumed by the home page sections and the dedicated route pages so copy
 * stays consistent across the site. Icons are referenced by key and resolved
 * where they render.
 */

export type IconKey =
  | "code"
  | "cloud"
  | "cpu"
  | "layers"
  | "sparkle"
  | "shield"
  | "phone"
  | "grid"
  | "chart"
  | "gear"
  | "building"
  | "health"
  | "bag"
  | "cap";

export interface Service {
  slug: string;
  title: string;
  icon: IconKey;
  summary: string;
  points: string[];
}

export const services: Service[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    icon: "code",
    summary:
      "Bespoke systems designed around your operations — not forced into someone else's template.",
    points: ["Domain-driven design", "Legacy modernisation", "Long-term maintainability"],
  },
  {
    slug: "enterprise-software",
    title: "Enterprise Software",
    icon: "building",
    summary:
      "Mission-critical platforms engineered for reliability, security and organisational scale.",
    points: ["High availability", "Role-based access", "Audit & compliance"],
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    icon: "layers",
    summary:
      "Multi-tenant products with the billing, onboarding and observability a SaaS business needs.",
    points: ["Multi-tenancy", "Usage metering", "Zero-downtime releases"],
  },
  {
    slug: "erp-solutions",
    title: "ERP Solutions",
    icon: "grid",
    summary:
      "Unify finance, inventory, HR and operations into one coherent, real-time system of record.",
    points: ["Process automation", "Real-time reporting", "Third-party integration"],
  },
  {
    slug: "crm-systems",
    title: "CRM Systems",
    icon: "chart",
    summary:
      "Customer platforms that give sales and support a single, trustworthy view of every account.",
    points: ["Pipeline automation", "360° customer view", "Analytics dashboards"],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    icon: "sparkle",
    summary:
      "Applied AI grounded in your data — copilots, retrieval, document intelligence and agents.",
    points: ["LLM & RAG systems", "Predictive models", "Workflow automation"],
  },
  {
    slug: "web-applications",
    title: "Web Applications",
    icon: "code",
    summary:
      "Fast, accessible web platforms — customer portals, dashboards and complex internal tools.",
    points: ["Core Web Vitals", "Design systems", "Accessibility (WCAG)"],
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    icon: "phone",
    summary:
      "Native-quality iOS and Android apps that stay fast, offline-capable and delightful.",
    points: ["Cross-platform", "Offline-first", "App store delivery"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: "sparkle",
    summary:
      "Research-led product design that turns complex requirements into clear, usable interfaces.",
    points: ["Product discovery", "Design systems", "Usability testing"],
  },
  {
    slug: "api-development",
    title: "API Development",
    icon: "gear",
    summary:
      "Well-documented, versioned APIs that make your platform easy to build on and integrate.",
    points: ["REST & GraphQL", "Versioning", "Developer experience"],
  },
  {
    slug: "cloud-engineering",
    title: "Cloud Engineering",
    icon: "cloud",
    summary:
      "Resilient, cost-aware cloud architecture on AWS, Azure and GCP — built to scale predictably.",
    points: ["Infrastructure as code", "Auto-scaling", "Cost optimisation"],
  },
  {
    slug: "devops",
    title: "DevOps",
    icon: "gear",
    summary:
      "CI/CD, observability and automation that let teams ship confidently and often.",
    points: ["CI/CD pipelines", "Observability", "Release automation"],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    icon: "shield",
    summary:
      "Proactive care for production systems — monitoring, hardening and continuous improvement.",
    points: ["SLA-backed support", "Security patching", "Performance tuning"],
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    icon: "cpu",
    summary:
      "Strategic guidance on architecture, modernisation and technology decisions that compound.",
    points: ["Architecture review", "Tech due diligence", "Modernisation roadmaps"],
  },
];

export interface Product {
  slug: string;
  name: string;
  status: "Live" | "In development" | "Upcoming";
  tagline: string;
  problem: string;
  solution: string;
  features: string[];
}

export const products: Product[] = [
  {
    slug: "workship",
    name: "Workship",
    status: "Live",
    tagline: "The operations platform that keeps distributed teams in sync.",
    problem:
      "Growing teams lose time to scattered tools, unclear ownership and manual status-chasing across projects.",
    solution:
      "Workship unifies projects, workflows and reporting into a single operational cockpit with automation built in.",
    features: [
      "Workflow automation",
      "Real-time dashboards",
      "Role-based workspaces",
      "Integrations & API",
      "Audit trails",
      "Granular permissions",
    ],
  },
  {
    slug: "satisfy",
    name: "Satisfy",
    status: "Live",
    tagline: "Customer experience and feedback intelligence in one place.",
    problem:
      "Customer signals are fragmented across channels, so teams react late and miss the reasons behind churn.",
    solution:
      "Satisfy centralises feedback, sentiment and support insights so teams act on what customers actually need.",
    features: [
      "Unified feedback inbox",
      "Sentiment analysis",
      "CSAT & NPS tracking",
      "Automated routing",
      "Trend detection",
      "Reporting suite",
    ],
  },
  {
    slug: "upcoming-saas",
    name: "Upcoming SaaS",
    status: "Upcoming",
    tagline: "New platforms in active development across our product studio.",
    problem:
      "We continuously identify underserved workflows in the enterprise and SME landscape.",
    solution:
      "Our product studio incubates focused SaaS tools built on the same engineering foundations as Workship and Satisfy.",
    features: [
      "Vertical SaaS",
      "AI-native workflows",
      "Composable modules",
      "Early-access program",
    ],
  },
];

export interface Industry {
  name: string;
  icon: IconKey;
  description: string;
}

export const industries: Industry[] = [
  { name: "Startups", icon: "sparkle", description: "MVP to scale, with architecture that grows with funding." },
  { name: "SMEs", icon: "chart", description: "Practical automation that frees teams from manual work." },
  { name: "Enterprises", icon: "building", description: "Mission-critical platforms with security and governance." },
  { name: "Education", icon: "cap", description: "Learning platforms and administrative systems at scale." },
  { name: "Government", icon: "shield", description: "Secure, accessible and auditable public-sector systems." },
  { name: "Manufacturing", icon: "gear", description: "Connected operations, ERP and real-time production data." },
  { name: "Healthcare", icon: "health", description: "Compliant, reliable systems that protect patient data." },
  { name: "Retail", icon: "bag", description: "Commerce, inventory and customer platforms that convert." },
];

export interface TechGroup {
  category: string;
  items: string[];
}

export const technologies: TechGroup[] = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native"] },
  { category: "Backend", items: ["Node.js", "Python", "Go", "Java", "GraphQL"] },
  { category: "Data & AI", items: ["PostgreSQL", "Redis", "Kafka", "LLMs / RAG", "Vector DBs"] },
  { category: "Cloud & DevOps", items: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform"] },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description:
      "We map goals, constraints and success metrics, then define an architecture and delivery plan you can trust.",
  },
  {
    step: "02",
    title: "Design & Architecture",
    description:
      "Product design and system architecture move together, so decisions are validated before code is written.",
  },
  {
    step: "03",
    title: "Engineering & Iteration",
    description:
      "Small, tested increments with continuous delivery — you see working software every sprint, not at the end.",
  },
  {
    step: "04",
    title: "Launch & Partnership",
    description:
      "We ship, harden and stay on — monitoring, optimising and evolving the platform as your needs change.",
  },
];

export interface Metric {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export const metrics: Metric[] = [
  { value: 120, suffix: "+", label: "Products & platforms shipped" },
  { value: 40, suffix: "+", label: "Enterprises & organisations served" },
  { value: 99.9, suffix: "%", label: "Production uptime", decimals: 1 },
  { value: 8, suffix: " yrs", label: "Engineering track record" },
];

export interface Differentiator {
  title: string;
  description: string;
  icon: IconKey;
}

export const differentiators: Differentiator[] = [
  {
    title: "Engineering-first, always",
    description:
      "Senior engineers own outcomes end to end. No hand-offs to junior teams once the contract is signed.",
    icon: "code",
  },
  {
    title: "Architecture built to last",
    description:
      "We optimise for the total cost of ownership — systems that stay maintainable years after launch.",
    icon: "layers",
  },
  {
    title: "Security by default",
    description:
      "Threat modelling, hardening and compliance are part of delivery, not an afterthought.",
    icon: "shield",
  },
  {
    title: "Transparent partnership",
    description:
      "Clear scope, honest timelines and continuous visibility. You always know where your project stands.",
    icon: "chart",
  },
];

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  results: { label: string; value: string }[];
  accent: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "manufacturing-erp-modernisation",
    client: "Precision Manufacturing Co.",
    industry: "Manufacturing",
    title: "Unifying operations with a real-time ERP",
    summary:
      "Replaced a fragmented set of spreadsheets and legacy tools with a single ERP, giving leadership live visibility across the plant floor.",
    results: [
      { label: "Reporting time", value: "-70%" },
      { label: "Order accuracy", value: "+35%" },
      { label: "Uptime", value: "99.9%" },
    ],
    accent: "#2450e6",
  },
  {
    slug: "healthcare-patient-platform",
    client: "Regional Health Network",
    industry: "Healthcare",
    title: "A compliant patient engagement platform",
    summary:
      "Built a HIPAA-conscious platform connecting patients, scheduling and records with strict access controls and auditability.",
    results: [
      { label: "Patient no-shows", value: "-28%" },
      { label: "Staff hours saved", value: "1.2k/mo" },
      { label: "Audit findings", value: "0" },
    ],
    accent: "#0ea5a4",
  },
  {
    slug: "retail-ai-personalisation",
    client: "Urban Retail Group",
    industry: "Retail",
    title: "AI-driven personalisation at scale",
    summary:
      "Introduced a recommendation and search layer that adapts to each shopper, lifting conversion without adding page weight.",
    results: [
      { label: "Conversion", value: "+22%" },
      { label: "Search relevance", value: "+40%" },
      { label: "Page speed", value: "no regression" },
    ],
    accent: "#7c5cff",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Star rating out of 5 — controls how many stars render filled. */
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "COBRR operates like an extension of our own engineering team. The architecture they delivered still holds up three years and several pivots later.",
    name: "A. Rahman",
    role: "VP Engineering",
    company: "Enterprise SaaS",
    rating: 5,
  },
  {
    quote:
      "They were honest about trade-offs from day one. That transparency is rare, and it's exactly why we keep coming back for new work.",
    name: "S. Menon",
    role: "COO",
    company: "Manufacturing",
    rating: 5,
  },
  {
    quote:
      "The AI features weren't a demo — they went into production, safely, on our data. Measurable impact within the first quarter.",
    name: "J. Fernandes",
    role: "Chief Product Officer",
    company: "Retail Group",
    rating: 5,
  },
  {
    quote:
      "Our platform migration was delivered on time with zero unplanned downtime. The runbook they left behind is still the best documentation we own.",
    name: "K. Iyer",
    role: "Director of Technology",
    company: "Logistics",
    rating: 5,
  },
  {
    quote:
      "What stood out was the discipline — code review, testing, observability from week one. It made scaling afterwards genuinely boring, in the best way.",
    name: "M. Costa",
    role: "Head of Product",
    company: "Fintech",
    rating: 4,
  },
  {
    quote:
      "They took a decade-old system nobody wanted to touch and modernised it in stages, without ever stopping the business. Remarkable.",
    name: "R. Nair",
    role: "CIO",
    company: "Healthcare Network",
    rating: 5,
  },
  {
    quote:
      "The team communicates in outcomes, not jargon. Our non-technical board understood exactly what was being built and why.",
    name: "L. Weber",
    role: "Managing Director",
    company: "Education",
    rating: 4,
  },
  {
    quote:
      "We shipped our SaaS MVP in ten weeks and closed our seed round on the back of it. The foundation scaled cleanly to our first thousand customers.",
    name: "D. Osei",
    role: "Founder & CEO",
    company: "B2B Startup",
    rating: 5,
  },
  {
    quote:
      "Support didn't end at launch. Response times are fast, fixes are thorough, and they proactively flag risks before they become incidents.",
    name: "P. Sharma",
    role: "VP Operations",
    company: "Government Services",
    rating: 5,
  },
  {
    quote:
      "Their cloud engineering cut our monthly infrastructure bill by a third while improving reliability. That paid for the engagement outright.",
    name: "T. Bianchi",
    role: "Engineering Manager",
    company: "Media Platform",
    rating: 4,
  },
  {
    quote:
      "A rare partner that pushes back with better ideas instead of just taking the ticket. The product is stronger for it.",
    name: "E. Kowalski",
    role: "Product Lead",
    company: "Insurance",
    rating: 4,
  },
  {
    quote:
      "From discovery to delivery, everything was measured and predictable. No surprises, no drama — just software that works.",
    name: "N. Abara",
    role: "CTO",
    company: "Energy",
    rating: 5,
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What types of organisations do you work with?",
    answer:
      "From early-stage startups to enterprises and public-sector organisations. Our engagement model scales to the size and maturity of your team.",
  },
  {
    question: "How do you price and structure engagements?",
    answer:
      "We offer fixed-scope projects, dedicated teams and ongoing retainers. After a short discovery, we recommend the model that best fits your goals and budget.",
  },
  {
    question: "Do you take over existing or legacy systems?",
    answer:
      "Yes. A large part of our work is modernising and stabilising existing systems, often incrementally so the business keeps running throughout.",
  },
  {
    question: "How do you approach security and compliance?",
    answer:
      "Security is built into delivery — threat modelling, code review, hardening and, where relevant, support for standards such as SOC 2, HIPAA and GDPR.",
  },
  {
    question: "Who owns the code and IP?",
    answer:
      "You do. All source code, infrastructure and intellectual property are yours, with clean handover and documentation.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We offer SLA-backed maintenance and support — monitoring, patching, performance tuning and continued feature development as your needs evolve.",
  },
];

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  read: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-for-total-cost-of-ownership",
    category: "Architecture",
    title: "Designing for total cost of ownership, not just launch day",
    excerpt:
      "Why the cheapest system to build is rarely the cheapest system to own — and how we optimise for the long run.",
    read: "6 min read",
    body: [
      "The cost of software is dominated by what happens after launch. Yet most decisions are made as if launch day were the finish line. This mismatch is where technical debt is born.",
      "We approach every system with total cost of ownership in mind: how easy it is to change, to operate, to onboard new engineers into, and to secure. Those qualities rarely show up in a demo, but they determine whether a platform is an asset or a liability three years on.",
      "In practice, that means favouring clear boundaries over clever abstractions, investing early in observability, and writing the tests and documentation that let a system be changed with confidence.",
    ],
  },
  {
    slug: "putting-genai-into-production-safely",
    category: "AI",
    title: "Putting GenAI into production, safely",
    excerpt:
      "Moving beyond demos: the guardrails, evaluation and data practices that make AI features trustworthy.",
    read: "8 min read",
    body: [
      "A GenAI demo is easy. A GenAI feature your business can stand behind is not. The gap between the two is filled with unglamorous engineering: evaluation, guardrails, retrieval quality and data governance.",
      "We treat AI features like any other production system — with tests, monitoring and clear failure modes. Retrieval is grounded in your data, outputs are constrained, and we measure quality continuously rather than trusting a one-off impression.",
      "Done well, AI stops being a novelty and becomes a dependable part of the product that delivers measurable value.",
    ],
  },
  {
    slug: "multi-tenant-saas-foundations",
    category: "SaaS",
    title: "The foundations every multi-tenant SaaS needs",
    excerpt:
      "Tenancy, isolation, metering and observability — the unglamorous decisions that determine whether a SaaS scales.",
    read: "7 min read",
    body: [
      "The interesting parts of a SaaS product are the features. The parts that decide whether it survives are the foundations: how tenants are isolated, how usage is metered, how releases happen without downtime.",
      "Getting tenancy right early is far cheaper than retrofitting it. We design isolation, billing hooks and per-tenant configuration into the core so growth doesn't require a rewrite.",
      "With those foundations in place, shipping features becomes fast and safe — which is the whole point of building a SaaS in the first place.",
    ],
  },
  {
    slug: "modernising-legacy-without-a-rewrite",
    category: "Modernisation",
    title: "Modernising legacy systems without a big-bang rewrite",
    excerpt:
      "How incremental strangler-fig migrations let the business keep running while the platform is renewed.",
    read: "9 min read",
    body: [
      "Big-bang rewrites are seductive and dangerous. They ask the business to freeze while a new system is built to match a moving target — and they usually run late.",
      "We prefer incremental modernisation: wrapping the legacy system, redirecting capabilities one at a time, and retiring old code only once its replacement is proven in production.",
      "It's less dramatic than a rewrite, but it keeps the business running and de-risks every step — which is exactly what modernisation should do.",
    ],
  },
];

export const trustedBy: string[] = [
  "SATISFY",
  "SUDESI A&F",
  "YHAI",
  "TRACKER BOX",
  "UNION COLLEGE",
  "DUDUK",
  "SAARC NETKAMPUS",
];
