import { promises as fs } from "fs"
import path from "path"
import * as XLSX from "xlsx"
import { STATUS_COLORS } from "@/lib/data"
import type {
  GlobeCoordinates,
  PortfolioGlobeResponse,
  PortfolioMarketSummary,
  PortfolioStageMarker,
  PortfolioStageTotal,
} from "@/lib/poc-portfolio-types"

type WorkbookCell = string | number | boolean | null | undefined
type WorkbookRow = Record<string, WorkbookCell>

interface MarketConfig {
  id: string
  label: string
  center: GlobeCoordinates
}

interface StageBucket {
  count: number
  color: string
  samplePocs: string[]
}

interface MarketBucket {
  config: MarketConfig
  total: number
  rawMarkets: Set<string>
  stages: Map<string, StageBucket>
}

const WORKBOOK_NAME = "Innovation Hub - PoC Update 1.xlsx"
const DETAIL_SHEET_NAME = "PoC Details"

const STATUS_ORDER = [
  "In Production",
  "Scaling into Production",
  "Prototyping",
  "Exploration",
  "Bookshelf",
  "Showcase",
] as const

const STATUS_ALIASES: Record<string, string> = {
  "Being Scaled up for MVP": "Scaling into Production",
}

const MARKET_MARKER_OFFSETS: GlobeCoordinates[] = [
  [0, 0],
  [3.2, 4.4],
  [-3.6, 4.2],
  [4.8, -4.8],
  [-4.8, -4.4],
  [0, 6.2],
  [0, -6.2],
]

const DEFAULT_MARKET: MarketConfig = {
  id: "global-other",
  label: "Global / Other",
  center: [51.5074, -0.1278],
}

const MARKET_RULES: Array<{ test: (rawMarket: string) => boolean; config: MarketConfig }> = [
  {
    test: (rawMarket) => /indonesia/i.test(rawMarket),
    config: { id: "indonesia", label: "Indonesia", center: [-6.2088, 106.8456] },
  },
  {
    test: (rawMarket) => /philippines/i.test(rawMarket),
    config: { id: "philippines", label: "Philippines", center: [14.5995, 120.9842] },
  },
  {
    test: (rawMarket) => /\bCAN\b|\bCanada\b|SLGS CAN Ops|CCC - CAN|CAN Market/i.test(rawMarket),
    config: { id: "canada", label: "Canada", center: [43.6532, -79.3832] },
  },
  {
    test: (rawMarket) => /\bUS\b|Pinnacle Care|Member Serv|Strategy Team/i.test(rawMarket),
    config: { id: "us", label: "US", center: [42.3601, -71.0589] },
  },
  {
    test: (rawMarket) => /\bAsia\b|SLC Asia|ABSLI|Singapore|HK|Hong Kong/i.test(rawMarket),
    config: { id: "asia", label: "Asia", center: [1.3521, 103.8198] },
  },
  {
    test: (rawMarket) => /SLGS|India|Global Security/i.test(rawMarket),
    config: { id: "slgs-india", label: "SLGS India", center: [28.4595, 77.0266] },
  },
]

let cache: { mtimeMs: number; data: PortfolioGlobeResponse } | null = null

function asText(value: WorkbookCell) {
  return String(value ?? "").trim()
}

function normalizeStage(stage: string) {
  return STATUS_ALIASES[stage] ?? stage
}

function getStageColor(stage: string) {
  return STATUS_COLORS[stage] ?? "#7F98A1"
}

function resolveMarket(rawMarket: string): MarketConfig {
  const trimmedMarket = rawMarket.trim()

  for (const rule of MARKET_RULES) {
    if (rule.test(trimmedMarket)) {
      return rule.config
    }
  }

  return DEFAULT_MARKET
}

function sortStageTotals(stageTotals: PortfolioStageTotal[]) {
  return [...stageTotals].sort((left, right) => {
    const leftIndex = STATUS_ORDER.indexOf(left.stage as (typeof STATUS_ORDER)[number])
    const rightIndex = STATUS_ORDER.indexOf(right.stage as (typeof STATUS_ORDER)[number])
    const safeLeftIndex = leftIndex === -1 ? STATUS_ORDER.length : leftIndex
    const safeRightIndex = rightIndex === -1 ? STATUS_ORDER.length : rightIndex

    if (safeLeftIndex !== safeRightIndex) {
      return safeLeftIndex - safeRightIndex
    }

    if (right.count !== left.count) {
      return right.count - left.count
    }

    return left.stage.localeCompare(right.stage)
  })
}

