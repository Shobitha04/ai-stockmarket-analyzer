'use client';

import { RealTimeStockTicker } from '@/components/RealTimeStockTicker';
import { LiveMarketDashboard } from '@/components/LiveMarketDashboard';
import { LiveMarketAlerts } from '@/components/LiveMarketAlerts';
import { RealTimePortfolioTracker } from '@/components/RealTimePortfolioTracker';
import { ClientOnly } from '@/components/ClientOnly';

export default function RealTimeDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Real-Time Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Live market data, portfolio tracking, and instant alerts - all updating in real-time
        </p>
      </div>

      {/* Live Market Dashboard */}
      <ClientOnly>
        <LiveMarketDashboard />
      </ClientOnly>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Real-Time Stock Ticker */}
        <ClientOnly>
          <RealTimeStockTicker refreshInterval={3} maxItems={8} />
        </ClientOnly>

        {/* Live Market Alerts */}
        <ClientOnly>
          <LiveMarketAlerts />
        </ClientOnly>
      </div>

      {/* Real-Time Portfolio Tracker */}
      <ClientOnly>
        <RealTimePortfolioTracker refreshInterval={2} />
      </ClientOnly>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Data Updates</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">Live</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Every 2-5 seconds</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Status</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">Active</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">All systems operational</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Alerts Active</h3>
          <p className="mt-2 text-3xl font-bold text-orange-600">5</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Price & volume alerts</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Portfolio Sync</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">Real-time</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">P&L updates live</p>
        </div>
      </div>

      {/* Real-time Features Info */}
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-blue-900/20 dark:to-indigo-900/20">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Real-Time Features</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Live Price Updates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Stock prices update every 3-5 seconds</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Portfolio Tracking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">P&L calculations update instantly</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                <div className="h-2 w-2 animate-pulse rounded-full bg-orange-500"></div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Smart Alerts</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant notifications on price targets</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                <div className="h-2 w-2 animate-pulse rounded-full bg-purple-500"></div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Market Indices</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">NIFTY, SENSEX, and sector indices</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Volume Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-time volume and market breadth</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500"></div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Market Status</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Live market hours and session status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 