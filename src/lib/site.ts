/**
 * Central site configuration for COBRR TECH LABS PRIVATE LIMITED.
 * Single source of truth for navigation, company facts and shared content.
 */

export const company = {
  name: "COBRR",
  legalName: "COBRR TECH LABS PRIVATE LIMITED",
  tagline: "Enterprise software & modern AI solutions, engineered for growth.",
  description:
    "COBRR TECH LABS is an international technology startup building software development, AI solutions, web applications, mobile apps, SaaS products, cloud solutions, and automation.",
  email: "cobrr.tech@gmail.com",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  location: "Bangalore, India",
  address: "Tech Hub Tower, Indiranagar, Bangalore, Karnataka, India",
  foundedYear: 2026,
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/**
 * Primary navigation matching the exact requested structure:
 * Home, About Us, Services, Solutions, Portfolio, Products, Technologies, Industries, Blog, Careers, Contact
 */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Products", href: "/products" },
  { label: "Technologies", href: "/technologies" },
  { label: "Industries", href: "/industries" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export type MenuLink = NavItem & { desc: string };
export type MenuGroup = {
  title: string;
  href: string;
  blurb: string;
  links: MenuLink[];
};

/** Feature card shown on the left of the brand mega menu. */
export const megaFeature = {
  eyebrow: "COBRR TECH LABS",
  title: "Home",
  blurb: "Enterprise software, AI and cloud — engineered to last.",
  cta: "Overview",
  href: "/",
};

export const megaMenu: MenuGroup[] = [
  {
    title: "Services",
    href: "/services",
    blurb: "Ten engineering disciplines, one standard.",
    links: [
      { label: "All Services", href: "/services", desc: "Services list" },
      { label: "AI Solutions", href: "/services/ai-solutions", desc: "LLMs, RAG & automation" },
      { label: "Web Development", href: "/services/web-applications", desc: "Fast web platforms" },
      { label: "Mobile App Development", href: "/services/mobile-applications", desc: "iOS & Android" },
      { label: "SaaS Development", href: "/services/saas-development", desc: "Multi-tenant products" },
      { label: "Cloud Solutions", href: "/services/cloud-engineering", desc: "Resilient cloud" },
      { label: "UI/UX Design", href: "/services/ui-ux-design", desc: "Research-led design" },
      { label: "DevOps", href: "/services/devops", desc: "CI/CD & observability" },
    ],
  },
  {
    title: "Products",
    href: "/products",
    blurb: "SaaS platforms we build and operate.",
    links: [
      { label: "All Products", href: "/products", desc: "SaaS platforms we build" },
      { label: "Workship", href: "/products/workship", desc: "Operations platform" },
      { label: "Satisfy", href: "/products/satisfy", desc: "CX & feedback intelligence" },
      { label: "Custom Stack Studio", href: "/products/upcoming-saas", desc: "In the studio" },
    ],
  },
  {
    title: "Solutions",
    href: "/solutions",
    blurb: "Where our engineering makes a difference.",
    links: [
      { label: "All Solutions", href: "/solutions", desc: "Business systems we ship" },
      { label: "Industries", href: "/industries", desc: "Sectors we serve" },
      { label: "Technologies", href: "/technologies", desc: "Our stack" },
      { label: "Portfolio", href: "/portfolio", desc: "Outcomes & results" },
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

/**
 * Social presence. `key` maps to an icon in the consuming component so the
 * same list can drive the footer, the contact page and anywhere else.
 */
export type SocialKey =
  | "linkedin"
  | "github"
  | "instagram"
  | "facebook"
  | "x"
  | "youtube"
  | "whatsapp"
  | "email";

export const socialLinks: { key: SocialKey; label: string; href: string }[] = [
  { key: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/cobrr" },
  { key: "github", label: "GitHub", href: "https://github.com/cobrr" },
  { key: "instagram", label: "Instagram", href: "https://instagram.com/cobrr.tech" },
  { key: "facebook", label: "Facebook", href: "https://facebook.com/cobrr" },
  { key: "x", label: "X", href: "https://x.com/cobrr" },
  { key: "youtube", label: "YouTube", href: "https://youtube.com/@cobrr" },
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`,
  },
  { key: "email", label: "Email", href: `mailto:${company.email}` },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Products", href: "/products" },
      { label: "Technologies", href: "/technologies" },
      { label: "Industries", href: "/industries" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "AI Solutions", href: "/services/ai-solutions" },
      { label: "Web Development", href: "/services/web-applications" },
      { label: "Mobile Apps", href: "/services/mobile-applications" },
      { label: "SaaS Development", href: "/services/saas-development" },
      { label: "Cloud Solutions", href: "/services/cloud-engineering" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "ERP Systems", href: "/solutions/erp" },
      { label: "CRM Platforms", href: "/solutions/crm" },
      { label: "AI Chatbots", href: "/solutions/ai-chatbots" },
      { label: "Internal Tools", href: "/solutions/internal-tools" },
      { label: "E-Commerce", href: "/solutions/e-commerce" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog & Insights", href: "/blog" },
      { label: "Case Studies", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookie Policy", href: "/privacy#cookie-policy" },
    ],
  },
];
