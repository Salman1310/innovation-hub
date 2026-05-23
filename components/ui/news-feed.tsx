"use client"

import { useState, useMemo } from "react"
import type { NewsArticle } from "@/lib/types"
import { NewsCard } from "./news-card"

interface NewsFeedProps {
  articles: NewsArticle[]
  newArticleIds: Set<string>
  activeTab: "live" | "archive"
  onTabChange: (tab: "live" | "archive") => void
  focusedSourceId: string | null
}

type Filter = "All" | "AI" | "Insurance"

export function NewsFeed({ articles, newArticleIds, activeTab, onTabChange, focusedSourceId }: NewsFeedProps) {
  const [filter, setFilter] = useState<Filter>("All")
  const cutoff = Date.now() - 24 * 60 * 60 * 1000

  const liveArticles = useMemo(
    () => articles.filter((a) => new Date(a.pubDate).getTime() > cutoff),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [articles]
  )
  const archiveArticles = useMemo(
    () => articles.filter((a) => new Date(a.pubDate).getTime() <= cutoff),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [articles]
  )

  const sourceArticles = activeTab === "live" ? liveArticles : archiveArticles
  const filtered = useMemo(() => {
    let list = filter === "All" ? sourceArticles : sourceArticles.filter((a) => a.category === filter)
    if (focusedSourceId) list = list.filter((a) => a.sourceId === focusedSourceId)
    return list
  }, [sourceArticles, filter, focusedSourceId])

  const filters: Filter[] = ["All", "AI", "Insurance"]

  return (
    <div className="flex flex-col h-full">

      {/* Tab bar */}
      <div
        className="flex items-center gap-1 p-1 rounded-xl mb-4"
        style={{ background: "#DDE6E9" }}
      >
        {(["live", "archive"] as const).map((tab) => {
          const isActive = activeTab === tab
          const count = tab === "live" ? liveArticles.length : archiveArticles.length
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm transition-all"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: isActive ? 600 : 400,
                background: isActive ? "var(--sl-white)" : "transparent",
                color: isActive ? "var(--sl-navy)" : "var(--sl-muted)",
                boxShadow: isActive ? "0 1px 3px rgba(14,56,70,0.12)" : "none",
              }}
            >
              {tab === "live" && (
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: isActive ? "var(--sl-teal)" : "var(--sl-muted)" }}
                />
              )}
              {tab === "live" ? "Live (24h)" : "Archive"}
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: isActive
                    ? tab === "live" ? "var(--sl-navy)" : "#DDE6E9"
                    : "#C9D4D8",
                  color: isActive
                    ? tab === "live" ? "var(--sl-yellow-light)" : "var(--sl-muted)"
                    : "var(--sl-muted)",
                }}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 mb-4">
        {filters.map((f) => {
          const isActive = filter === f
          let activeBg = "var(--sl-navy)"
          let activeColor = "var(--sl-white)"
          if (f === "AI") { activeBg = "var(--sl-teal)"; activeColor = "var(--sl-white)" }
          if (f === "Insurance") { activeBg = "var(--sl-yellow)"; activeColor = "var(--sl-navy)" }

          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1 rounded-full text-xs border transition-all"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: isActive ? 700 : 400,
                background: isActive ? activeBg : "var(--sl-white)",
                color: isActive ? activeColor : "var(--sl-muted)",
                borderColor: isActive ? activeBg : "#C9D4D8",
              }}
            >
              {f}
            </button>
          )
        })}
        {focusedSourceId && (
          <span className="ml-auto text-[11px] font-medium" style={{ color: "var(--sl-teal)", fontFamily: "var(--font-body)" }}>
            Filtered by source
          </span>
        )}
      </div>

      {/* Article list */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40" style={{ color: "var(--sl-muted)" }}>
            <span className="text-3xl mb-2">📡</span>
            <span className="text-sm" style={{ fontFamily: "var(--font-body)" }}>No articles found</span>
          </div>
        ) : (
          filtered.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              isHighlighted={newArticleIds.has(article.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
