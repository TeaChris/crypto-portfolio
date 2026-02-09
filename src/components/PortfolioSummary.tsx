import type { PortfolioSummary } from '@/api/types'
import {
      formatCurrency,
      formatPercentage,
      formatTimestamp,
} from '@/utils/formatting'

interface PortfolioSummaryProps {
      summary: PortfolioSummary
}

/**
 * PortfolioSummary Component
 *
 * Displays aggregated portfolio metrics:
 * - Total portfolio value
 * - Total P&L (absolute and percentage)
 * - Last updated timestamp
 *
 * This is the "hero" section of the dashboard
 */
export const PortfolioSummaryCard = ({ summary }: PortfolioSummaryProps) => {
      const isProfitable = summary.totalProfitLoss >= 0

      return (
            <section
                  className="bg-gradient-to-br from-crypto-accent/20 via-crypto-card to-crypto-darker border border-crypto-accent/40 rounded-xl p-8 mb-8 relative overflow-hidden group"
                  aria-label="Portfolio summary section"
                  role="region"
            >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-crypto-secondary/10 rounded-full blur-3xl group-hover:bg-crypto-secondary/20 transition-all duration-500"></div>
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 relative z-10">
                        {/* Total value */}
                        <div>
                              <p className="text-sm font-sans text-gray-400 mb-2 uppercase tracking-wide">
                                    Total Portfolio Value
                              </p>
                              <h1 className="text-6xl font-mono font-bold bg-gradient-to-r from-crypto-accent to-profit-green bg-clip-text text-transparent mb-2 animate-fade-in">
                                    {formatCurrency(summary.totalValue)}
                              </h1>
                              <p className="text-sm font-sans text-gray-400">
                                    Last updated:{' '}
                                    <time
                                          dateTime={summary.lastUpdated.toISOString()}
                                    >
                                          {formatTimestamp(summary.lastUpdated)}
                                    </time>
                              </p>
                        </div>

                        {/* P&L metrics */}
                        <div className="flex gap-8">
                              {/* Absolute P&L */}
                              <div>
                                    <p className="text-sm font-sans text-gray-400 mb-1 uppercase tracking-wide">
                                          Total P&L
                                    </p>
                                    <p
                                          className={`text-4xl font-mono font-bold ${
                                                isProfitable
                                                      ? 'text-profit-green'
                                                      : 'text-loss-red'
                                          } animate-scale-in`}
                                          aria-live="polite"
                                    >
                                          {isProfitable ? '+' : ''}
                                          {formatCurrency(
                                                summary.totalProfitLoss,
                                          )}
                                    </p>
                              </div>

                              {/* Percentage P&L */}
                              <div>
                                    <p className="text-sm font-sans text-gray-400 mb-1 uppercase tracking-wide">
                                          Return
                                    </p>
                                    <p
                                          className={`text-4xl font-mono font-bold ${
                                                isProfitable
                                                      ? 'text-profit-green'
                                                      : 'text-loss-red'
                                          } animate-scale-in`}
                                          aria-live="polite"
                                    >
                                          {formatPercentage(
                                                summary.totalProfitLossPercentage,
                                          )}
                                    </p>
                              </div>
                        </div>
                  </div>

                  {/* Cost basis (subtle) */}
                  <div className="mt-6 pt-6 border-t border-crypto-border/30 relative z-10">
                        <div className="flex justify-between text-sm">
                              <span className="font-sans text-gray-400 uppercase tracking-wide">
                                    Total Invested
                              </span>
                              <span className="font-mono text-gray-300 font-medium">
                                    {formatCurrency(summary.totalCostBasis)}
                              </span>
                        </div>
                  </div>
            </section>
      )
}
