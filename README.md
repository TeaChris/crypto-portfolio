# Crypto Portfolio Dashboard

A production-ready cryptocurrency portfolio tracker built with React, TypeScript, React Query, and Tailwind CSS.

![Dashboard Preview](https://via.placeholder.com/800x400/0a0e27/3b82f6?text=Crypto+Portfolio+Dashboard)

## 🎯 Project Overview

This dashboard demonstrates senior-level frontend engineering with a focus on:

- **Correctness**: Prevents incorrect P&L during transient states
- **Resilience**: Graceful handling of network failures and edge cases
- **Architecture**: Clear separation of concerns and predictable data flow
- **Production-ready**: Explicit system states, proper error handling, retry logic

## ✨ Features

### Portfolio Tracking

- Real-time cryptocurrency prices (updates every 30s)
- Multiple asset support (BTC, ETH, SOL, ADA)
- Total portfolio value calculation
- Individual asset holdings display

### Financial Metrics

- Profit & Loss (absolute and percentage)
- 24-hour price changes
- Total invested vs. current value
- Color-coded gains/losses (green/red)

### System States (Explicit)

All edge cases handled with dedicated UI states:

- **Loading**: Skeleton loading animation
- **Error**: Retry functionality with error messages
- **Empty**: No assets onboarding
- **Partial**: Prices missing while portfolio loads (prevents wrong P&L)
- **Stale**: Data older than threshold (with warning banner)
- **Ready**: Happy path with all data

## 🏗️ Architecture

### State Management Strategy

**Decision**: React Query only

**Rationale**:

- This is primarily a data-fetching problem
- React Query provides caching, polling, retry, and stale detection
- Local UI state is minimal
- Avoids dual state management complexity

### Data Flow

```
Mock API → React Query (raw data) → useDerivedPortfolio (calculations) → UI Components
```

**Key Pattern**: Derived Data Separation

- Raw API data lives in React Query cache
- Financial calculations happen in `useDerivedPortfolio` hook
- UI components receive enriched, ready-to-display data
- No business logic in presentation layer

### Critical Edge Case Handling

**Problem**: Price updates can arrive before portfolio data

**Solution**: `useDerivedPortfolio` hook returns explicit system states:

```typescript
type SystemState =
      | { status: 'loading' }
      | { status: 'error'; error: Error }
      | { status: 'empty' }
      | { status: 'partial' } // ← Prevents incorrect P&L
      | { status: 'stale' }
      | { status: 'ready'; data: EnrichedAsset[] }
```

During `partial` state, we show "Calculating..." instead of wrong numbers.

### Preventing Incorrect P&L

P&L calculations only execute when **BOTH** conditions are true:

1. Portfolio data is available (`assets`, `costBasis`)
2. Price data is available (`current_price`)

All calculations are:

- Memoized with `useMemo` (prevents re-calc on every render)
- Pure functions in `utils/calculations.ts` (easy to unit test)
- Executed only in the `useDerivedPortfolio` hook (single source of truth)

## 📁 Project Structure

```
crypto-portfolio/
├── src/
│   ├── api/
│   │   ├── types.ts              # TypeScript types
│   │   └── mock-api.ts           # Mock CoinGecko API
│   ├── hooks/
│   │   ├── usePrices.ts          # Price data fetching
│   │   ├── usePortfolio.ts       # Portfolio data fetching
│   │   └── useDerivedPortfolio.ts # Combines prices + portfolio
│   ├── components/
│   │   ├── PortfolioDashboard.tsx # Main router component
│   │   ├── PortfolioSummary.tsx   # Total value display
│   │   ├── AssetList.tsx          # Grid of assets
│   │   ├── AssetCard.tsx          # Individual asset card
│   │   └── states/                # System state components
│   │       ├── LoadingState.tsx
│   │       ├── ErrorState.tsx
│   │       ├── EmptyState.tsx
│   │       ├── PartialState.tsx
│   │       └── StaleBanner.tsx
│   ├── utils/
│   │   ├── calculations.ts       # Pure financial math
│   │   └── formatting.ts         # Number/currency formatting
│   ├── lib/
│   │   └── react-query.ts        # Query client config
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or 16+)
- npm 8+ or yarn

### Installation

```bash
# Clone the repository or navigate to project directory
cd crypto-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 🔧 Technology Stack

| Category         | Technology              | Reason                                  |
| ---------------- | ----------------------- | --------------------------------------- |
| Framework        | React 18                | Modern hooks, concurrent features       |
| Language         | TypeScript              | Type safety, better DX                  |
| Build Tool       | Vite                    | Fast HMR, modern bundling               |
| State Management | React Query             | Server state caching, polling, retry    |
| Styling          | Tailwind CSS            | Rapid UI development, consistency       |
| API              | Mock (CoinGecko format) | Simulates real API with delays/failures |

## 🧪 Testing Strategy

> **Note**: Tests not implemented in this demo, but here's how I would approach it:

### Unit Tests (Vitest)

```typescript
// calculations.test.ts
import {
      calculateProfitLoss,
      calculateProfitLossPercentage,
} from './calculations'

test('calculates profit correctly', () => {
      expect(calculateProfitLoss(1500, 1000)).toBe(500)
})

test('calculates percentage gain correctly', () => {
      expect(calculateProfitLossPercentage(1500, 1000)).toBe(50)
})
```

### Hook Tests (@testing-library/react-hooks)

```typescript
// useDerivedPortfolio.test.ts
test('returns loading state initially', () => {
      const { result } = renderHook(() => useDerivedPortfolio())
      expect(result.current.status).toBe('loading')
})

test('returns partial state when prices load before portfolio', async () => {
      // Mock React Query to return prices but not portfolio
      // Assert status === 'partial'
})
```

### Component Tests (@testing-library/react)

```typescript
// ErrorState.test.tsx
test('retry button triggers query invalidation', () => {
  render(<ErrorState error={new Error('Test')} canRetry={true} />)
  fireEvent.click(screen.getByText('Try Again'))
  expect(mockQueryClient.invalidateQueries).toHaveBeenCalled()
})
```

### Manual Testing Checklist

- [x] Loading state renders on first load
- [x] Error state shows retry button on failure
- [x] Empty state displays when no assets
- [x] Partial state prevents incorrect P&L
- [x] Stale banner appears after 20s
- [x] Price updates every 30s
- [x] No UI jitter during updates
- [x] Color coding correct (green=profit, red=loss)

## 🎨 Design Decisions

### Color Palette

- **Background**: Dark theme (`#0a0e27`)
- **Cards**: Slightly lighter (`#12172d`)
- **Borders**: Subtle separation (`#1e2543`)
- **Accent**: Blue (`#3b82f6`)
- **Profit**: Green (`#10b981`)
- **Loss**: Red (`#ef4444`)

### Typography

- **Font**: Inter (Google Fonts)
- **Sizes**: Responsive scale (text-sm to text-5xl)
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Responsive Design

- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 3 columns

## ⚖️ Trade-offs & Decisions

### 1. React Query Only (No Zustand)

**Trade-off**: If we needed complex client-side state (multi-step forms, filters, UI preferences), Zustand would be beneficial. For this use case, it's unnecessary complexity.

**Decision**: Use React Query for server state + local `useState` for minimal UI state.

### 2. Mock API vs. Real Integration

**Trade-off**: Real API requires CORS proxy, API keys, rate limits, and external dependency.

**Decision**: Mock API simulates realistic delays and failures, perfect for demonstrating resilience patterns.

### 3. Polling (30s) vs. WebSocket

**Trade-off**: WebSocket provides instant updates but adds complexity (connection management, reconnection logic, fallback).

**Decision**: Polling is simpler, more reliable, and sufficient for 30-second freshness.

### 4. Tailwind vs. CSS-in-JS

**Trade-off**: CSS-in-JS (styled-components) provides component-scoped styles but adds runtime overhead.

**Decision**: Tailwind is faster, has zero runtime cost, and works well with TypeScript.

## 🚧 What I Would Improve With More Time

### High Priority

1. **Real API Integration**: Connect to CoinGecko API with API key management
2. **WebSocket Updates**: Replace polling with WebSocket for instant price updates
3. **Error Boundaries**: React error boundaries for component-level failures
4. **Test Suite**: Comprehensive unit, integration, and E2E tests (Vitest + Playwright)

### Medium Priority

5. **Historical Charts**: Add price history charts (Recharts or Victory)
6. **Asset Management**: Allow users to add/edit/remove assets
7. **Optimistic Updates**: Instant UI feedback when editing portfolio
8. **Accessibility**: Full ARIA labels, keyboard navigation, screen reader support

### Nice to Have

9. **Animations**: Smooth transitions for price changes (react-spring)
10. **Offline Support**: Service worker for offline functionality
11. **Performance Monitoring**: Web Vitals tracking
12. **Multi-currency**: Support for EUR, GBP, etc.

## 📊 Performance Considerations

### Memoization

- All calculations wrapped in `useMemo`
- Prevents re-calculation on every render
- Dependencies properly tracked

### React Query Optimization

- `placeholderData`: Prevents UI flicker during refetch
- Stale time: Reduces unnecessary requests
- Garbage collection: Removes old cache entries

### Render Optimization

- Components split by responsibility
- No props drilling (data flows down)
- Minimal re-renders on price updates

## 🐛 Known Limitations

1. **Mock Data**: Portfolio holdings are hardcoded (not editable)
2. **Single User**: No authentication or multi-user support
3. **Limited Assets**: Only supports 5 cryptos (BTC, ETH, SOL, ADA, DOT)
4. **No Persistence**: Portfolio doesn't persist across refreshes
5. **No Historical Data**: Can't view past performance

## 📝 License

This is a demo project for educational purposes.

## 🙏 Acknowledgments

- **CoinGecko**: API structure inspiration
- **React Query**: Excellent state management library
- **Tailwind**: Rapid UI development

---

For questions or feedback, please open an issue.
