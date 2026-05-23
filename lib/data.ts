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

export const METRICS = [
  { value: 49, label: "Total POCs", suffix: "", color: "#ECAB23" },
  { value: 12, label: "In Production", suffix: "", color: "#0E5665" },
  { value: 6, label: "Prototyping", suffix: "", color: "#F8D56A" },
  { value: 8, label: "Markets", suffix: "", color: "#F8D56A" },
]

export const BUSINESS_IMPACT = [
  { label: "Asia", value: 22, color: "#ECAB23" },
  { label: "Canada", value: 10, color: "#0E5665" },
  { label: "SLGS", value: 8, color: "#F8D56A" },
  { label: "US", value: 3, color: "#F8D56A" },
  { label: "Other Markets", value: 6, color: "#F8D56A" },
]

const STATUS_COLORS: Record<string, string> = {
  "In Production": "#0E5665",
  "Scaling into Production": "#0E5665",
  "Prototyping": "#F8D56A",
  "Exploration": "#F8D56A",
  "Bookshelf": "#ECAB23",
  "Showcase": "#ECAB23",
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

  // === Other (6) ===
  { name: "Gen AI Investment News Search", desc: "Gen AI-powered search for investment news and market intelligence.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Other", tech: "Gen AI", partner: "In-house" },
  { name: "Medical Documents Translation", desc: "Translation service for medical documents across international hubs.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Other", tech: "TBD", partner: "TBD" },
  { name: "Prevent & Manage Lifestyle Chronic Diseases", desc: "Platform for prevention and management of lifestyle chronic diseases.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "Other", tech: "TBD", partner: "TBD" },
  { name: "Rookie PH Advisor (pgVector)", desc: "AI advisor assistant using pgVector pattern for Philippines market.", status: "In Production", statusColor: STATUS_COLORS["In Production"], market: "Other", tech: "AI/ML", partner: "In-house" },
  { name: "Indonesia Speech-to-Text", desc: "Speech-to-text solution for Bahasa Indonesia customer interactions.", status: "Showcase", statusColor: STATUS_COLORS["Showcase"], market: "Other", tech: "Gen AI", partner: "In-house" },
  { name: "Third Party Risk Identification using AI", desc: "AI-powered identification and assessment of third-party security risks.", status: "Bookshelf", statusColor: STATUS_COLORS["Bookshelf"], market: "Other", tech: "AI/ML", partner: "In-house" },
]

export const TREND_BADGES = [
  { label: "Portfolio scaled from a 2020 team foundation", value: "up", tone: "#0E5665" },
  { label: "15 active production-scale signals", value: "live", tone: "#ECAB23" },
  { label: "Gen AI leads the portfolio", value: "16", tone: "#F8D56A" },
]

export const TICKER_ITEMS = [
  "Live pulse: 12 POCs in production",
  "Pipeline: 6 prototypes currently shaping up",
  "Portfolio: 49 active POCs across the innovation pipeline",
  "Scaling: 3 POCs moving from prototype to production",
]

export const FUN_FACTS = [
  { text: "16 out of 49 active POCs in our portfolio use Gen AI — making it the single biggest tech stream in SLGS Innovation.", highlight: "Gen AI = #1 stream" },
  { text: "Audio Analytics for Pinnacle Care went from idea to production in under 12 weeks, now live across US contact centres.", highlight: "12-week sprint" },
  { text: "Our POCs span 8 markets — Asia, Canada, US, Philippines, Singapore, HK, Indonesia, and SLGS.", highlight: "8 markets reached" },
  { text: "Asset Tokenization was our first Blockchain POC — validating new business models for the Canada market.", highlight: "Web3 experiment" },
  { text: "E-KYC with Onfido reduced customer onboarding time by automating identity document verification in Singapore.", highlight: "Faster KYC" },
  { text: "The SLGS Innovation team started in 2020 — from a small experiment to 49 active POCs tracked in 6 years.", highlight: "6 years of innovation" },
  { text: "3 POCs are currently scaling from prototype into full production — the next wave of enterprise impact.", highlight: "Scaling up" },
  { text: "12 POCs are live in production today, delivering real business value across multiple markets.", highlight: "12 live & counting" },
]
