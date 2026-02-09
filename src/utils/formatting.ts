/**
 * Format number as currency (USD)
 * Examples: 1234.56 → "$1,234.56"
 */
export const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
      }).format(value)
}

/**
 * Format number as compact currency for large numbers
 * Examples: 1234567 → "$1.23M"
 */
export const formatCompactCurrency = (value: number): string => {
      if (Math.abs(value) >= 1_000_000) {
            return `$${(value / 1_000_000).toFixed(2)}M`
      }
      if (Math.abs(value) >= 1_000) {
            return `$${(value / 1_000).toFixed(2)}K`
      }
      return formatCurrency(value)
}

/**
 * Format percentage with + or - sign
 * Examples: 12.34 → "+12.34%", -5.67 → "-5.67%"
 */
export const formatPercentage = (value: number): string => {
      const sign = value >= 0 ? '+' : ''
      return `${sign}${value.toFixed(2)}%`
}

/**
 * Format crypto quantity with appropriate precision
 * Examples: 0.00012345 → "0.000123", 1.234567 → "1.235"
 */
export const formatCryptoQuantity = (value: number): string => {
      if (value === 0) return '0'

      // For very small numbers, use more decimal places
      if (Math.abs(value) < 0.01) {
            return value.toFixed(6)
      }

      // For regular numbers, use 3 decimal places
      return value.toFixed(3)
}

/**
 * Format date as relative time
 * Examples: "2 minutes ago", "1 hour ago", "Just now"
 */
export const formatRelativeTime = (date: Date): string => {
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffSeconds = Math.floor(diffMs / 1000)
      const diffMinutes = Math.floor(diffSeconds / 60)
      const diffHours = Math.floor(diffMinutes / 60)
      const diffDays = Math.floor(diffHours / 24)

      if (diffSeconds < 60) {
            return 'Just now'
      } else if (diffMinutes < 60) {
            return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
      } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
      } else {
            return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
      }
}

/**
 * Format timestamp for display
 * Examples: "Feb 9, 2026 10:35 AM"
 */
export const formatTimestamp = (date: Date): string => {
      return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
      }).format(date)
}
