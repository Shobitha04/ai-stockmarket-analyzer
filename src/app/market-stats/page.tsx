'use client';

import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

// Sample market data - replace with real API data
const marketIndices = [
  { name: 'NIFTY 50', value: 19845.65, change: 125.30, changePercent: 0.63 },
  { name: 'SENSEX', value: 66589.93, change: 418.60, changePercent: 0.63 },
  { name: 'NIFTY BANK', value: 44582.15, change: -89.45, changePercent: -0.20 },
  { name: 'NIFTY IT', value: 31245.80, change: 285.70, changePercent: 0.92 },
  { name: 'NIFTY AUTO', value: 16789.25, change: 45.60, changePercent: 0.27 },
  { name: 'NIFTY PHARMA', value: 14562.40, change: -67.80, changePercent: -0.46 },
];

const sectorPerformance = [
  { sector: 'IT', performance: 2.8, volume: 1250 },
  { sector: 'Banking', performance: -0.5, volume: 2100 },
  { sector: 'Auto', performance: 1.2, volume: 850 },
  { sector: 'Pharma', performance: -0.8, volume: 650 },
  { sector: 'FMCG', performance: 0.9, volume: 750 },
  { sector: 'Energy', performance: 1.5, volume: 950 },
  { sector: 'Metals', performance: -1.2, volume: 1100 },
  { sector: 'Realty', performance: 2.1, volume: 450 },
];

const marketBreadth = [
  { name: 'Advances', value: 1847, color: '#10B981' },
  { name: 'Declines', value: 1253, color: '#EF4444' },
  { name: 'Unchanged', value: 156, color: '#6B7280' },
];

const volumeData = [
  { time: '09:30', volume: 125 },
  { time: '10:00', volume: 189 },
  { time: '10:30', volume: 234 },
  { time: '11:00', volume: 298 },
  { time: '11:30', volume: 267 },
  { time: '12:00', volume: 245 },
  { time: '12:30', volume: 189 },
  { time: '13:00', volume: 156 },
  { time: '13:30', volume: 178 },
  { time: '14:00', volume: 234 },
  { time: '14:30', volume: 289 },
  { time: '15:00', volume: 345 },
  { time: '15:30', volume: 398 },
];

const marketStats = {
  totalTurnover: '₹45,678 Cr',
  totalVolume: '4.2B shares',
  deliveryPercent: '52.3%',
  fiiActivity: '+₹1,234 Cr',
  diiActivity: '-₹567 Cr',
  marketCap: '₹285.6 Lakh Cr',
};

export default function MarketStats() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Market Statistics</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Real-time market data and comprehensive statistics
          </p>
        </div>
        <div className="flex space-x-2">
          {['1D', '1W', '1M', '3M', '1Y'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                selectedTimeframe === timeframe
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(marketStats).map(([key, value]) => (
          <div key={key} className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Market Indices */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Market Indices</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {marketIndices.map((index) => (
            <div key={index.name} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white">{index.name}</h3>
                <div className="flex items-center">
                  {index.changePercent > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {index.value.toLocaleString()}
                </p>
                <p className={`text-sm ${
                  index.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {index.change > 0 ? '+' : ''}{index.change} ({index.changePercent > 0 ? '+' : ''}{index.changePercent}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sector Performance */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Sector Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sector" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="performance" 
                  name="Performance (%)"
                  fill={(entry) => entry.performance > 0 ? '#10B981' : '#EF4444'}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Breadth */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Market Breadth</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketBreadth}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {marketBreadth.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Volume Analysis */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Intraday Volume Analysis</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="volume" 
                stroke="#3B82F6" 
                name="Volume (Cr)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Heat Map */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Sector Heat Map</h2>
        <div className="grid grid-cols-4 gap-2">
          {sectorPerformance.map((sector) => (
            <div
              key={sector.sector}
              className={`rounded-lg p-4 text-center ${
                sector.performance > 1 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                  : sector.performance > 0
                  ? 'bg-green-50 text-green-700 dark:bg-green-900/10 dark:text-green-400'
                  : sector.performance > -1
                  ? 'bg-red-50 text-red-700 dark:bg-red-900/10 dark:text-red-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
              }`}
            >
              <p className="text-sm font-medium">{sector.sector}</p>
              <p className="text-lg font-semibold">
                {sector.performance > 0 ? '+' : ''}{sector.performance}%
              </p>
              <p className="text-xs opacity-75">Vol: {sector.volume}Cr</p>
            </div>
          ))}
        </div>
      </div>

      {/* Market Summary */}
      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <h3 className="mb-2 text-lg font-medium text-blue-900 dark:text-blue-100">Market Summary</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200">Key Highlights</h4>
            <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
              <li>• Markets closed higher led by IT and Auto sectors</li>
              <li>• FII inflows continue for the third consecutive day</li>
              <li>• Banking sector underperformed due to NIM concerns</li>
              <li>• Midcap and Smallcap indices outperformed benchmarks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200">Market Outlook</h4>
            <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              Market sentiment remains positive with strong institutional support. 
              Key levels to watch: NIFTY support at 19,750 and resistance at 20,000. 
              Sectoral rotation expected to continue with focus on quality stocks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 