'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useClientTimestamp } from '@/hooks/useClientOnly';

interface StockPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  lastUpdated: string;
}

const MOCK_STOCKS: StockPrice[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 12.45, changePercent: 0.51, volume: 2847392, lastUpdated: '2024-01-01T09:15:00.000Z' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3542.30, change: -18.70, changePercent: -0.52, volume: 1234567, lastUpdated: '2024-01-01T09:15:00.000Z' },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1489.65, change: 23.85, changePercent: 1.63, volume: 3456789, lastUpdated: '2024-01-01T09:15:00.000Z' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1598.40, change: -8.30, changePercent: -0.52, volume: 4567890, lastUpdated: '2024-01-01T09:15:00.000Z' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 987.25, change: 5.75, changePercent: 0.59, volume: 2345678, lastUpdated: '2024-01-01T09:15:00.000Z' },
  { symbol: 'ADANIPORTS', name: 'Adani Ports', price: 789.50, change: -12.25, changePercent: -1.53, volume: 1876543, lastUpdated: '2024-01-01T09:15:00.000Z' },
];

interface RealTimeStockTickerProps {
  refreshInterval?: number; // in seconds
  showVolume?: boolean;
  maxItems?: number;
}

export function RealTimeStockTicker({ 
  refreshInterval = 5, 
  showVolume = true, 
  maxItems = 6 
}: RealTimeStockTickerProps) {
  const [stocks, setStocks] = useState<StockPrice[]>(MOCK_STOCKS.slice(0, maxItems));
  const [isLive, setIsLive] = useState(true);
  
  const { timestamp: lastUpdate, updateTimestamp: updateLastUpdate, isClient } = useClientTimestamp();

  // Simulate real-time price updates
  const updatePrices = () => {
    setStocks(prevStocks => 
      prevStocks.map(stock => {
        // Simulate price movement (±2% max change)
        const changePercent = (Math.random() - 0.5) * 4; // -2% to +2%
        const priceChange = stock.price * (changePercent / 100);
        const newPrice = Math.max(stock.price + priceChange, 1); // Ensure price doesn't go negative
        
        // Simulate volume change
        const volumeChange = Math.floor((Math.random() - 0.5) * 100000);
        const newVolume = Math.max(stock.volume + volumeChange, 0);

        return {
          ...stock,
          price: Math.round(newPrice * 100) / 100,
          change: Math.round(priceChange * 100) / 100,
          changePercent: Math.round(changePercent * 100) / 100,
          volume: newVolume,
          lastUpdated: new Date().toISOString(),
        };
      })
    );
    updateLastUpdate();
  };

  useEffect(() => {
    if (!isLive || !isClient) return;

    const interval = setInterval(updatePrices, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [refreshInterval, isLive, isClient]);

  const formatVolume = (volume: number) => {
    if (volume >= 10000000) return `${(volume / 10000000).toFixed(1)}Cr`;
    if (volume >= 100000) return `${(volume / 100000).toFixed(1)}L`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toString();
  };

  const formatTime = (dateString: string) => {
    if (!isClient) return '--:--:--';
    const date = new Date(dateString);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className={`h-5 w-5 ${isLive ? 'text-green-500 animate-pulse' : 'text-gray-400'}`} />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Live Stock Prices
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Updated: {lastUpdate && isClient ? `${lastUpdate.getHours().toString().padStart(2, '0')}:${lastUpdate.getMinutes().toString().padStart(2, '0')}:${lastUpdate.getSeconds().toString().padStart(2, '0')}` : '--:--:--'}
          </span>
        </div>
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

      <div className="space-y-3">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{stock.symbol}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ₹{stock.price.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-end space-x-1">
                    {stock.changePercent > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      stock.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
              {showVolume && (
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Vol: {formatVolume(stock.volume)}</span>
                  <span>Last: {formatTime(stock.lastUpdated)}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Prices update every {refreshInterval} seconds • Market hours: 9:15 AM - 3:30 PM IST
        </p>
      </div>
    </div>
  );
} 