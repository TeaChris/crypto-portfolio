import { lazy, Suspense } from 'react'
import { useDerivedPortfolio } from '@/hooks/useDerivedPortfolio'
import { LoadingState } from './states/LoadingState'
import { ErrorState } from './states/ErrorState'
import { EmptyState } from './states/EmptyState'
import { PartialState } from './states/PartialState'
import { StaleBanner } from './states/StaleBanner'
import { PortfolioSummaryCard } from './PortfolioSummary'
// Lazy load AssetList for performance (Performance Skill)
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
                  return <LoadingState />

            case 'error':
                  return (
                        <ErrorState
                              error={portfolioState.error}
                              canRetry={portfolioState.canRetry}
                        />
                  )

            case 'empty':
                  return <EmptyState />

            case 'partial':
                  return (
                        <PartialState
                              portfolio={portfolioState.portfolio}
                              message={portfolioState.message}
                        />
                  )

            case 'stale':
                  // Show stale banner but still display data
                  return (
                        <main
                              id="main-content"
                              className="min-h-screen bg-crypto-dark p-6"
                        >
                              <div className="max-w-7xl mx-auto">
                                    <StaleBanner
                                          staleSince={portfolioState.staleSince}
                                    />
                                    <PortfolioSummaryCard
                                          summary={portfolioState.summary}
                                    />
                                    <Suspense fallback={<LoadingState />}>
                                          <AssetList
                                                assets={portfolioState.data}
                                          />
                                    </Suspense>
                              </div>
                        </main>
                  )

            case 'ready':
                  // Happy path: all data fresh and available
                  return (
                        <main
                              id="main-content"
                              className="min-h-screen bg-crypto-dark p-6"
                        >
                              <div className="max-w-7xl mx-auto">
                                    <PortfolioSummaryCard
                                          summary={portfolioState.summary}
                                    />
                                    <Suspense fallback={<LoadingState />}>
                                          <AssetList
                                                assets={portfolioState.data}
                                          />
                                    </Suspense>
                              </div>
                        </main>
                  )

            default:
                  // TypeScript exhaustiveness check
                  const _exhaustive: never = portfolioState
                  return _exhaustive
      }
}
