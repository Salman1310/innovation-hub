import { NextResponse } from "next/server"
import Parser from "rss-parser"
import https from "https"
import { NEWS_SOURCES } from "@/lib/sources"
import type { NewsArticle, NewsApiResponse } from "@/lib/types"

// Allow corporate SSL inspection proxies
const agent = new https.Agent({ rejectUnauthorized: false })

const parser = new Parser({
  timeout: 10000,
  headers: { "User-Agent": "NewsRadar/1.0 RSS Reader" },
  requestOptions: { agent },
})

// Simple in-memory cache: 3 min TTL
let cache: { data: NewsApiResponse; ts: number } | null = null
const CACHE_TTL = 3 * 60 * 1000

export async function GET() {
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json(cache.data, {
      headers: { "X-Cache": "HIT", "Cache-Control": "public, max-age=180" },
    })
  }

  const results = await Promise.allSettled(
    NEWS_SOURCES.map(async (source) => {
      // One automatic retry on transient failures (e.g. malformed XML response)
      let feed
      try {
        feed = await parser.parseURL(source.rssUrl)
      } catch {
        await new Promise((r) => setTimeout(r, 800))
        feed = await parser.parseURL(source.rssUrl)
      }
      return (feed.items ?? []).map((item, i): NewsArticle => ({
        id: `${source.id}-${item.guid ?? item.link ?? i}`,
        title: item.title?.trim() ?? "Untitled",
        url: item.link ?? "",
        sourceId: source.id,
        sourceName: source.name,
        category: source.category,
        pubDate: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
        location: source.location,
        city: source.city,
        description: item.contentSnippet?.slice(0, 200),
      }))
    })
  )

  const articles: NewsArticle[] = []
  const sourceErrors: string[] = []

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      articles.push(...result.value)
    } else {
      sourceErrors.push(NEWS_SOURCES[i].id)
    }
  })

  // Sort newest first
  articles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

  const data: NewsApiResponse = {
    articles,
    fetchedAt: new Date().toISOString(),
    sourceErrors,
  }

  cache = { data, ts: Date.now() }

  return NextResponse.json(data, {
    headers: { "X-Cache": "MISS", "Cache-Control": "public, max-age=180" },
  })
}
