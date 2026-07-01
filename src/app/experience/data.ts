export type ExperienceEntry = {
  headline: string;
  role: string;
  company: string;
  companyHref: string;
  companyLogo: string;
  period: string;
  location: string;
  capabilities: string[];
  bullets: string[];
  featured?: boolean;
};

export const experiences: ExperienceEntry[] = [
  {
    headline:
      "Building internal systems that have to hold up under real operational pressure.",
    role: "Freelance Fullstack Developer",
    company: "Oriskin Indonesia",
    companyHref: "https://oriskin.co.id",
    companyLogo: "/images/company-logos/oriskin.png",
    period: "Dec 2025 to Present",
    location: "Jakarta, Indonesia, remote",
    capabilities: [
      "Architecture",
      "Delivery",
      "Go",
      "Next.js",
      "Infrastructure",
    ],
    bullets: [
      "Contributing across four production servers, with work spanning implementation, delivery, and engineering quality.",
      "Building internal systems for an 80-plus-branch clinic business, including HRIS and home-service operations tools.",
      "Shipped a WhatsApp broadcast system to production in a single overnight sprint when the delivery window left little room for ceremony.",
      "Building Go services with domain-driven boundaries and OpenAPI-based integrations for Next.js frontends, while working with Docker and Kubernetes on VPS infrastructure.",
    ],
    featured: true,
  },
  {
    headline:
      "Running multi-product delivery with clearer service boundaries and steadier engineering habits.",
    role: "Freelance Technical Lead",
    company: "PT Jogiia Digital Indotech",
    companyHref: "https://jogiia.id",
    companyLogo: "/images/company-logos/jogiia.png",
    period: "Feb 2025 to Mar 2026",
    location: "Yogyakarta, Indonesia",
    capabilities: [
      "Technical leadership",
      "DDD",
      "Code review",
      "Docker",
      "Kubernetes",
    ],
    bullets: [
      "Led engineers across consumer-facing and internal platforms, keeping delivery moving across multiple product lines.",
      "Designed Go backend services with boundaries intended to stay legible as products and teams expanded.",
      "Standardized Docker and Kubernetes deployment patterns so releases became more repeatable and less fragile.",
      "Introduced code review expectations, pull request workflows, and mentoring routines that improved team velocity without turning process into theatre.",
    ],
  },
  {
    headline:
      "Shaping frontend systems for analytics-heavy products with an eye on longevity, not just launch speed.",
    role: "Freelance Fullstack Developer",
    company: "PT Global Data Inspirasi",
    companyHref: "https://datains.id",
    companyLogo: "/images/company-logos/datains.png",
    period: "Jun 2023 to Feb 2025",
    location: "Yogyakarta, Indonesia",
    capabilities: [
      "Frontend architecture",
      "Next.js",
      "Server components",
      "UI systems",
    ],
    bullets: [
      "Led frontend architecture for Robota and Windsight, two products with different analytical workflows and product constraints.",
      "Migrated Robota from legacy React to Next.js App Router, using server-rendered patterns that improved maintainability and performance.",
      "Set the frontend direction for Windsight with a server-component-heavy approach suited to dense analytics surfaces.",
      "Built reusable UI systems with shadcn/ui, Radix UI, and Tailwind CSS to reduce friction across both products.",
    ],
  },
  {
    headline:
      "Building modern frontend foundations before the work expanded into broader technical leadership.",
    role: "Freelance Frontend Developer (Next.js)",
    company: "PT Jogiia Digital Indotech",
    companyHref: "https://jogiia.id",
    companyLogo: "/images/company-logos/jogiia.png",
    period: "Sep 2024 to Feb 2025",
    location: "Yogyakarta, Indonesia",
    capabilities: [
      "TypeScript",
      "App Router",
      "State management",
      "Auth flows",
    ],
    bullets: [
      "Built and maintained production web interfaces with Next.js App Router and TypeScript across several products.",
      "Helped move a legacy React architecture toward server-side rendering and React Server Component patterns.",
      "Introduced TanStack Query and Zustand where state complexity justified it, keeping async flows and client state more predictable.",
      "Integrated tRPC and NextAuth into type-safe application flows instead of layering on ad hoc API handling.",
    ],
  },
  {
    headline:
      "Starting in analytical tooling, where software had to support research rather than simply look polished.",
    role: "Freelance Data Scientist / Junior Developer",
    company: "PT Nanosense Instrument Indonesia",
    companyHref: "https://ecc.co.id/company/site/view/168369",
    companyLogo: "/images/company-logos/nanosense.png",
    period: "Aug 2022 to Dec 2022",
    location: "Yogyakarta, Indonesia",
    capabilities: [
      "Streamlit",
      "Data analysis",
      "ML workflows",
      "Research support",
    ],
    bullets: [
      "Built a Streamlit interface for e-tongue sensor analysis and data visualization.",
      "Worked on data processing, model experimentation, and interactive workflows for sensor research.",
      "Developed an early habit of treating software as an instrument for clearer decisions, not just implementation output.",
    ],
  },
];
