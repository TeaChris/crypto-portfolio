import type { EnrichedAsset } from '@/api/types'
import {
      formatCurrency,
      formatPercentage,
      formatCryptoQuantity,
} from '@/utils/formatting'

interface AssetCardProps {
      asset: EnrichedAsset
}

/**
 * AssetCard Component
 *
 * Displays individual crypto asset with:
 * - Asset name and symbol
 * - Current price
 * - Quantity held
 * - Total value
 * - P&L (absolute and percentage)
 * - Color-coded price change
 */
export const AssetCard = ({ asset }: AssetCardProps) => {
      const isProfitable = asset.profitLoss >= 0
      const isPriceUp = asset.priceChangePercentage24h >= 0

      return (
            <article
                  className="bg-crypto-card border border-crypto-border rounded-xl p-6 hover:border-crypto-accent/50 hover:shadow-lg hover:shadow-crypto-accent/10 transition-all duration-300 transform hover:-translate-y-1 glow-on-hover group"
                  aria-label={`${asset.name} portfolio asset`}
                  role="article"
            >
                  {/* Header: Symbol and 24h price change */}
                  <div className="flex justify-between items-start mb-4">
                        <div>
                              <h3 className="text-xl font-display font-bold text-white">
                                    {asset.symbol}
                              </h3>
                              <p className="text-sm font-sans text-gray-400">
                                    {asset.name}
                              </p>
                        </div>
                        <div
                              className={`px-2 py-1 rounded-lg text-sm font-mono font-medium ${
                                    isPriceUp
                                          ? 'bg-profit-green/10 text-profit-green'
                                          : 'bg-loss-red/10 text-loss-red'
                              }`}
                              aria-label={`24 hour price change: ${
                                    asset.priceChangePercentage24h >= 0
                                          ? 'up'
                                          : 'down'
                              } ${Math.abs(
                                    asset.priceChangePercentage24h,
                              ).toFixed(2)} percent`}
                        >
                              {formatPercentage(asset.priceChangePercentage24h)}
                        </div>
                  </div>

                  {/* Current price */}
                  <div className="mb-4">
                        <p className="text-sm font-sans text-gray-400 mb-1">
                              Current Price
                        </p>
                        <p className="text-2xl font-mono font-bold text-white number-update">
                              {formatCurrency(asset.currentPrice)}
                        </p>
                  </div>

                  {/* Quantity held */}
                  <div className="mb-4">
                        <p className="text-sm font-sans text-gray-400 mb-1">
                              Holdings
                        </p>
                        <p className="text-lg font-mono text-white">
                              {formatCryptoQuantity(asset.quantity)}{' '}
                              <span className="font-display">
                                    {asset.symbol}
                              </span>
                        </p>
                  </div>

                  {/* Total value */}
                  <div className="mb-4">
                        <p className="text-sm font-sans text-gray-400 mb-1">
                              Total Value
                        </p>
                        <p
                              className="text-xl font-mono font-semibold text-crypto-accent number-update"
                              aria-live="polite"
                        >
                              {formatCurrency(asset.totalValue)}
                        </p>
                  </div>

                  {/* Profit/Loss */}
                  <div className="pt-4 border-t border-crypto-border">
                        <div
                              className="flex justify-between items-center"
                              aria-label={`Profit and loss: ${
                                    isProfitable ? 'profit' : 'loss'
                              } of ${Math.abs(asset.profitLoss).toFixed(
                                    2,
                              )} dollars, ${Math.abs(
                                    asset.profitLossPercentage,
                              ).toFixed(2)} percent`}
                        >
                              <span className="text-sm font-sans text-gray-400">
                                    P&L
                              </span>
                              <div className="text-right">
                                    <p
                                          className={`text-lg font-mono font-bold ${
                                                isProfitable
                                                      ? 'text-profit-green'
                                                      : 'text-loss-red'
                                          }`}
                                    >
                                          {isProfitable ? '+' : ''}
                                          {formatCurrency(asset.profitLoss)}
                                    </p>
                                    <p
                                          className={`text-sm font-mono ${
                                                isProfitable
                                                      ? 'text-profit-green'
                                                      : 'text-loss-red'
                                          }`}
                                    >
                                          {formatPercentage(
                                                asset.profitLossPercentage,
                                          )}
                                    </p>
                              </div>
                        </div>
                  </div>
            </article>
      )
}
