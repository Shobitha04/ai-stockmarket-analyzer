'use client';

import { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RealTimePortfolioTracker } from '@/components/RealTimePortfolioTracker';
import { ClientOnly } from '@/components/ClientOnly';
import { Search, Plus, X, TrendingUp, TrendingDown } from 'lucide-react';

// Sample data - replace with real data from API
const sectorAllocation = [
  { name: 'IT', value: 35 },
  { name: 'Banking', value: 25 },
  { name: 'FMCG', value: 15 },
  { name: 'Auto', value: 15 },
  { name: 'Pharma', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Interface for stock search results
interface StockSearchResult {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
}

// Interface for portfolio stock
interface PortfolioStock {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: string;
  sector: string;
  totalValue: number;
  totalInvestment: number;
  absolutePnL: number;
}

// Interface for real-time portfolio stock (used by RealTimePortfolioTracker)
interface RealTimePortfolioStock {
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

// Initial portfolio stocks
const initialPortfolioStocks: PortfolioStock[] = [
  {
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    quantity: 10,
    avgPrice: 1450,
    currentPrice: 1520,
    pnl: '+4.83%',
    sector: 'IT',
    totalValue: 15200,
    totalInvestment: 14500,
    absolutePnL: 700,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    quantity: 5,
    avgPrice: 3200,
    currentPrice: 3350,
    pnl: '+4.69%',
    sector: 'IT',
    totalValue: 16750,
    totalInvestment: 16000,
    absolutePnL: 750,
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    quantity: 15,
    avgPrice: 1600,
    currentPrice: 1580,
    pnl: '-1.25%',
    sector: 'Banking',
    totalValue: 23700,
    totalInvestment: 24000,
    absolutePnL: -300,
  },
];

// Stock Search Component
function StockSearch({ onStockSelect }: { onStockSelect: (stock: StockSearchResult) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<StockSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 1) {
        searchStocks(searchTerm);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchStocks = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/stock?search=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.stocks || []);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error searching stocks:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStockSelect = (stock: StockSearchResult) => {
    onStockSelect(stock);
    setSearchTerm('');
    setSearchResults([]);
    setShowDropdown(false);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search stocks (e.g., TCS, Force Motors, HDFC...)"
          className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          onFocus={() => searchTerm.length >= 1 && setShowDropdown(true)}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 max-h-80 overflow-y-auto">
          {searchResults.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => handleStockSelect(stock)}
              className="cursor-pointer px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">{stock.symbol}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                      {stock.sector}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {stock.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 dark:text-white">
                    ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className={`text-sm flex items-center ${
                    stock.changePercent > 0 ? 'text-green-600' : stock.changePercent < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stock.changePercent > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : stock.changePercent < 0 ? (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    ) : null}
                    {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {showDropdown && searchResults.length === 0 && searchTerm.length >= 1 && !isLoading && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 p-4 text-center text-gray-500 dark:text-gray-400">
          No stocks found for "{searchTerm}"
        </div>
      )}
    </div>
  );
}

// Add Stock Form Component
function AddStockForm({ selectedStock, onClose, onAdd }: { 
  selectedStock: StockSearchResult | null; 
  onClose: () => void; 
  onAdd: (stock: PortfolioStock) => void;
}) {
  const [quantity, setQuantity] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  useEffect(() => {
    if (selectedStock) {
      setAvgPrice(selectedStock.price.toString());
    }
  }, [selectedStock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStock || !quantity || !avgPrice) return;

    const qty = parseInt(quantity);
    const price = parseFloat(avgPrice);
    const totalInvestment = qty * price;
    const totalValue = qty * selectedStock.price;
    const absolutePnL = totalValue - totalInvestment;
    const pnlPercent = ((absolutePnL / totalInvestment) * 100).toFixed(2);

    const newStock: PortfolioStock = {
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      quantity: qty,
      avgPrice: price,
      currentPrice: selectedStock.price,
      pnl: `${absolutePnL >= 0 ? '+' : ''}${pnlPercent}%`,
      sector: selectedStock.sector,
      totalValue,
      totalInvestment,
      absolutePnL,
    };

    onAdd(newStock);
    onClose();
    setQuantity('');
    setAvgPrice('');
    setPurchaseDate('');
  };

  if (!selectedStock) return null;

  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Add Stock to Portfolio</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Selected Stock Info */}
      <div className="mb-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{selectedStock.symbol}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{selectedStock.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{selectedStock.sector}</div>
          </div>
          <div className="text-right">
            <div className="font-medium text-gray-900 dark:text-white">
              ₹{selectedStock.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`text-sm ${
              selectedStock.changePercent > 0 ? 'text-green-600' : selectedStock.changePercent < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {selectedStock.changePercent > 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              placeholder="Number of shares"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Average Buy Price</label>
            <input
              type="number"
              value={avgPrice}
              onChange={(e) => setAvgPrice(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              placeholder="Price per share"
              step="0.01"
              min="0.01"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Purchase Date (Optional)</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Investment Preview */}
        {quantity && avgPrice && (
          <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Investment Preview</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700 dark:text-blue-300">Total Investment:</span>
                <div className="font-medium text-blue-900 dark:text-blue-100">
                  ₹{(parseInt(quantity || '0') * parseFloat(avgPrice || '0')).toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <span className="text-blue-700 dark:text-blue-300">Current Value:</span>
                <div className="font-medium text-blue-900 dark:text-blue-100">
                  ₹{(parseInt(quantity || '0') * selectedStock.price).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add to Portfolio
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Portfolio() {
  const [showAddStock, setShowAddStock] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockSearchResult | null>(null);
  const [portfolioStocks, setPortfolioStocks] = useState<PortfolioStock[]>(initialPortfolioStocks);

  const handleStockSelect = (stock: StockSearchResult) => {
    setSelectedStock(stock);
    setShowAddStock(true);
  };

  const handleAddStock = (stock: PortfolioStock) => {
    setPortfolioStocks(prev => [...prev, stock]);
    setSelectedStock(null);
    setShowAddStock(false);
  };

  const handleRemoveStock = (symbol: string) => {
    setPortfolioStocks(prev => prev.filter(stock => stock.symbol !== symbol));
  };

  const closeAddStock = () => {
    setShowAddStock(false);
    setSelectedStock(null);
  };

  // Calculate portfolio totals
  const totalInvestment = portfolioStocks.reduce((sum, stock) => sum + stock.totalInvestment, 0);
  const totalValue = portfolioStocks.reduce((sum, stock) => sum + stock.totalValue, 0);
  const totalPnL = totalValue - totalInvestment;
  const totalPnLPercent = totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : '0.00';

  // Convert portfolio stocks to real-time format for the tracker
  const realTimePortfolioStocks: RealTimePortfolioStock[] = portfolioStocks.map(stock => ({
    symbol: stock.symbol,
    name: stock.name,
    quantity: stock.quantity,
    avgPrice: stock.avgPrice,
    currentPrice: stock.currentPrice,
    change: stock.currentPrice - stock.avgPrice, // Simplified change calculation
    changePercent: parseFloat(stock.pnl.replace('%', '').replace('+', '')),
    marketValue: stock.totalValue,
    pnl: stock.absolutePnL,
    pnlPercent: parseFloat(stock.pnl.replace('%', '').replace('+', '')),
    lastUpdated: new Date().toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Portfolio Analysis</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Track and analyze your stock portfolio with AI-powered insights
          </p>
        </div>
        <button
          onClick={() => setShowAddStock(!showAddStock)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Stock</span>
        </button>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Investment</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{totalInvestment.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">Current Value</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{totalValue.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total P&L</div>
          <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalPnL >= 0 ? '+' : ''}₹{Math.abs(totalPnL).toLocaleString('en-IN')}
            <span className="text-sm ml-2">({totalPnL >= 0 ? '+' : ''}{totalPnLPercent}%)</span>
          </div>
        </div>
      </div>

      {/* Add Stock Section */}
      {showAddStock && !selectedStock && (
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Search & Add Stock</h2>
            <button
              onClick={closeAddStock}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <StockSearch onStockSelect={handleStockSelect} />
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Search for any Indian stock by symbol or company name. Real-time prices are displayed.
          </div>
        </div>
      )}

      {/* Add Stock Form */}
      {showAddStock && selectedStock && (
        <AddStockForm
          selectedStock={selectedStock}
          onClose={closeAddStock}
          onAdd={handleAddStock}
        />
      )}

      {/* Real-Time Portfolio Tracker */}
      <ClientOnly fallback={
        <div className="space-y-4">
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-1/3"></div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded dark:bg-gray-700"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }>
        <RealTimePortfolioTracker 
          refreshInterval={3} 
          portfolioData={realTimePortfolioStocks}
        />
      </ClientOnly>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Sector Allocation */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Sector Allocation</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Your Holdings ({portfolioStocks.length} stocks)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Qty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Avg Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Current</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">P&L</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {portfolioStocks.map((stock) => (
                  <tr key={stock.symbol}>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{stock.symbol}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-32">{stock.name}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-900 dark:text-white">{stock.quantity}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-900 dark:text-white">₹{stock.avgPrice.toLocaleString('en-IN')}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-900 dark:text-white">₹{stock.currentPrice.toLocaleString('en-IN')}</td>
                    <td className={`whitespace-nowrap px-4 py-3 ${
                      stock.pnl.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <div>{stock.pnl}</div>
                      <div className="text-xs">
                        {stock.absolutePnL >= 0 ? '+' : ''}₹{Math.abs(stock.absolutePnL).toLocaleString('en-IN')}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <button
                        onClick={() => handleRemoveStock(stock.symbol)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        title="Remove from portfolio"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {portfolioStocks.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                      No stocks in portfolio. Click "Add Stock" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">AI Portfolio Insights</h2>
        <div className="space-y-4">
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-700 dark:text-blue-200">
              Your portfolio shows a total {totalPnL >= 0 ? 'gain' : 'loss'} of ₹{Math.abs(totalPnL).toLocaleString('en-IN')} ({totalPnL >= 0 ? '+' : ''}{totalPnLPercent}%). 
              {totalPnL >= 0 ? ' Great performance!' : ' Consider reviewing your holdings.'}
            </p>
          </div>
          <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-700 dark:text-yellow-200">
              Your portfolio is weighted towards IT and Banking sectors. Consider diversifying into other sectors like Pharma, FMCG, or Energy to reduce risk.
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <p className="text-sm text-green-700 dark:text-green-200">
              You can easily add more stocks using our comprehensive search feature. We have {portfolioStocks.length > 0 ? 'over 100' : 'over 100'} Indian stocks available with real-time prices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 