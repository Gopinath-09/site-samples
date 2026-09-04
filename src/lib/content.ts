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
  /**
   * Which cell this service takes in the home page bento. `wide` spans four
   * columns of six and `full` spans four with a call to action beside it, so the
   * grid stays balanced without the layout hard-coding an order.
   */
  span?: "wide" | "full";
  /** Selects the drawn visual in `ServiceVisual`. */
  visual:
    | "ai"
    | "stack"
    | "cloud"
    | "mobile"
    | "design"
    | "transform";
}

/**
 * The six disciplines the company portfolio document lists. The previous ten
 * were invented, and several described work nobody here had been asked to do.
 * Every technology named below appears in the documented company stack.
 */
export const services: Service[] = [
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    icon: "sparkle",
    visual: "ai",
    summary: "Retrieval, agents and assistants that do real work on your data.",
    description:
      "We build AI that is wired into a business rather than bolted onto it: retrieval over your own documents, agents that carry out multi-step tasks, and assistants that answer from systems your team already trusts.",
    points: [
      "Retrieval-augmented generation over your own corpus",
      "Agentic workflows that complete multi-step tasks",
      "Deep research agents for long-running investigation",
      "Internal assistants grounded in company systems",
    ],
    benefits: [
      "Answers traceable to a source rather than invented",
      "Manual research and triage collapsed into minutes",
      "Assistants that improve as your document base grows",
    ],
    features: [
      "RAG & Agentic RAG",
      "Deep Research Agent",
      "Internal Software AI Assistant",
      "Conversational AI",
      "Predictive Analytics",
      "Document Intelligence",
    ],
    technologies: ["Python", "RAG", "Agentic RAG", "Vector Databases", "Node.js"],
    processSteps: [
      "Identify the decisions the AI is meant to support",
      "Prepare and index the source material",
      "Build retrieval and evaluate answer quality",
      "Add agentic steps only where they earn their complexity",
      "Ship behind guardrails and monitor in production",
    ],
    faqs: [
      {
        question: "Will it make things up?",
        answer:
          "Retrieval grounds every answer in your own material, and responses cite what they drew on, so an answer can be checked rather than trusted blindly.",
      },
      {
        question: "Does our data leave our environment?",
        answer:
          "That is an architectural decision we make with you up front. Deployments can be scoped so documents and vectors stay inside infrastructure you control.",
      },
    ],
  },
  {
    slug: "enterprise-software",
    title: "Enterprise Software",
    icon: "layers",
    visual: "stack",
    span: "wide",
    summary: "ERP, CRM and custom platforms that hold up under real operations.",
    description:
      "The systems a business actually runs on: admissions and fees, patients and prescriptions, members and bookings, stock and purchase orders. We build them to survive years of daily use, not a launch demo.",
    points: [
      "Custom platforms shaped around how the work is actually done",
      "ERP and CRM systems with role-based access throughout",
      "API-first services that other systems can build on",
      "Reporting that answers the questions operators ask",
    ],
    benefits: [
      "One system of record instead of scattered spreadsheets",
      "Manual re-keying between departments removed",
      "Architecture that survives the next five years of change",
    ],
    features: [
      "Custom Software",
      "ERP & CRM Systems",
      "SaaS Platforms",
      "API Development",
      "Role-Based Access",
      "Dashboard Analytics",
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Java",
      ".NET",
      "Python",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
    ],
    processSteps: [
      "Map the operation before proposing any software",
      "Design the data model the business actually has",
      "Build the core workflow end to end first",
      "Layer reporting and administration on top",
      "Hand over with documentation people can follow",
    ],
    faqs: [
      {
        question: "Can it replace a system we already run?",
        answer:
          "Usually, and rarely all at once. We tend to run the new system alongside the old one for the workflows it has taken over, then migrate the rest once it has proven itself.",
      },
    ],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    icon: "cloud",
    visual: "cloud",
    summary: "Infrastructure, containers and delivery pipelines that stay boring.",
    description:
      "Cloud work whose whole purpose is to stop being interesting: reproducible environments, deployments that are routine rather than an event, and infrastructure someone other than the person who built it can operate.",
    points: [
      "Containerised services with reproducible builds",
      "Continuous integration and delivery from day one",
      "Environment parity between local, staging and production",
      "Migration from ageing or hand-managed servers",
    ],
    benefits: [
      "Releases become routine rather than an event",
      "Capacity that follows demand instead of guesswork",
      "Infrastructure described in code, not in someone's memory",
    ],
    features: [
      "Cloud Migration",
      "CI/CD Pipelines",
      "Container Orchestration",
      "Environment Management",
      "Monitoring & Alerting",
      "One-Click Scaling",
    ],
    technologies: ["AWS", "VPS", "Docker", "Kubernetes", "Jenkins", "GitHub", "GitLab"],
    processSteps: [
      "Audit what is running and what it actually needs",
      "Containerise and make builds reproducible",
      "Automate the path from commit to production",
      "Add monitoring before it is needed, not after",
      "Document the runbook and hand it over",
    ],
    faqs: [
      {
        question: "Do we have to be on a hyperscaler?",
        answer:
          "No. We run workloads on AWS and on plain VPS infrastructure, and the right answer depends on your scale, budget and compliance position rather than on fashion.",
      },
    ],
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    icon: "phone",
    visual: "mobile",
    summary: "Apps for the people doing the work, not just the people reporting on it.",
    description:
      "Mobile software for the field: drivers, parents, staff and members. The screens are built around what someone needs while standing up, holding something else, on a patchy connection.",
    points: [
      "Apps designed around a single task done quickly",
      "Offline tolerance where connectivity cannot be assumed",
      "Push notification and alerting flows",
      "Shared backends with the web platform, not a separate silo",
    ],
    benefits: [
      "Information reaches people where the work happens",
      "Fewer phone calls to the office for routine updates",
      "One backend serving both web and mobile",
    ],
    features: [
      "Android & iOS Delivery",
      "Cross-Platform Builds",
      "Push Notifications",
      "Offline-Tolerant Flows",
      "Location & Tracking",
      "Role-Based Views",
    ],
    technologies: ["React", "Node.js", "Python", "PostgreSQL", "MongoDB"],
    processSteps: [
      "Establish the one job the app must do well",
      "Prototype the primary flow before building",
      "Build against the real backend early",
      "Test on the devices and networks users actually have",
      "Ship, then iterate on observed behaviour",
    ],
    faqs: [
      {
        question: "Do we need separate Android and iOS builds?",
        answer:
          "Not usually. A cross-platform build covers most cases; we recommend going native only where a feature genuinely requires it.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: "grid",
    visual: "design",
    summary: "Interfaces judged by whether the work gets done, not by how they look.",
    description:
      "Research, structure and interface design for systems people use all day. The measure of success is a task completed without hesitation, not a screenshot that photographs well.",
    points: [
      "Research with the people who will actually use it",
      "Information architecture before visual design",
      "Design systems that keep later screens consistent",
      "Accessible contrast, focus states and keyboard paths",
    ],
    benefits: [
      "Less training required for new staff",
      "Fewer support calls caused by confusing screens",
      "A component library that speeds up everything after",
    ],
    features: [
      "UX Research",
      "Wireframing",
      "Interface Design",
      "Design Systems",
      "Prototyping",
      "Accessibility Review",
    ],
    technologies: ["Figma", "React", "Next.js", "Tailwind CSS"],
    processSteps: [
      "Understand the task and who performs it",
      "Structure the information before styling it",
      "Wireframe and test the flow cheaply",
      "Design the interface and its states",
      "Codify it as a reusable system",
    ],
    faqs: [
      {
        question: "Can you work with our existing brand?",
        answer:
          "Yes. Where a brand already exists we build the design system within it rather than around it, so the result still looks like you.",
      },
    ],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    icon: "gear",
    visual: "transform",
    span: "full",
    summary: "Turning manual routine into systems that run themselves.",
    description:
      "The unglamorous work of finding where hours disappear — re-keying, chasing, reconciling — and replacing it with something automatic. Usually the highest return of anything on this list.",
    points: [
      "Audit of where manual effort is actually being spent",
      "Automation of the handoffs between existing systems",
      "Digitisation of paper and spreadsheet processes",
      "Modernisation of systems that have outlived their design",
    ],
    benefits: [
      "Hours returned to the people doing the work",
      "Fewer errors from copying data between systems",
      "A record of what happened, produced automatically",
    ],
    features: [
      "Process Audit",
      "Workflow Automation",
      "System Integration",
      "Legacy Modernisation",
      "Reporting Automation",
      "Change Support",
    ],
    technologies: ["Python", "Node.js", "Docker", "PostgreSQL", "REST & Webhooks"],
    processSteps: [
      "Requirement analysis",
      "Business consultation",
      "Architecture design",
      "UI/UX design",
      "Agile development",
      "Quality assurance",
      "Deployment",
      "Support and enhancement",
    ],
    faqs: [
      {
        question: "Where should we start?",
        answer:
          "With whichever process consumes the most hours for the least judgement. That is almost always where automation pays back fastest, and it builds the confidence for the harder work after.",
      },
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
  /** How the portfolio document classifies the engagement. */
  projectType: string;
  industry: string;
  summary: string;
  /** Core features, as recorded for the project. */
  features: string[];
  /** The stated business outcome, in prose rather than as a figure. */
  benefits: string;
  /** Where the work currently stands, stated plainly. */
  status: string;
  accent: string;
  /**
   * Cleared for publication. `false` means the record is a draft placeholder and
   * is withheld from the site until the claim can be backed by a real client,
   * a signed-off number, or written permission to use the name.
   */
  verified: boolean;

  /*
   * Everything below is optional, and absent wherever we hold no evidence for
   * it. These fields were once required, which forced every record to carry a
   * fabricated metric, quote and duration purely to satisfy the type. A field
   * that cannot be left empty is a field that will be invented.
   */

  /** Named only where the client is identified in the portfolio document. */
  client?: string;
  /** Per-project stack. The document records the company stack, not this. */
  technologies?: string[];
  /** Measured outcomes. None are evidenced yet. */
  results?: { label: string; value: string }[];
  /** Attributed quotes. None have been collected yet. */
  clientFeedback?: { quote: string; author: string; role: string };
  /**
   * Product screens. `image` is optional — without it the UI renders a labelled
   * placeholder frame, so real screenshots drop in later as a data change.
   */
  screenshots?: { label: string; caption: string; image?: string }[];
}

/**
 * The nine platforms COBRR has built, taken from the company portfolio
 * document. Client names appear only for the two engagements that document
 * identifies by name; the rest are described by sector alone.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "orthomentors",
    title: "Orthomentors",
    projectType: "AI Integrated Learning Management System",
    industry: "Medical Education",
    summary:
      "An AI-powered learning platform for postgraduate orthopaedic students, centralising curriculum delivery, assessment and analytics in one place.",
    features: [
      "Learning Management System",
      "AI Question Generation",
      "PG Orthopaedic Curriculum",
      "MCQ Engine",
      "Assessment Engine",
      "Progress Tracking",
      "Performance Analytics",
      "Faculty Portal",
      "Student Dashboard",
      "AI Assistant",
      "Content Management",
      "Cloud Architecture",
    ],
    benefits:
      "Improved learning outcomes, reduced faculty workload, faster content creation and centralised academic management.",
    status: "Developed and actively enhanced.",
    accent: "#2450e6",
    verified: true,
  },
  {
    slug: "onprembox",
    title: "OnPremBox",
    projectType: "Company Management Platform",
    industry: "Internal Operations / Enterprise",
    summary:
      "A centralised platform for workforce management, internal collaboration and operational tracking across an organisation.",
    features: [
      "Employee and Project Management",
      "Attendance",
      "Leave Management",
      "Asset Tracking",
      "Internal Task Management",
      "Document Repository",
      "HR Management",
      "Department Management",
      "Role-based Access",
      "Chat Systems",
      "Notifications",
      "Client Dashboard",
      "Dashboard Analytics",
      "One-Click Auto Scaling",
    ],
    benefits:
      "Better internal visibility, streamlined operations and improved productivity.",
    status: "Implemented for internal process automation.",
    accent: "#0d9488",
    verified: true,
  },
  {
    slug: "yhai-tamil-nadu",
    title: "YHAI Tamil Nadu Digital Transformation Platform",
    client: "Youth Hostels Association of India, Tamil Nadu",
    projectType: "Tourism and Youth Development Platform",
    industry: "Tourism / Membership / Activity Management",
    summary:
      "A digital platform for the Tamil Nadu branch of the Youth Hostels Association of India, modernising tourism services, memberships, accommodation and activity bookings.",
    features: [
      "Tourism Management Platform",
      "Hostel & Accommodation Management",
      "Activity Booking System",
      "Adventure & Trek Booking",
      "Membership Management",
      "Event Registration",
      "Digital Content Management",
      "Administration Dashboard",
      "Governor Dashboard",
      "Mobile Responsive Web Application",
      "Future-ready Payment and Booking Architecture",
      "Analytics-ready Architecture",
    ],
    benefits:
      "Enhanced member engagement, streamlined tourism operations and scalable digital infrastructure.",
    status: "Developed with phased rollout readiness.",
    accent: "#6366f1",
    verified: true,
  },
  {
    slug: "gps-transport-management",
    title: "GPS Transport Management System",
    projectType: "School Transport Tracking System",
    industry: "Education / Logistics",
    summary:
      "A school transport system giving live vehicle tracking, route visibility and safety alerts to schools, drivers and parents at once.",
    features: [
      "Live GPS Tracking",
      "Driver Mobile App",
      "Parent App",
      "Student Boarding Alerts",
      "ETA Prediction",
      "Route Optimization",
      "RFID Integration Ready",
      "Emergency SOS",
      "Geo-fencing",
      "Attendance Integration",
      "School Admin Dashboard",
    ],
    benefits:
      "Improved transport safety, operational visibility and parent communication.",
    status: "Delivered as a transport module.",
    accent: "#d97706",
    verified: true,
  },
  {
    slug: "complete-school-erp",
    title: "Complete School ERP",
    projectType: "School Management Platform",
    industry: "Education",
    summary:
      "An ERP covering the academic, administrative and operational processes of a school from a single platform.",
    features: [
      "Student Information System",
      "Admissions",
      "Fee Management",
      "Transport",
      "Hostel",
      "Library",
      "Timetable",
      "Attendance",
      "Examinations",
      "Report Cards",
      "Parent Portal",
      "Teacher Portal",
      "HR",
      "Payroll",
      "Inventory",
      "AI Reports",
    ],
    benefits:
      "Centralised school operations, reduced manual work and improved data management.",
    status:
      "Developed as a full-school management solution, currently in internal testing.",
    accent: "#2563eb",
    verified: true,
  },
  {
    slug: "clinic-management-system",
    title: "Hospital Management System (Clinic)",
    projectType: "Clinic Operations Platform",
    industry: "Healthcare",
    summary:
      "A clinic management system simplifying patient flow, appointments, billing and records for day-to-day practice.",
    features: [
      "Patient Registration",
      "Appointment Booking",
      "Doctor Dashboard",
      "Electronic Medical Records",
      "Pharmacy",
      "Billing",
      "Laboratory",
      "Prescription Management",
      "Inventory",
      "Reports",
    ],
    benefits:
      "Better patient management, smoother operations and organised clinical records.",
    status: "Implemented for the client clinic in daily use.",
    accent: "#0d9488",
    verified: true,
  },
  {
    slug: "rajiv-gandhi-hospital-ai-chatbot",
    title: "Rajiv Gandhi Hospital AI Chatbot",
    client: "Rajiv Gandhi Hospital",
    projectType: "AI Patient Assistant",
    industry: "Healthcare",
    summary:
      "An AI assistant helping hospital visitors and patients with navigation, information and guidance around the clock.",
    features: [
      "AI-powered Patient Assistant",
      "Appointment Guidance",
      "Department Navigation",
      "FAQ Automation",
      "Multilingual Support",
      "NLP Engine",
      "Hospital Information Retrieval",
      "24x7 Virtual Assistant",
    ],
    benefits:
      "Improved patient support, faster information access and reduced front-desk dependency.",
    status: "Built as a hospital support chatbot.",
    accent: "#2450e6",
    verified: true,
  },
  {
    slug: "stock-management",
    title: "Stock Management Software",
    projectType: "Inventory Control Platform",
    industry: "Retail / Operations",
    summary:
      "A stock platform tracking inventory movement, purchasing, sales and warehouse data in one ledger.",
    features: [
      "Inventory Management",
      "Purchase Orders",
      "Sales Management",
      "Vendor Management",
      "Barcode Support",
      "Warehouse Management",
      "Inventory Alerts",
      "Analytics Dashboard",
    ],
    benefits:
      "Improved inventory accuracy, stock control and business tracking.",
    status: "Developed and deployed for inventory operations.",
    accent: "#d97706",
    verified: true,
  },
  {
    slug: "matrimony-application",
    title: "Matrimony Application",
    projectType: "AI-ready Matrimonial Platform",
    industry: "Consumer Technology",
    summary:
      "A matrimonial platform built around intelligent matching, verification and privacy controls to improve discovery and trust.",
    features: [
      "User Profiles",
      "AI-powered Match Suggestions",
      "Chat & Interest Requests",
      "Privacy Controls",
      "Subscription Model",
      "Admin Dashboard",
      "Verification Workflow",
    ],
    benefits:
      "Enhanced user matching, improved trust and support for subscription-based monetisation.",
    status: "Issued for client-side testing.",
    accent: "#6366f1",
    verified: true,
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

/**
 * Empty by design.
 *
 * This array previously held three invented SaaS products, complete with
 * fabricated benefit figures. The company portfolio document records no
 * commercially available product: what it records is a roadmap, which is a
 * statement of intent rather than a thing anyone can buy today. Conflating the
 * two is the most expensive kind of overclaim, because a prospect can ask for a
 * demo of something that does not exist.
 *
 * The product sections read this array and remove themselves while it is empty.
 * Add a record here when there is a product to sell, not before.
 */
export const products: Product[] = [];

export interface RoadmapItem {
  name: string;
  blurb: string;
}

/**
 * The stated product roadmap. Presented as direction, never as inventory —
 * every consumer of this list must label it as what is being built next.
 */
export const productRoadmap: RoadmapItem[] = [
  {
    name: "AI Agents",
    blurb:
      "Autonomous agents that carry out multi-step work inside a business, rather than answering one question at a time.",
  },
  {
    name: "Enterprise Automation",
    blurb:
      "Removing the manual handoffs between systems that quietly consume operational hours.",
  },
  {
    name: "Cloud SaaS Products",
    blurb:
      "Multi-tenant platforms built on the infrastructure patterns we already run for clients.",
  },
  {
    name: "Healthcare AI",
    blurb:
      "Patient-facing assistance and clinical record intelligence, extending the clinic systems we have delivered.",
  },
  {
    name: "Educational AI",
    blurb:
      "Curriculum generation, assessment and analytics, building on the learning platforms already in use.",
  },
  {
    name: "Logistics Intelligence",
    blurb:
      "Route, fleet and delivery optimisation informed by the transport tracking work we have shipped.",
  },
  {
    name: "Tourism Ecosystems",
    blurb:
      "Membership, booking and activity platforms for tourism bodies and their operators.",
  },
  {
    name: "Government Digital Platforms",
    blurb:
      "Secure, auditable and accessible public-sector systems.",
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
}

/**
 * The development methodology recorded in the company portfolio document, in
 * its stated order. The descriptions say what happens at each stage; none of
 * them claims a duration, a deliverable count or an outcome, because the
 * document records none.
 */
export const processSteps: ProcessStep[] = [
  {
    step: "01",
    number: 1,
    title: "Requirement analysis",
    description:
      "Establishing what the system has to do, who it is for, and which constraints are real rather than assumed.",
  },
  {
    step: "02",
    number: 2,
    title: "Business consultation",
    description:
      "Testing the requirement against how the organisation actually operates, and agreeing what is in scope.",
  },
  {
    step: "03",
    number: 3,
    title: "Architecture design",
    description:
      "Deciding the structure — data model, services, integrations — before any of it is expensive to change.",
  },
  {
    step: "04",
    number: 4,
    title: "UI/UX design",
    description:
      "Structuring the interface around the task, then designing the screens and their states.",
  },
  {
    step: "05",
    number: 5,
    title: "Agile development",
    description:
      "Building in increments, with working software to look at rather than status to take on trust.",
  },
  {
    step: "06",
    number: 6,
    title: "Quality assurance",
    description:
      "Testing against the requirement and the edge cases, on the environments the system will actually run in.",
  },
  {
    step: "07",
    number: 7,
    title: "Deployment",
    description:
      "Releasing to production with the pipeline, monitoring and rollback path already in place.",
  },
  {
    step: "08",
    number: 8,
    title: "Support and enhancement",
    description:
      "Operating the system after launch and continuing to develop it, which is where most of its life is spent.",
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

/**
 * YHAI and Rajiv Gandhi Hospital are marked verified because the company's own
 * portfolio document names them as clients and that document was supplied for
 * publication. The rest stay unverified until someone confirms we hold
 * permission to display the name — being a real client and having agreed to be
 * listed publicly are two different things.
 */
export const trustedBy: Client[] = [
  { name: "YHAI TAMIL NADU", verified: true },
  { name: "RAJIV GANDHI HOSPITAL", verified: true },
  { name: "SATISFY", verified: false },
  { name: "SUDESI A&F", verified: false },
  { name: "TRACKER BOX", verified: false },
  { name: "UNION COLLEGE", verified: false },
  { name: "DUDUK", verified: false },
  { name: "DECYRE", verified: false },
];

/**
 * The three named officers of the company. Each bio states that person's core
 * expertise as recorded in the portfolio document — no invented tenure, no
 * former employers, no credentials we cannot substantiate.
 */
export const teamMembers = [
  {
    name: "Rishi Vardhan S.",
    role: "Chief Executive Officer",
    bio: "Business strategy, product vision and project management, alongside DevOps engineering and infrastructure automation.",
  },
  {
    name: "Gopinath S. R.",
    role: "Chief Technology Officer",
    bio: "System architecture and enterprise software, spanning full-stack development, cloud infrastructure, artificial intelligence and API engineering.",
  },
  {
    name: "Sachindra P.",
    role: "Chief Operating Officer",
    bio: "Operations management with full-stack and frontend engineering, UI/UX design, component architecture and product delivery.",
  },
];

/**
 * Only milestones the portfolio document supports. It records no dates beyond
 * the founding year, so nothing here claims a month or a sequence we cannot
 * evidence.
 */
export const companyTimeline = [
  {
    year: "2026",
    title: "Incorporated",
    desc: "COBRR Tech Labs Private Limited registered in Coimbatore, Tamil Nadu.",
  },
  {
    year: "2026",
    title: "First platforms delivered",
    desc: "Learning, tourism, school and clinic systems built and put into use by their operators.",
  },
  {
    year: "2026",
    title: "AI practice established",
    desc: "RAG, agentic RAG and research agents moved from experiment into client delivery.",
  },
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
  { title: "Senior Full-Stack Engineer (Next.js / Node.js)", location: "Remote / Coimbatore", department: "Engineering" },
  { title: "AI/ML Solutions Engineer (Python / LangChain)", location: "Remote / Coimbatore", department: "Artificial Intelligence" },
  { title: "Cloud DevOps Architect (AWS / Kubernetes)", location: "Remote / Coimbatore", department: "Infrastructure" },
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

/* -------------------------------------------------------------------------- */
/* 15. PROBLEMS WE SOLVE                                                      */
/* -------------------------------------------------------------------------- */
/**
 * Positioning stated as the situation a visitor is actually in, rather than as
 * a list of capabilities. Each entry names a problem, says how we answer it,
 * and points at the discipline that does the work.
 *
 * Every answer below describes something the company already does — the
 * services and the delivered portfolio both back them. None of them claims a
 * result, because a result belongs to a project, not to a pitch.
 */
export interface Problem {
  /** The situation, phrased as the visitor would put it. */
  question: string;
  answer: string;
  ctaLabel: string;
  href: string;
}

export const problemsWeSolve: Problem[] = [
  {
    question: "Your product outgrew its first version.",
    answer:
      "What was built to prove an idea is now carrying real load, and every change costs more than the last. We modernise the architecture underneath without stopping the system people depend on, so the next five years are cheaper than the last two.",
    ctaLabel: "Modernise my product",
    href: "/services/digital-transformation",
  },
  {
    question: "You need to launch and win early traction.",
    answer:
      "Scope is the whole problem: everything sounds essential until someone has to build it. We cut the first release down to the part that proves the idea, ship it on foundations that will not need replacing, and add the rest once real usage says what matters.",
    ctaLabel: "Launch my product",
    href: "/services/enterprise-software",
  },
  {
    question: "Your team is doing by hand what software should do.",
    answer:
      "Re-keying between systems, chasing approvals, assembling the same report every week. We find where the hours actually go and automate the handoffs, which is usually the highest-return work available to a business.",
    ctaLabel: "Automate the routine",
    href: "/services/digital-transformation",
  },
  {
    question: "Your data cannot answer anyone's questions.",
    answer:
      "The information exists, but it is spread across documents and systems nobody can query. We build retrieval over your own material so answers come back traceable to a source, rather than a model inventing something plausible.",
    ctaLabel: "Put AI to work",
    href: "/services/artificial-intelligence",
  },
];
