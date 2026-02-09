import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { PortfolioDashboard } from '@/components/PortfolioDashboard'

/**
 * App Component
 *
 * Root component that:
 * 1. Provides React Query context
 * 2. Renders the main dashboard
 */
function App() {
      return (
            <QueryClientProvider client={queryClient}>
                  <PortfolioDashboard />
            </QueryClientProvider>
      )
}

export default App
