import type { Category } from "./sources"

export interface NewsArticle {
  id: string
  title: string
  url: string
  sourceId: string
  sourceName: string
  category: Category
  pubDate: string // ISO string
  location: [number, number]
  city: string
  description?: string
}

export interface NewsApiResponse {
  articles: NewsArticle[]
  fetchedAt: string
  sourceErrors: string[]
}
