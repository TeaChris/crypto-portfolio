import { formatRelativeTime } from '@/utils/formatting'

interface StaleBannerProps {
      staleSince: Date
}

/**
 * Stale Data Banner Component
 *
 * Shown when data is older than the staleTime threshold
 * Informs user that data may not be current
 *
 * This is not a full-screen state, but a banner shown above the dashboard
 */
export const StaleBanner = ({ staleSince }: StaleBannerProps) => {
      return (
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                        <svg
                              className="w-5 h-5 text-orange-500 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                        >
                              <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                        </svg>
                        <div>
                              <p className="text-orange-500 font-medium">
                                    Data May Be Stale
                              </p>
                              <p className="text-orange-200/70 text-sm">
                                    Last updated{' '}
                                    {formatRelativeTime(staleSince)}. Refreshing
                                    automatically...
                              </p>
                        </div>
                  </div>
            </div>
      )
}