async function loadWorkbookRows(workbookPath: string) {
  const workbookBuffer = await fs.readFile(workbookPath)
  const workbook = XLSX.read(workbookBuffer, {
    type: "buffer",
    cellDates: false,
  })
  const detailSheetName = workbook.SheetNames.find((sheetName) => sheetName.trim() === DETAIL_SHEET_NAME)

  if (!detailSheetName) {
    throw new Error(`Unable to find the \"${DETAIL_SHEET_NAME}\" sheet in ${WORKBOOK_NAME}.`)
  }

  const sheet = workbook.Sheets[detailSheetName]

  return XLSX.utils.sheet_to_json<WorkbookRow>(sheet, {
    range: 1,
    defval: "",
  })
}

function buildPortfolioData(rows: WorkbookRow[]): PortfolioGlobeResponse {
  const stageTotals = new Map<string, number>()
  const marketBuckets = new Map<string, MarketBucket>()

  let totalRows = 0
  let activeRows = 0

  for (const row of rows) {
    const pocName = asText(row["POC Name"])
    const rawStage = asText(row.Stage)

    if (!pocName || !rawStage) {
      continue
    }

    totalRows += 1

    const stage = normalizeStage(rawStage)
    if (stage === "Explored & Dropped") {
      continue
    }

    activeRows += 1

    const rawMarket = asText(row.Market) || "Unspecified"
    const market = resolveMarket(rawMarket)
    const stageColor = getStageColor(stage)

    stageTotals.set(stage, (stageTotals.get(stage) ?? 0) + 1)

    const marketBucket = marketBuckets.get(market.id) ?? {
      config: market,
      total: 0,
      rawMarkets: new Set<string>(),
      stages: new Map<string, StageBucket>(),
    }

    marketBucket.total += 1
    marketBucket.rawMarkets.add(rawMarket)

    const stageBucket = marketBucket.stages.get(stage) ?? {
      count: 0,
      color: stageColor,
      samplePocs: [],
    }

    stageBucket.count += 1
    if (stageBucket.samplePocs.length < 3) {
      stageBucket.samplePocs.push(pocName)
    }

    marketBucket.stages.set(stage, stageBucket)
    marketBuckets.set(market.id, marketBucket)
  }

  const stageTotalsList = sortStageTotals(
    Array.from(stageTotals.entries()).map(([stage, count]) => ({
      stage,
      count,
      color: getStageColor(stage),
    }))
  )

  const markets = Array.from(marketBuckets.values())
    .map<PortfolioMarketSummary>((marketBucket) => {
      const stageBreakdown = sortStageTotals(
        Array.from(marketBucket.stages.entries()).map(([stage, bucket]) => ({
          stage,
          count: bucket.count,
          color: bucket.color,
        }))
      )

      return {
        marketId: marketBucket.config.id,
        label: marketBucket.config.label,
        total: marketBucket.total,
        location: marketBucket.config.center,
        rawMarkets: Array.from(marketBucket.rawMarkets).sort((left, right) => left.localeCompare(right)),
        stageBreakdown,
      }
    })
    .sort((left, right) => {
      if (right.total !== left.total) {
        return right.total - left.total
      }

      return left.label.localeCompare(right.label)
    })

  const markers: PortfolioStageMarker[] = []

  for (const market of markets) {
    const marketBucket = marketBuckets.get(market.marketId)
    if (!marketBucket) {
      continue
    }

    market.stageBreakdown.forEach((stageTotal, index) => {
      const stageBucket = marketBucket.stages.get(stageTotal.stage)
      if (!stageBucket) {
        return
      }

      const [latOffset, lngOffset] = MARKET_MARKER_OFFSETS[index] ?? [0, 0]
      markers.push({
        id: `${market.marketId}-${stageTotal.stage}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
        marketId: market.marketId,
        marketLabel: market.label,
        stage: stageTotal.stage,
        count: stageTotal.count,
        color: stageTotal.color,
        location: [market.location[0] + latOffset, market.location[1] + lngOffset],
        marketTotal: market.total,
        rawMarkets: market.rawMarkets,
        samplePocs: stageBucket.samplePocs,
        stageBreakdown: market.stageBreakdown,
      })
    })
  }

  return {
    workbookName: WORKBOOK_NAME,
    syncedAt: new Date().toISOString(),
    totalActivePocs: activeRows,
    droppedPocs: totalRows - activeRows,
    marketCount: markets.length,
    markets,
    stageTotals: stageTotalsList,
    markers,
  }
}

export async function getPortfolioGlobeData() {
  const workbookPath = path.join(process.cwd(), WORKBOOK_NAME)
  const workbookStats = await fs.stat(workbookPath)

  if (cache && cache.mtimeMs === workbookStats.mtimeMs) {
    return cache.data
  }

  const rows = await loadWorkbookRows(workbookPath)
  const data = buildPortfolioData(rows)

  cache = {
    mtimeMs: workbookStats.mtimeMs,
    data,
  }

  return data
}