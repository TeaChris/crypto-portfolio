import { useMemo } from 'react'
import { usePrices } from './usePrices'
import { usePortfolio } from './usePortfolio'
import type { SystemState, EnrichedAsset, PortfolioSummary } from '@/api/types'
import {
      calculateProfitLoss,
      calculateProfitLossPercentage,
      calculateTotalValue,
      calculateTotalCostBasis,
} from '@/utils/calculations'

/**
 * Critical hook that combines prices + portfolio data
 *
 * This hook handles all edge cases and prevents incorrect data display:
 * 1. Loading state - Either prices or portfolio loading
 * 2. Error state - Either prices or portfolio failed
 * 3. Empty state - Portfolio has no assets
 * 4. Partial state - Prices loaded but portfolio missing (or vice versa)
 * 5. Stale state - Data is older than threshold
 * 6. Ready state - All data fresh and available
 *
 * Key principle: NEVER show calculated P&L during transient states
 */
export const useDerivedPortfolio = (): SystemState => {
      const pricesQuery = usePrices()
      const portfolioQuery = usePortfolio()

      return useMemo(() => {
            // LOADING STATE: Either query is loading (initial fetch)
            if (pricesQuery.isLoading || portfolioQuery.isLoading) {
                  return { status: 'loading' }
            }

            // ERROR STATE: Either query failed
            if (pricesQuery.isError) {
                  return {
                        status: 'error',
                        error: pricesQuery.error,
                        canRetry: true,
                  }
            }

            if (portfolioQuery.isError) {
                  return {
                        status: 'error',
                        error: portfolioQuery.error,
                        canRetry: true,
                  }
            }

            // EMPTY STATE: Portfolio loaded but has no assets
            if (
                  portfolioQuery.data &&
                  portfolioQuery.data.assets.length === 0
            ) {
                  return { status: 'empty' }
            }

            // PARTIAL STATE: One data source missing
            // This prevents showing incorrect P&L when prices arrive before portfolio
            if (!pricesQuery.data || !portfolioQuery.data) {
                  if (portfolioQuery.data) {
                        return {
                              status: 'partial',
                              portfolio: portfolioQuery.data,
                              message: 'Waiting for price data...',
                        }
                  }
                  // This shouldn't happen given loading checks, but be defensive
                  return { status: 'loading' }
            }

            // At this point, we have BOTH prices and portfolio data
            const prices = pricesQuery.data
            const portfolio = portfolioQuery.data

            // Create a price lookup map for O(1) access
            const priceMap = new Map(prices.map((p) => [p.symbol, p]))

            // Calculate enriched assets with P&L
            const enrichedAssets: EnrichedAsset[] = portfolio.assets
                  .map((asset) => {
                        const priceData = priceMap.get(asset.symbol)

                        // Skip assets without price data (defensive)
                        if (!priceData) return null

                        const totalValue =
                              priceData.current_price * asset.quantity
                        const profitLoss = calculateProfitLoss(
                              totalValue,
                              asset.cost_basis,
                        )
                        const profitLossPercentage =
                              calculateProfitLossPercentage(
                                    totalValue,
                                    asset.cost_basis,
                              )

                        return {
                              symbol: asset.symbol,
                              name: priceData.name,
                              quantity: asset.quantity,
                              currentPrice: priceData.current_price,
                              totalValue,
                              costBasis: asset.cost_basis,
                              profitLoss,
                              profitLossPercentage,
                              priceChange24h: priceData.price_change_24h,
                              priceChangePercentage24h:
                                    priceData.price_change_percentage_24h,
                              lastUpdated: new Date(priceData.last_updated),
                        }
                  })
                  .filter((asset): asset is EnrichedAsset => asset !== null)

            // Calculate portfolio summary
            const totalValue = calculateTotalValue(enrichedAssets)
            const totalCostBasis = calculateTotalCostBasis(enrichedAssets)
            const totalProfitLoss = calculateProfitLoss(
                  totalValue,
                  totalCostBasis,
            )
            const totalProfitLossPercentage = calculateProfitLossPercentage(
                  totalValue,
                  totalCostBasis,
            )

            const summary: PortfolioSummary = {
                  totalValue,
                  totalCostBasis,
                  totalProfitLoss,
                  totalProfitLossPercentage,
                  lastUpdated: new Date(portfolio.last_updated),
            }

            // STALE STATE: Data is stale (older than staleTime threshold)
            // Show data but warn user it's not current
            if (pricesQuery.isStale || portfolioQuery.isStale) {
                  return {
                        status: 'stale',
                        data: enrichedAssets,
                        summary,
                        staleSince: new Date(),
                  }
            }

            // READY STATE: All data fresh and available
            return {
                  status: 'ready',
                  data: enrichedAssets,
                  summary,
            }
      }, [pricesQuery, portfolioQuery])
}
