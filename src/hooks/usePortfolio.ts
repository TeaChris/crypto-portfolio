import { useQuery } from '@tanstack/react-query'
import { fetchPortfolio } from '@/api/mock-api'
import type { PortfolioResponse } from '@/api/types'

/**
 * Hook to fetch user's portfolio holdings
 *
 * Configuration:
 * - Refetch: Manual only (portfolio doesn't change frequently)
 * - Stale time: 5 minutes
 * - Cache time: 10 minutes
 *
 * Portfolio data is more static than prices, so we:
 * - Don't auto-refetch on an interval
 * - Only refetch on manual action or window focus
 * - Cache longer than price data
 */
export const usePortfolio = () => {
      return useQuery<PortfolioResponse, Error>({
            queryKey: ['portfolio'],
            queryFn: fetchPortfolio,

            // Portfolio data stays fresh for 5 minutes
            staleTime: 5 * 60 * 1000,

            // Keep in cache for 10 minutes
            gcTime: 10 * 60 * 1000,

            // Don't auto-refetch (portfolio is relatively static)
            refetchInterval: false,

            // Refetch when user returns to tab
            refetchOnWindowFocus: true,

            // Keep previous data while refetching
            placeholderData: (previousData) => previousData,
      })
}
