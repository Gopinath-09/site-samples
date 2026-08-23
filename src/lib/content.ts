/**
 * Shared, structured content for COBRR TECH LABS.
 * Consumed across the home page, services, solutions, portfolio, products,
 * technologies, industries, careers, and blog.
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

/* -------------------------------------------------------------------------- */
/* 1. SERVICES DATASET (10 Disciplines)                                        */
/* -------------------------------------------------------------------------- */
export interface Service {
  slug: string;
  title: string;
  icon: IconKey;
  summary: string;
  description: string;
  points: string[];
  benefits: string[];
  features: string[];
  technologies: string[];
  processSteps: string[];
  /** Questions prospects actually ask before commissioning this service. */
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    icon: "sparkle",
    summary: "Applied AI grounded in your operational data — LLMs, RAG, document intelligence, and autonomous agents.",
    description: "We build production-grade Artificial Intelligence systems that integrate directly into business workflows, eliminating manual overhead and empowering smarter decision-making.",
    points: ["LLMs & RAG Systems", "Predictive Analytics", "Workflow Automation"],
    benefits: ["Boost operational efficiency by up to 60%", "Instant access to proprietary knowledge bases", "Automated document and data extraction"],
    features: ["Custom LLM fine-tuning", "Vector Database RAG pipelines", "Multi-agent task orchestration", "SOC2/HIPAA compliant AI guardrails"],
    technologies: ["OpenAI", "Gemini", "Claude", "LangChain", "Pinecone", "Python"],
    processSteps: ["Use Case Identification", "Data Preparation", "Model Selection & RAG Setup", "Production Integration & Monitoring"],
    faqs: [
      { question: "Do you train custom models or use existing ones?", answer: "For the large majority of business problems, retrieval over your own data with a strong foundation model outperforms a custom-trained model at a fraction of the cost. We recommend fine-tuning only when we can show it beats that baseline on your evaluation set." },
      { question: "How do you stop the AI from making things up?", answer: "Answers are grounded in retrieved source documents, every response carries citations we validate before display, and the system is instructed to say when the context does not contain an answer. We also ship an evaluation harness so accuracy is measured, not assumed." },
      { question: "Will our data be used to train someone else's model?", answer: "No. We use enterprise API tiers with training disabled, and for sensitive workloads we can deploy models inside your own cloud tenancy so data never leaves your infrastructure." },
    ],
  },
  {
    slug: "web-applications",
    title: "Web Development",
    icon: "code",
    summary: "Fast, accessible, and scalable web platforms — customer portals, dashboards, and internal web applications.",
    description: "We engineer lightning-fast web applications built on Next.js, React, and TypeScript that achieve top Core Web Vitals and scale seamlessly.",
    points: ["Core Web Vitals Optimised", "Design Systems", "WCAG Accessibility"],
    benefits: ["Sub-second page load times", "High conversion rates & SEO visibility", "Maintainable, clean component architecture"],
    features: ["Server-Side Rendering & ISR", "Responsive Design", "Micro-frontend Architecture", "PWA Support"],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
    processSteps: ["UI/UX Prototyping", "Frontend Architecture", "API Integration", "Performance Optimisation & Launch"],
    faqs: [
      { question: "How long does a typical web application take?", answer: "A focused MVP is usually 8–12 weeks; a full platform with integrations and multiple user roles typically runs 4–6 months. We give you a milestone plan after discovery rather than a number on day one." },
      { question: "Can you work with our existing backend or design system?", answer: "Yes. We regularly build frontends against existing APIs and extend established design systems. Where the existing contract is the constraint, we will say so and propose the smallest change that unblocks the work." },
      { question: "How do you handle performance and SEO?", answer: "Server rendering, image and font optimisation, and a Core Web Vitals budget are part of the build, not a later phase. We measure against real field data before launch and after." },
    ],
  },
  {
    slug: "mobile-applications",
    title: "Mobile App Development",
    icon: "phone",
    summary: "Native-quality iOS and Android applications built for speed, offline reliability, and delightful UX.",
    description: "We craft cross-platform and native mobile applications that deliver smooth 60fps performance, push notifications, and offline-first data sync.",
    points: ["Cross-Platform", "Offline-First", "App Store Delivery"],
    benefits: ["Single codebase for iOS & Android", "Offline functionality for remote users", "Biometric authentication"],
    features: ["React Native & Flutter", "Native Device API Integration", "Push Notifications", "App Store & Play Store CI/CD"],
    technologies: ["React Native", "TypeScript", "Node.js", "Firebase", "Redux"],
    processSteps: ["Mobile UX Wireframing", "Cross-Platform Build", "Device Testing", "Store Submission"],
    faqs: [
      { question: "Native or cross-platform — which should we choose?", answer: "React Native covers the large majority of business apps with one codebase and near-native feel. We recommend native when the product depends on heavy graphics, deep OS integration, or specialised hardware." },
      { question: "Do you handle App Store and Play Store submission?", answer: "Yes, including store listings, review guideline compliance, signing certificates, and the first release. We hand the accounts and credentials to you — they remain yours." },
      { question: "What about updates after launch?", answer: "We set up over-the-air updates for JavaScript-layer changes so most fixes ship without a store review cycle, and manage staged native releases for the rest." },
    ],
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    icon: "layers",
    summary: "Multi-tenant B2B SaaS platforms with subscription billing, tenant isolation, and analytics built-in.",
    description: "We build scalable SaaS products from zero to production — handling multi-tenant databases, usage metering, authentication, and zero-downtime releases.",
    points: ["Multi-Tenancy Architecture", "Usage & Subscription Billing", "Zero-Downtime Releases"],
    benefits: ["Rapid time-to-market for SaaS MVPs", "Predictable multi-tenant isolation", "Automated billing via Stripe/Paddle"],
    features: ["Granular RBAC permissions", "Stripe Subscription Billing", "Custom Domain Routing", "Audit Log Trail"],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe API"],
    processSteps: ["Tenant Architecture", "MVP Feature Build", "Billing Integration", "Beta & Public Launch"],
    faqs: [
      { question: "How do you isolate data between tenants?", answer: "We default to row-level security with a tenant identifier enforced at the database layer, so isolation cannot be bypassed by an application bug. Regulated customers who require separate schemas or databases are supported by the same architecture." },
      { question: "Can you integrate billing and subscription management?", answer: "Yes — Stripe or Paddle, including plans, usage-based metering, trials, proration and dunning. Billing state is reconciled against your own database rather than trusted from webhooks alone." },
      { question: "Who owns the product once it launches?", answer: "You do — source code, infrastructure definitions and accounts, in full. We can continue as your engineering team or hand over to your own hires with documentation and a transition period." },
    ],
  },
  {
    slug: "cloud-engineering",
    title: "Cloud Solutions",
    icon: "cloud",
    summary: "Resilient, cost-optimised cloud infrastructure across AWS, Azure, and Google Cloud Platform.",
    description: "We architect Infrastructure as Code (IaC), containerized microservices, and automated failover systems that keep your platforms operating 24/7.",
    points: ["Infrastructure as Code", "Auto-Scaling & Failover", "Cost Optimisation"],
    benefits: ["99.99% uptime guarantees", "Up to 40% cloud expenditure reduction", "Automated disaster recovery"],
    features: ["Terraform & CloudFormation", "Kubernetes (EKS/AKS/GKE)", "Serverless Architectures", "Cloud Security Audit"],
    technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes", "Docker"],
    processSteps: ["Cloud Audit & Strategy", "IaC Scripting", "Migration & Testing", "Continuous Cloud Monitoring"],
    faqs: [
      { question: "Can you migrate us without downtime?", answer: "In most cases yes, using parallel running and staged traffic cutover. Where a brief window is genuinely unavoidable we tell you upfront and schedule it around your business hours." },
      { question: "Will this reduce our cloud bill?", answer: "Usually, and we start by measuring rather than promising. Right-sizing, storage lifecycle policies and reserved capacity are the common wins; we report the actual before-and-after figures." },
      { question: "Do we get locked into one cloud provider?", answer: "Infrastructure is defined in Terraform and workloads are containerised, which keeps portability realistic. We use managed services where they earn their keep and flag the lock-in trade-off when we do." },
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: "sparkle",
    summary: "User-centered product design that translates complex software requirements into intuitive, elegant interfaces.",
    description: "Our designers work hand-in-hand with developers to build interactive wireframes, component design systems, and user flows that users love.",
    points: ["Product Discovery", "Design Systems", "Usability Testing"],
    benefits: ["Reduced user onboarding friction", "Consistent brand identity across apps", "Faster developer handover"],
    features: ["Figma Design Libraries", "Interactive Prototypes", "Micro-interaction Specs", "Accessibility Audits"],
    technologies: ["Figma", "Design Tokens", "Tailwind CSS", "Framer Motion"],
    processSteps: ["User Research", "Wireframing", "UI Kit & Prototype", "Handover & Design QA"],
    faqs: [
      { question: "Do you design without building?", answer: "Yes — research, prototypes and a documented design system are a standalone engagement. Because our designers sit next to engineers, what we hand over is buildable rather than aspirational." },
      { question: "How much user research is involved?", answer: "Enough to de-risk the decisions that matter. That is typically five to eight interviews with real users plus a review of your existing analytics — not a six-week research phase before anything is drawn." },
      { question: "Will the design work for accessibility?", answer: "We design to WCAG 2.2 AA: contrast, focus states, keyboard paths and screen-reader semantics are specified in the handover, then verified during design QA on the built product." },
    ],
  },
  {
    slug: "devops",
    title: "DevOps",
    icon: "gear",
    summary: "Automated CI/CD pipelines, container orchestration, and real-time observability to ship code safely.",
    description: "We transform release engineering with continuous integration, automated test suites, zero-downtime deployment strategies, and APM monitoring.",
    points: ["CI/CD Automation", "Full Observability", "Release Safety"],
    benefits: ["Deploy code multiple times per day", "Instant automated rollback", "Proactive error tracking"],
    features: ["GitHub Actions / GitLab CI", "Prometheus & Grafana", "Datadog / Sentry Monitoring", "Blue-Green Deployments"],
    technologies: ["Docker", "Kubernetes", "GitHub Actions", "Jenkins", "Grafana"],
    processSteps: ["Pipeline Assessment", "Scripting & Automation", "Monitoring Setup", "Team Enablement"],
    faqs: [
      { question: "We deploy manually today. Where do we start?", answer: "With a reproducible build and an automated test gate — everything else depends on those. Most teams get to one-click deploys within the first few weeks, then progressively add environments and rollback." },
      { question: "Do we need Kubernetes?", answer: "Often not. Managed container services handle most workloads with far less operational overhead. We recommend Kubernetes when you genuinely need its scheduling and multi-service complexity, and say so when you do not." },
      { question: "Will our team be able to run this after you leave?", answer: "That is the point of the engagement. Pipelines are documented, runbooks are written with your engineers, and we pair through the first few real incidents rather than handing over a black box." },
    ],
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    icon: "cpu",
    summary: "Strategic advice on system architecture, legacy modernization, and technical due diligence.",
    description: "Senior engineering guidance to navigate complex technical choices, eliminate technical debt, and plan sustainable technology roadmaps.",
    points: ["Architecture Audits", "Tech Due Diligence", "Modernization Roadmaps"],
    benefits: ["Clear risk mitigation for software investments", "Actionable architectural recommendations", "Unbiased vendor evaluation"],
    features: ["System Health Audits", "Security Threat Modeling", "Refactoring Strategies", "CTO Advisory"],
    technologies: ["Enterprise Architecture", "Microservices", "Cloud Native", "Domain Driven Design"],
    processSteps: ["Discovery & Code Review", "Gap Analysis", "Strategic Roadmap", "Executive Presentation"],
    faqs: [
      { question: "What do we actually receive at the end?", answer: "A written assessment of the current architecture, a prioritised roadmap with effort and risk against each item, and a presentation your leadership team can act on. No slide-only deliverables without the underlying analysis." },
      { question: "Can you review work built by another vendor?", answer: "Yes, and we do it regularly. The review covers architecture, code quality, security posture and operational readiness, reported factually — our goal is an accurate picture, not a case for replacing anyone." },
      { question: "Do we have to hire you for the implementation?", answer: "No. The roadmap is written so your own team or another partner can execute it. Many clients use us for the assessment and keep delivery in house." },
    ],
  },
  {
    slug: "maintenance-support",
    title: "Software Maintenance",
    icon: "shield",
    summary: "SLA-backed 24/7 support, proactive security patching, performance tuning, and incident monitoring.",
    description: "We provide ongoing care for mission-critical software assets — keeping libraries updated, resolving incidents promptly, and optimizing database queries.",
    points: ["24/7 SLA Support", "Security Patching", "Performance Tuning"],
    benefits: ["Zero surprise downtime", "Prompt emergency response", "Continuous platform hardening"],
    features: ["SLA Response Guarantees", "Dependency Security Updates", "Database Query Optimization", "Backups & Recovery"],
    technologies: ["PostgreSQL", "Redis", "Docker", "Sentry", "AWS CloudWatch"],
    processSteps: ["Onboarding & Runbooks", "Monitoring Setup", "Routine Hardening", "Monthly Reporting"],
    faqs: [
      { question: "Can you support software you did not build?", answer: "Yes. We begin with a codebase and infrastructure audit, write the runbooks that are usually missing, and stabilise monitoring before taking on response commitments." },
      { question: "What response times do you commit to?", answer: "Severity-based SLAs agreed in advance — typically one hour for production-down, one business day for standard issues. Response performance is reported monthly against the commitment." },
      { question: "Is new feature work included?", answer: "Retainers include a monthly allocation for enhancements alongside maintenance. Larger features are scoped separately so ongoing support is never squeezed out by project work." },
    ],
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    icon: "grid",
    summary: "Automated business workflows that connect internal systems, APIs, spreadsheets, and databases.",
    description: "We eliminate repetitive manual data entry by building custom integration bots, automated email pipelines, and real-time data sync tools.",
    points: ["Workflow Automation", "API Integration", "Data Extraction"],
    benefits: ["Save thousands of manual hours annually", "Eliminate human data entry errors", "Real-time system synchronization"],
    features: ["Custom Webhooks & APIs", "RPA Bot Automation", "ERP/CRM Synchronization", "Automated PDF Generation"],
    technologies: ["Node.js", "Python", "Zapier / Make", "PostgreSQL", "REST APIs"],
    processSteps: ["Workflow Mapping", "Automation Design", "Integration Testing", "Deployment & Monitoring"],
    faqs: [
      { question: "Which processes are worth automating first?", answer: "High-frequency, rule-based work with a clear input and output — invoice handling, data entry between systems, routine reporting. We map volume against effort and start where payback is fastest." },
      { question: "What if our tools have no API?", answer: "Most have more integration surface than expected: exports, webhooks, or a database we can read safely. Where nothing exists, we automate at the interface layer and are explicit about the added fragility." },
      { question: "What happens when an automation fails?", answer: "Every workflow has explicit failure handling — retries with backoff, a dead-letter queue, and an alert to a named owner. Silent failure is the one outcome we design hardest against." },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* 2. BUSINESS SOLUTIONS DATASET (15 Business Applications)                   */
/* -------------------------------------------------------------------------- */
export interface Solution {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  features: string[];
  useCases: string[];
}

export const solutions: Solution[] = [
  {
    slug: "hrms",
    name: "HRMS & Payroll System",
    tagline: "Comprehensive human resource & payroll platform for growing enterprises.",
    category: "Operations",
    description: "Automate employee onboarding, attendance tracking, leave management, performance appraisals, and tax-compliant payroll processing in one unified platform.",
    features: ["Biometric Attendance Sync", "Automated Tax & Salary Slip Generation", "Leave Request Workflows", "Employee Self-Service Portal"],
    useCases: ["Mid-sized Enterprise HR", "Distributed Team Management", "Payroll Compliance Automation"],
  },
  {
    slug: "crm",
    name: "CRM Platform",
    tagline: "360-degree customer relationship and sales pipeline intelligence.",
    category: "Sales & Marketing",
    description: "Give sales teams complete visibility over deal stages, customer communications, lead scoring, and automated follow-up sequences.",
    features: ["Visual Kanban Pipeline", "Automated Email Sequences", "Lead Scoring Engine", "Customer Communication Timeline"],
    useCases: ["B2B Sales Teams", "Account Management", "Customer Support Escalation"],
  },
  {
    slug: "erp",
    name: "Enterprise ERP",
    tagline: "Unified operations across finance, inventory, procurement, and supply chain.",
    category: "Operations",
    description: "A centralized system of record connecting warehouse inventory, purchase orders, general ledger, and production floors in real time.",
    features: ["Real-Time Inventory Tracking", "General Ledger & Accounting", "Purchase Order Approval Flows", "Multi-Warehouse Management"],
    useCases: ["Manufacturing Plants", "Wholesale Distributors", "Supply Chain Operators"],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Telemedicine System",
    tagline: "HIPAA-conscious patient engagement and electronic medical records platform.",
    category: "Healthcare",
    description: "Streamline patient scheduling, video consultations, electronic health records (EHR), and prescription management with strict privacy compliance.",
    features: ["HIPAA-Compliant EHR", "Integrated Video Telehealth", "Online Patient Scheduling", "Digital E-Prescriptions"],
    useCases: ["Hospital Networks", "Private Medical Clinics", "Telehealth Providers"],
  },
  {
    slug: "education",
    name: "Learning Management System (LMS)",
    tagline: "Scalable education platform for universities, schools, and corporate learning.",
    category: "Education",
    description: "Deliver interactive courses, manage student enrollment, conduct online assessments, and track learning progress at scale.",
    features: ["Interactive Video Courses", "Automated Grading & Quizzes", "Student Progress Analytics", "Virtual Classroom Integration"],
    useCases: ["Universities & Colleges", "Corporate Training Programs", "EdTech Startups"],
  },
  {
    slug: "finance",
    name: "Fintech & Billing Gateway",
    tagline: "Secure financial transactions, recurring billing, and reconciliation platform.",
    category: "Finance",
    description: "Engineered for high availability, multi-currency processing, fraud detection, and automated accounting reconciliation.",
    features: ["Multi-Currency Processing", "Automated Bank Reconciliation", "Fraud Detection Rules", "PCI-DSS Compliant Gateway"],
    useCases: ["Fintech Apps", "Subscription Platforms", "Payment Gateway Integrations"],
  },
  {
    slug: "retail",
    name: "Retail & Point-of-Sale (POS)",
    tagline: "Omnichannel retail operations connecting physical stores with online inventory.",
    category: "Retail",
    description: "Synchronize store sales, barcode scanning, loyalty rewards, and e-commerce orders into a single real-time dashboard.",
    features: ["Cloud POS Terminal", "Omnichannel Inventory Sync", "Customer Loyalty Points", "Daily Sales Analytics"],
    useCases: ["Retail Chains", "Boutique Stores", "Pop-up Retailers"],
  },
  {
    slug: "logistics",
    name: "Logistics & Fleet Management",
    tagline: "Real-time GPS fleet tracking, route optimization, and delivery dispatch.",
    category: "Logistics",
    description: "Track delivery vehicles in real-time, optimize driver routes to save fuel, and collect digital proof-of-delivery signatures.",
    features: ["Live GPS Fleet Tracking", "Automated Route Optimization", "Digital Proof of Delivery", "Driver Mobile App"],
    useCases: ["Delivery Courier Companies", "Fleet Operators", "Last-Mile Logistics"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing Execution System (MES)",
    tagline: "Plant floor monitoring, job tracking, and quality control automation.",
    category: "Manufacturing",
    description: "Monitor machine uptime, track production job progress, manage raw materials, and enforce quality assurance protocols.",
    features: ["Machine IoT Sensors Sync", "Job Order Tracking", "Defect & QA Logging", "Overall Equipment Effectiveness (OEE)"],
    useCases: ["Industrial Factories", "Assembly Plants", "Component Manufacturers"],
  },
  {
    slug: "e-commerce",
    name: "Custom E-Commerce Platform",
    tagline: "High-conversion digital storefronts built for scale and speed.",
    category: "Retail",
    description: "Bespoke e-commerce engines designed for custom product configurators, instant checkout, and seamless inventory synchronization.",
    features: ["Headless Commerce API", "Custom Product Configurator", "One-Click Checkout", "Search & Recommendation AI"],
    useCases: ["D2C Brands", "B2B Wholesalers", "Custom Product Retailers"],
  },
  {
    slug: "ai-chatbots",
    name: "AI Customer Support Chatbots",
    tagline: "Conversational AI agents trained on your product documentation and FAQs.",
    category: "Artificial Intelligence",
    description: "Provide 24/7 instant customer support with AI agents that answer complex questions, handle ticket creation, and escalate smoothly.",
    features: ["Knowledge Base RAG Search", "Multi-Language Support", "Human Handoff Escalation", "CRM & Helpdesk Sync"],
    useCases: ["SaaS Support Desk", "E-Commerce Customer Service", "Banking Assistance"],
  },
  {
    slug: "internal-tools",
    name: "Internal Business Tools & Dashboards",
    tagline: "Tailor-made admin panels, data management tools, and operational cockpits.",
    category: "Operations",
    description: "Replace slow spreadsheets with secure, internal web portals designed specifically for your team's unique workflows.",
    features: ["Role-Based Access Control", "Custom SQL/NoSQL Connectors", "Audit Logs", "Interactive Charting"],
    useCases: ["Operations Control Center", "Admin Management Portals", "Executive BI Dashboards"],
  },
  {
    slug: "appointment-systems",
    name: "Appointment & Booking System",
    tagline: "Automated calendar scheduling, staff allocation, and SMS notifications.",
    category: "Services",
    description: "Allow clients to book appointments 24/7 while managing staff schedules, resource availability, and automated reminders.",
    features: ["Google/Outlook Calendar Sync", "Automated SMS/Email Reminders", "Staff Availability Roster", "Deposit Payment Processing"],
    useCases: ["Medical & Dental Practices", "Salons & Spas", "Professional Services"],
  },
  {
    slug: "inventory-systems",
    name: "Warehouse & Inventory System",
    tagline: "Barcode-driven stock control, reorder alerts, and bin location tracking.",
    category: "Operations",
    description: "Eliminate stockouts and overstocking with automated reorder thresholds, barcode scanning, and multi-location tracking.",
    features: ["Barcode & QR Scanning", "Automated Reorder Alerts", "Stock Movement Audits", "Bin & Shelf Management"],
    useCases: ["E-Commerce Warehouses", "Distributors", "Asset Management"],
  },
  {
    slug: "project-management",
    name: "Project & Task Management System",
    tagline: "Collaborative workspace for project planning, time tracking, and team deliverables.",
    category: "Operations",
    description: "Keep distributed teams aligned with interactive Kanban boards, Gantt charts, time tracking, and client progress portals.",
    features: ["Interactive Gantt Charts", "Time Sheet Tracking", "Client Portal Access", "Automated Milestone Alerts"],
    useCases: ["Agency Workflows", "Software Teams", "Construction & Engineering"],
  },
];

/* -------------------------------------------------------------------------- */
/* 3. PORTFOLIO & FEATURED PROJECTS DATASET                                   */
/* -------------------------------------------------------------------------- */
export interface PortfolioProject {
  slug: string;
  title: string;
  client: string;
  industry: string;
  thumbnail: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  features: string[];
  /** Engineering obstacles and how each was resolved. */
  challenges: { title: string; detail: string }[];
  /**
   * Product screens shown in the case study gallery. `image` is optional — when
   * absent the UI renders a labelled placeholder frame, so real screenshots can
   * be dropped in later without touching the components.
   */
  screenshots: { label: string; caption: string; image?: string }[];
  results: { label: string; value: string }[];
  duration: string;
  clientFeedback: { quote: string; author: string; role: string };
  accent: string;
  /**
   * Cleared for publication. `false` means the record is a draft placeholder and
   * is withheld from the site until the claim can be backed by a real client,
   * a signed-off number, or written permission to use the name.
   */
  verified: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "precision-manufacturing-erp",
    title: "Real-Time Manufacturing ERP & Production Control",
    client: "Precision Manufacturing Co.",
    industry: "Manufacturing",
    thumbnail: "/projects/manufacturing-erp.jpg",
    summary: "Replaced 12+ fragmented spreadsheets and legacy desktop tools with a unified cloud ERP system giving live visibility across factory floors.",
    problem: "The client suffered from delayed reporting, order entry errors, and poor raw material visibility, causing costly production bottlenecks.",
    solution: "COBRR engineered a real-time cloud ERP with shop-floor IoT barcode scanners, automated purchase order workflows, and executive analytics dashboards.",
    architecture: "Microservices backend in Go, Next.js dashboard, PostgreSQL database, and Redis caching hosted on AWS EKS.",
    technologies: ["Next.js", "Go", "PostgreSQL", "Redis", "Docker", "AWS EKS"],
    features: ["Shop floor job tracking", "Automated inventory reordering", "Real-time OEE reporting", "Role-based access control"],
    challenges: [
      { title: "Zero-downtime cutover", detail: "The plant runs three shifts, so there was no maintenance window. We ran the legacy tools and the new ERP in parallel for two weeks with a one-way data sync, then flipped the source of truth over a weekend." },
      { title: "Unreliable shop-floor network", detail: "Wi-Fi coverage near the furnaces was intermittent. Barcode scanners were rebuilt as offline-first clients that queue scans locally and reconcile on reconnect." },
      { title: "Fifteen years of dirty spreadsheet data", detail: "Migration surfaced duplicate part numbers and inconsistent units. We built a validation harness that flagged conflicts for the client's team to resolve before import." },
    ],
    screenshots: [
      { label: "Production Control Board", caption: "Live job status across every work centre, colour-coded by schedule risk." },
      { label: "Inventory & Reorder View", caption: "Raw material levels with automated purchase-order triggers." },
      { label: "Executive OEE Dashboard", caption: "Availability, performance and quality trends by line and shift." },
    ],
    results: [
      { label: "Reporting Delay", value: "-70%" },
      { label: "Order Accuracy", value: "+38%" },
      { label: "Production Uptime", value: "99.99%" },
    ],
    duration: "6 Months",
    clientFeedback: {
      quote: "COBRR delivered our core ERP on budget with zero downtime during cutover. Our plant leadership now makes data-driven decisions daily.",
      author: "S. Menon",
      role: "COO, Precision Manufacturing Co.",
    },
    accent: "#2563eb",
    verified: false,
  },
  {
    slug: "regional-health-patient-portal",
    title: "HIPAA-Conscious Telehealth & Patient Portal",
    client: "Regional Health Network",
    industry: "Healthcare",
    thumbnail: "/projects/healthcare-portal.jpg",
    summary: "Built a secure, HIPAA-compliant patient portal connecting 40,000+ patients with online scheduling, telemedicine, and digital records.",
    problem: "Patient appointment no-shows were at 24%, and phone-based prescription requests overloaded administrative staff daily.",
    solution: "COBRR designed a web and mobile application offering 1-click video consultations, automated SMS reminders, and encrypted records access.",
    architecture: "Serverless WebRTC architecture on AWS, React Native mobile apps, Node.js backend, and encrypted PostgreSQL.",
    technologies: ["React Native", "Next.js", "Node.js", "WebRTC", "PostgreSQL", "AWS"],
    features: ["HIPAA-compliant video calls", "Automated SMS reminders", "E-Prescription delivery", "Biometric mobile sign-in"],
    challenges: [
      { title: "Compliance without friction", detail: "Every HIPAA control we added risked adding a step for elderly patients. We moved verification to device biometrics and one-time links, keeping the audit trail intact while removing password resets entirely." },
      { title: "Video quality on poor connections", detail: "Consultations dropped on rural mobile data. Adaptive bitrate and an automatic audio-only fallback kept sessions alive instead of failing outright." },
      { title: "Legacy EHR with no modern API", detail: "The incumbent records system exposed only a nightly flat-file export. We built an integration layer that normalises those exports and reconciles them against portal activity." },
    ],
    screenshots: [
      { label: "Patient Home", caption: "Upcoming appointments, prescriptions and secure messages in one view." },
      { label: "Telemedicine Consultation", caption: "In-call notes, vitals and prescription issuing for the clinician." },
      { label: "Scheduling Flow", caption: "Three-tap booking with automated SMS and email reminders." },
    ],
    results: [
      { label: "Patient No-Shows", value: "-32%" },
      { label: "Staff Hours Saved", value: "1.4k/mo" },
      { label: "Security Audit Findings", value: "0" },
    ],
    duration: "5 Months",
    clientFeedback: {
      quote: "The patient engagement portal transformed our clinic operations. Security and patient experience were executed flawlessly.",
      author: "R. Nair",
      role: "CIO, Regional Health Network",
    },
    accent: "#0d9488",
    verified: false,
  },
  {
    slug: "urban-retail-ai-recommendation",
    title: "AI-Driven Personalization Engine for E-Commerce",
    client: "Urban Retail Group",
    industry: "Retail",
    thumbnail: "/projects/retail-ai.jpg",
    summary: "Deployed a real-time vector search recommendation layer that adapts product recommendations to individual shopper intent.",
    problem: "The client's online storefront suffered from low search conversion and generic product recommendation carousels.",
    solution: "COBRR integrated OpenAI embeddings and Pinecone vector database into their store checkout flow, lifting conversion without increasing latency.",
    architecture: "Python FastAPI embedding service, Pinecone vector search, React frontend, and Redis edge caching.",
    technologies: ["Python", "OpenAI", "Pinecone", "React", "Node.js", "Redis"],
    features: ["Visual semantic search", "Personalized product carousels", "Real-time intent analysis", "A/B testing framework"],
    challenges: [
      { title: "Latency budget of 50ms", detail: "Recommendations sit on the critical rendering path, so an embedding round-trip per request was not viable. Precomputed session vectors plus a Redis edge cache brought p99 under 35ms." },
      { title: "Cold-start for new visitors", detail: "Two thirds of traffic is anonymous with no history. We blended category-level popularity priors with in-session behaviour so the first recommendation is never generic filler." },
      { title: "Proving the lift was real", detail: "The client had been burned by vendor-reported numbers. We shipped the A/B framework before the model, so every claim was measured against a holdout on their own analytics." },
    ],
    screenshots: [
      { label: "Semantic Search Results", caption: "Natural-language and visual similarity search across the catalogue." },
      { label: "Personalised Storefront", caption: "Carousels reordered in real time against in-session intent." },
      { label: "Experiment Dashboard", caption: "Conversion lift by variant with holdout comparison." },
    ],
    results: [
      { label: "Checkout Conversion", value: "+24%" },
      { label: "Search Relevance", value: "+45%" },
      { label: "API Response Time", value: "<35ms" },
    ],
    duration: "3 Months",
    clientFeedback: {
      quote: "COBRR's AI engine delivered immediate revenue impact. The vector search feels like magic for our online shoppers.",
      author: "J. Fernandes",
      role: "Chief Product Officer, Urban Retail Group",
    },
    accent: "#6366f1",
    verified: false,
  },
  {
    slug: "fintech-micro-lending-platform",
    title: "Automated Credit Scoring & Micro-Lending Engine",
    client: "CrediSwift Fintech",
    industry: "Finance",
    thumbnail: "/projects/fintech-lending.jpg",
    summary: "Engineered an automated credit decisioning engine that processes loan applications in under 60 seconds with bank-grade security.",
    problem: "Manual loan underwriting took 48 hours, causing high drop-off rates for small business borrowers.",
    solution: "COBRR built an algorithmic scoring pipeline combining bank statement parser APIs, credit bureau checks, and automated payout gateways.",
    architecture: "Microservices in Java Spring Boot, React dashboard, PostgreSQL, and AWS KMS encryption.",
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker", "AWS KMS"],
    features: ["60-second automated underwriting", "Bank API data parsing", "E-Signature integration", "Automated repayment schedules"],
    challenges: [
      { title: "Explainable automated decisions", detail: "Regulators require a reason for every declined application. The scoring pipeline records the contributing factors for each decision, so underwriters can justify an outcome months later." },
      { title: "Inconsistent bank statement formats", detail: "Every partner bank exports a different layout. A normalisation layer with per-bank parsers and a manual-review queue kept accuracy high without blocking applicants." },
      { title: "Key management under audit", detail: "Handling financial data meant encryption keys could not live in application config. We moved to AWS KMS with rotation and per-service access scoping." },
    ],
    screenshots: [
      { label: "Application Intake", caption: "Borrower-facing flow with bank linking and e-signature." },
      { label: "Underwriting Console", caption: "Decision factors and score breakdown for each application." },
      { label: "Portfolio Analytics", caption: "Loan volume, repayment health and default-rate trends." },
    ],
    results: [
      { label: "Processing Time", value: "-98%" },
      { label: "Loan Volume", value: "+180%" },
      { label: "Default Rate", value: "<1.2%" },
    ],
    duration: "6 Months",
    clientFeedback: {
      quote: "The automated lending platform allowed us to scale from 500 to 10,000 monthly applications effortlessly.",
      author: "M. Costa",
      role: "Head of Product, CrediSwift Fintech",
    },
    accent: "#d97706",
    verified: false,
  },
  {
    slug: "global-logistics-fleet-tracker",
    title: "IoT Fleet Tracking & Route Optimization Engine",
    client: "TransWorld Logistics",
    industry: "Logistics",
    thumbnail: "/projects/logistics-tracker.jpg",
    summary: "Built an IoT fleet management platform tracking 1,200+ trucks in real-time across national highways with automated route optimization.",
    problem: "High fuel expenditure and lack of delivery status transparency caused client dissatisfaction.",
    solution: "COBRR created a high-throughput telemetry ingestion pipeline using Kafka, WebSockets, and real-time mapping dashboards.",
    architecture: "Node.js & Go microservices, Apache Kafka event bus, React dashboard, and MongoDB geolocation index.",
    technologies: ["Go", "Node.js", "Kafka", "MongoDB", "React", "Google Maps API"],
    features: ["Live GPS map tracking", "Driver route optimization", "Temperature & speed alerts", "Digital proof-of-delivery"],
    challenges: [
      { title: "50,000 telemetry events per second", detail: "Direct database writes could not keep up. Kafka absorbs the ingest, with consumers batching into MongoDB and pushing only changed positions over WebSockets." },
      { title: "Dead zones on national highways", detail: "Trucks lose signal for hours. Devices buffer readings on-board and replay them in order, and the dashboard distinguishes 'no signal' from 'not moving'." },
      { title: "Driver adoption", detail: "The first proof-of-delivery flow was ignored because it took too long at the dock. We cut it to a scan, a photo and a signature — completion went from patchy to near-universal." },
    ],
    screenshots: [
      { label: "Live Fleet Map", caption: "Real-time positions, routes and exception alerts across the fleet." },
      { label: "Route Optimisation", caption: "Suggested sequencing with fuel and time savings per run." },
      { label: "Proof of Delivery", caption: "Driver mobile capture: scan, photo and signature." },
    ],
    results: [
      { label: "Fuel Expenses Saved", value: "-22%" },
      { label: "On-Time Deliveries", value: "98.4%" },
      { label: "Telemetry Throughput", value: "50k/sec" },
    ],
    duration: "7 Months",
    clientFeedback: {
      quote: "Real-time visibility transformed our fleet logistics. COBRR's architecture handled high data throughput effortlessly.",
      author: "K. Iyer",
      role: "Director of Technology, TransWorld Logistics",
    },
    accent: "#2563eb",
    verified: false,
  },
  {
    slug: "edtech-interactive-learning-lms",
    title: "Interactive Video Learning Platform & Assessment Engine",
    client: "EduSpark Global",
    industry: "Education",
    thumbnail: "/projects/edtech-lms.jpg",
    summary: "Designed a cloud learning platform supporting 150,000+ active students with interactive video lectures and automated coding assessments.",
    problem: "Legacy LMS could not support concurrent video streams during exam windows, leading to platform crashes.",
    solution: "COBRR built an auto-scaling cloud video delivery network with serverless coding sandboxes for automated assignment grading.",
    architecture: "Next.js frontend, AWS CloudFront video CDN, Dockerized execution sandboxes, and PostgreSQL database.",
    technologies: ["Next.js", "Python", "Docker", "AWS CloudFront", "PostgreSQL"],
    features: ["Adaptive HLS video streaming", "Dockerized code grading sandbox", "Gamified student badges", "Real-time teacher analytics"],
    challenges: [
      { title: "Traffic that is 95% idle, 5% extreme", detail: "National exam windows create a 40x spike in minutes. Autoscaling alone reacted too slowly, so capacity is pre-warmed against the published exam calendar." },
      { title: "Running untrusted student code", detail: "Coding assessments execute arbitrary submissions. Each runs in a short-lived container with no network, a hard memory cap and a two-second CPU limit." },
      { title: "Video cost at scale", detail: "Naive streaming would have made bandwidth the largest line item. Per-region CDN caching and tuned adaptive ladders cut delivery cost substantially without hurting playback." },
    ],
    screenshots: [
      { label: "Interactive Lecture Player", caption: "Adaptive video with in-line questions and note-taking." },
      { label: "Coding Assessment", caption: "Sandboxed editor with automated grading feedback." },
      { label: "Teacher Analytics", caption: "Cohort progress, drop-off points and assessment outcomes." },
    ],
    results: [
      { label: "Concurrent Users", value: "150k+" },
      { label: "Grading Speed", value: "<2 seconds" },
      { label: "Platform Uptime", value: "99.99%" },
    ],
    duration: "5 Months",
    clientFeedback: {
      quote: "EduSpark handled our largest national exam window smoothly thanks to COBRR's auto-scaling cloud architecture.",
      author: "L. Weber",
      role: "Managing Director, EduSpark Global",
    },
    accent: "#0d9488",
    verified: false,
  },
];

/* -------------------------------------------------------------------------- */
/* 4. PRODUCTS DATASET (In-House SaaS Products)                              */
/* -------------------------------------------------------------------------- */
export interface Product {
  slug: string;
  name: string;
  status: "Live" | "In development" | "Upcoming";
  tagline: string;
  problem: string;
  solution: string;
  features: string[];
  benefits: string[];
  /** Product screens. `image` is optional — a labelled placeholder renders without it. */
  gallery: { label: string; caption: string; image?: string }[];
}

export const products: Product[] = [
  {
    slug: "workship",
    name: "Workship",
    status: "Live",
    tagline: "The operations platform that keeps distributed software teams in sync.",
    problem: "Growing engineering teams lose time to scattered project tools, unclear task ownership, and manual status reporting.",
    solution: "Workship unifies project tracking, automated sprint status reporting, and developer velocity metrics in a single cockpit.",
    features: ["Kanban & Sprint Boards", "GitHub & GitLab Auto-Sync", "Role-Based Workspaces", "Automated Standup Reports", "API Webhooks"],
    benefits: ["30% reduction in status meeting overhead", "Real-time visibility over sprint deliverables", "Seamless developer tool integrations"],
    gallery: [
      { label: "Sprint Board", caption: "Drag-and-drop planning with live sync from GitHub and GitLab." },
      { label: "Velocity Dashboard", caption: "Throughput, cycle time and review latency per team." },
      { label: "Automated Standup", caption: "Yesterday, today and blockers assembled from real activity." },
      { label: "Workspace Settings", caption: "Role-based permissions and per-workspace integrations." },
    ],
  },
  {
    slug: "satisfy",
    name: "Satisfy",
    status: "Live",
    tagline: "Customer feedback intelligence and automated sentiment routing.",
    problem: "Customer feedback signals are scattered across emails, support tickets, and surveys, leading to delayed action and churn.",
    solution: "Satisfy centralizes feedback into an AI-powered inbox that automatically categorizes sentiment and alerts product managers.",
    features: ["Unified Feedback Inbox", "AI Sentiment Scoring", "CSAT & NPS Survey Engine", "Automated Slack Escalation", "Trend Detection"],
    benefits: ["Identify customer churn risks 2x faster", "Automated ticket categorization", "Actionable CSAT insights"],
    gallery: [
      { label: "Unified Inbox", caption: "Every feedback channel in one triage queue with AI sentiment scoring." },
      { label: "Trend Explorer", caption: "Emerging themes surfaced across tickets, surveys and reviews." },
      { label: "Survey Builder", caption: "CSAT and NPS campaigns with targeting and scheduling." },
      { label: "Escalation Rules", caption: "Route negative sentiment to the right Slack channel automatically." },
    ],
  },
  {
    slug: "upcoming-saas",
    name: "Custom Stack Studio",
    status: "Upcoming",
    tagline: "Next-gen vertical SaaS modules built for high-growth enterprise teams.",
    problem: "Underserved niche operational workflows require expensive custom software development from scratch.",
    solution: "Our product studio incubates modular, vertical SaaS components that enterprise clients can deploy instantly.",
    features: ["Composable API Modules", "AI-Native Workflows", "White-Label Readiness", "Early-Access Developer Sandbox"],
    benefits: ["Deploy customized enterprise tools in days", "Built on COBRR's proven cloud infrastructure"],
    gallery: [
      { label: "Module Catalogue", caption: "Composable building blocks ready to assemble into a product." },
      { label: "Developer Sandbox", caption: "Early-access environment for testing modules against real data." },
      { label: "White-Label Theming", caption: "Brand tokens applied across every module from one configuration." },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* 5. TECHNOLOGIES DATASET (6 Categories matching requested prompt)            */
/* -------------------------------------------------------------------------- */
export interface TechGroup {
  category:
    | "Frontend"
    | "Backend"
    | "Database"
    | "Cloud"
    | "Artificial Intelligence"
    | "Mobile"
    | "DevOps"
    | "Security"
    | "APIs";
  description: string;
  items: { name: string; iconKey?: string; badge?: string }[];
}

export const technologies: TechGroup[] = [
  {
    category: "Frontend",
    description: "Modern, high-performance web frameworks and UI component libraries.",
    items: [
      { name: "React", badge: "Popular" },
      { name: "Next.js", badge: "Core Stack" },
      { name: "Angular" },
      { name: "Vue" },
      { name: "TypeScript", badge: "Standard" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    category: "Backend",
    description: "Scalable microservices, REST/GraphQL APIs, and enterprise server architectures.",
    items: [
      { name: "Node.js", badge: "Core Stack" },
      { name: "Python", badge: "AI Core" },
      { name: "Java" },
      { name: ".NET" },
      { name: "Go", badge: "High Perf" },
      { name: "GraphQL" },
    ],
  },
  {
    category: "Database",
    description: "Relational, document, key-value, and vector databases engineered for data integrity.",
    items: [
      { name: "MongoDB" },
      { name: "PostgreSQL", badge: "Core Stack" },
      { name: "SQL Server" },
      { name: "MySQL" },
      { name: "Redis", badge: "In-Memory" },
      { name: "Pinecone", badge: "Vector DB" },
    ],
  },
  {
    category: "Cloud",
    description: "Global cloud providers and Infrastructure as Code automation.",
    items: [
      { name: "AWS", badge: "Core Cloud" },
      { name: "Azure" },
      { name: "Google Cloud" },
      { name: "Terraform", badge: "IaC" },
      { name: "Cloudflare" },
    ],
  },
  {
    category: "Artificial Intelligence",
    description: "Cutting-edge Large Language Models, embeddings, and autonomous agent frameworks.",
    items: [
      { name: "OpenAI", badge: "AI Standard" },
      { name: "Gemini" },
      { name: "Claude" },
      { name: "LangChain", badge: "Orchestration" },
      { name: "Pinecone", badge: "Vector DB" },
      { name: "LlamaIndex" },
    ],
  },
  {
    category: "Mobile",
    description: "Cross-platform and native mobile applications for iOS and Android.",
    items: [
      { name: "React Native", badge: "Core Stack" },
      { name: "Flutter" },
      { name: "Swift" },
      { name: "Kotlin" },
      { name: "Expo", badge: "Fast Ship" },
      { name: "Firebase" },
    ],
  },
  {
    category: "DevOps",
    description: "Automated container orchestration, CI/CD pipelines, and observability.",
    items: [
      { name: "Docker", badge: "Container" },
      { name: "Kubernetes", badge: "Orchestration" },
      { name: "GitHub Actions", badge: "CI/CD" },
      { name: "Jenkins" },
      { name: "Prometheus" },
      { name: "Grafana" },
    ],
  },
  {
    category: "Security",
    description: "Identity, secrets management, and application hardening built in from day one.",
    items: [
      { name: "OAuth 2.0 / OIDC", badge: "Standard" },
      { name: "Auth0" },
      { name: "AWS KMS", badge: "Encryption" },
      { name: "HashiCorp Vault" },
      { name: "Snyk", badge: "Scanning" },
      { name: "Cloudflare WAF" },
    ],
  },
  {
    category: "APIs",
    description: "Contract-first interfaces, event streams, and third-party integrations.",
    items: [
      { name: "REST", badge: "Standard" },
      { name: "GraphQL" },
      { name: "gRPC", badge: "High Perf" },
      { name: "OpenAPI / Swagger", badge: "Contract" },
      { name: "Webhooks" },
      { name: "Kafka", badge: "Event Bus" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* 6. DEVELOPMENT PROCESS DATASET (7 Steps matching prompt)                   */
/* -------------------------------------------------------------------------- */
export interface ProcessStep {
  step: string;
  number: number;
  title: string;
  description: string;
  deliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    number: 1,
    title: "Discovery",
    description: "We map business goals, technical constraints, success metrics, and security requirements.",
    deliverables: ["Project Vision Spec", "Technical Scope Document", "Resource & Timeline Plan"],
  },
  {
    step: "02",
    number: 2,
    title: "Planning",
    description: "Architectural blueprints, database schema design, and API contract specifications are defined.",
    deliverables: ["System Architecture Diagram", "Database ERD Model", "API Endpoint Specs"],
  },
  {
    step: "03",
    number: 3,
    title: "UI/UX Design",
    description: "User flows, wireframes, and interactive Figma prototypes are crafted and user-tested.",
    deliverables: ["Interactive Figma Prototypes", "Component Design System", "User Flow Maps"],
  },
  {
    step: "04",
    number: 4,
    title: "Development",
    description: "Agile 2-week sprints with continuous integration, senior code reviews, and working software demos.",
    deliverables: ["Sprint Code Releases", "Automated Test Suites", "Bi-weekly Sprint Demos"],
  },
  {
    step: "05",
    number: 5,
    title: "Testing",
    description: "Rigorous QA testing including unit tests, end-to-end integration, performance, and security audits.",
    deliverables: ["QA Test Reports", "Security Vulnerability Scan", "Performance Bottleneck Audit"],
  },
  {
    step: "06",
    number: 6,
    title: "Deployment",
    description: "Zero-downtime production launch with automated cloud scripts, DNS cutover, and monitoring.",
    deliverables: ["Production Infrastructure", "DNS Cutover Runbook", "Monitoring Dashboards"],
  },
  {
    step: "07",
    number: 7,
    title: "Maintenance",
    description: "Continuous 24/7 SLA monitoring, security patching, feature enhancements, and database tuning.",
    deliverables: ["SLA Response Support", "Routine Dependency Patches", "Monthly Performance Audit"],
  },
];

/* -------------------------------------------------------------------------- */
/* 7. WHY CHOOSE US DATASET (8 Icon Cards matching prompt)                    */
/* -------------------------------------------------------------------------- */
export interface Differentiator {
  title: string;
  description: string;
  icon: IconKey;
}

export const differentiators: Differentiator[] = [
  {
    title: "Experienced Team",
    description: "Senior software engineers, AI researchers, and cloud architects who own outcomes end-to-end.",
    icon: "code",
  },
  {
    title: "Scalable Architecture",
    description: "Clean domain boundaries and microservices built to support 10x growth without rewrites.",
    icon: "layers",
  },
  {
    title: "Agile Development",
    description: "Iterative 2-week sprints with full visibility — working software delivered early and often.",
    icon: "gear",
  },
  {
    title: "Modern Technologies",
    description: "Battle-tested modern stack (Next.js, Node.js, Python, AWS, Docker) chosen for long-term supportability.",
    icon: "cpu",
  },
  {
    title: "Secure Development",
    description: "Threat modeling, OWASP hardening, SOC2 & HIPAA-conscious architecture built into delivery.",
    icon: "shield",
  },
  {
    title: "Quality Assurance",
    description: "Automated unit, integration, and performance testing before any code reaches production.",
    icon: "chart",
  },
  {
    title: "Dedicated Support",
    description: "SLA-backed 24/7 maintenance, rapid incident response, and proactive system hardening.",
    icon: "phone",
  },
  {
    title: "On-Time Delivery",
    description: "Transparent project management, predictable timelines, and no unexpected budget overruns.",
    icon: "building",
  },
];

/* -------------------------------------------------------------------------- */
/* 8. INDUSTRIES DATASET (10 Sectors matching prompt)                          */
/* -------------------------------------------------------------------------- */
export interface Industry {
  name: string;
  icon: IconKey;
  description: string;
}

export const industries: Industry[] = [
  { name: "Healthcare", icon: "health", description: "HIPAA-conscious patient portals, EHR systems, and telemedicine apps." },
  { name: "Education", icon: "cap", description: "Scalable learning management systems, online assessment tools, and EdTech." },
  { name: "Finance", icon: "chart", description: "Secure credit scoring, payment gateways, micro-lending, and fintech apps." },
  { name: "Retail", icon: "bag", description: "Omnichannel e-commerce, cloud POS, and AI recommendation engines." },
  { name: "Manufacturing", icon: "gear", description: "Plant floor execution, IoT inventory tracking, and custom ERP systems." },
  { name: "Real Estate", icon: "building", description: "Property management portals, tenant portals, and MLS listing systems." },
  { name: "Hospitality", icon: "sparkle", description: "Online booking systems, guest portals, and PMS management tools." },
  { name: "Government", icon: "shield", description: "Secure, accessible, and auditable public-sector software systems." },
  { name: "Logistics", icon: "grid", description: "GPS fleet tracking, dispatch optimization, and proof-of-delivery apps." },
  { name: "Travel", icon: "phone", description: "Flight & hotel booking engines, itinerary planners, and travel apps." },
];

/* -------------------------------------------------------------------------- */
/* 9. SUCCESS METRICS & TESTIMONIALS & FAQS                                   */
/* -------------------------------------------------------------------------- */
export interface Metric {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
  /**
   * Cleared for publication. `false` means the record is a draft placeholder and
   * is withheld from the site until the claim can be backed by a real client,
   * a signed-off number, or written permission to use the name.
   */
  verified: boolean;
}

export const metrics: Metric[] = [
  { value: 120, suffix: "+", label: "Projects & Platforms Delivered", verified: false },
  { value: 40, suffix: "+", label: "Enterprise & Startup Clients", verified: false },
  { value: 99.99, suffix: "%", label: "Production Uptime SLA", decimals: 2, verified: false },
  { value: 8, suffix: " Yrs", label: "Combined Engineering Record", verified: false },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  /**
   * Cleared for publication. `false` means the record is a draft placeholder and
   * is withheld from the site until the claim can be backed by a real client,
   * a signed-off number, or written permission to use the name.
   */
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote: "COBRR operates like an extension of our own engineering leadership. The cloud architecture they delivered handles our high daily throughput seamlessly.",
    name: "A. Rahman",
    role: "VP Engineering",
    company: "Enterprise SaaS",
    rating: 5,
    verified: false,
  },
  {
    quote: "They were honest about trade-offs from day one. That transparency is rare, and it's why we keep entrusting COBRR with our primary platforms.",
    name: "S. Menon",
    role: "COO",
    company: "Precision Manufacturing",
    rating: 5,
    verified: false,
  },
  {
    quote: "The AI features COBRR built weren't just a gimmick — they went into production safely on our data and delivered immediate conversion lift.",
    name: "J. Fernandes",
    role: "Chief Product Officer",
    company: "Urban Retail Group",
    rating: 5,
    verified: false,
  },
  {
    quote: "Our platform migration was delivered on time with zero unplanned downtime during cutover. Their documentation and runbooks are top class.",
    name: "K. Iyer",
    role: "Director of Technology",
    company: "TransWorld Logistics",
    rating: 5,
    verified: false,
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What types of organizations do you partner with?",
    answer: "We partner with early-stage technology startups, mid-market businesses, and enterprise organizations looking to build or modernize software platforms.",
  },
  {
    question: "How do you structure project engagement models?",
    answer: "We offer dedicated engineering teams, fixed-scope project delivery, and ongoing SLA maintenance retainers tailored to your project timeline and budget.",
  },
  {
    question: "Who owns the software intellectual property (IP)?",
    answer: "You own 100% of all source code, design assets, infrastructure scripts, and intellectual property upon project completion.",
  },
  {
    question: "How do you ensure security and compliance?",
    answer: "Security is integrated from day one — including OWASP vulnerability prevention, encrypted data transmission, and compliance support for SOC 2, HIPAA, and GDPR.",
  },
  {
    question: "What happens after our product is deployed?",
    answer: "We provide SLA-backed 24/7 support, proactive performance monitoring, security patching, and ongoing feature development.",
  },
];

/* -------------------------------------------------------------------------- */
/* 10. BLOG POSTS DATASET                                                     */
/* -------------------------------------------------------------------------- */
/** Filter set shown on the blog index — order here drives the filter bar. */
export const blogCategories = [
  "Artificial Intelligence",
  "Software Engineering",
  "Technology",
  "Cloud",
  "Cybersecurity",
  "Company Updates",
  "Tutorials",
  "Case Studies",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  read: string;
  date: string;
  author: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-for-total-cost-of-ownership",
    category: "Software Engineering",
    title: "Designing for Total Cost of Ownership, Not Just Launch Day",
    excerpt: "Why the cheapest system to build is rarely the cheapest system to operate — and how to architect for long-term sustainability.",
    read: "6 min read",
    date: "August 2026",
    author: "COBRR Engineering Team",
    body: [
      "When teams evaluate software, they almost always optimize for the cost of building it. The cheapest vendor wins the pitch. The fastest timeline wins the board. But the cheapest system to build is rarely the cheapest system to operate — and this distinction costs organizations millions every year.",
      "Total Cost of Ownership (TCO) is a framework that factors in every dollar a piece of software will consume across its entire lifespan: infrastructure, maintenance, security patching, onboarding new engineers, debugging production incidents, and eventually, migrating away from it. A system that costs ₹20 lakhs to build but ₹80 lakhs per year to run is a far worse investment than one that costs ₹35 lakhs to build and ₹15 lakhs per year to run.",
      "The architectural choices that inflate TCO are well-known: tightly coupled monoliths that require full redeploys for small changes; undocumented databases that only one engineer understands; third-party SaaS dependencies with proprietary lock-in clauses; and test coverage so sparse that every release feels like a gamble.",
      "Designing for TCO means making deliberate trade-offs early. Choose boring, well-supported technologies over the exciting new framework that has three contributors on GitHub. Write infrastructure as code so your environments are reproducible. Build observability in from day one — metrics, logs, and traces — so you are never debugging production blindly. Document your data models and your architectural decisions in the repository alongside the code.",
      "The most sustainable software is software that the next engineer can understand, change, and hand off without a war story. That standard is hard to enforce in a sprint culture, but it is the only standard that keeps the business safe.",
    ],
  },
  {
    slug: "putting-genai-into-production-safely",
    category: "Artificial Intelligence",
    title: "Putting GenAI into Production Safely with RAG and Guardrails",
    excerpt: "Moving beyond LLM demos: guardrails, vector databases, and evaluation frameworks that make AI features enterprise-trustworthy.",
    read: "8 min read",
    date: "July 2026",
    author: "AI Research Lead",
    body: [
      "Every week a new startup demo shows an LLM doing something impressive. A chatbot answers complex support questions. A code assistant refactors an entire module. An AI agent plans a research report autonomously. The demo looks compelling. The gap between that demo and a production system that a regulated enterprise would stake its reputation on is enormous — and that gap is where most AI projects stall.",
      "The two most common failure modes for LLM features in production are hallucination and context drift. Hallucination is when the model produces confident, plausible-sounding text that is factually wrong. Context drift is when the model diverges from your intended task or begins leaking information across sessions. Both destroy user trust instantly.",
      "Retrieval Augmented Generation (RAG) addresses hallucination by grounding the LLM in a curated, version-controlled knowledge base. Instead of asking the model to recall facts from training data, you retrieve relevant documents from a vector database at query time and pass them as verified context. The model's job becomes summarization and reasoning over known-good content, not free recall.",
      "Guardrails are the second layer of defense. A well-designed guardrail layer sits between your application and the LLM and enforces rules before and after generation: input classifiers that reject off-topic or malicious prompts, output validators that check for personally identifiable information leakage, toxicity filters, and schema validators that ensure structured outputs conform to your expected format.",
      "Beyond RAG and guardrails, production GenAI requires an evaluation framework. Define your success criteria before you ship: What percentage of responses should cite a source? What is the acceptable hallucination rate? How do you measure retrieval precision? Instrument your pipeline to log inputs, retrieved documents, model outputs, and user feedback so you can run continuous evaluation and catch regressions before your users do.",
      "The teams that succeed with AI in production treat it like any other engineering system: with contracts, test suites, monitoring, and a clear definition of done. The demo is the easy part.",
    ],
  },
  {
    slug: "multi-tenant-saas-foundations",
    category: "Technology",
    title: "Architectural Foundations Every Multi-Tenant SaaS Needs",
    excerpt: "Tenant isolation, usage metering, and zero-downtime deployment pipelines that prevent costly rewrites as SaaS apps scale.",
    read: "7 min read",
    date: "July 2026",
    author: "Principal Architect",
    body: [
      "Most SaaS products are built as single-tenant applications first. A single database, a single authentication system, a single deployment. This works fine for the first handful of customers. Then growth happens: a larger client demands data isolation, a compliance audit requires row-level access logging, a pricing change requires granular usage metering. Suddenly the architecture that got you to ₹1 crore ARR is actively preventing you from reaching ₹10 crore.",
      "Tenant isolation is the most critical architectural decision in multi-tenant SaaS. The three common patterns — shared schema (row-level segregation by tenant ID), shared database with separate schemas, and fully separate databases per tenant — each make a different trade-off between cost, isolation, and operational complexity. Row-level isolation is cheapest to operate but requires disciplined query filtering everywhere. Separate databases give the strongest isolation guarantee but multiply your database management overhead.",
      "Usage metering is frequently treated as an afterthought and then becomes an emergency. If you cannot measure what each tenant is consuming — API calls, storage bytes, seats, AI tokens — you cannot enforce limits, you cannot price accurately, and you cannot detect abuse. Build your metering pipeline as a first-class infrastructure component, not a dashboard you bolt on later. A durable event stream (Kafka, SQS, or Postgres logical replication) that captures every billable action gives you the foundation to build any pricing model on top.",
      "Zero-downtime deployment is non-negotiable at scale. Your largest tenants will not accept a maintenance window. The foundation is feature flags and database migration strategies that are forward-and-backward compatible: never rename a column, always add new columns nullable before populating them, and deploy code that can handle both old and new schema versions simultaneously. Combine this with blue-green deployments or canary releases and you can push changes to production dozens of times per day without risk.",
      "These architectural investments feel expensive to make early, but every month you delay makes them more expensive to retrofit. The product teams that plan for multi-tenancy on day one are the same ones shipping confidently at scale two years later.",
    ],
  },
  {
    slug: "modernising-legacy-without-a-rewrite",
    category: "Cloud",
    title: "Modernizing Legacy Enterprise Systems Without a Big-Bang Rewrite",
    excerpt: "How incremental strangler-fig migrations keep the business running smoothly while platform infrastructure is renewed.",
    read: "9 min read",
    date: "June 2026",
    author: "Cloud Engineering Lead",
    body: [
      "The big-bang rewrite is the most seductive trap in enterprise software. A team inherits a brittle 15-year-old system, runs the numbers, and concludes: 'It would be faster to rebuild it from scratch than to untangle this codebase.' The executive team approves an 18-month project. Three years and two failed launches later, the business has lost market position, burned out two engineering teams, and the new system still doesn't do everything the old one did.",
      "The strangler-fig pattern, popularized by Martin Fowler, offers a safer path. The idea comes from the strangler fig tree, which grows around a host tree over decades and eventually replaces it entirely — without the host ever dying. In software terms, you place a routing layer in front of the legacy system and incrementally redirect individual capabilities to new microservices while the old system continues running.",
      "The migration starts with a thorough capability audit. Map every function the legacy system performs: every API endpoint, every batch job, every integration. Group them by business criticality and coupling complexity. The simplest, most self-contained capabilities migrate first. This delivers early wins, builds team confidence, and proves the strangler-fig infrastructure before tackling the hard parts.",
      "Database migration is usually the hardest constraint. Legacy systems often have a single God-database that everything touches. You cannot simply point a new microservice at a different database if the old system writes to the same tables. The practical solution is event sourcing at the database layer: use Postgres logical replication or a CDC tool like Debezium to stream every write from the legacy database to the new system's event log. The new service builds its own materialized view of the data it owns and serves reads from there while writes still flow through the legacy system — until they don't.",
      "A successful strangler-fig migration takes discipline. You must resist the temptation to improve everything as you go. Move capabilities faithfully first, optimize them second. The goal is a safe, running system at every point in time — not a beautiful one that ships never.",
    ],
  },
  {
    slug: "threat-modelling-before-the-first-line-of-code",
    category: "Cybersecurity",
    title: "Threat Modelling Before You Write the First Line of Code",
    excerpt: "Security reviews at the end of a project find the cheap bugs and miss the expensive ones. Here is the lightweight modelling session we run at design time instead.",
    read: "7 min read",
    date: "July 2026",
    author: "Lead Security Engineer",
    body: [
      "Most teams treat security as a gate near the end of delivery: a penetration test two weeks before launch, a report full of findings, and a scramble to patch what can be patched before the date. That process reliably catches missing headers, weak session settings, and dependency vulnerabilities. What it almost never catches is the design flaw — the fact that a tenant identifier is trusted from the client, or that a password reset token is valid indefinitely. Those are architectural decisions, and by the time a pen tester finds them, they are expensive to reverse.",
      "Threat modelling moves that conversation to the design stage, where changes are cheap. It does not require a specialist team or a heavyweight framework. We run a ninety-minute session with the engineers who will build the system, a whiteboard, and four questions borrowed from Adam Shostack: What are we building? What can go wrong? What are we going to do about it? Did we do a good job?",
      "The first question produces a data flow diagram — not a beautiful architecture poster, just boxes for processes, arrows for data, and a dotted line wherever data crosses a trust boundary. Those dotted lines are where nearly every finding lives. A request moving from the browser to your API crosses one. A background job reading from a partner's S3 bucket crosses one. Data moving between two of your own services may or may not, and arguing about it is itself a useful exercise.",
      "The second question is where the value is. For each trust boundary, walk STRIDE — spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege — and ask whether each applies. The point is not to be exhaustive; it is to be systematic enough that nobody's favourite blind spot survives. In practice a team of four will produce twenty candidate threats in forty minutes, of which perhaps six are worth acting on.",
      "The third question turns threats into work: mitigate, transfer, accept, or eliminate. Write the decision down, including the ones you accept and why. Six months later, when someone asks why the reporting service can read the entire customer table, the answer should be a recorded decision with a rationale — not a shrug. That written record is also the fastest way through a SOC 2 or HIPAA audit, because it demonstrates the one thing auditors actually want to see: that security was reasoned about deliberately, not retrofitted.",
    ],
  },
  {
    slug: "building-a-rag-pipeline-step-by-step",
    category: "Tutorials",
    title: "Building a Production RAG Pipeline: A Step-by-Step Walkthrough",
    excerpt: "A practical guide to retrieval-augmented generation — chunking, embedding, retrieval, and the evaluation loop that keeps answers honest.",
    read: "12 min read",
    date: "July 2026",
    author: "AI Solutions Engineer",
    body: [
      "Retrieval-augmented generation is conceptually simple: find the relevant documents, put them in the prompt, and let the model answer from them. Getting it to work reliably on real corporate documents is where the effort lives. This walkthrough covers the pipeline we use on client projects, and the decisions at each stage that determine whether the result is genuinely useful or merely demo-ready.",
      "Start with ingestion and chunking. The instinct is to split documents into fixed 500-token blocks, and it is the single most common cause of poor retrieval. Fixed splits cut tables in half and separate headings from the text they introduce. Split on document structure instead — headings, sections, list boundaries — and keep each chunk's parent headings as a prefix so a fragment retrieved in isolation still carries its context. Store the source document, page, and section with every chunk; you will need them for citations.",
      "Next, embedding and storage. Embed each chunk and store the vectors alongside their metadata in a vector database such as Pinecone. Two decisions matter here. First, embed the contextualised chunk (heading prefix included), not the raw fragment. Second, keep the metadata rich enough to filter on — document type, date, access level — because hybrid filtering plus vector search consistently beats pure similarity search on real corpora.",
      "Retrieval is where naive implementations lose most of their accuracy. Pure vector similarity misses exact matches on names, part numbers, and error codes, which is exactly what business users search for. Run a keyword search in parallel and fuse the two result sets, then apply a reranking model to the combined candidates. Retrieving twenty candidates and reranking to the best five is typically a larger quality gain than any prompt engineering you will do afterwards.",
      "Then generation, with guardrails. Instruct the model to answer only from the supplied context and to say plainly when the context does not contain the answer. Require inline citations to chunk identifiers, and validate on the way out that every cited identifier was actually retrieved — a cheap check that catches fabricated references before a user sees them. Access control belongs at the retrieval stage, not the prompt: filter by the requesting user's permissions before the chunks ever reach the model.",
      "Finally, evaluation — the step teams skip and later regret. Assemble fifty to a hundred real questions with verified answers before you launch, and score each pipeline change against them for retrieval hit rate and answer accuracy. Without that harness, every tweak is a guess, and you will have no way to know whether swapping the embedding model made the system better or quietly worse. With it, RAG becomes an ordinary engineering problem with a feedback loop.",
    ],
  },
  {
    slug: "how-we-cut-erp-reporting-delay-by-seventy-percent",
    category: "Case Studies",
    title: "How We Cut Manufacturing Reporting Delay by 70%",
    excerpt: "A behind-the-scenes look at the architecture decisions on our real-time manufacturing ERP build — and the cutover that happened without stopping production.",
    read: "8 min read",
    date: "June 2026",
    author: "Principal Engineer",
    body: [
      "When Precision Manufacturing Co. came to us, plant leadership was making decisions on data that was, on average, a day and a half old. Production figures were keyed into spreadsheets at the end of each shift, consolidated the following morning, and reviewed the day after that. Nobody trusted the numbers, which meant every meeting started by arguing about the data instead of acting on it.",
      "The obvious answer — replace the spreadsheets with an ERP — was also the answer that had failed twice before. Both previous attempts assumed the plant could pause. It cannot: three shifts run continuously, and an hour of stopped production costs more than a month of engineering. So the constraint shaped the architecture from the start. Whatever we built had to run alongside the existing process until it was demonstrably better.",
      "We built the new system as a set of Go services behind a Next.js dashboard, with Postgres as the system of record and Redis caching the read-heavy dashboard queries. For the first two weeks, both systems ran in parallel: shop-floor scanners wrote to the new ERP, and a one-way sync pushed the same records into the legacy spreadsheets that supervisors still used. That parallel period was not wasted time — it was the test. When the two sets of numbers agreed for ten consecutive shifts, the client's own team was willing to switch.",
      "The hardest technical problem was not the ERP at all; it was the network. Wi-Fi coverage near the furnaces dropped out unpredictably, and the first version of the scanner client simply failed when it could not reach the API. We rebuilt it as an offline-first client that queues scans locally and reconciles on reconnect, with conflict rules agreed with the floor supervisors rather than invented by us. Scan completeness went from roughly 80% to effectively total, and that single change did more for data quality than any amount of dashboard work.",
      "Migration surfaced the usual archaeology: duplicate part numbers, three different spellings of the same supplier, quantities recorded in mixed units. Rather than guess, we built a validation harness that flagged every conflict for the client's team to resolve before import. It was slower than an automated best-guess mapping and it was the right call — the new system launched with data the plant believed in.",
      "The measured outcome was a 70% reduction in reporting delay, a 38% improvement in order accuracy, and no unplanned downtime during cutover. The outcome the client talks about is simpler: production meetings now start with what to do about the numbers rather than whether the numbers are right.",
    ],
  },
];

export interface Client {
  name: string;
  /** Path under `public/clients/`. Absent renders the name as a wordmark. */
  logo?: string;
  /**
   * Set true only once you hold written permission to display the client's
   * name or mark. Unverified entries never reach the page.
   */
  verified: boolean;
}

export const trustedBy: Client[] = [
  { name: "SATISFY", verified: false },
  { name: "SUDESI A&F", verified: false },
  { name: "YHAI", verified: false },
  { name: "TRACKER BOX", verified: false },
  { name: "UNION COLLEGE", verified: false },
  { name: "DUDUK", verified: false },
  { name: "SAARC NETKAMPUS", verified: false },
];

export const teamMembers = [
  { name: "Arun K.", role: "Founder & Managing Director", bio: "12+ years leading enterprise software engineering & technology strategy." },
  { name: "Deepak R.", role: "Chief Technology Officer", bio: "Ex-BigTech architect specializing in distributed cloud systems & AI." },
  { name: "Priya S.", role: "Head of Product & Design", bio: "Passionate about research-led UI/UX and scalable design systems." },
  { name: "Vikram M.", role: "Lead DevOps & Security Engineer", bio: "Kubernetes and SOC2 compliance specialist ensuring 99.99% uptime." },
];

export const companyTimeline = [
  { year: "2026", title: "COBRR Founded", desc: "Launched as an engineering-first startup studio and enterprise software partner." },
  { year: "2026", title: "SaaS Studio Launch", desc: "Shipped flagship SaaS products Workship and Satisfy to early adopters." },
  { year: "2026", title: "GenAI Integration Practice", desc: "Expanded core capabilities to include LLM copilots, RAG pipelines, and vector search." },
];

/** Day-to-day working culture, shown on About and Careers. */
export const cultureHighlights: { title: string; body: string; icon: IconKey }[] = [
  {
    title: "Written before spoken",
    body: "Decisions live in documents and architecture records, not in someone's memory of a call. New joiners can read their way to context.",
    icon: "code",
  },
  {
    title: "Small teams, whole problems",
    body: "Two to four engineers own a product area end to end — discovery through production support. No handoffs between people who never speak.",
    icon: "layers",
  },
  {
    title: "Async by default",
    body: "We are distributed across time zones, so meetings are the exception. Deep work blocks are protected, not interrupted.",
    icon: "grid",
  },
  {
    title: "Review as teaching",
    body: "Code review is where craft transfers. Reviewers explain the reasoning, not just the requested change.",
    icon: "chart",
  },
  {
    title: "Ship, then measure",
    body: "Every meaningful change goes out behind a flag with a metric attached. Opinions are cheap; production data settles arguments.",
    icon: "cpu",
  },
  {
    title: "Sustainable pace",
    body: "Crunch is a planning failure, not a badge. We size work honestly and renegotiate scope rather than weekends.",
    icon: "shield",
  },
];

/** Hiring funnel shown on the Careers page. */
export const hiringProcess: { step: string; title: string; duration: string; description: string }[] = [
  {
    step: "01",
    title: "Application review",
    duration: "3 days",
    description: "A senior engineer reads every application — not a keyword filter. You hear back either way.",
  },
  {
    step: "02",
    title: "Intro conversation",
    duration: "30 min",
    description: "A two-way call about your experience, what you want next, and how we actually work day to day.",
  },
  {
    step: "03",
    title: "Technical deep dive",
    duration: "90 min",
    description: "We walk through a system you have built and reason about trade-offs together. No whiteboard algorithm puzzles.",
  },
  {
    step: "04",
    title: "Practical exercise",
    duration: "3–4 hrs, paid",
    description: "A scoped, realistic problem close to our actual work. We pay for your time and you keep the code.",
  },
  {
    step: "05",
    title: "Team & values conversation",
    duration: "45 min",
    description: "Meet the people you would work with, and ask us the uncomfortable questions before you commit.",
  },
  {
    step: "06",
    title: "Offer",
    duration: "2 days",
    description: "A clear written offer with the reasoning behind the level and compensation band.",
  },
];

/** Internship programme details for the Careers page. */
export const internships = {
  intro:
    "Our internships are six-month, paid, and deliberately small. Interns join a delivery team, own a real feature, and ship it to production with a senior engineer as a dedicated mentor.",
  tracks: [
    { name: "Software Engineering", focus: "Full-stack product work in Next.js, Node.js and PostgreSQL." },
    { name: "Artificial Intelligence", focus: "RAG pipelines, evaluation harnesses and applied LLM integration." },
    { name: "Cloud & DevOps", focus: "Infrastructure as code, CI/CD pipelines and observability tooling." },
    { name: "Product Design", focus: "Research, interaction design and design-system contribution." },
  ],
  commitments: [
    "Paid for the full six months",
    "A named senior mentor from week one",
    "Production code, not sandbox projects",
    "Conversion to a full-time offer for strong performers",
  ],
};

export const openRoles = [
  { title: "Senior Full-Stack Engineer (Next.js / Node.js)", location: "Remote / Bangalore", department: "Engineering" },
  { title: "AI/ML Solutions Engineer (Python / LangChain)", location: "Remote / Bangalore", department: "Artificial Intelligence" },
  { title: "Cloud DevOps Architect (AWS / Kubernetes)", location: "Remote / Bangalore", department: "Infrastructure" },
  { title: "Senior UI/UX Product Designer", location: "Remote", department: "Design" },
];

/* -------------------------------------------------------------------------- */
/* 14. PROOF GATE                                                             */
/* -------------------------------------------------------------------------- */
/**
 * Nothing that asserts a fact about a third party or about our track record
 * should reach a visitor before someone has confirmed it is true. These
 * accessors are the only ones the home page reads, so an unverified record is
 * structurally incapable of being published: forgetting to check is no longer
 * a way to end up with invented proof on the site.
 *
 * Flip a record's `verified` to true when the evidence exists, and the section
 * that consumes it reappears on its own.
 */
export const verifiedClients = trustedBy.filter((c) => c.verified);
export const verifiedProjects = portfolioProjects.filter((p) => p.verified);
export const verifiedTestimonials = testimonials.filter((t) => t.verified);
export const verifiedMetrics = metrics.filter((m) => m.verified);

/** True when a proof-backed section has enough real records to be worth showing. */
export const hasProof = {
  clients: verifiedClients.length > 0,
  projects: verifiedProjects.length > 0,
  testimonials: verifiedTestimonials.length > 0,
  metrics: verifiedMetrics.length > 0,
};
