import { github } from "./profile";

/**
 * All 21 projects. One list feeds the Index clusters, the project table,
 * Quick Look, the SQL console and /cv. Copy carried over from the v2 site;
 * changes are listed in DECISIONS.md ("Content").
 */

export type ProjectGroup = "flagship" | "case" | "consulting" | "data" | "product" | "experiment";
export type ProjectStatus = "Live" | "In progress" | "Built";

/**
 * Scope tier drives cluster size in the Index. It is a classification of the
 * work itself, never a usage or traffic number:
 * 3 = shipped product with public releases, or a multi-module system
 * 2 = a full app with its own data layer, a sourced case study, or client work
 * 1 = a single-feature experiment
 */
export type ScopeTier = 1 | 2 | 3;

export type Project = {
  id: string;
  name: string;
  kind: string;
  group: ProjectGroup;
  summary: string;
  description: string;
  highlights: string[];
  stack: string[];
  date: string;
  /** yyyy-mm or yyyy-mm-dd, used for sorting */
  sort: string;
  status: ProjectStatus;
  scope: ScopeTier;
  /** Gets its own chapter or room on the home page */
  featured?: boolean;
  role?: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Why there is no public source link, when there isn't one */
  repoNote?: string;
  preview?: string;
};

export const groups: Record<ProjectGroup, { label: string; short: string }> = {
  flagship: { label: "Flagship", short: "Flagship" },
  case: { label: "Case studies", short: "Case" },
  consulting: { label: "Consulting", short: "Consulting" },
  data: { label: "Analytics & data", short: "Data" },
  product: { label: "Products", short: "Product" },
  experiment: { label: "Experiments", short: "Experiment" },
};

export const groupOrder: ProjectGroup[] = ["flagship", "case", "consulting", "data", "product", "experiment"];

