import { QueryClient } from '@tanstack/react-query'

/**
 * React Query Client Configuration
 *
 * Key decisions:
 * - Default stale time: 0 (always check for updates)
 * - Default cache time: 5 minutes (keep data in cache)
 * - Retry: 3 attempts with exponential backoff
 * - Refetch on window focus: true (refresh when user returns)
 */
export const queryClient = new QueryClient({
      defaultOptions: {
            queries: {
                  // Always check if data is stale on query mount
                  staleTime: 0,

                  // Keep unused data in cache for 5 minutes
                  gcTime: 5 * 60 * 1000,

                  // Retry failed requests 3 times with exponential backoff
                  retry: 3,
                  retryDelay: (attemptIndex) =>
                        Math.min(1000 * 2 ** attemptIndex, 30000),

                  // Refetch when user focuses window/tab
                  refetchOnWindowFocus: true,

                  // Don't refetch on mount by default (controlled per-query)
                  refetchOnMount: false,

                  // Don't refetch on reconnect (we handle this per-query)
                  refetchOnReconnect: false,
            },
      },
})
