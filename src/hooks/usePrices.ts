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
            staleTime: 45 * 1000, // 45 seconds
            refetchInterval: 60 * 1000, // Poll every 60 seconds (optimized for performance)
            refetchIntervalInBackground: false, // Don't poll in background
            placeholderData: (previousData) => previousData, // Prevent UI flicker
      })
}
