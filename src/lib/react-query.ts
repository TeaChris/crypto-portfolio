import { QueryClient } from '@tanstack/react-query'

/**
 * React Query Client Configuration
 *
 * Key decisions:
 * - Default stale time: 0 (always check for updates)
 * - Default cache time: 5 minutes (keep data in cache)
 * - Default stale time: 1 minute (increased for better caching)
 * - Default cache time: 10 minutes (keep data in cache)
 * - Retry: 2 attempts with exponential backoff
 * - Refetch on window focus: false (prevent excessive refetches)
 */
export const queryClient = new QueryClient({
      defaultOptions: {
            queries: {
                  // Cache optimization
                  staleTime: 60 * 1000, // 1 minute (increased for better caching)
                  gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

                  // Retry strategy (optimized for performance)
                  retry: 2, // Reduced retries
                  retryDelay: (attemptIndex) =>
                        Math.min(1000 * 2 ** attemptIndex, 30000),

                  // Refetch strategy (performance optimized)
                  refetchOnWindowFocus: false, // Prevent excessive refetches
                  refetchOnReconnect: true, // Only refetch on reconnect
                  refetchOnMount: false, // Don't refetch on mount

                  // Network optimization
                  networkMode: 'online',
            },
      },
})
