/**
 * Empty State Component
 *
 * Shown when user has no assets in their portfolio
 * Provides guidance for getting started
 */
export const EmptyState = () => {
      return (
            <div className="min-h-screen bg-crypto-dark flex items-center justify-center p-6">
                  <div className="max-w-md w-full bg-crypto-card border border-crypto-border rounded-xl p-8 text-center">
                        {/* Empty icon */}
                        <div className="w-16 h-16 bg-crypto-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg
                                    className="w-8 h-8 text-crypto-accent"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                              </svg>
                        </div>

                        {/* Empty title */}
                        <h2 className="text-2xl font-bold text-white mb-2">
                              No Assets Yet
                        </h2>

                        {/* Empty message */}
                        <p className="text-gray-400 mb-6">
                              Your portfolio is empty. Start investing in
                              cryptocurrencies to track your holdings here.
                        </p>

                        {/* CTA button (would link to buy/add assets in production) */}
                        <button className="w-full bg-crypto-accent hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                              Add Your First Asset
                        </button>

                        {/* Info text */}
                        <p className="text-sm text-gray-500 mt-4">
                              Track Bitcoin, Ethereum, and more
                        </p>
                  </div>
            </div>
      )
}
