export const profile = {
  name: "Vedant Ambre",
  firstName: "Vedant",
  lastName: "Ambre",
  title: "Business Analyst",
  altTitle: "",
  tagline: "Open to Business Analyst roles · Based in Ireland",
  email: "ambreved3@gmail.com",
  location: "Maynooth, Ireland",
  socials: {
    linkedin: "https://linkedin.com/in/vedantambre",
    github: "https://github.com/vedjr02",
    email: "mailto:ambreved3@gmail.com",
  },
  intro:
    "Today that means scoping the right questions, modeling the KPIs that matter, and shipping dashboards stakeholders can actually use in the room. I'm currently building AdFlex — a dynamic pricing dashboard for Sustainable Energy Ireland — while finishing my Master's at Maynooth, and looking for a team where evidence beats opinion.",
  story:
    "I came up through engineering because I liked how a clean query could change what a team believed about its own numbers. That path took me from a Bachelor's in Information Technology to a Master's in Business Analytics at Maynooth University in Ireland. Along the way I've shipped full-stack product systems, authored research on non-invasive diagnostics, and learned to turn messy datasets into a story non-technical people can act on.",
  now:
    "Currently building the AdFlex dynamic pricing dashboard as a Business Consultant project for Sustainable Energy Ireland (SEI), while wrapping up my Master's at Maynooth.",
};

export type ProjectTier = "featured" | "consulting" | "product" | "selected";

export type Project = {
  id: string;
  title: string;
  category: string;
  period: string;
  description: string;
  tags: string[];
  highlights: string[];
  status: "Live" | "In Progress" | "Completed";
  tier: ProjectTier;
  accent: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Optional local preview under /public, e.g. `/previews/starbucks.jpg` */
  previewImage?: string;
  metric?: { value: number; suffix?: string; label: string; decimals?: number };
};

