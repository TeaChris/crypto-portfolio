import { useQuery } from '@tanstack/react-query'
import { fetchPrices } from '@/api/mock-api'
import type { PriceData } from '@/api/types'

/**
 * Hook to fetch cryptocurrency prices
 *
 * Configuration:
 * - Refetch interval: 30 seconds (simulates live price updates)
 * - Stale time: 20 seconds (after this, data is considered stale)
 * - Retry: 3 attempts (inherited from query client)
 * - Refetch on window focus: true
 *
 * This hook provides:
 * - Fresh price data
 * - Loading and error states
 * - Automatic refetching
 * - Stale data detection
 */
export const usePrices = () => {
      return useQuery<PriceData[], Error>({
            queryKey: ['prices'],
            queryFn: fetchPrices,

            // Refetch every 30 seconds for "live" updates
            refetchInterval: 30 * 1000,

            // Data is considered stale after 20 seconds
            // This creates a window where we show stale indicator
            staleTime: 20 * 1000,

            // Refetch when user returns to tab
            refetchOnWindowFocus: true,

            // Keep previous data while fetching new data
            // Prevents UI flicker during updates
            placeholderData: (previousData) => previousData,
      })
}
