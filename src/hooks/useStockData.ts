import { useState, useEffect, useCallback } from 'react';

interface StockData {
  quote: {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    high: number;
    low: number;
  };
  overview: {
    name: string;
    sector: string;
    industry: string;
    marketCap: string;
    peRatio: string;
    dividendYield: string;
    eps: string;
  };
  news: Array<{
    title: string;
    url: string;
    publishedAt: string;
    source: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
    summary?: string;
  }>;
}

interface UseStockDataResult {
  data: StockData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useStockData(symbol: string): UseStockDataResult {
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch stock data
      const response = await fetch(`/api/stock?symbol=${symbol}`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }

      const stockData = await response.json();
      setData(stockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    if (symbol) {
      fetchData();
    }
  }, [symbol, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
} 