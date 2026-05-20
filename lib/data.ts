import type { TeamMember } from "@/components/ui/testimonial"

export type FilterKey = "All" | "AI-ML" | "Web3" | "Data" | "Infra"

export type PocCard = {
  name: string
  desc: string
  status: string
  statusColor: string
  unit: string
  tech: string[]
  impact: string
  category: Exclude<FilterKey, "All">
  featured?: boolean
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Sachin Mathur",
    role: "Innovation Team Leader",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    description:
      "Guiding the Innovation Hub vision and helping the team turn promising ideas into practical enterprise impact.",
  },
  {
    id: 2,
    name: "Prashant Agarwal",
    role: "Principal Solution Designer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    description:
      "Designing solution paths that connect business problems, emerging technology, and scalable delivery patterns.",
  },
  {
    id: 3,
    name: "Shelza Jindal",
    role: "Innovation Hub Owner",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    description:
      "Leading high-impact Gen AI and automation POCs from intake through production readiness.",
  },
  {
    id: 4,
    name: "Karthik Ramadurai",
    role: "Innovation Hub Owner",
    avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&h=150&fit=crop&crop=face",
    description:
      "Scaling AI, analytics, and workflow modernization concepts across multiple markets.",
  },
  {
    id: 5,
    name: "Chandan Singh",
    role: "Innovation Hub Owner",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    description:
      "Supporting emerging technology experiments and cross-functional delivery momentum.",
  },
]

export const METRICS = [
  { value: 80, label: "Total POCs", suffix: "", color: "#6c5ce7" },
  { value: 12, label: "In Production", suffix: "", color: "#00cec9" },
  { value: 6, label: "Prototyping", suffix: "", color: "#a29bfe" },
  { value: 8, label: "Markets", suffix: "", color: "#fd79a8" },
  { value: 5, label: "Core Leaders", suffix: "", color: "#fdcb6e" },
  { value: 8, label: "Tech Streams", suffix: "+", color: "#00cec9" },
]

export const STATUS_BREAKDOWN = [
  { label: "Live", value: 12, color: "#00cec9" },
  { label: "In Review", value: 4, color: "#fdcb6e" },
  { label: "Building", value: 7, color: "#a29bfe" },
  { label: "Completed", value: 26, color: "#6c5ce7" },
]

export const BUSINESS_IMPACT = [
  { label: "Asia", value: 29, color: "#6c5ce7" },
  { label: "Canada / CAN", value: 15, color: "#00cec9" },
  { label: "SLGS", value: 13, color: "#fd79a8" },
  { label: "US Ops", value: 4, color: "#fdcb6e" },
  { label: "Other Markets", value: 19, color: "#a29bfe" },
]

export const ACTIVITY_HEATMAP = [
  { label: "2021", values: [3, 1, 0, 0] },
  { label: "2022", values: [6, 1, 0, 2] },
  { label: "2023", values: [8, 2, 0, 1] },
  { label: "2024", values: [10, 9, 2, 0] },
  { label: "2025", values: [4, 5, 0, 0] },
  { label: "2026", values: [0, 1, 0, 0] },
]

