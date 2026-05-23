"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { GlobeLive } from "./cobe-globe-live"
import { NewsFeed } from "./news-feed"
import { NEWS_SOURCES } from "@/lib/sources"
import type { NewsArticle, NewsApiResponse } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

const REFRESH_INTERVAL = 3 * 60 * 1000

export function NewsRadar() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [newArticleIds, setNewArticleIds] = useState<Set<string>>(new Set())
  const [newBannerCount, setNewBannerCount] = useState(0)
  const [activeTab, setActiveTab] = useState<"live" | "archive">("live")
  const [focusedSourceId, setFocusedSourceId] = useState<string | null>(null)
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)
  const [sourceErrors, setSourceErrors] = useState<string[]>([])
  const knownIdsRef = useRef<Set<string>>(new Set())
  const nextRefreshRef = useRef<NodeJS.Timeout | null>(null)

  const fetchNews = useCallback(async (isBackground = false) => {
    try {
      const res = await fetch("/api/news", { cache: "no-store" })
      const data: NewsApiResponse = await res.json()
      const incoming = data.articles
      const freshIds = new Set<string>()

      if (isBackground && knownIdsRef.current.size > 0) {
        for (const a of incoming) {
          if (!knownIdsRef.current.has(a.id)) freshIds.add(a.id)
        }
        if (freshIds.size > 0) {
          setNewBannerCount(freshIds.size)
          setNewArticleIds(freshIds)
          setTimeout(() => setNewArticleIds(new Set()), 30000)
        }
      }

      knownIdsRef.current = new Set(incoming.map((a) => a.id))
      setArticles(incoming)
      setFetchedAt(new Date(data.fetchedAt))
      setSourceErrors(data.sourceErrors)
    } catch {
      // silently fail on background refresh
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchNews(false) }, [fetchNews])

  useEffect(() => {
    nextRefreshRef.current = setInterval(() => fetchNews(true), REFRESH_INTERVAL)
    return () => { if (nextRefreshRef.current) clearInterval(nextRefreshRef.current) }
  }, [fetchNews])

  const handleManualRefresh = () => { setNewBannerCount(0); fetchNews(false) }

  const handleSourceClick = (sourceId: string) => {
    setFocusedSourceId((prev) => (prev === sourceId ? null : sourceId))
    setActiveTab("live")
  }

  const liveCount = articles.filter(
    (a) => Date.now() - new Date(a.pubDate).getTime() < 24 * 60 * 60 * 1000
  ).length

  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--sl-cream)", color: "var(--sl-text)" }}>

      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-3 border-b"
        style={{ background: "var(--sl-navy)", borderColor: "var(--sl-navy-dark)" }}
      >
        <div className="flex items-center gap-3">
          {/* Sun Life yellow accent bar + wordmark */}
          <div
            className="w-1 h-8 rounded-full"
            style={{ background: "var(--sl-yellow)" }}
          />
          <div>
            <h1
              className="text-base leading-none tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--sl-white)" }}
            >
              News Radar
            </h1>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--sl-yellow-light)", fontFamily: "var(--font-body)" }}>
              AI &amp; Insurance · Global Live Feed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Live pill */}
          <div
            className="flex items-center gap-2 rounded-full px-3 py-1.5 border"
            style={{ background: "rgba(14,86,101,0.5)", borderColor: "var(--sl-teal)" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--sl-yellow)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--sl-yellow-light)", fontFamily: "var(--font-body)" }}>
              {liveCount} live articles
            </span>
          </div>

          {/* Last updated */}
          {fetchedAt && (
            <span className="text-xs hidden sm:block" style={{ color: "var(--sl-muted)", fontFamily: "var(--font-body)" }}>
              Updated {formatDistanceToNow(fetchedAt, { addSuffix: true })}
            </span>
          )}

          {/* Refresh */}
          <button
            onClick={handleManualRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs rounded-lg px-3 py-1.5 border transition-all disabled:opacity-50"
            style={{
              color: "var(--sl-yellow-light)",
              borderColor: "rgba(236,171,35,0.4)",
              background: "transparent",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(236,171,35,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <svg className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </header>

      {/* New articles banner */}
      {newBannerCount > 0 && (
        <div
          className="flex items-center justify-center gap-2 py-2 text-xs font-semibold cursor-pointer transition-colors border-b"
          style={{ background: "var(--sl-yellow)", color: "var(--sl-navy)", borderColor: "var(--sl-yellow-light)", fontFamily: "var(--font-body)" }}
          onClick={() => { setNewBannerCount(0); setActiveTab("live") }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sl-yellow-light)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--sl-yellow)")}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--sl-navy)" }} />
          {newBannerCount} new article{newBannerCount !== 1 ? "s" : ""} arrived · Click to view
        </div>
      )}

      {/* Source errors */}
      {sourceErrors.length > 0 && (
        <div
          className="px-6 py-1.5 text-xs border-b"
          style={{ background: "#FFF3CD", color: "#7A5300", borderColor: "#F8D56A", fontFamily: "var(--font-body)" }}
        >
          ⚠ Could not fetch:{" "}
          {sourceErrors.map((id) => NEWS_SOURCES.find((s) => s.id === id)?.name ?? id).join(", ")}
        </div>
      )}

      {/* Main */}
      <main className="flex-1 flex overflow-hidden">

        {/* Globe panel */}
        <div
          className="w-1/2 flex flex-col items-center justify-center p-8"
          style={{ background: "linear-gradient(to right, #FFF8E1 0%, #F8E8A8 100%)" }}
        >
          {focusedSourceId && (
            <div className="mb-4 flex items-center gap-2 text-sm" style={{ color: "var(--sl-muted)", fontFamily: "var(--font-body)" }}>
              <span>
                Showing:{" "}
                <strong style={{ color: "var(--sl-navy)" }}>
                  {NEWS_SOURCES.find((s) => s.id === focusedSourceId)?.name}
                </strong>
              </span>
              <button
                onClick={() => setFocusedSourceId(null)}
                className="text-xs underline"
                style={{ color: "var(--sl-teal)" }}
              >
                Clear
              </button>
            </div>
          )}

          <div className="w-full max-w-md aspect-square relative">
            {loading ? (
              <div
                className="w-full h-full rounded-full animate-pulse flex items-center justify-center"
                style={{ background: "#C9D8DC" }}
              >
                <span className="text-sm" style={{ color: "var(--sl-muted)", fontFamily: "var(--font-body)" }}>Loading globe...</span>
              </div>
            ) : (
              <GlobeLive
                articles={articles}
                sources={NEWS_SOURCES}
                onSourceClick={handleSourceClick}
                className="w-full h-full"
              />
            )}
          </div>

          <p className="mt-4 text-xs text-center" style={{ color: "var(--sl-muted)", fontFamily: "var(--font-body)" }}>
            Markers show sources with articles in the last 24h · Drag to rotate
          </p>
        </div>

        {/* Feed panel */}
        <div className="w-1/2 flex flex-col p-6 overflow-hidden" style={{ background: "linear-gradient(to right, #F8E8A8 0%, #FFF8E1 100%)" }}>
          <NewsFeed
            articles={articles}
            newArticleIds={newArticleIds}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            focusedSourceId={focusedSourceId}
          />
        </div>
      </main>
    </div>
  )
}
