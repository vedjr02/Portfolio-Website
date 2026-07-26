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
    "Detail-oriented Business Analyst with a Bachelor's in Information Technology and a Master's in Business Analytics. I translate complex datasets into actionable business insights — building dashboards, modeling KPIs, and bridging the gap between technical execution and business scalability.",
  story:
    "I started in engineering because I liked how a clean query could change what a team believed about its own business. That curiosity carried me through Information Technology into a Master's in Business Analytics at Maynooth University. Along the way I've shipped full-stack systems, authored research on non-invasive diagnostics, and built dashboards that help non-technical stakeholders see the story inside the numbers. Now I'm looking for Business Analyst roles where evidence beats opinion.",
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
  },
  {
    id: "enershare",
    title: "Tariff Analysis Dashboard",
    category: "EnerShare — Business Consulting",
    period: "May 2026 — Present",
    description:
      "End-to-end Tariff Analysis Dashboard evaluating energy pricing structures and time-of-use tariffs. Defined KPI frameworks, translated stakeholder requirements into analytical models, and built interactive visualizations that turn cost-impact scenarios into clear narratives for non-technical stakeholders.",
    tags: ["Power BI", "SQL", "KPI Modeling", "Stakeholder Mgmt"],
    highlights: [
      "Personalized tariff recommendation engine",
      "Cost-impact scenario visualization",
      "Cross-functional requirement gathering",
    ],
    status: "In Progress",
    tier: "consulting",
    accent: "from-white/10 to-white/5",
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
  },
  {
    id: "synthetic-orders",
    title: "Thane Surge — Q-Commerce SLA Engine",
    category: "Logistics Intelligence · Synthetic Orders",
    period: "2025",
    description:
      "10-minute grocery delivery surge pricing and SLA prediction engine for Thane, Mumbai. Simulates ~21,500 orders/day across 37 dark stores on real OSM roads, predicts ETA and 10-minute SLA risk, and raises surge multipliers when rain, rush hour, or rider scarcity spike delivery risk.",
    tags: ["Python", "ML", "OSMnx", "Surge Pricing", "SLA"],
    highlights: [
      "~300k synthetic deliveries simulated",
      "37 dark stores across Thane",
      "SLA risk → surge pricing loop",
    ],
    status: "Completed",
    tier: "product",
    accent: "from-white/10 to-white/5",
    repoUrl: "https://github.com/vedjr02/Synthetic-Orders",
    metric: { value: 300, suffix: "k", label: "Synthetic deliveries modeled" },
  },
  {
    id: "votion",
    title: "Votion",
    category: "Full-stack Workspace",
    period: "2025",
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

export const impactStats = [
  { value: 68, suffix: "", label: "Sourced NVIDIA timeline events", decimals: 0 },
  { value: 34.2, suffix: "M", label: "Starbucks Rewards members scoped", decimals: 1 },
  { value: 88, suffix: "%", label: "Diagnostic model accuracy", decimals: 0 },
  { value: 90, suffix: "%", label: "Manual scheduling automated", decimals: 0 },
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
    id: "lumen",
    name: "Lumen — AI BI Dashboard",
    blurb:
      "Drop a CSV, get auto KPIs, gradient charts, anomaly flags and Claude-powered Q&A.",
    stack: ["Next.js", "FastAPI", "Claude", "Pandas"],
    href: "https://github.com/vedjr02/AI-Business-Intelligence-Dashboard",
    emoji: "✦",
  },
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
      "The site you're reading. Next.js + Tailwind + Motion + GSAP over a WebGL shader.",
    stack: ["Next.js", "Tailwind", "GSAP", "Three.js"],
    href: "https://github.com/vedjr02/Portfolio-Website",
    emoji: "✺",
  },
];