export const POCS: PocCard[] = [
  {
    name: "Audio Analytics - Pinnacle Care",
    desc: "AI-powered call analytics for advisor coaching and contact-center quality assurance.",
    status: "Production",
    statusColor: "#00cec9",
    unit: "US Pinnacle Care",
    tech: ["AI/ML", "NLP", "Python"],
    impact: "Live in production",
    category: "AI-ML",
    featured: true,
  },
  {
    name: "E-KYC with Onfido",
    desc: "Electronic customer verification with automated identity document processing.",
    status: "Production",
    statusColor: "#00cec9",
    unit: "Singapore",
    tech: ["Computer Vision", "AI/ML"],
    impact: "Faster onboarding",
    category: "AI-ML",
  },
  {
    name: "CSR Automation",
    desc: "Automates customer service request handling to reduce repetitive manual work.",
    status: "Production",
    statusColor: "#00cec9",
    unit: "Asia",
    tech: ["Gen AI", "Python"],
    impact: "60% less manual work",
    category: "AI-ML",
  },
  {
    name: "Fastrack Business Insights",
    desc: "Data virtualization layer unifying siloed sources for faster business intelligence.",
    status: "Production",
    statusColor: "#00cec9",
    unit: "Asia",
    tech: ["Denodo", "Data", "Python"],
    impact: "Real-time BI",
    category: "Data",
  },
  {
    name: "Asset Tokenization",
    desc: "Blockchain experiment for asset tokenization and new business model exploration.",
    status: "Completed",
    statusColor: "#6c5ce7",
    unit: "CAN",
    tech: ["Blockchain", "Web3"],
    impact: "New model validated",
    category: "Web3",
  },
  {
    name: "Knowledge Management Q&A",
    desc: "Gen AI search over internal documents to speed up knowledge discovery.",
    status: "Bookshelf",
    statusColor: "#a29bfe",
    unit: "CAN",
    tech: ["Gen AI", "RAG"],
    impact: "Productivity lift",
    category: "AI-ML",
  },
  {
    name: "Sun Canvas",
    desc: "Solar energy planning and visualization tool for sustainable infrastructure projects.",
    status: "Production",
    statusColor: "#00cec9",
    unit: "Asia",
    tech: ["Computer Vision", "Python"],
    impact: "Green planning",
    category: "Data",
  },
  {
    name: "Low Code Data API Platform",
    desc: "Reusable platform for exposing governed data APIs across teams.",
    status: "Bookshelf",
    statusColor: "#a29bfe",
    unit: "Asia",
    tech: ["API", "Platform"],
    impact: "Reusable infra",
    category: "Infra",
  },
  {
    name: "Agentic AI Evaluation",
    desc: "Exploration of autonomous workflow agents for complex operational tasks.",
    status: "Prototyping",
    statusColor: "#fdcb6e",
    unit: "SLGS",
    tech: ["Agentic AI", "Automation"],
    impact: "Next-gen workflow",
    category: "AI-ML",
  },
]

export const TREND_BADGES = [
  { label: "Portfolio scaled from a 2020 team foundation", value: "up", tone: "#00cec9" },
  { label: "15 active production-scale signals", value: "live", tone: "#6c5ce7" },
  { label: "Gen AI leads the portfolio", value: "27", tone: "#fd79a8" },
]

export const TICKER_ITEMS = [
  "Live pulse: 12 POCs in production",
  "Pipeline: 6 prototypes currently shaping up",
  "Portfolio: 80 POCs tracked across the innovation pipeline",
  "Leadership: Sachin Mathur and Prashant Agarwal shaping the innovation path",
]

export const FUN_FACTS = [
  { text: "27 out of 80 POCs in our portfolio use Gen AI — making it the single biggest tech stream in Innovation Hub.", highlight: "Gen AI = #1 stream" },
  { text: "Audio Analytics for Pinnacle Care went from idea to production in under 12 weeks, now live across US contact centres.", highlight: "12-week sprint" },
  { text: "Our POCs span 8 markets — Asia, Canada, US, Philippines, Singapore, HK, Indonesia, and SLGS.", highlight: "8 markets reached" },
  { text: "29 POCs were explored and dropped — that's how we learn fast. Only the best ideas survive to production.", highlight: "29 smart failures" },
  { text: "Asset Tokenization was our first Blockchain POC — validating new business models for the Canada market.", highlight: "Web3 experiment" },
  { text: "Shelza Jindal, Karthik Ramadurai, and Chandan Singh together own the majority of the active portfolio.", highlight: "3 IH owners" },
  { text: "E-KYC with Onfido reduced customer onboarding time by automating identity document verification in Singapore.", highlight: "Faster KYC" },
  { text: "The Innovation Hub team started in 2020 — from a small experiment to 80 POCs tracked in 6 years.", highlight: "6 years of innovation" },
]
