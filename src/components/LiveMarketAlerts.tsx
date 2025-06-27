'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Bell, X, Plus } from 'lucide-react';
import { useClientOnly } from '@/hooks/useClientOnly';

interface PriceAlert {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  targetPrice: number;
  condition: 'above' | 'below';
  isTriggered: boolean;
  createdAt: string;
  triggeredAt?: string;
}

interface MarketAlert {
  id: string;
  type: 'price' | 'volume' | 'news' | 'technical';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  symbol?: string;
  isRead: boolean;
}

const INITIAL_ALERTS: PriceAlert[] = [
  {
    id: '1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    currentPrice: 2456.75,
    targetPrice: 2500,
    condition: 'above',
    isTriggered: false,
    createdAt: '2024-01-01T09:15:00.000Z',
  },
  {
    id: '2',
    symbol: 'TCS',
    name: 'TCS Ltd',
    currentPrice: 3542.30,
    targetPrice: 3400,
    condition: 'below',
    isTriggered: true,
    createdAt: '2024-01-01T08:15:00.000Z',
    triggeredAt: '2024-01-01T09:15:00.000Z',
  },
];

const INITIAL_MARKET_ALERTS: MarketAlert[] = [
  {
    id: '1',
    type: 'price',
    title: 'Price Alert Triggered',
    message: 'TCS has dropped below ₹3,400 as you requested',
    severity: 'medium',
    timestamp: '2024-01-01T09:15:00.000Z',
    symbol: 'TCS',
    isRead: false,
  },
  {
    id: '2',
    type: 'volume',
    title: 'High Volume Activity',
    message: 'RELIANCE showing 3x higher than average volume',
    severity: 'high',
    timestamp: '2024-01-01T09:10:00.000Z',
    symbol: 'RELIANCE',
    isRead: false,
  },
  {
    id: '3',
    type: 'news',
    title: 'Market News',
    message: 'RBI policy announcement expected today at 2 PM',
    severity: 'medium',
    timestamp: '2024-01-01T09:05:00.000Z',
    isRead: true,
  },
];

export function LiveMarketAlerts() {
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(INITIAL_ALERTS);
  const [marketAlerts, setMarketAlerts] = useState<MarketAlert[]>(INITIAL_MARKET_ALERTS);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    symbol: '',
    targetPrice: '',
    condition: 'above' as 'above' | 'below',
  });
  
  const isClient = useClientOnly();

  // Simulate price updates and alert checking
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setPriceAlerts(prevAlerts =>
        prevAlerts.map(alert => {
          // Simulate price movement
          const priceChange = (Math.random() - 0.5) * 20; // ±10 price change
          const newPrice = Math.max(alert.currentPrice + priceChange, 1);
          
          // Check if alert should be triggered
          const shouldTrigger = !alert.isTriggered && (
            (alert.condition === 'above' && newPrice >= alert.targetPrice) ||
            (alert.condition === 'below' && newPrice <= alert.targetPrice)
          );

          if (shouldTrigger) {
            // Add market alert when price alert triggers
            const newMarketAlert: MarketAlert = {
              id: Date.now().toString(),
              type: 'price',
              title: 'Price Alert Triggered',
              message: `${alert.symbol} has moved ${alert.condition} ₹${alert.targetPrice}`,
              severity: 'medium',
              timestamp: new Date().toISOString(),
              symbol: alert.symbol,
              isRead: false,
            };
            setMarketAlerts(prev => [newMarketAlert, ...prev]);
          }

          return {
            ...alert,
            currentPrice: Math.round(newPrice * 100) / 100,
            isTriggered: alert.isTriggered || shouldTrigger,
            triggeredAt: shouldTrigger ? new Date().toISOString() : alert.triggeredAt,
          };
        })
      );
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [isClient]);

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlert.symbol || !newAlert.targetPrice) return;

    const alert: PriceAlert = {
      id: Date.now().toString(),
      symbol: newAlert.symbol.toUpperCase(),
      name: `${newAlert.symbol.toUpperCase()} Ltd`,
      currentPrice: Math.random() * 1000 + 500, // Mock current price
      targetPrice: parseFloat(newAlert.targetPrice),
      condition: newAlert.condition,
      isTriggered: false,
      createdAt: new Date().toISOString(),
    };

    setPriceAlerts(prev => [...prev, alert]);
    setNewAlert({ symbol: '', targetPrice: '', condition: 'above' });
    setShowAddAlert(false);
  };

  const deleteAlert = (id: string) => {
    setPriceAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const markAsRead = (id: string) => {
    setMarketAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, isRead: true } : alert
      )
    );
  };

  const dismissAlert = (id: string) => {
    setMarketAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const unreadCount = marketAlerts.filter(alert => !alert.isRead).length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'price': return <TrendingUp className="h-4 w-4" />;
      case 'volume': return <TrendingDown className="h-4 w-4" />;
      case 'news': return <Bell className="h-4 w-4" />;
      case 'technical': return <AlertTriangle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Alerts */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Market Alerts
            </h2>
            {unreadCount > 0 && (
              <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {marketAlerts.slice(0, 5).map((alert) => (
            <div
              key={alert.id}
              className={`rounded-lg border p-3 ${
                alert.isRead 
                  ? 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50' 
                  : 'border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`rounded-full p-1 ${getSeverityColor(alert.severity)}`}>
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {alert.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {alert.message}
                    </p>
                    <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        {isClient ? (() => {
                          const date = new Date(alert.timestamp);
                          return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
                        })() : '--:--:--'}
                      </span>
                      {alert.symbol && (
                        <>
                          <span>•</span>
                          <span className="font-medium">{alert.symbol}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {!alert.isRead && (
                    <button
                      onClick={() => markAsRead(alert.id)}
                      className="rounded-md p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-300"
                    >
                      <Bell className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Alerts */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Price Alerts
          </h2>
          <button
            onClick={() => setShowAddAlert(!showAddAlert)}
            className="flex items-center space-x-1 rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Alert</span>
          </button>
        </div>

        {showAddAlert && (
          <form onSubmit={handleAddAlert} className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <input
                type="text"
                placeholder="Stock Symbol (e.g., INFY)"
                value={newAlert.symbol}
                onChange={(e) => setNewAlert(prev => ({ ...prev, symbol: e.target.value }))}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
                required
              />
              <input
                type="number"
                placeholder="Target Price"
                value={newAlert.targetPrice}
                onChange={(e) => setNewAlert(prev => ({ ...prev, targetPrice: e.target.value }))}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
                required
              />
              <select
                value={newAlert.condition}
                onChange={(e) => setNewAlert(prev => ({ ...prev, condition: e.target.value as 'above' | 'below' }))}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="above">Above</option>
                <option value="below">Below</option>
              </select>
            </div>
            <div className="mt-3 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddAlert(false)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
              >
                Create Alert
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {priceAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-lg border p-3 ${
                alert.isTriggered 
                  ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
                  : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {alert.symbol}
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {alert.name}
                    </span>
                    {alert.isTriggered && (
                      <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                        Triggered
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Alert when price goes {alert.condition} ₹{alert.targetPrice.toFixed(2)}
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Current: </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ₹{alert.currentPrice.toFixed(2)}
                    </span>
                  </div>
                  {alert.triggeredAt && (
                    <div className="mt-1 text-xs text-green-600 dark:text-green-400">
                      Triggered at {isClient ? (() => {
                        const date = new Date(alert.triggeredAt);
                        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                      })() : '--/--/-- --:--'}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="rounded-md p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 