export type Category = "AI" | "Insurance"

export interface NewsSource {
  id: string
  name: string
  rssUrl: string
  category: Category
  location: [number, number] // [lat, lng]
  city: string
}

export const NEWS_SOURCES: NewsSource[] = [
  // AI Sources
  {
    id: "mit-tech-review",
    name: "MIT Tech Review",
    rssUrl: "https://www.technologyreview.com/feed/",
    category: "AI",
    location: [42.36, -71.1],
    city: "Cambridge, MA",
  },
  {
    id: "venturebeat",
    name: "VentureBeat",
    rssUrl: "https://venturebeat.com/category/ai/feed/",
    category: "AI",
    location: [37.78, -122.41],
    city: "San Francisco",
  },
  {
    id: "techcrunch",
    name: "TechCrunch",
    rssUrl: "https://techcrunch.com/category/artificial-intelligence/feed/",
    category: "AI",
    location: [37.77, -122.42],
    city: "San Francisco",
  },
  {
    id: "the-verge",
    name: "The Verge",
    rssUrl: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    category: "AI",
    location: [40.71, -74.01],
    city: "New York",
  },
  {
    id: "wired",
    name: "Wired",
    rssUrl: "https://www.wired.com/feed/tag/ai/latest/rss",
    category: "AI",
    location: [37.76, -122.43],
    city: "San Francisco",
  },
  {
    id: "ai-news",
    name: "AI News",
    rssUrl: "https://artificialintelligence-news.com/feed/",
    category: "AI",
    location: [51.51, -0.13],
    city: "London",
  },
  // Insurance Sources
  {
    id: "insurance-journal",
    name: "Insurance Journal",
    rssUrl: "https://www.insurancejournal.com/rss/",
    category: "Insurance",
    location: [32.72, -117.15],
    city: "San Diego",
  },
  {
    id: "coverager",
    name: "Coverager",
    rssUrl: "https://coverager.com/feed/",
    category: "Insurance",
    location: [40.75, -73.99],
    city: "New York",
  },
  {
    id: "carrier-management",
    name: "Carrier Management",
    rssUrl: "https://carriermanagement.com/feed/",
    category: "Insurance",
    location: [40.73, -74.0],
    city: "New York",
  },
  {
    id: "artemis",
    name: "Artemis",
    rssUrl: "https://www.artemis.bm/feed/",
    category: "Insurance",
    location: [32.3, -64.75],
    city: "Bermuda",
  },
]
