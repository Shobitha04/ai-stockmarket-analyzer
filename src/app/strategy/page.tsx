'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play } from 'lucide-react';

// Sample backtest results - replace with real API data
const backtestResults = {
  trades: [
    { date: '2023-01-01', price: 1000, type: 'buy', pnl: 0 },
    { date: '2023-02-15', price: 1120, type: 'sell', pnl: 120 },
    { date: '2023-03-10', price: 980, type: 'buy', pnl: 120 },
    { date: '2023-04-20', price: 1150, type: 'sell', pnl: 290 },
    { date: '2023-05-05', price: 1050, type: 'buy', pnl: 290 },
    { date: '2023-06-15', price: 1200, type: 'sell', pnl: 440 },
  ],
  metrics: {
    totalReturns: '44%',
    sharpeRatio: '2.1',
    maxDrawdown: '-12%',
    winRate: '75%',
    profitFactor: '2.5',
  },
  priceData: [
    { date: '2023-01-01', price: 1000 },
    { date: '2023-02-01', price: 1050 },
    { date: '2023-03-01', price: 980 },
    { date: '2023-04-01', price: 1100 },
    { date: '2023-05-01', price: 1050 },
    { date: '2023-06-01', price: 1150 },
  ],
};

const sampleStrategies = [
  'Buy RELIANCE when RSI < 30 and sell when RSI > 70',
  'Buy HDFC when 20-day MA crosses above 50-day MA',
  'Buy INFY on golden cross (50 MA crosses 200 MA)',
  'Buy TCS when price is 5% below 20-day MA',
];

export default function Strategy() {
  const [strategy, setStrategy] = useState('');
  const [symbol, setSymbol] = useState('');
  const [timeframe, setTimeframe] = useState('1d');
  const [showResults, setShowResults] = useState(false);

  const handleBacktest = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Strategy Lab</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Test your trading strategies using natural language and AI
        </p>
      </div>

      {/* Strategy Input Form */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <form onSubmit={handleBacktest} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock Symbol</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              placeholder="e.g., RELIANCE"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Strategy</label>
            <textarea
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              placeholder="Describe your strategy in plain English..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Timeframe</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="1d">Daily</option>
              <option value="1w">Weekly</option>
              <option value="1m">Monthly</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Play className="mr-2 h-4 w-4" />
              Run Backtest
            </button>
          </div>
        </form>

        {/* Sample Strategies */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Sample Strategies</h3>
          <div className="mt-2 space-y-2">
            {sampleStrategies.map((sample, index) => (
              <button
                key={index}
                onClick={() => setStrategy(sample)}
                className="block w-full rounded-md bg-gray-50 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Backtest Results */}
      {showResults && (
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {Object.entries(backtestResults.metrics).map(([key, value]) => (
              <div key={key} className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Price Chart with Trades */}
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Performance Chart</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={backtestResults.priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trade List */}
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Trade History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {backtestResults.trades.map((trade, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{trade.date}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          trade.type === 'buy' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                        }`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">₹{trade.price}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <span className={trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                          ₹{trade.pnl}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <h3 className="mb-2 text-lg font-medium text-blue-900 dark:text-blue-100">Strategy Analysis</h3>
            <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
              <p>
                Your strategy shows strong performance with a 44% return and a Sharpe ratio of 2.1, indicating good risk-adjusted returns.
                The win rate of 75% suggests consistent profitability.
              </p>
              <p>
                Key observations:
              </p>
              <ul className="list-inside list-disc space-y-1">
                <li>Strategy performs best in trending markets</li>
                <li>Average holding period is 45 days</li>
                <li>Maximum drawdown is within acceptable limits</li>
                <li>Consider adding stop-loss to improve risk management</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 