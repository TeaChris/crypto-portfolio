import type { EnrichedAsset } from '@/api/types'

/**
 * Calculate total value of all assets
 * Pure function - no side effects
 */
export const calculateTotalValue = (assets: EnrichedAsset[]): number => {
      return assets.reduce((sum, asset) => sum + asset.totalValue, 0)
}

/**
 * Calculate total cost basis across all assets
 */
export const calculateTotalCostBasis = (assets: EnrichedAsset[]): number => {
      return assets.reduce((sum, asset) => sum + asset.costBasis, 0)
}

/**
 * Calculate absolute profit/loss
 */
export const calculateProfitLoss = (
      currentValue: number,
      costBasis: number,
): number => {
      return currentValue - costBasis
}

/**
 * Calculate percentage profit/loss
 * Returns value between -100 and Infinity (e.g., 50 for 50% gain)
 */
export const calculateProfitLossPercentage = (
      currentValue: number,
      costBasis: number,
): number => {
      if (costBasis === 0) return 0
      return ((currentValue - costBasis) / costBasis) * 100
}

/**
 * Calculate 24h price change percentage
 */
export const calculatePriceChangePercentage = (
      current: number,
      change: number,
): number => {
      const previous = current - change
      if (previous === 0) return 0
      return (change / previous) * 100
}

/**
 * Round to 2 decimal places
 */
export const roundToTwo = (num: number): number => {
      return Math.round(num * 100) / 100
}

/**
 * Safe division that returns 0 if denominator is 0
 */
export const safeDivide = (numerator: number, denominator: number): number => {
      return denominator === 0 ? 0 : numerator / denominator
}
