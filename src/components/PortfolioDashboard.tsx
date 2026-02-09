import { lazy, Suspense } from 'react'
import { useDerivedPortfolio } from '@/hooks/useDerivedPortfolio'

// Lazy load all components for optimal bundle splitting
const LoadingState = lazy(() =>
      import('./states/LoadingState').then((m) => ({
            default: m.LoadingState,
      })),
)
const ErrorState = lazy(() =>
      import('./states/ErrorState').then((m) => ({ default: m.ErrorState })),
)
const EmptyState = lazy(() =>
      import('./states/EmptyState').then((m) => ({ default: m.EmptyState })),
)
const PartialState = lazy(() =>
      import('./states/PartialState').then((m) => ({
            default: m.PartialState,
      })),
)
const StaleBanner = lazy(() =>
      import('./states/StaleBanner').then((m) => ({ default: m.StaleBanner })),
)
const PortfolioSummaryCard = lazy(() =>
      import('./PortfolioSummary').then((m) => ({
            default: m.PortfolioSummaryCard,
      })),
)
const AssetList = lazy(() =>
      import('./AssetList').then((module) => ({ default: module.AssetList })),
)

/**
 * PortfolioDashboard Component
 *
 * Main dashboard component that:
 * 1. Consumes useDerivedPortfolio hook
 * 2. Routes to appropriate state component
 * 3. Handles all edge cases explicitly
 * 4. Uses semantic HTML for accessibility
 * 5. Lazy loads components for performance
 *
 * This component has NO business logic - just routing
 */
export const PortfolioDashboard = () => {
      const portfolioState = useDerivedPortfolio()

      // Route to appropriate state component
      switch (portfolioState.status) {
            case 'loading':
                  return (
                        <Suspense
                              fallback={
                                    <div className="min-h-screen bg-crypto-dark flex items-center justify-center">
                                          <div className="text-crypto-accent">
                                                Loading...
                                          </div>
                                    </div>
                              }
                        >
                              <LoadingState />
                        </Suspense>
                  )

            case 'error':
                  return (
                        <Suspense
                              fallback={
                                    <div className="min-h-screen bg-crypto-dark flex items-center justify-center">
                                          <div className="text-crypto-accent">
                                                Loading...
                                          </div>
                                    </div>
                              }
                        >
                              <ErrorState
                                    error={portfolioState.error}
                                    canRetry={portfolioState.canRetry}
                              />
                        </Suspense>
                  )

            case 'empty':
                  return (
                        <Suspense
                              fallback={
                                    <div className="min-h-screen bg-crypto-dark flex items-center justify-center">
                                          <div className="text-crypto-accent">
                                                Loading...
                                          </div>
                                    </div>
                              }
                        >
                              <EmptyState />
                        </Suspense>
                  )

            case 'partial':
                  return (
                        <Suspense
                              fallback={
                                    <div className="min-h-screen bg-crypto-dark flex items-center justify-center">
                                          <div className="text-crypto-accent">
                                                Loading...
                                          </div>
                                    </div>
                              }
                        >
                              <PartialState
                                    portfolio={portfolioState.portfolio}
                                    message={portfolioState.message}
                              />
                        </Suspense>
                  )

            case 'stale':
                  // Show stale banner but still display data
                  return (
                        <Suspense
                              fallback={
                                    <div className="min-h-screen bg-crypto-dark flex items-center justify-center">
                                          <div className="text-crypto-accent">
                                                Loading...
                                          </div>
                                    </div>
                              }
                        >
                              <main
                                    id="main-content"
                                    className="min-h-screen bg-crypto-dark p-6"
                              >
                                    <div className="max-w-7xl mx-auto">
                                          <StaleBanner
                                                staleSince={
                                                      portfolioState.staleSince
                                                }
                                          />
                                          <PortfolioSummaryCard
                                                summary={portfolioState.summary}
                                          />
                                          <Suspense
                                                fallback={
                                                      <div className="text-center py-8 text-crypto-accent">
                                                            Loading assets...
                                                      </div>
                                                }
                                          >
                                                <AssetList
                                                      assets={
                                                            portfolioState.data
                                                      }
                                                />
                                          </Suspense>
                                    </div>
                              </main>
                        </Suspense>
                  )

            case 'ready':
                  // Happy path: all data fresh and available
                  return (
                        <Suspense
                              fallback={
                                    <div className="min-h-screen bg-crypto-dark flex items-center justify-center">
                                          <div className="text-crypto-accent">
                                                Loading...
                                          </div>
                                    </div>
                              }
                        >
                              <main
                                    id="main-content"
                                    className="min-h-screen bg-crypto-dark p-6"
                              >
                                    <div className="max-w-7xl mx-auto">
                                          <PortfolioSummaryCard
                                                summary={portfolioState.summary}
                                          />
                                          <Suspense
                                                fallback={
                                                      <div className="text-center py-8 text-crypto-accent">
                                                            Loading assets...
                                                      </div>
                                                }
                                          >
                                                <AssetList
                                                      assets={
                                                            portfolioState.data
                                                      }
                                                />
                                          </Suspense>
                                    </div>
                              </main>
                        </Suspense>
                  )

            default:
                  // TypeScript exhaustiveness check
                  const _exhaustive: never = portfolioState
                  return _exhaustive
      }
}