export const projects: Project[] = [
  {
    id: "starbucks",
    title: "Starbucks Sales Analysis",
    category: "Business Analytics Case Study",
    period: "2026",
    description:
      "A business analytics case study built entirely from Starbucks' public filings (FY2025–Q2 FY2026 10-K, earnings releases, investor loyalty dashboards). Analyzes three disclosed growth levers under the \"Back to Starbucks\" turnaround: the underpenetrated 3–5 PM afternoon daypart, Rewards loyalty economics (58% of U.S. company-operated tender, 34.2M active members), and beverage/food product mix. Interactive site with toggleable strategic levers, segment-level store breakdowns, and a full source appendix so every number traces back to a named disclosure.",
    tags: ["Excel", "Power BI", "Tableau", "Python", "Next.js"],
    highlights: [
      "3 strategic levers under \"Back to Starbucks\"",
      "34.2M Rewards members · 58% of U.S. tender",
      "Every metric traced to a named disclosure",
    ],
    status: "Live",
    tier: "featured",
    accent: "from-white/10 to-white/5",
    liveUrl: "https://starbucks-case-study-ved.vercel.app/",
    repoUrl: "https://github.com/vedjr02/Starbucks-Analysis",
    previewImage: "/previews/starbucks.jpg",
    metric: { value: 34.2, suffix: "M", label: "Rewards members analyzed", decimals: 1 },
  },
  {
    id: "nvidia",
    title: "How NVIDIA Became the Backbone of the AI Economy",
    category: "Interactive Data Case Study",
    period: "2026",
    description:
      "An interactive, data-driven case study tracing NVIDIA's transformation from a gaming GPU company to a $5T AI infrastructure supplier, sourced entirely to SEC filings, earnings releases, and primary reporting. Traces four key decisions across 20 years — the 2006 CUDA platform bet, the 2022 data-center revenue crossover (which predates ChatGPT by six months), the 2023 demand shock and margin expansion, and the current shift toward hyperscaler-concentration risk. Includes 68 sourced timeline events and a transparent log of claims investigated and rejected for insufficient sourcing.",
    tags: ["SEC Filings", "Recharts", "Next.js", "Research Rigour"],
    highlights: [
      "68 sourced timeline events",
      "2022 data-center crossover predates ChatGPT",
      "Rejected claims logged for transparency",
    ],
    status: "Live",
    tier: "featured",
    accent: "from-white/10 to-white/5",
    liveUrl: "https://nvidia-case-study-ved.vercel.app/",
    repoUrl: "https://github.com/vedjr02/Nvidia-Case-Study",
    previewImage: "/previews/nvidia.jpg",
    metric: { value: 68, suffix: "", label: "Sourced timeline events" },
  },
  {
    id: "adflex",
    title: "AdFlex Dynamic Pricing Dashboard",
    category: "Business Consulting · Sustainable Energy Ireland (SEI)",
    period: "2026 — Present",
    description:
      "Currently building AdFlex as my Business Consultant project for Sustainable Energy Ireland (SEI) — a dynamic pricing dashboard for energy tariff analysis and cost-impact scenarios. Translating stakeholder requirements into KPI frameworks and interactive views that help non-technical teams evaluate pricing structures with clarity.",
    tags: ["Power BI", "SQL", "KPI Modeling", "Stakeholder Mgmt", "Energy"],
    highlights: [
      "Live consulting engagement with SEI",
      "Dynamic tariff & cost-impact scenarios",
      "Built for non-technical decision makers",
    ],
    status: "In Progress",
    tier: "consulting",
    accent: "from-white/10 to-white/5",
    liveUrl: "https://adflex-dynamic-prices-vedant.vercel.app/login",
    repoUrl: "https://github.com/vedjr02/adflex-dynamic-prices",
    previewImage: "/previews/adflex.jpg",
  },
  {
    id: "vcg",
    title: "Virtual Communication Gateway",
    category: "Business Analytics × IoT",
    period: "Jan 2026 — Present",
    description:
      "Market-driven strategy built on the IEEE 2030.5 protocol for secure data exchange across the energy sector. Validated demand, formulated SaaS revenue models, and ran data-driven feasibility analyses that align technical development with business scalability.",
    tags: ["Market Research", "SaaS Modeling", "Feasibility Analysis"],
    highlights: [
      "IEEE 2030.5 protocol integration",
      "SaaS revenue model design",
      "Go-to-market validation",
    ],
    status: "In Progress",
    tier: "consulting",
    accent: "from-white/10 to-white/5",
    previewImage: "/previews/vcg.jpg",
    repoUrl: "https://github.com/vedjr02/virtual-gateway",
  },
  {
    id: "retentioniq",
    title: "RetentionIQ",
    category: "Product Analytics Platform",
    period: "2026",
    description:
      "Product & app analytics dashboard for tracking user activation, funnel drop-off, and retention cohorts. Ingests event-level user data into PostgreSQL, computes funnel conversion and feature adoption with SQL-first aggregation, and surfaces plain-English insight panels beside every chart — not just numbers.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "SQL", "Cohorts"],
    highlights: [
      "Funnel drop-off & cohort retention",
      "Plain-English insight panels",
      "SQL-first KPI aggregation",
    ],
    status: "Live",
    tier: "product",
    accent: "from-white/10 to-white/5",
    liveUrl: "https://retention-iq-seven.vercel.app",
    repoUrl: "https://github.com/vedjr02/RetentionIQ",
    previewImage: "/previews/retentioniq.jpg",
  },
  {
    id: "insightpilot",
    title: "InsightPilot",
    category: "Autonomous AI Business Analyst",
    period: "2026",
    description:
      "Upload a CSV (or use the bundled retail sales demo), ask questions in plain English, and get chart-backed answers with a visible reasoning trace. The agent plans its own SQL, validates it, runs it read-only, and explains what it found — built to show how analysts can ship faster with transparent AI assistance.",
    tags: ["Next.js", "FastAPI", "Gemini", "Neon Postgres", "Recharts"],
    highlights: [
      "Visible reasoning trace",
      "Read-only SQL agent loop",
      "Chart-backed plain-English answers",
    ],
    status: "Live",
    tier: "product",
    accent: "from-white/10 to-white/5",
    liveUrl: "https://insightpilot-orpin.vercel.app",
    repoUrl: "https://github.com/vedjr02/InsightPilot",
    previewImage: "/previews/insightpilot.jpg",
  },
  {
    id: "votion",
    title: "Votion",
    category: "Full-stack Workspace",
    period: "2026",
    description:
      "A Notion-style workspace built with Next.js, React, Convex, and Tailwind — real-time sync, rich editing, hierarchical documents, soft delete, auth, file management, and web publishing. Shipped as a full product surface, not a toy demo.",
    tags: ["Next.js", "Convex", "Auth", "Tailwind", "Realtime"],
    highlights: [
      "Realtime collaborative documents",
      "Soft delete + trash recovery",
      "Publish notes to the web",
    ],
    status: "Live",
    tier: "product",
    accent: "from-white/10 to-white/5",
    liveUrl: "https://votion-ved.vercel.app",
    repoUrl: "https://github.com/vedjr02/Votion",
    previewImage: "/previews/votion.jpg",
  },
  {
    id: "lumen",
    title: "Lumen — AI BI Dashboard",
    category: "AI Business Intelligence",
    period: "2026",
    description:
      "Drop a CSV or Excel file and get instant KPIs, charts, anomaly detection, and an AI analyst that answers questions in plain English — built to turn raw tables into decisions without a BI bottleneck.",
    tags: ["Next.js", "FastAPI", "Claude", "Pandas"],
    highlights: [
      "Auto KPIs & gradient charts from uploads",
      "Anomaly flags on messy datasets",
      "Plain-English Q&A over your file",
    ],
    status: "Completed",
    tier: "product",
    accent: "from-white/10 to-white/5",
    repoUrl: "https://github.com/vedjr02/AI-Business-Intelligence-Dashboard",
    previewImage: "/previews/lumen.jpg",
  },
  {
    id: "pricesense",
    title: "PriceSense",
    category: "Competitor Price Intelligence",
    period: "2026",
    description:
      "Precision analytics engine for tracking competitor listings — capture price history, volatility, and market signals so pricing decisions sit on scheduled scrapes instead of gut feel.",
    tags: ["Next.js", "Price Tracking", "Analytics", "Vercel"],
    highlights: [
      "Listing-level price history & volatility",
      "Live sync integrity for tracked products",
      "Market sentiment + arbitrage signals",
    ],
    status: "Completed",
    tier: "product",
    accent: "from-white/10 to-white/5",
    repoUrl: "https://github.com/vedjr02/Competitor-Price-Intelligence-Engine",
    previewImage: "/previews/pricesense.jpg",
  },
  {
    id: "smartbus",
    title: "Smart Bus Scheduling & Route Mgmt",
    category: "Full-stack System",
    period: "Jan 2024 — Dec 2024",
    description:
      "A full-stack scheduling platform built with Node.js, Express, MySQL and Leaflet.js. Automated 90% of manual shift assignments and integrated the OSRM API for dynamic rerouting and real-time fleet mapping.",
    tags: ["Node.js", "Express", "MySQL", "Leaflet", "OSRM"],
    highlights: [
      "90% manual scheduling automated",
      "Dynamic rerouting via OSRM",
      "Real-time fleet visualization",
    ],
    status: "Completed",
    tier: "selected",
    accent: "from-white/10 to-white/5",
  },
  {
    id: "diabetic-foot",
    title: "Diabetic Foot Detection",
    category: "Thermal Imaging × Research",
    period: "Jan 2025 — Nov 2025",
    description:
      "Diagnostic pipeline processing 15,000+ thermal images to detect early-stage diabetic foot complications, reaching 88% accuracy with anomaly detection techniques. Co-authored a research paper articulating the clinical and business value of a non-invasive alternative.",
    tags: ["Python", "Anomaly Detection", "Research", "Healthcare"],
    highlights: [
      "15,000+ thermal images processed",
      "88% diagnostic accuracy",
      "Published research paper",
    ],
    status: "Completed",
    tier: "selected",
    accent: "from-white/10 to-white/5",
    metric: { value: 88, suffix: "%", label: "Diagnostic accuracy" },
  },
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const consultingProjects = projects.filter((p) => p.tier === "consulting");
export const productProjects = projects.filter((p) => p.tier === "product");
export const selectedProjects = projects.filter((p) => p.tier === "selected");

export const skills = {
  technical: [
    "SQL",
    "Python",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Power BI",
    "Tableau",
    "Advanced Excel",
  ],
  frameworks: ["Node.js", "Express", "MySQL", "PostgreSQL", "Git", "Next.js", "FastAPI"],
  competencies: [
    "Business Intelligence",
    "Data Analytics",
    "Dashboard Development",
    "Market Research",
    "Requirement Gathering",
    "KPI Modeling",
    "Case Study Research",
  ],
};

export const education = [
  {
    degree: "Master's in Business Analytics",
    school: "Maynooth University",
    location: "Ireland",
    period: "Sep 2025 — Sep 2026",
    status: "current",
  },
  {
    degree: "B.Tech in Information Technology",
    school: "Ramrao Adik Institute of Technology, DY Patil University",
    location: "Mumbai, India",
    period: "Jun 2022 — May 2025",
    status: "completed",
  },
  {
    degree: "Diploma in Computer Science",
    school: "V.P.M's Polytechnic",
    location: "Mumbai, India",
    period: "Jun 2019 — May 2022",
    status: "completed",
  },
];

export const experience = [
  { label: "Insights", note: "Turning data into clarity" },
  { label: "Storytelling", note: "Numbers with a narrative" },
  { label: "Strategy", note: "Models that move the needle" },
  { label: "Decisions", note: "Evidence over opinion" },
  { label: "Dashboards", note: "Built for non-technical eyes" },
  { label: "Impact", note: "From slide to shipped" },
];

export type SideProject = {
  id: string;
  name: string;
  blurb: string;
  stack: string[];
  href: string;
  emoji: string;
};

export const sideProjects: SideProject[] = [
  {
    id: "habitify",
    name: "Habitifyyy",
    blurb:
      "SwiftUI iOS habit tracker with heatmaps, Pomodoro focus and AI-driven insights.",
    stack: ["SwiftUI", "Swift", "MVVM"],
    href: "https://github.com/vedjr02/Habitifyyy",
    emoji: "◐",
  },
  {
    id: "touchless",
    name: "Touchless Zoom",
    blurb:
      "Computer-vision zoom controller — pinch the air with your fingers to zoom on screen.",
    stack: ["Python", "OpenCV", "MediaPipe"],
    href: "https://github.com/vedjr02/Touchless-Zoom",
    emoji: "✶",
  },
  {
    id: "photography",
    name: "Photography Portfolio",
    blurb:
      "Personal photo site with an interactive click-speed game and live leaderboard.",
    stack: ["Node.js", "Express", "Vanilla JS"],
    href: "https://github.com/vedjr02/Photography-Portfolio",
    emoji: "◇",
  },
  {
    id: "neighbor",
    name: "Neighbor Swap Connect",
    blurb:
      "Community marketplace where neighbours swap items and services locally.",
    stack: ["React", "Vite", "shadcn-ui", "TS"],
    href: "https://github.com/vedjr02/neighbor-swap-connect",
    emoji: "✧",
  },
  {
    id: "air-canvas",
    name: "Air Canvas",
    blurb:
      "Draw in the air with hand tracking — paint with gesture-controlled brushes.",
    stack: ["Python", "OpenCV", "NumPy"],
    href: "https://github.com/vedjr02/Air-Canvas",
    emoji: "◈",
  },
  {
    id: "portfolio",
    name: "This portfolio",
    blurb:
      "The site you're reading. Next.js + Tailwind + Motion.",
    stack: ["Next.js", "Tailwind", "Motion"],
    href: "https://github.com/vedjr02/Portfolio-Website",
    emoji: "✺",
  },
];
