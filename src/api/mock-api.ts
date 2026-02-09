import type { PriceData, PortfolioResponse } from './types'

/**
 * Mock API implementation simulating CoinGecko API with realistic behavior:
 * - Random delays (500-1500ms)
 * - Occasional failures (10% rate)
 * - Price volatility simulation
 * - Realistic response structure
 */

// Supported cryptocurrencies
const SUPPORTED_COINS = ['bitcoin', 'ethereum', 'solana', 'cardano', 'polkadot']

// Base prices (simulated starting point)
const BASE_PRICES: Record<string, number> = {
      bitcoin: 45000,
      ethereum: 2400,
      solana: 98,
      cardano: 0.52,
      polkadot: 7.2,
}

// Simulate price volatility
const getVolatilePrice = (basePrice: number): number => {
      // Random change between -5% and +5%
      const changePercent = (Math.random() - 0.5) * 0.1
      return basePrice * (1 + changePercent)
}

// Simulate network delay
const delay = (ms: number): Promise<void> =>
      new Promise((resolve) => setTimeout(resolve, ms))

// Simulate random failures
const shouldFail = (): boolean => Math.random() < 0.1 // 10% failure rate

/**
 * Fetch current prices for all supported cryptocurrencies
 * Simulates CoinGecko /simple/price endpoint
 */
export const fetchPrices = async (): Promise<PriceData[]> => {
      // Random delay between 500-1500ms
      await delay(500 + Math.random() * 1000)

      // Simulate occasional failures
      if (shouldFail()) {
            throw new Error(
                  'Network error: Failed to fetch prices. Please try again.',
            )
      }

      const now = new Date().toISOString()

      return SUPPORTED_COINS.map((coin) => {
            const basePrice = BASE_PRICES[coin]
            const currentPrice = getVolatilePrice(basePrice)
            const change24h = currentPrice - basePrice
            const changePercent24h = (change24h / basePrice) * 100

            return {
                  id: coin,
                  symbol:
                        coin === 'bitcoin'
                              ? 'BTC'
                              : coin === 'ethereum'
                                ? 'ETH'
                                : coin === 'solana'
                                  ? 'SOL'
                                  : coin === 'cardano'
                                    ? 'ADA'
                                    : 'DOT',
                  name: coin.charAt(0).toUpperCase() + coin.slice(1),
                  current_price: currentPrice,
                  price_change_24h: change24h,
                  price_change_percentage_24h: changePercent24h,
                  last_updated: now,
            }
      })
}

/**
 * Fetch user's portfolio holdings
 * This would typically come from your backend
 */
export const fetchPortfolio = async (): Promise<PortfolioResponse> => {
      // Slightly longer delay to simulate backend call
      await delay(600 + Math.random() * 900)

      // Simulate occasional failures
      if (shouldFail()) {
            throw new Error('Failed to fetch portfolio data. Please try again.')
      }

      // Mock portfolio data
      // In production, this would come from user's account
      return {
            assets: [
                  {
                        symbol: 'BTC',
                        quantity: 0.5,
                        cost_basis: 22000, // Paid $22k for 0.5 BTC
                  },
                  {
                        symbol: 'ETH',
                        quantity: 10,
                        cost_basis: 24000, // Paid $24k for 10 ETH
                  },
                  {
                        symbol: 'SOL',
                        quantity: 50,
                        cost_basis: 4500, // Paid $4.5k for 50 SOL
                  },
                  {
                        symbol: 'ADA',
                        quantity: 10000,
                        cost_basis: 5000, // Paid $5k for 10k ADA
                  },
            ],
            last_updated: new Date().toISOString(),
      }
}

/**
 * Mock function to simulate empty portfolio (for testing empty state)
 */
export const fetchEmptyPortfolio = async (): Promise<PortfolioResponse> => {
      await delay(300)
      return {
            assets: [],
            last_updated: new Date().toISOString(),
      }
}
