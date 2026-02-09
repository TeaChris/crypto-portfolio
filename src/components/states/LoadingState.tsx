/**
 * Loading State Component
 *
 * Shown when initial data is being fetched
 * Uses skeleton loading for better UX
 */
export const LoadingState = () => {
      return (
            <div className="min-h-screen bg-crypto-dark p-6">
                  <div className="max-w-7xl mx-auto">
                        {/* Header skeleton */}
                        <div className="mb-8">
                              <div className="h-8 w-64 bg-crypto-card animate-pulse rounded-lg mb-2"></div>
                              <div className="h-4 w-48 bg-crypto-card animate-pulse rounded"></div>
                        </div>

                        {/* Summary skeleton */}
                        <div className="bg-crypto-card border border-crypto-border rounded-xl p-6 mb-8">
                              <div className="h-6 w-32 bg-crypto-dark animate-pulse rounded mb-4"></div>
                              <div className="h-12 w-48 bg-crypto-dark animate-pulse rounded mb-2"></div>
                              <div className="h-4 w-40 bg-crypto-dark animate-pulse rounded"></div>
                        </div>

                        {/* Asset cards skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {[1, 2, 3, 4].map((i) => (
                                    <div
                                          key={i}
                                          className="bg-crypto-card border border-crypto-border rounded-xl p-6"
                                    >
                                          <div className="flex justify-between items-start mb-4">
                                                <div className="h-6 w-24 bg-crypto-dark animate-pulse rounded"></div>
                                                <div className="h-6 w-16 bg-crypto-dark animate-pulse rounded"></div>
                                          </div>
                                          <div className="h-8 w-32 bg-crypto-dark animate-pulse rounded mb-2"></div>
                                          <div className="h-4 w-24 bg-crypto-dark animate-pulse rounded"></div>
                                    </div>
                              ))}
                        </div>

                        {/* Loading message */}
                        <div className="text-center mt-8">
                              <div className="inline-flex items-center gap-2 text-gray-400">
                                    <div className="w-4 h-4 border-2 border-crypto-accent border-t-transparent rounded-full animate-spin"></div>
                                    <span>Loading portfolio data...</span>
                              </div>
                        </div>
                  </div>
            </div>
      )
}
