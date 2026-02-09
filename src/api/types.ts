// API Response Types
export interface PriceData {
      id: string
      symbol: string
      name: string
      current_price: number
      price_change_24h: number
      price_change_percentage_24h: number
      last_updated: string
}

export interface PortfolioAsset {
      symbol: string
      quantity: number
      cost_basis: number // Total amount paid for this asset
}

export interface PortfolioResponse {
      assets: PortfolioAsset[]
      last_updated: string
}

// Derived Types (calculated from raw API data)
export interface EnrichedAsset {
      symbol: string
      name: string
      quantity: number
      currentPrice: number
      totalValue: number
      costBasis: number
      profitLoss: number
      profitLossPercentage: number
      priceChange24h: number
      priceChangePercentage24h: number
      lastUpdated: Date
}

export interface PortfolioSummary {
      totalValue: number
      totalCostBasis: number
      totalProfitLoss: number
      totalProfitLossPercentage: number
      lastUpdated: Date
}

// System State Types
export type SystemState =
      | { status: 'loading' }
      | { status: 'error'; error: Error; canRetry: boolean }
      | { status: 'empty' }
      | { status: 'partial'; portfolio: PortfolioResponse; message: string }
      | {
              status: 'stale'
              data: EnrichedAsset[]
              summary: PortfolioSummary
              staleSince: Date
        }
      | { status: 'ready'; data: EnrichedAsset[]; summary: PortfolioSummary }
