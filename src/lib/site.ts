/**
 * Central site configuration for COBRR TECH LABS PRIVATE LIMITED.
 * Single source of truth for navigation, company facts and shared content.
 */

export const company = {
  name: "COBRR",
  legalName: "COBRR TECH LABS PRIVATE LIMITED",
  tagline: "Enterprise software, engineered to last.",
  description:
    "COBRR TECH LABS builds enterprise software, AI solutions, cloud infrastructure and scalable digital platforms for organisations that value engineering excellence and long-term partnership.",
  email: "cobrr.tech@gmail.com",
  phone: "+91 00000 00000",
  location: "India",
  foundedYear: 2026,
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Technologies", href: "/technologies" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

export type MenuLink = NavItem & { desc: string };
export type MenuGroup = {
  title: string;
  href: string;
  blurb: string;
  links: MenuLink[];
};

/** Full-width mega-menu — every section with short explanations + sub-pages. */
export const megaMenu: MenuGroup[] = [
  {
    title: "Services",
    href: "/services",
    blurb: "Fourteen engineering disciplines, one standard.",
    links: [
      { label: "All Services", href: "/services", desc: "Services List" },
      { label: "AI Solutions", href: "/services/ai-solutions", desc: "LLMs, RAG & automation" },
      { label: "Custom Software", href: "/services/custom-software-development", desc: "Bespoke systems" },
      { label: "Enterprise Software", href: "/services/enterprise-software", desc: "Mission-critical platforms" },
      { label: "SaaS Development", href: "/services/saas-development", desc: "Multi-tenant products" },
      { label: "Cloud Engineering", href: "/services/cloud-engineering", desc: "Resilient cloud" },
      { label: "Web Applications", href: "/services/web-applications", desc: "Fast web platforms" },
    ],
  },
  {
    title: "Products",
    href: "/products",
    blurb: "SaaS platforms we build and operate.",
    links: [
      { label: "All Products", href: "/products", desc: "SaaS platforms we build." },
      { label: "Workship", href: "/products/workship", desc: "Operations platform" },
      { label: "Satisfy", href: "/products/satisfy", desc: "CX & feedback intelligence" },
      { label: "Upcoming SaaS", href: "/products/upcoming-saas", desc: "In the studio" },
    ],
  },
  {
    title: "Solutions",
    href: "/industries",
    blurb: "Where our engineering makes a difference.",
    links: [
      { label: "Industries", href: "/industries", desc: "Sectors we serve" },
      { label: "Technologies", href: "/technologies", desc: "Our stack" },
      { label: "Case Studies", href: "/case-studies", desc: "Outcomes & results" },
    ],
  },
  {
    title: "Company",
    href: "/about",
    blurb: "Who we are and how we work.",
    links: [
      { label: "About", href: "/about", desc: "Our story & values" },
      { label: "Careers", href: "/careers", desc: "Join the team" },
      { label: "Blog", href: "/blog", desc: "Notes from engineering" },
      { label: "Contact", href: "/contact", desc: "Start a conversation" },
    ],
  },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Capabilities",
    items: [
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Industries", href: "/industries" },
      { label: "Technologies", href: "/technologies" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
