export const profile = {
  name: "Vedant Ambre",
  firstName: "Vedant",
  lastName: "Ambre",
  title: "Business Analyst",
  altTitle: "Data Analyst",
  tagline: "Currently living in Ireland",
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
    "I grew up in Mumbai, fascinated by how a single line of SQL could change the way a business saw itself. That curiosity carried me through an engineering degree in Information Technology and on to Maynooth University in Ireland, where I'm finishing my Master's in Business Analytics. Along the way I've shipped full-stack systems, authored a research paper on non-invasive diagnostics, and built dashboards that help non-technical stakeholders see the story inside the numbers. Now I'm heading back home to turn data into decisions for ambitious teams.",
};

export type Project = {
  id: string;
  title: string;
  category: string;
  period: string;
  description: string;
  tags: string[];
  highlights: string[];
  status: "Live" | "In Progress" | "Completed";
  accent: string;
};

export const projects: Project[] = [
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
    accent: "from-sky-300/30 to-indigo-400/10",
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
    accent: "from-sky-300/30 to-indigo-400/10",
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
    accent: "from-emerald-300/30 to-teal-400/10",
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
    accent: "from-fuchsia-300/30 to-purple-400/10",
  },
];

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
  frameworks: ["Node.js", "Express", "MySQL", "Git", "Leaflet.js"],
  competencies: [
    "Business Intelligence",
    "Data Analytics",
    "Dashboard Development",
    "Market Research",
    "Requirement Gathering",
    "KPI Modeling",
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
    degree: "B.E. Information Technology",
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
