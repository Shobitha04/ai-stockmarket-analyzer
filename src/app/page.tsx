import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { RealTimeStockTicker } from '@/components/RealTimeStockTicker';
import { LiveMarketDashboard } from '@/components/LiveMarketDashboard';
import { LiveMarketAlerts } from '@/components/LiveMarketAlerts';
import { ClientOnly } from '@/components/ClientOnly';

const marketIndices = [
  {
    name: 'NIFTY 50',
    value: '19,674.25',
    change: '+1.23%',
    isPositive: true,
  },
  {
    name: 'SENSEX',
    value: '65,972.35',
    change: '+1.15%',
    isPositive: true,
  },
  {
    name: 'BANK NIFTY',
    value: '43,851.20',
    change: '-0.45%',
    isPositive: false,
  },
  {
    name: 'NIFTY IT',
    value: '31,246.15',
    change: '+2.31%',
    isPositive: true,
  },
];

const topGainers = [
  { symbol: 'INFY', name: 'Infosys Ltd.', change: '+4.52%' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', change: '+3.21%' },
  { symbol: 'WIPRO', name: 'Wipro Ltd.', change: '+2.87%' },
];

const topLosers = [
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', change: '-1.52%' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.', change: '-1.21%' },
  { symbol: 'AXISBANK', name: 'Axis Bank Ltd.', change: '-0.87%' },
];

const marketNews = [
  {
    title: 'IT stocks lead market rally as US inflation cools',
    time: '2 hours ago',
    type: 'positive',
  },
  {
    title: 'RBI keeps repo rate unchanged at 6.5%',
    time: '4 hours ago',
    type: 'neutral',
  },
  {
    title: 'Banking stocks under pressure amid global concerns',
    time: '5 hours ago',
    type: 'negative',
  },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Market Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Real-time market insights and analysis powered by AI
        </p>
      </div>

      {/* Live Market Dashboard */}
      <ClientOnly fallback={
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded dark:bg-gray-700"></div>
              ))}
            </div>
          </div>
        </div>
      }>
        <LiveMarketDashboard />
      </ClientOnly>

      {/* Real-Time Stock Ticker */}
      <ClientOnly fallback={
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="animate-pulse space-y-3">
            <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-1/3"></div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded dark:bg-gray-700"></div>
            ))}
          </div>
        </div>
      }>
        <RealTimeStockTicker refreshInterval={5} maxItems={6} />
      </ClientOnly>

      {/* Live Market Alerts */}
      <ClientOnly fallback={
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="animate-pulse space-y-3">
            <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-1/4"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded dark:bg-gray-700"></div>
            ))}
          </div>
        </div>
      }>
        <LiveMarketAlerts />
      </ClientOnly>

      {/* Market Indices */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {marketIndices.map((index) => (
          <div
            key={index.name}
            className="rounded-lg bg-white p-4 shadow dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{index.name}</p>
                <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{index.value}</p>
              </div>
              <div className={`flex items-center ${index.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {index.isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                <span className="ml-1 text-sm font-medium">{index.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Movers and News */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Top Gainers */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Top Gainers</h2>
          </div>
          <div className="space-y-3">
            {topGainers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{stock.symbol}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stock.name}</p>
                </div>
                <span className="text-green-600">{stock.change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="mb-4 flex items-center">
            <TrendingDown className="mr-2 h-5 w-5 text-red-600" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Top Losers</h2>
          </div>
          <div className="space-y-3">
            {topLosers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{stock.symbol}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stock.name}</p>
                </div>
                <span className="text-red-600">{stock.change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest News */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="mb-4 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Market News</h2>
          </div>
          <div className="space-y-3">
            {marketNews.map((news, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`mt-1 h-2 w-2 rounded-full ${
                  news.type === 'positive' ? 'bg-green-600' :
                  news.type === 'negative' ? 'bg-red-600' : 'bg-yellow-600'
                }`} />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{news.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{news.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
