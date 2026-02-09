import type { EnrichedAsset } from '@/api/types'
import { AssetCard } from './AssetCard'

interface AssetListProps {
      assets: EnrichedAsset[]
}

/**
 * AssetList Component
 *
 * Displays grid of asset cards
 * Responsive layout: 1 column mobile, 2 tablet, 3 desktop
 */
export const AssetList = ({ assets }: AssetListProps) => {
      if (assets.length === 0) {
            return null
      }

      return (
            <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                        Your Assets
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {assets.map((asset) => (
                              <AssetCard key={asset.symbol} asset={asset} />
                        ))}
                  </div>
            </div>
      )
}
