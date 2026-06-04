export type MarketKey = "All" | "Asia" | "Canada" | "SLGS" | "US" | "Other"

export type PocCard = {
  name: string
  desc: string
  status: string
  statusColor: string
  market: MarketKey
  tech: string
  partner: string
}

export const BUSINESS_IMPACT_LABELS: Record<string, { label: string; color: string }> = {
  Asia: { label: "Asia", color: "#ECAB23" },
  Canada: { label: "Canada", color: "#0E5665" },
  SLGS: { label: "SLGS", color: "#F8D56A" },
  US: { label: "US", color: "#E85D75" },
  Other: { label: "PH, ID & Global", color: "#4ECDC4" },
}

export const STATUS_COLORS: Record<string, string> = {
  "In Production": "#0E5665",
  "Scaling into Production": "#4ECDC4",
  "Prototyping": "#F8D56A",
  "Exploration": "#E85D75",
  "Bookshelf": "#ECAB23",
  "Showcase": "#A29BFE",
}

export const POCS: PocCard[] = [
  // === Asia (22) ===
  { name: "Competetion Report Summarization", desc: "Leverage Gen AI to create summary reports for competition analysis.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "Gen AI", partner: "In-house" },
  { name: "Co-Browsing Tool", desc: "AI-powered co-browsing for real-time client assistance across channels.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "AI/ML - Conversational", partner: "UnBlu" },
  { name: "Conversational AI Platform", desc: "NLP-driven conversational platform for automated messaging interactions.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "AI/ML - NLP", partner: "TBD" },
  { name: "Data Extraction (EOI) - Computer Vision", desc: "AI-enabled vision tech for extracting data from expression of interest forms.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "AI/ML - Computer Vision", partner: "Staple.Ai" },
  { name: "Health Risk Score & Wellness Platform", desc: "Facial analytics platform for health risk scoring and wellness assessment.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "AI/ML - Facial Analytics", partner: "Binah.Ai" },
  { name: "Human Hub", desc: "Low-code platform connecting teams for collaborative innovation delivery.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "Low Code Platform", partner: "Capiot/Persistent" },
  { name: "Messaging Hub", desc: "Unified messaging gateway for multi-channel customer communication.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "ChatBot", partner: "Whatsapp" },
  { name: "NLP For Data Analytics", desc: "Natural language processing layer for conversational data querying.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "NLP", partner: "TBD" },
  { name: "Operational Data Hub", desc: "Centralized data platform unifying operational data across Asia markets.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "Low Code Platform", partner: "Persistent Technologies" },
  { name: "Predictive AI Investment Models", desc: "ML models for predictive investment analytics and portfolio optimization.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "AI/ML", partner: "MdotM" },
  { name: "Sun Concierge", desc: "Humanoid talkbot for customer service and query resolution.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "AI/ML - NLP", partner: "Wiz.Ai" },
  { name: "Sun ID", desc: "Speech recognition and biometric identity verification system.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "AI/ML - Speech Recognition", partner: "Phonexia, Daon" },
  { name: "Triaging of ATG using Gen AI", desc: "Gen AI for identifying and classifying ATG submission types from process documents.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "AI", partner: "In-house" },
  { name: "Data Commentary Generator", desc: "Automated generation of data narratives and commentary from datasets.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Asia", tech: "Gen AI", partner: "In-house" },
  { name: "e-Visiting Card", desc: "Digital visiting card platform for client-facing teams.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "Asia", tech: "Web App", partner: "In-house" },
  { name: "Advisor Social Tool", desc: "Social media management tool for financial advisors.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "Asia", tech: "Java", partner: "In-house" },
  { name: "Document Management (Hyland)", desc: "Enterprise content management system for document lifecycle.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "Asia", tech: "ECM", partner: "SLGSP (Hyland)" },
  { name: "E-KYC (Onfido)", desc: "Electronic customer verification with automated identity document processing.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "Asia", tech: "AI/ML - Facial Analytics", partner: "Onfido" },
  { name: "Fastrack Business Insights (Denodo)", desc: "Data virtualization layer unifying siloed sources for faster business intelligence.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "Asia", tech: "AI/ML", partner: "Denodo" },
  { name: "Metaverse (Moot-up)", desc: "Immersive metaverse platform for virtual events and engagement.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "Asia", tech: "Metaverse", partner: "MootUp" },
  { name: "Sun Canvas", desc: "Visual planning and project canvas tool for teams.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "Asia", tech: "Zoom SDK", partner: "In-house" },
  { name: "Video Generation using Gen AI (Synthesia)", desc: "AI-powered video generation for training and communication content.", status: "Scaling into Production", statusColor: STATUS_COLORS["Scaling into Production"], market: "Asia", tech: "Gen AI", partner: "Synthesia" },

  // === Canada (10) ===
  { name: "Accessibility For Visually Impaired Clients", desc: "Python-based accessibility tools for visually impaired client interfaces.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Canada", tech: "Python", partner: "In-house" },
  { name: "Asset Tokenization On Block Chain", desc: "Blockchain experiment for asset tokenization and new business model exploration.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Canada", tech: "Blockchain", partner: "Vertalo" },
  { name: "Claim Form Transformation – IVR", desc: "Computer vision for transforming claim forms through interactive voice response.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Canada", tech: "AI/ML - Computer Vision", partner: "Findability Sciences" },
  { name: "Knowledge Management - Q&A Search", desc: "Gen AI search over internal documents to speed up knowledge discovery.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Canada", tech: "Gen AI", partner: "In-house" },
  { name: "Privacy Incident Management Tool", desc: "Enterprise tracking platform for managing privacy incidents and compliance.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Canada", tech: "Enterprise Platform", partner: "JIRA" },
  { name: "CSR Automation", desc: "Automates customer service request handling to reduce repetitive manual work.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "Canada", tech: "Python", partner: "In-house" },
  { name: "Transfer Express - Dealer Ops", desc: "Gen AI assistant for dealer operations transfer processing.", status: "Prototyping", statusColor: STATUS_COLORS["Prototyping"], market: "Canada", tech: "Gen AI", partner: "In-house" },
  { name: "Knowledge Management - GenAI Interviewer", desc: "AI-powered interviewer for knowledge extraction and documentation.", status: "Scaling into Production", statusColor: STATUS_COLORS["Scaling into Production"], market: "Canada", tech: "Gen AI", partner: "In-house" },
  { name: "Advisor Bot for Dealer Ops", desc: "Gen AI chatbot assisting dealer operations advisors with queries.", status: "Prototyping", statusColor: STATUS_COLORS["Prototyping"], market: "Canada", tech: "Gen AI", partner: "In-house" },
  { name: "Advisor Bot for Retail Advisory", desc: "Gen AI assistant for retail advisory teams.", status: "Prototyping", statusColor: STATUS_COLORS["Prototyping"], market: "Canada", tech: "Gen AI", partner: "In-house" },

  // === SLGS (8) ===
  { name: "Sentiment Analysis", desc: "AI/ML model for analyzing customer sentiment from interactions.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "SLGS", tech: "AI/ML", partner: "In-house" },
  { name: "PII Anonymizer", desc: "Utility tool for anonymizing personally identifiable information in datasets.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "SLGS", tech: "Utility", partner: "In-house" },
  { name: "Automating RCA for IFRS 17 Database Issues", desc: "Gen AI for automating root cause analysis of IFRS 17 database issues.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "SLGS", tech: "Gen AI", partner: "In-house" },
  { name: "Compliance Audit Preparation", desc: "Agentic AI for preparing and pre-assessing compliance audit materials.", status: "Exploration", statusColor: STATUS_COLORS["Exploration"], market: "SLGS", tech: "Agentic AI", partner: "In-house" },
  { name: "Testing & Monitoring Report Automation", desc: "Gen AI automation for generating testing and monitoring reports.", status: "Prototyping", statusColor: STATUS_COLORS["Prototyping"], market: "SLGS", tech: "Gen AI", partner: "In-house" },
  { name: "Conversational BI", desc: "Natural language interface for business intelligence queries.", status: "Prototyping", statusColor: STATUS_COLORS["Prototyping"], market: "SLGS", tech: "Gen AI", partner: "In-house" },
  { name: "Invoice Processing Automation", desc: "OCR/ICR-based automation for invoice data extraction and processing.", status: "Prototyping", statusColor: STATUS_COLORS["Prototyping"], market: "SLGS", tech: "OCR/ICR", partner: "BDO" },
  { name: "Generating Financial Report Using GenAI", desc: "Gen AI for automated financial report generation.", status: "Scaling into Production", statusColor: STATUS_COLORS["Scaling into Production"], market: "SLGS", tech: "Gen AI", partner: "In-house" },

  // === US (3) ===
  { name: "Medical Documents Summarization", desc: "AI summarization of medical documents for faster claims processing.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "US", tech: "AI", partner: "Digital Owl" },
  { name: "PACRAT", desc: "Political Action Committee Research Analysis Tool for regulatory compliance.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "US", tech: "API/Python", partner: "In-house" },
  { name: "Audio Analytics - Pinnacle Care", desc: "AI-powered call analytics for advisor coaching and contact-center quality assurance.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "US", tech: "Gen AI", partner: "In-house" },

  // === Other (8) ===
  { name: "Gen AI Investment News Search", desc: "Gen AI-powered search for investment news and market intelligence.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Other", tech: "Gen AI", partner: "In-house" },
  { name: "Medical Documents Translation", desc: "Translation service for medical documents across international hubs.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Other", tech: "TBD", partner: "TBD" },
  { name: "Wysa Mental Wellness (Ideation Winner)", desc: "AI-enabled 24/7 mental health platform offering stress, burnout and resilience support — rolled out to ~5K Sun Life employees as a 1-year pilot.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "Other", tech: "AI/ML", partner: "Wysa" },
  { name: "Rookie PH Advisor (pgVector)", desc: "AI advisor assistant using pgVector pattern for Philippines market.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "Asia", tech: "AI/ML", partner: "In-house" },
  { name: "Indonesia Speech-to-Text", desc: "Speech-to-text solution for Bahasa Indonesia customer interactions.", status: "Showcase", statusColor: STATUS_COLORS["Showcase"], market: "Asia", tech: "Gen AI", partner: "In-house" },
  { name: "Third Party Risk Identification using AI", desc: "AI-powered identification and assessment of third-party security risks.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Other", tech: "AI/ML", partner: "In-house" },
  { name: "Hyper Personalization for Financial Planning", desc: "AI-driven hyper personalization engine for tailored financial planning experiences.", status: "Prototyping", statusColor: STATUS_COLORS["Prototyping"], market: "Other", tech: "Gen AI", partner: "In-house" },
  { name: "SEO Chatbot for Digital Marketing", desc: "Gen AI chatbot for SEO optimization and digital marketing content generation.", status: "Prototyping", statusColor: STATUS_COLORS["Prototyping"], market: "Asia", tech: "Gen AI", partner: "In-house" },
]

// --- Derived metrics (computed from POCS) ---
const _totalPocs = POCS.length
const _inProduction = POCS.filter(p => p.status === "In Production").length
const _prototyping = POCS.filter(p => p.status === "Prototyping").length
const _scaling = POCS.filter(p => p.status === "Scaling into Production").length
const _activePocs = _prototyping + _scaling
const _bookshelf = POCS.filter(p => p.status === "Bookshelf").length
const _markets = new Set(POCS.map(p => p.market)).size
const _genAi = POCS.filter(p => p.tech === "Gen AI").length

export const METRICS = [
  { value: _totalPocs, label: "POCs Executed", suffix: "+", color: "#ECAB23" },
  { value: _inProduction, label: "In Production", suffix: "", color: "#0E5665" },
  { value: _activePocs, label: "Active POCs", suffix: "", color: "#4ECDC4" },
  { value: 22, label: "Adoption Rate", suffix: "%", color: "#E85D75" },
  { value: 40, label: "Startup Partners", suffix: "+", color: "#F8D56A" },
  { value: _markets, label: "Markets", suffix: "", color: "#A29BFE" },
]

export const IMPACT_HIGHLIGHTS = [
  { value: "CAD 100K", label: "Innovation Success Fee", desc: "First blockchain asset tokenization POC", icon: "trophy" },
  { value: "CAD 360M+", label: "Fraud Prevention", desc: "60+ high-value claims flagged in HK (each ≥ CAD 6M)", icon: "shield" },
  { value: "$1.3 Million", label: "Expected Value", desc: "Expected from Canada Dealer Initiatives", icon: "clock" },
  { value: "$100,000", label: "Operational Value", desc: "Call agent productivity gain per year", icon: "trending-up" },
]

export const IDEA_TO_IMPACT = [
  { year: "2020", name: "Sun Canvas", market: "Asia", desc: "Business continuity for advisors during COVID" },
  { year: "2021", name: "E-KYC (Onfido)", market: "Asia", desc: "Client onboarding & curbing fraudulent documents" },
  { year: "2022", name: "Metaverse (MootUp)", market: "Asia", desc: "1st VR-enabled philanthropic week & recruitment" },
  { year: "2023", name: "Fastrack Insights (Denodo)", market: "Asia", desc: "Data virtualization for Asia Data Backbone" },
  { year: "2023", name: "Document Mgmt (Hyland)", market: "Asia", desc: "Enterprise content management replacing IBM Filenet" },
  { year: "2024", name: "PH Rookie Advisor", market: "Asia", desc: "GenAI chatbot reducing query wait from days to seconds" },
  { year: "2024", name: "Advisor Social (DCM)", market: "Asia", desc: "Digital content marketing for Vietnam advisors" },
  { year: "2024", name: "CSR Automation", market: "Canada", desc: "Fixing data mismatch eliminating ~100 man-years of work" },
  { year: "2024", name: "PACRAT", market: "US", desc: "Real-time political funding insights for strategic decisions" },
  { year: "2024", name: "e-Business Card", market: "Asia", desc: "Seamless contact sharing, reducing paper usage" },
  { year: "2025", name: "Wysa Mental Wellness", market: "SLGS", desc: "24/7 AI mental health for ~5K employees" },
  { year: "2026", name: "Audio Analytics – Pinnacle Care", market: "US", desc: "Real-time call analytics saving 1,080 hours ($100K)" },
]

export const PARTNERSHIPS = {
  startups: { count: "40+", examples: ["Onfido", "Synthesia", "Wysa", "Denodo", "MootUp", "Vertalo", "Wiz.Ai", "Binah.Ai", "Staple.Ai"] },
  accelerators: { count: "4", examples: ["Accenture Fintech Lab", "Tracxn", "VC Partners", "Angel Investors"] },
  academia: { count: "3+", examples: ["IIT Madras – Diabetes early detection", "IIT Indore", "IIT Delhi"] },
  enterprise: { count: "10+", examples: ["AWS", "Hyland", "JIRA", "BDO", "Persistent Technologies"] },
}

export const CULTURE_METRICS = [
  { value: "7-8", label: "Ideation Drives / Year", icon: "lightbulb" },
  { value: "35%", label: "POCs Built Internally", icon: "users" },
  { value: "1,500+", label: "Employees Engaged", icon: "heart" },
]

export const FRAMEWORK_STAGES = [
  {
    title: "Solution Scan",
    subtitle: "Ideas Funnel & Prioritization",
    who: "Region / BU / Accelerators / Academia / IH",
    question: "What should we experiment with?",
    activities: ["Ideas & Opportunities", "Market research & sensing", "Problem statements"],
    color: "#ECAB23",
  },
  {
    title: "Design & Prototyping",
    subtitle: "Exploration / Prototyping",
    who: "IH +/- Partners",
    question: "How do we bring it to life?",
    activities: ["IH Sandbox environment", "Rapid prototyping", "Partner co-creation"],
    color: "#4ECDC4",
  },
  {
    title: "Business Validation",
    subtitle: "Prioritization",
    who: "Innovation Hub",
    question: "How should we prioritize?",
    activities: ["Strategic business impact", "Feasibility assessment", "Competitive edge analysis"],
    color: "#0E5665",
  },
  {
    title: "Scale for Enterprise",
    subtitle: "Scaling for Enterprise",
    who: "SLGS Delivery / Vendor Partner",
    question: "How do we scale the prototype?",
    activities: ["Secure business sponsorship", "IT/Delivery handoff", "Knowledge transfer"],
    color: "#E85D75",
  },
]

export const FRAMEWORK_GUARDRAILS = ["Risk & Compliance", "Infosec", "Legal", "PIA"]

export const FRAMEWORK_OUTPUTS = [
  { label: "Strategic Project", funded: "BU funded" },
  { label: "Product Marketplace", funded: "SLGS funded" },
]

export const GUIDING_PRINCIPLES = [
  { title: "End User Impact", desc: "# of clients, advisors, or employees impacted", icon: "users", color: "#ECAB23" },
  { title: "Differentiation", desc: "Uniqueness and superiority in functionality", icon: "sparkles", color: "#4ECDC4" },
  { title: "Feasibility", desc: "Practicability, tech feasibility & alignment to platform principles", icon: "check-circle", color: "#0E5665" },
  { title: "Branding & PR", desc: "Potential intangible benefits and PR appeal", icon: "megaphone", color: "#A29BFE" },
  { title: "Legal & Compliance", desc: "Legal and compliance considerations", icon: "shield", color: "#E85D75" },
  { title: "Brand Alignment", desc: "Alignment to Sun Life brand positioning and purpose", icon: "target", color: "#F8D56A" },
]

export const FUTURE_ROADMAP = [
  { title: "Scaling Agentic AI", desc: "Across core workflows — operations, claims, underwriting, and financial processes" },
  { title: "Reusable AI Patterns", desc: "Moving from POCs to deployable AI patterns across markets" },
  { title: "Business-Sponsored Innovation", desc: "Markets pull solutions into production — deepening demand-led innovation" },
  { title: "Ecosystem Expansion", desc: "Earlier startup access, deeper academic collaboration" },
  { title: "AI Governance & Trust", desc: "Ensuring enterprise-grade deployment with responsible AI practices" },
]

export const BUSINESS_IMPACT = Object.entries(
  POCS.reduce<Record<string, number>>((acc, p) => {
    acc[p.market] = (acc[p.market] || 0) + 1
    return acc
  }, {})
).filter(([k]) => k !== "All").map(([market, value]) => ({
  label: BUSINESS_IMPACT_LABELS[market]?.label ?? market,
  value,
  color: BUSINESS_IMPACT_LABELS[market]?.color ?? "#999",
}))

export const TREND_BADGES = [
  { label: "Portfolio scaled from 2020 foundation to 51+ POCs", value: "growth", tone: "#0E5665" },
  { label: `${_activePocs} POCs actively in prototyping or scaling`, value: "active", tone: "#ECAB23" },
  { label: `Gen AI leads the portfolio with ${_genAi} POCs`, value: "GenAI", tone: "#F8D56A" },
]

export const TICKER_ITEMS = [
  `${_inProduction} POCs in production across Sun Life markets`,
  `${_activePocs} POCs active — in prototyping or scaling to production`,
  `${_totalPocs}+ POCs executed since 2020 across the innovation pipeline`,
  `40+ startup partners engaged for speed and agility`,
]

export const FUN_FACTS = [
  { text: `${_genAi} out of ${_totalPocs} POCs executed use Gen AI — the single biggest tech stream in SLGS Innovation.`, highlight: "Gen AI = #1 stream" },
  { text: "Our team recently supported AET 2026 by showcasing an AI agent platform for business users.", highlight: "AET 2026" },
  { text: "IH team members support Asia GenAI Spoke, Canada GenAI Spoke, and Corp GenAI Spoke. We work closely with the GenAI COE.", highlight: "GenAI Spokes" },
  { text: "IH Workload account has been used by 50+ teams for experimentation.", highlight: "50+ teams enabled" },
  { text: "Our team also supported AMM 2026 showcasing agentic workflows to Sun Life leadership.", highlight: "AMM 2026" },
  { text: "IH team has conducted agentic AI trainings for 300+ SLGS employees.", highlight: "300+ trained" },
  { text: "We support the global AI4EA program, AI4SLGS program, and have representation in Sun Life's Responsible AI Committee.", highlight: "Responsible AI" },
  { text: "We set up Innovation showcase demo booths in Philippines during the APFC Women's Mission.", highlight: "APFC Philippines" },
  { text: "We have leveraged smart college engineering interns for bringing out-of-the-box thinking to our POCs.", highlight: "Intern talent" },
  { text: "E-KYC with Onfido reduced customer onboarding time by automating identity document verification in Asia.", highlight: "Faster KYC" },
  { text: `The SLGS Innovation Hub started in 2020 — from a small experiment to ${_totalPocs}+ POCs executed in 6 years.`, highlight: "6 years of growth" },
  { text: `${_activePocs} POCs are currently active — in prototyping or scaling into production.`, highlight: `${_activePocs} active now` },
  { text: `${_inProduction} POCs are live in production today, serving multiple Sun Life markets.`, highlight: `${_inProduction} in production` },
  { text: "We have an ideation platform for hosting ideation challenges accessible to all Sun Life employees.", highlight: "Ideation platform" },
]
