'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, RefreshCw } from 'lucide-react';
import { useClientTimestamp } from '@/hooks/useClientOnly';

interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
}

interface SectorData {
  name: string;
  change: number;
  volume: number;
}

interface MarketBreadth {
  advances: number;
  declines: number;
  unchanged: number;
}

const INITIAL_INDICES: MarketIndex[] = [
  { symbol: 'NIFTY', name: 'NIFTY 50', value: 19845.65, change: 125.30, changePercent: 0.63, high: 19895.20, low: 19720.15, volume: '₹45,678 Cr' },
  { symbol: 'SENSEX', name: 'SENSEX', value: 66589.93, change: 418.60, changePercent: 0.63, high: 66720.45, low: 66171.33, volume: '₹38,234 Cr' },
  { symbol: 'BANKNIFTY', name: 'BANK NIFTY', value: 44582.15, change: -89.45, changePercent: -0.20, high: 44671.60, low: 44410.25, volume: '₹12,456 Cr' },
  { symbol: 'NIFTYIT', name: 'NIFTY IT', value: 31245.80, change: 285.70, changePercent: 0.92, high: 31356.45, low: 30960.15, volume: '₹8,765 Cr' },
];

const INITIAL_SECTORS: SectorData[] = [
  { name: 'IT', change: 1.2, volume: 1250 },
  { name: 'Banking', change: -0.3, volume: 2100 },
  { name: 'Auto', change: 0.8, volume: 850 },
  { name: 'Pharma', change: -0.2, volume: 650 },
  { name: 'FMCG', change: 0.5, volume: 750 },
  { name: 'Energy', change: 1.1, volume: 950 },
];

export function LiveMarketDashboard() {
  const [indices, setIndices] = useState<MarketIndex[]>(INITIAL_INDICES);
  const [sectors, setSectors] = useState<SectorData[]>(INITIAL_SECTORS);
  const [marketBreadth, setMarketBreadth] = useState<MarketBreadth>({
    advances: 1847,
    declines: 1253,
    unchanged: 156,
  });
  const [isLive, setIsLive] = useState(true);
  const [priceHistory, setPriceHistory] = useState<Array<{time: string, nifty: number}>>([]);
  
  const { timestamp: lastUpdate, updateTimestamp: updateLastUpdate, isClient } = useClientTimestamp();

  // Initialize client-side state
  useEffect(() => {
    if (!isClient) return;
    
    // Generate initial price history with static times to avoid hydration issues
    const history = [];
    for (let i = 30; i >= 0; i--) {
      // Use static time format to avoid hydration issues
      const hours = 9 + Math.floor(i / 60);
      const minutes = 15 + (i % 60);
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      history.push({
        time: timeString,
        nifty: 19845 + (Math.random() - 0.5) * 100,
      });
    }
    setPriceHistory(history);
  }, [isClient]);

  const updateMarketData = () => {
    // Update indices
    setIndices(prevIndices => 
      prevIndices.map(index => {
        const changePercent = (Math.random() - 0.5) * 2; // ±1% max change
        const priceChange = index.value * (changePercent / 100);
        const newValue = Math.max(index.value + priceChange, 1);
        
        return {
          ...index,
          value: Math.round(newValue * 100) / 100,
          change: Math.round((index.change + priceChange) * 100) / 100,
          changePercent: Math.round(((newValue - (index.value - index.change)) / (index.value - index.change) * 100) * 100) / 100,
        };
      })
    );

    // Update sectors
    setSectors(prevSectors =>
      prevSectors.map(sector => ({
        ...sector,
        change: Math.round((sector.change + (Math.random() - 0.5) * 0.5) * 100) / 100,
        volume: sector.volume + Math.floor((Math.random() - 0.5) * 100),
      }))
    );

    // Update market breadth
    setMarketBreadth(prev => {
      const total = prev.advances + prev.declines + prev.unchanged;
      const changeAmount = Math.floor((Math.random() - 0.5) * 50);
      return {
        advances: Math.max(prev.advances + changeAmount, 0),
        declines: Math.max(prev.declines - changeAmount, 0),
        unchanged: Math.max(total - (prev.advances + changeAmount) - (prev.declines - changeAmount), 0),
      };
    });

    // Update price history
    if (isClient) {
      setPriceHistory(prev => {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const newPoint = {
          time: timeString,
          nifty: indices[0].value,
        };
        return [...prev.slice(-29), newPoint]; // Keep last 30 points
      });
    }

    updateLastUpdate();
  };

  useEffect(() => {
    if (!isLive || !isClient) return;

    const interval = setInterval(updateMarketData, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, [isLive, isClient, indices]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const getMarketStatus = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    const marketOpen = 9 * 60 + 15; // 9:15 AM
    const marketClose = 15 * 60 + 30; // 3:30 PM

    if (currentTime >= marketOpen && currentTime <= marketClose) {
      return { status: 'OPEN', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' };
    } else if (currentTime < marketOpen) {
      return { status: 'PRE-MARKET', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/20' };
    } else {
      return { status: 'CLOSED', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/20' };
    }
  };

  const marketStatus = getMarketStatus();

  return (
    <div className="space-y-6">
      {/* Market Status Header */}
      <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className={`h-6 w-6 ${isLive ? 'text-green-500 animate-pulse' : 'text-gray-400'}`} />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Live Market Data</h1>
          </div>
          <div className={`rounded-full px-3 py-1 text-sm font-medium ${marketStatus.color} ${marketStatus.bg}`}>
            Market {marketStatus.status}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdate && isClient ? `${lastUpdate.getHours().toString().padStart(2, '0')}:${lastUpdate.getMinutes().toString().padStart(2, '0')}:${lastUpdate.getSeconds().toString().padStart(2, '0')}` : '--:--:--'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={updateMarketData}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <RefreshCw className="h-5 w-5" />
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

      {/* Market Indices Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {indices.map((index) => (
          <div key={index.symbol} className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(index.value)}
              </p>
              <p className={`text-sm font-medium ${
                index.changePercent > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {index.change > 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent > 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
              </p>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                <div>H: {formatNumber(index.high)} L: {formatNumber(index.low)}</div>
                <div>Volume: {index.volume}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* NIFTY Intraday Chart */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">NIFTY 50 Intraday</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={['dataMin - 50', 'dataMax + 50']} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="nifty" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Performance */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Sector Performance</h2>
          <div className="space-y-3">
            {sectors.map((sector) => (
              <div key={sector.name} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{sector.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Vol: {sector.volume}Cr
                  </span>
                  <span className={`text-sm font-medium ${
                    sector.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {sector.change > 0 ? '+' : ''}{sector.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Breadth */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Market Breadth</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{marketBreadth.advances}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Advances</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{marketBreadth.declines}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Declines</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-600">{marketBreadth.unchanged}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Unchanged</p>
          </div>
        </div>
      </div>
    </div>
  );
} 