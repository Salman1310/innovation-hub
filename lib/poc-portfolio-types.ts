export type GlobeCoordinates = [number, number]

export interface PortfolioStageTotal {
  stage: string
  count: number
  color: string
}

export interface PortfolioMarketSummary {
  marketId: string
  label: string
  total: number
  location: GlobeCoordinates
  rawMarkets: string[]
  stageBreakdown: PortfolioStageTotal[]
}

export interface PortfolioStageMarker {
  id: string
  marketId: string
  marketLabel: string
  stage: string
  count: number
  color: string
  location: GlobeCoordinates
  marketTotal: number
  rawMarkets: string[]
  samplePocs: string[]
  stageBreakdown: PortfolioStageTotal[]
}

export interface PortfolioGlobeResponse {
  workbookName: string
  syncedAt: string
  totalActivePocs: number
  droppedPocs: number
  marketCount: number
  markets: PortfolioMarketSummary[]
  stageTotals: PortfolioStageTotal[]
  markers: PortfolioStageMarker[]
}