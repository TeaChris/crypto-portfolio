import { useQueryClient } from '@tanstack/react-query'

interface ErrorStateProps {
      error: Error
      canRetry: boolean
}

/**
 * Error State Component
 *
 * Shown when data fetching fails
 * Provides retry functionality and clear error messaging
 */
export const ErrorState = ({ error, canRetry }: ErrorStateProps) => {
      const queryClient = useQueryClient()

      const handleRetry = () => {
            // Invalidate all queries to trigger refetch
            queryClient.invalidateQueries({ queryKey: ['prices'] })
            queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      }

      return (
            <main
                  className="min-h-screen bg-crypto-dark flex items-center justify-center p-6"
                  role="main"
                  aria-label="Error state"
            >
                  <div className="max-w-md w-full bg-crypto-card border border-loss-red/30 rounded-xl p-8 text-center relative overflow-hidden">
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-gradient-radial from-loss-red/10 to-transparent opacity-50"></div>
                        {/* Error icon */}
                        <div className="w-20 h-20 bg-loss-red/10 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 ring-2 ring-loss-red/20 animate-pulse-slow">
                              <svg
                                    className="w-10 h-10 text-loss-red"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                              </svg>
                        </div>

                        {/* Error title */}
                        <h2 className="text-3xl font-display font-bold text-white mb-2 relative z-10">
                              Something Went Wrong
                        </h2>

                        {/* Error message */}
                        <p
                              className="font-sans text-gray-400 mb-6 relative z-10"
                              role="alert"
                              aria-live="assertive"
                        >
                              {error.message ||
                                    'Failed to load portfolio data. Please try again.'}
                        </p>

                        {/* Retry button */}
                        {canRetry && (
                              <button
                                    onClick={handleRetry}
                                    className="w-full bg-crypto-accent hover:bg-crypto-accent-hover text-crypto-dark font-display font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:ring-2 focus:ring-crypto-accent focus:ring-offset-2 focus:ring-offset-crypto-dark relative z-10"
                                    aria-label="Retry loading portfolio data"
                              >
                                    Try Again
                              </button>
                        )}

                        {/* Help text */}
                        <p className="text-sm font-sans text-gray-500 mt-4 relative z-10">
                              If the problem persists, please check your
                              connection
                        </p>
                  </div>
            </main>
      )
}
