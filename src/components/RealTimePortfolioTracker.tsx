'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Eye, EyeOff } from 'lucide-react';
import { useClientTimestamp } from '@/hooks/useClientOnly';

interface PortfolioStock {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  change: number;
  changePercent: number;
  marketValue: number;
  pnl: number;
  pnlPercent: number;
  lastUpdated: string;
}

const DEFAULT_PORTFOLIO: PortfolioStock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    quantity: 10,
    avgPrice: 2400.00,
    currentPrice: 2456.75,
    change: 12.45,
    changePercent: 0.51,
    marketValue: 24567.50,
    pnl: 567.50,
    pnlPercent: 2.36,
    lastUpdated: '2024-01-01T09:15:00.000Z',
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    quantity: 5,
    avgPrice: 3600.00,
    currentPrice: 3542.30,
    change: -18.70,
    changePercent: -0.52,
    marketValue: 17711.50,
    pnl: -288.50,
    pnlPercent: -1.60,
    lastUpdated: '2024-01-01T09:15:00.000Z',
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    quantity: 15,
    avgPrice: 1450.00,
    currentPrice: 1489.65,
    change: 23.85,
    changePercent: 1.63,
    marketValue: 22344.75,
    pnl: 594.75,
    pnlPercent: 2.73,
    lastUpdated: '2024-01-01T09:15:00.000Z',
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank',
    quantity: 8,
    avgPrice: 1650.00,
    currentPrice: 1598.40,
    change: -8.30,
    changePercent: -0.52,
    marketValue: 12787.20,
    pnl: -412.80,
    pnlPercent: -3.13,
    lastUpdated: '2024-01-01T09:15:00.000Z',
  },
];

interface RealTimePortfolioTrackerProps {
  refreshInterval?: number;
  showValues?: boolean;
  portfolioData?: PortfolioStock[];
}

