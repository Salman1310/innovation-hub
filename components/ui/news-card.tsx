"use client"

import { formatDistanceToNow } from "date-fns"
import type { NewsArticle } from "@/lib/types"

interface NewsCardProps {
  article: NewsArticle
  isHighlighted?: boolean
}

export function NewsCard({ article, isHighlighted }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.pubDate), { addSuffix: true })
  const isAI = article.category === "AI"

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      style={{ textDecoration: "none" }}
    >
      <div
        className="p-4 rounded-xl border transition-all duration-200"
        style={{
          background: isHighlighted ? "#EBF5F7" : "var(--sl-white)",
          borderColor: isHighlighted ? "var(--sl-teal)" : "#0E5665",
          boxShadow: "0 1px 3px rgba(14,56,70,0.06)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement
          el.style.boxShadow = "0 4px 14px rgba(14,56,70,0.14)"
          el.style.transform = "translateY(-1px)"
          el.style.borderColor = isHighlighted ? "var(--sl-teal)" : "#0E5665"
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement
          el.style.boxShadow = "0 1px 3px rgba(14,56,70,0.06)"
          el.style.transform = "translateY(0)"
          el.style.borderColor = isHighlighted ? "var(--sl-teal)" : "#0E5665"
        }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            {/* Category + source row */}
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                style={{
                  background: isAI ? "var(--sl-teal)" : "var(--sl-yellow)",
                  color: isAI ? "var(--sl-white)" : "var(--sl-navy)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {article.category}
              </span>
              <span
                className="text-[11px] font-medium truncate"
                style={{ color: "var(--sl-muted)", fontFamily: "var(--font-body)" }}
              >
                {article.sourceName}
              </span>
            </div>

            {/* Headline */}
            <h3
              className="text-sm leading-snug line-clamp-2 transition-colors"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--sl-navy)",
                fontWeight: 400,
              }}
            >
              {article.title}
            </h3>

            {/* Description */}
            {article.description && (
              <p
                className="text-xs mt-1 line-clamp-2 leading-relaxed"
                style={{ color: "var(--sl-muted)", fontFamily: "var(--font-body)" }}
              >
                {article.description}
              </p>
            )}
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center gap-2 mt-2.5">
          <span className="text-[10px]" style={{ color: "#0E5665", fontFamily: "var(--font-body)" }}>
            {article.city}
          </span>
          <span style={{ color: "#C9D4D8" }}>·</span>
          <span className="text-[10px]" style={{ color: "#0E5665", fontFamily: "var(--font-body)" }}>
            {timeAgo}
          </span>
          {isHighlighted && (
            <>
              <span style={{ color: "#C9D4D8" }}>·</span>
              <span
                className="flex items-center gap-1 text-[10px] font-semibold"
                style={{ color: "var(--sl-teal)", fontFamily: "var(--font-body)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "var(--sl-teal)" }}
                />
                New
              </span>
            </>
          )}
        </div>
      </div>
    </a>
  )
}