export const projects: Project[] = [
  {
    id: "hold-my-code",
    name: "Hold My Code",
    kind: "macOS app",
    group: "flagship",
    summary: "Keeps a Mac awake while coding agents work, lid closed.",
    description:
      "A Swift menu bar app for people who leave Claude Code, Codex, Cursor and seven other agents running. It holds the Mac awake only while an agent is working, keeps it running with the lid closed, shows usage limits and cost in the panel, and updates itself in one click.",
    highlights: [
      "One-click updates with a What's New window",
      "Watches 10 coding agents through their own hooks",
      "Self-installing hooks and self-repairing helper",
    ],
    stack: ["Swift 6", "SwiftUI", "AppKit", "XPC"],
    date: "Sep 2026",
    sort: "2026-09-23",
    status: "Live",
    scope: 3,
    featured: true,
    role: "Solo: product, design, build, release",
    liveUrl: "https://holdmycode.xyz",
    repoUrl: github("Hold-My-Code/releases"),
    repoNote: "Source is private; releases are public.",
    preview: "/hmc/hero-laptop.webp",
  },
  {
    id: "codeshelf",
    name: "Codeshelf",
    kind: "Web app",
    group: "product",
    summary: "A project library that scores how recoverable each project is.",
    description:
      "Codeshelf scans a machine for coding projects, imports them into a searchable library and gives each one a Shelf Score from 0 to 100: is there a snapshot, a git remote, a README worth reading, a clean working tree. Every factor shows its score and the one action that would raise it. Local zip snapshots, restore-anywhere and a storage cleaner that only deletes what you tick.",
    highlights: [
      "Shelf Score built from five inspectable factors",
      "Smart Collections save the rule, not the list",
      "Storage scan across the whole library",
    ],
    stack: ["Next.js 16", "React 19", "Prisma", "PostgreSQL"],
    date: "Sep 2026",
    sort: "2026-09-18",
    status: "Live",
    scope: 3,
    liveUrl: "https://codeshelf-seven.vercel.app",
    repoUrl: github("Codeshelf"),
  },
  {
    id: "second-brain",
    name: "Second Brain",
    kind: "Telegram bot",
    group: "product",
    summary: "Forward notes, photos, voice and reels; ask about them later.",
    description:
      "A personal memory system that lives in Telegram. It classifies each message as a note, question, reminder or bookmark, runs OCR on photos, transcribes voice notes locally with Whisper, summarises reels from their keyframes, and answers questions only from what was saved. If nothing matches, it says so instead of guessing.",
    highlights: [
      "Answers grounded in saved messages, never invented",
      "Local OCR, Whisper and embeddings, so they cost nothing",
      "140 offline tests across routing, reminders and parsing",
    ],
    stack: ["Python", "FastAPI", "SQLite", "faster-whisper", "Kimi"],
    date: "Sep 2026",
    sort: "2026-09-18",
    status: "Built",
    scope: 3,
    repoUrl: github("Second-Brain"),
  },
  {
    id: "meridian",
    name: "Meridian",
    kind: "Process mining",
    group: "data",
    summary: "Rebuilds how a loan process really runs from 1.2 million events.",
    description:
      "Process mining on the BPI Challenge 2017 event log: 31,509 loan applications, 1,202,267 events, 26 activities. Meridian rebuilds the process as it actually runs, checks each case against a reference model, and finds the bottlenecks and rework. The mining, conformance checking and simulation are written by hand, not pulled from a library. Discovery and diagnosis are done; simulation and the ROI business case are next.",
    highlights: [
      "80% of cases follow 610 of 5,623 variants",
      "Token-replay conformance and bottleneck classification",
      "256 tests, including checks against the real log",
    ],
    stack: ["Python", "PostgreSQL", "FastAPI", "Next.js"],
    date: "Sep 2026",
    sort: "2026-09-13",
    status: "In progress",
    scope: 3,
    featured: true,
    repoUrl: github("Meridian"),
  },
  {
    id: "gridpeer",
    name: "GridPeer",
    kind: "Multi-agent simulation",
    group: "data",
    summary: "Households trade solar surplus with each other, not the grid.",
    description:
      "A simulated microgrid where household agents bid and sell energy to each other through a continuous double auction, measured against a plain export-to-grid baseline. Built on real Irish smart-meter data from the CER trial. A three-person team project; I own the orchestration loop, the outcomes dashboard and the demand and solar forecasting.",
    highlights: [
      "Real CER smart-meter data from Ireland",
      "Typed contracts keep four modules independent",
      "My modules: orchestration, dashboard, forecasting",
    ],
    stack: ["Python", "Pydantic", "LightGBM", "Streamlit"],
    date: "Sep 2026",
    sort: "2026-09-18",
    status: "In progress",
    scope: 3,
    role: "Team of 3: orchestration, dashboard, forecasting",
    repoUrl: github("Gridpeer"),
  },
  {
    id: "adflex",
    name: "AdFlex",
    kind: "Pricing dashboard",
    group: "consulting",
    summary: "Energy tariff scenarios for Sustainable Energy Ireland.",
    description:
      "My Master's consulting project with Sustainable Energy Ireland (SEI). I turn stakeholder requirements into a KPI framework and a Power BI and SQL pricing dashboard, so non-technical teams can compare tariffs and cost scenarios before they decide.",
    highlights: [
      "Requirements owned end to end",
      "KPIs agreed before any visual was built",
      "Scenarios made for non-technical decision makers",
    ],
    stack: ["Power BI", "SQL", "KPI modelling"],
    date: "2026",
    sort: "2026-09-01",
    status: "In progress",
    scope: 2,
    featured: true,
    liveUrl: "https://adflex-dynamic-prices-vedant.vercel.app/login",
    repoNote: "Client work; the repository is private.",
    preview: "/previews/adflex.jpg",
  },
  {
    id: "nvidia",
    name: "NVIDIA case study",
    kind: "Interactive case study",
    group: "case",
    summary: "How NVIDIA became the backbone of the AI economy.",
    description:
      "Traces NVIDIA from a gaming GPU company to a $5T AI infrastructure supplier, using only SEC filings, earnings releases and primary reporting. Four decisions across 20 years: the 2006 CUDA bet, the 2022 data-centre revenue crossover (six months before ChatGPT), the 2023 demand shock, and today's hyperscaler concentration risk. Claims that could not be sourced are logged as rejected.",
    highlights: ["68 sourced timeline events", "The data-centre crossover predates ChatGPT", "A public log of rejected claims"],
    stack: ["SEC filings", "Next.js", "Recharts"],
    date: "2026",
    sort: "2026-06",
    status: "Live",
    scope: 2,
    featured: true,
    liveUrl: "https://nvidia-case-study-ved.vercel.app/",
    repoUrl: github("Nvidia-Case-Study"),
    preview: "/previews/nvidia.jpg",
  },
  {
    id: "starbucks",
    name: "Starbucks case study",
    kind: "Business analytics case",
    group: "case",
    summary: "Three growth levers under the Back to Starbucks turnaround.",
    description:
      "Built from Starbucks' public filings (FY2025 to Q2 FY2026). Looks at the weak 3 to 5 PM daypart, Rewards economics (58% of U.S. company-operated tender, 34.2M active members) and product mix. The site lets you toggle each lever, break results down by store segment, and trace every number back to a named disclosure.",
    highlights: ["34.2M Rewards members, 58% of U.S. tender", "Toggleable strategic levers", "Every figure traced to a named disclosure"],
    stack: ["Excel", "Power BI", "Tableau", "Python", "Next.js"],
    date: "2026",
    sort: "2026-05",
    status: "Live",
    scope: 2,
    liveUrl: "https://starbucks-case-study-ved.vercel.app/",
    repoUrl: github("Starbucks-Analysis"),
    preview: "/previews/starbucks.jpg",
  },
  {
    id: "vcg",
    name: "Virtual Communication Gateway",
    kind: "Market strategy",
    group: "consulting",
    summary: "Go-to-market for an IEEE 2030.5 energy data gateway.",
    description:
      "Market strategy for a gateway that exchanges energy data securely over the IEEE 2030.5 protocol. I validated demand, drafted SaaS revenue models and ran feasibility analyses so the technical roadmap matched what the business could scale.",
    highlights: ["IEEE 2030.5 protocol context", "SaaS revenue model design", "Go-to-market validation"],
    stack: ["Market research", "SaaS modelling", "Feasibility"],
    date: "2026",
    sort: "2026-04",
    status: "In progress",
    scope: 2,
    repoUrl: github("virtual-gateway"),
    preview: "/previews/vcg.jpg",
  },
  {
    id: "retentioniq",
    name: "RetentionIQ",
    kind: "Product analytics",
    group: "data",
    summary: "Activation, funnel drop-off and retention cohorts.",
    description:
      "A product analytics dashboard. Event-level data goes into PostgreSQL, funnel conversion and feature adoption are aggregated in SQL, and every chart has a plain-English panel that says what it means.",
    highlights: ["Funnel drop-off and cohort retention", "Plain-English panel beside each chart", "SQL-first KPI aggregation"],
    stack: ["Next.js", "FastAPI", "PostgreSQL"],
    date: "2026",
    sort: "2026-03",
    status: "Live",
    scope: 2,
    liveUrl: "https://retention-iq-seven.vercel.app",
    repoUrl: github("RetentionIQ"),
    preview: "/previews/retentioniq.jpg",
  },
  {
    id: "insightpilot",
    name: "InsightPilot",
    kind: "AI analyst",
    group: "data",
    summary: "Ask a CSV questions, get charts with a visible reasoning trace.",
    description:
      "Upload a CSV or use the retail demo, ask in plain English, and get a chart-backed answer. The agent writes its own SQL, validates it, runs it read-only and shows each step it took.",
    highlights: ["Visible reasoning trace", "Read-only SQL agent loop", "Chart-backed answers"],
    stack: ["Next.js", "FastAPI", "Gemini", "Neon Postgres"],
    date: "2026",
    sort: "2026-03",
    status: "Live",
    scope: 2,
    liveUrl: "https://insightpilot-orpin.vercel.app",
    repoUrl: github("InsightPilot"),
    preview: "/previews/insightpilot.jpg",
  },
  {
    id: "votion",
    name: "Votion",
    kind: "Workspace app",
    group: "product",
    summary: "A Notion-style workspace with real-time sync.",
    description:
      "Nested documents, rich editing, real-time sync, soft delete with a trash, auth, file uploads and publishing pages to the web.",
    highlights: ["Real-time documents", "Soft delete and trash recovery", "Publish notes to the web"],
    stack: ["Next.js", "Convex", "Tailwind"],
    date: "2026",
    sort: "2026-02",
    status: "Live",
    scope: 2,
    liveUrl: "https://votion-ved.vercel.app",
    repoUrl: github("Votion"),
    preview: "/previews/votion.jpg",
  },
  {
    id: "lumen",
    name: "Lumen",
    kind: "BI dashboard",
    group: "data",
    summary: "Drop in a spreadsheet, get KPIs, anomalies and answers.",
    description:
      "Upload a CSV or Excel file and get KPIs, charts, anomaly flags and an assistant that answers questions about the file in plain English.",
    highlights: ["Automatic KPIs from uploads", "Anomaly flags on messy data", "Plain-English Q&A over the file"],
    stack: ["Next.js", "FastAPI", "Pandas", "Claude"],
    date: "2026",
    sort: "2026-02",
    status: "Built",
    scope: 2,
    repoUrl: github("AI-Business-Intelligence-Dashboard"),
    preview: "/previews/lumen.jpg",
  },
  {
    id: "pricesense",
    name: "PriceSense",
    kind: "Price intelligence",
    group: "data",
    summary: "Competitor price history and volatility from scheduled scrapes.",
    description:
      "Tracks competitor listings on a schedule and keeps their price history, so pricing calls rest on volatility and trend data instead of gut feel.",
    highlights: ["Price history per listing", "Volatility and market signals", "Sync checks on tracked products"],
    stack: ["Next.js", "Scraping", "Vercel"],
    date: "2026",
    sort: "2026-01",
    status: "Built",
    scope: 2,
    repoUrl: github("Competitor-Price-Intelligence-Engine"),
    preview: "/previews/pricesense.jpg",
  },
  {
    id: "diabetic-foot",
    name: "Diabetic foot detection",
    kind: "Research",
    group: "data",
    summary: "88% accuracy on 15,000+ thermal images; co-authored paper.",
    description:
      "A diagnostic pipeline that processes 15,000+ thermal images to catch early diabetic foot complications, reaching 88% accuracy with anomaly detection. I co-authored the paper on the clinical and business case for a non-invasive test.",
    highlights: ["15,000+ thermal images", "88% diagnostic accuracy", "Co-authored research paper"],
    stack: ["Python", "Anomaly detection"],
    date: "2025",
    sort: "2025-11",
    status: "Built",
    scope: 2,
  },
  {
    id: "smartbus",
    name: "Smart bus scheduling",
    kind: "Full-stack system",
    group: "product",
    summary: "Automated 90% of manual shift assignments.",
    description:
      "A scheduling and route management platform. It automated 90% of manual shift assignments and used the OSRM API for rerouting and a live fleet map.",
    highlights: ["90% of manual scheduling automated", "Dynamic rerouting via OSRM", "Live fleet map"],
    stack: ["Node.js", "Express", "MySQL", "Leaflet"],
    date: "2024",
    sort: "2024-12",
    status: "Built",
    scope: 2,
  },
  {
    id: "habitify",
    name: "Habitifyyy",
    kind: "iOS app",
    group: "experiment",
    summary: "Habit tracker with heatmaps and Pomodoro focus.",
    description: "A SwiftUI habit tracker with heatmaps, a Pomodoro timer and insights on streaks.",
    highlights: ["SwiftUI and MVVM", "Heatmaps", "Pomodoro focus"],
    stack: ["SwiftUI", "Swift"],
    date: "2025",
    sort: "2025-06",
    status: "Built",
    scope: 1,
    repoUrl: github("Habitifyyy"),
  },
  {
    id: "touchless",
    name: "Touchless Zoom",
    kind: "Computer vision",
    group: "experiment",
    summary: "Pinch the air to zoom the screen.",
    description: "Hand tracking turns a pinch in the air into zoom on screen.",
    highlights: ["MediaPipe hand tracking", "Gesture to zoom"],
    stack: ["Python", "OpenCV", "MediaPipe"],
    date: "2024",
    sort: "2024-06",
    status: "Built",
    scope: 1,
    repoUrl: github("Touchless-Zoom"),
  },
  {
    id: "air-canvas",
    name: "Air Canvas",
    kind: "Computer vision",
    group: "experiment",
    summary: "Draw in the air with hand gestures.",
    description: "Paint on screen with gesture-controlled brushes tracked from a webcam.",
    highlights: ["Gesture brushes", "Webcam tracking"],
    stack: ["Python", "OpenCV", "NumPy"],
    date: "2024",
    sort: "2024-05",
    status: "Built",
    scope: 1,
    repoUrl: github("Air-Canvas."),
  },
  {
    id: "neighbor",
    name: "Neighbor Swap Connect",
    kind: "Web app",
    group: "experiment",
    summary: "Neighbours swap items and services locally.",
    description: "A community marketplace for swapping items and services with people nearby.",
    highlights: ["Local listings", "Swap requests"],
    stack: ["React", "Vite", "TypeScript"],
    date: "2024",
    sort: "2024-04",
    status: "Built",
    scope: 1,
    repoNote: "The repository is private.",
  },
  {
    id: "photography",
    name: "Photography portfolio",
    kind: "Website",
    group: "experiment",
    summary: "Photo site with a click-speed game and leaderboard.",
    description: "A personal photo site with a click-speed mini game and a live leaderboard.",
    highlights: ["Live leaderboard", "Photo galleries"],
    stack: ["Node.js", "Express", "JavaScript"],
    date: "2023",
    sort: "2023-10",
    status: "Built",
    scope: 1,
    repoUrl: github("Photography-Portfolio"),
  },
];

export const projectById = (id: string) => projects.find((p) => p.id === id);