export function RealTimePortfolioTracker({ 
  refreshInterval = 3,
  showValues = true,
  portfolioData
}: RealTimePortfolioTrackerProps) {
  // Use provided portfolio data or fall back to default
  const initialPortfolio = portfolioData && portfolioData.length > 0 ? portfolioData : DEFAULT_PORTFOLIO;
  const [portfolio, setPortfolio] = useState<PortfolioStock[]>(initialPortfolio);
  const [isLive, setIsLive] = useState(true);
  const [showPortfolioValues, setShowPortfolioValues] = useState(showValues);
  
  const { timestamp: lastUpdate, updateTimestamp: updateLastUpdate, isClient } = useClientTimestamp();

  // Update portfolio when portfolioData prop changes
  useEffect(() => {
    if (portfolioData && portfolioData.length > 0) {
      setPortfolio(portfolioData);
    }
  }, [portfolioData]);

  // Calculate portfolio totals
  const portfolioTotals = portfolio.reduce(
    (acc, stock) => ({
      invested: acc.invested + (stock.quantity * stock.avgPrice),
      current: acc.current + stock.marketValue,
      pnl: acc.pnl + stock.pnl,
      dayChange: acc.dayChange + (stock.quantity * stock.change),
    }),
    { invested: 0, current: 0, pnl: 0, dayChange: 0 }
  );

  const totalPnlPercent = portfolioTotals.invested > 0 ? (portfolioTotals.pnl / portfolioTotals.invested) * 100 : 0;
  const dayChangePercent = portfolioTotals.current > 0 ? (portfolioTotals.dayChange / portfolioTotals.current) * 100 : 0;

  const updatePortfolioPrices = () => {
    setPortfolio(prevPortfolio =>
      prevPortfolio.map(stock => {
        // Simulate price movement (±1.5% max change per update)
        const changePercent = (Math.random() - 0.5) * 3; // -1.5% to +1.5%
        const priceChange = stock.currentPrice * (changePercent / 100);
        const newPrice = Math.max(stock.currentPrice + priceChange, 1);
        
        const newMarketValue = stock.quantity * newPrice;
        const newPnl = newMarketValue - (stock.quantity * stock.avgPrice);
        const newPnlPercent = (stock.quantity * stock.avgPrice) > 0 ? (newPnl / (stock.quantity * stock.avgPrice)) * 100 : 0;

        return {
          ...stock,
          currentPrice: Math.round(newPrice * 100) / 100,
          change: Math.round((stock.change + priceChange) * 100) / 100,
          changePercent: Math.round(((newPrice - (stock.currentPrice - stock.change)) / (stock.currentPrice - stock.change) * 100) * 100) / 100,
          marketValue: Math.round(newMarketValue * 100) / 100,
          pnl: Math.round(newPnl * 100) / 100,
          pnlPercent: Math.round(newPnlPercent * 100) / 100,
          lastUpdated: new Date().toISOString(),
        };
      })
    );
    updateLastUpdate();
  };

  useEffect(() => {
    if (!isLive || !isClient) return;

    const interval = setInterval(updatePortfolioPrices, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [refreshInterval, isLive, isClient]);

  const formatCurrency = (amount: number) => {
    if (!showPortfolioValues) return '••••••';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    if (!showPortfolioValues) return '••••';
    return num.toFixed(decimals);
  };

  return (
    <div className="space-y-4">
      {/* Portfolio Summary */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className={`h-5 w-5 ${isLive ? 'text-green-500 animate-pulse' : 'text-gray-400'}`} />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Live Portfolio Tracker
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Updated: {lastUpdate && isClient ? `${lastUpdate.getHours().toString().padStart(2, '0')}:${lastUpdate.getMinutes().toString().padStart(2, '0')}:${lastUpdate.getSeconds().toString().padStart(2, '0')}` : '--:--:--'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPortfolioValues(!showPortfolioValues)}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              {showPortfolioValues ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsLive(!isLive)}
              className={`rounded-md px-3 py-1 text-sm font-medium ${
                isLive 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {isLive ? 'LIVE' : 'PAUSED'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Invested</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(portfolioTotals.invested)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Value</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(portfolioTotals.current)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total P&L</p>
            <p className={`text-xl font-bold ${
              portfolioTotals.pnl >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {portfolioTotals.pnl >= 0 ? '+' : ''}{formatCurrency(portfolioTotals.pnl)}
            </p>
            <p className={`text-sm ${
              totalPnlPercent >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ({totalPnlPercent >= 0 ? '+' : ''}{formatNumber(totalPnlPercent)}%)
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Day Change</p>
            <p className={`text-xl font-bold ${
              portfolioTotals.dayChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {portfolioTotals.dayChange >= 0 ? '+' : ''}{formatCurrency(portfolioTotals.dayChange)}
            </p>
            <p className={`text-sm ${
              dayChangePercent >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ({dayChangePercent >= 0 ? '+' : ''}{formatNumber(dayChangePercent)}%)
            </p>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Holdings ({portfolio.length} {portfolio.length === 1 ? 'stock' : 'stocks'})
        </h3>
        {portfolio.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No stocks in your portfolio yet.</p>
            <p className="text-sm mt-1">Add stocks using the "Add Stock" button above to see live tracking here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Qty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Avg Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">LTP</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Day Change</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Market Value</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {portfolio.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="whitespace-nowrap px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{stock.symbol}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-32">{stock.name}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-900 dark:text-white">
                      {stock.quantity}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-900 dark:text-white">
                      ₹{formatNumber(stock.avgPrice)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="text-gray-900 dark:text-white">₹{formatNumber(stock.currentPrice)}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {isClient ? (() => {
                          const date = new Date(stock.lastUpdated);
                          return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
                        })() : '--:--:--'}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center">
                        {stock.changePercent > 0 ? (
                          <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                        )}
                        <div className={stock.changePercent > 0 ? 'text-green-600' : 'text-red-600'}>
                          <div>{stock.change > 0 ? '+' : ''}₹{formatNumber(stock.change)}</div>
                          <div className="text-xs">({stock.changePercent > 0 ? '+' : ''}{formatNumber(stock.changePercent)}%)</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-900 dark:text-white">
                      {formatCurrency(stock.marketValue)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className={stock.pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                        <div>{stock.pnl >= 0 ? '+' : ''}{formatCurrency(stock.pnl)}</div>
                        <div className="text-xs">({stock.pnlPercent >= 0 ? '+' : ''}{formatNumber(stock.pnlPercent)}%)</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 