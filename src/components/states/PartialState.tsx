import type { PortfolioResponse } from '@/api/types'

interface PartialStateProps {
      portfolio: PortfolioResponse
      message: string
}

/**
 * Partial Data State Component
 *
 * Critical edge case: Shown when we have portfolio data but prices haven't loaded yet
 * Prevents showing incorrect P&L calculations
 *
 * This state ensures we NEVER display financial data during transient states
 */
export const PartialState = ({ portfolio, message }: PartialStateProps) => {
      return (
            <div className="min-h-screen bg-crypto-dark p-6">
                  <div className="max-w-7xl mx-auto">
                        {/* Warning banner */}
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                              <div className="flex items-center gap-3">
                                    <svg
                                          className="w-5 h-5 text-yellow-500 flex-shrink-0"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                          />
                                    </svg>
                                    <div>
                                          <p className="text-yellow-500 font-medium">
                                                Partial Data
                                          </p>
                                          <p className="text-yellow-200/70 text-sm">
                                                {message}
                                          </p>
                                    </div>
                              </div>
                        </div>

                        {/* Portfolio info without calculations */}
                        <div className="bg-crypto-card border border-crypto-border rounded-xl p-6 mb-8">
                              <h2 className="text-xl font-semibold text-white mb-4">
                                    Your Holdings
                              </h2>
                              <div className="space-y-3">
                                    {portfolio.assets.map((asset) => (
                                          <div
                                                key={asset.symbol}
                                                className="flex justify-between items-center py-2 border-b border-crypto-border last:border-b-0"
                                          >
                                                <div>
                                                      <div className="text-white font-medium">
                                                            {asset.symbol}
                                                      </div>
                                                      <div className="text-sm text-gray-400">
                                                            Quantity:{' '}
                                                            {asset.quantity}
                                                      </div>
                                                </div>
                                                <div className="text-right">
                                                      <div className="text-gray-400 text-sm">
                                                            Calculating...
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>

                        {/* Loading indicator */}
                        <div className="text-center">
                              <div className="inline-flex items-center gap-2 text-gray-400">
                                    <div className="w-4 h-4 border-2 border-crypto-accent border-t-transparent rounded-full animate-spin"></div>
                                    <span>Loading price data...</span>
                              </div>
                        </div>
                  </div>
            </div>
      )
}
