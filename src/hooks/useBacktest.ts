import { useState } from 'react';

interface BacktestRequest {
  symbol: string;
  strategy: string;
  timeframe: string;
  startDate: string;
  endDate: string;
}

interface BacktestResult {
  totalReturns: string;
  trades: Array<{
    date: string;
    type: 'buy' | 'sell';
    price: number;
    reason: string;
  }>;
  metrics: {
    sharpeRatio: number;
    maxDrawdown: string;
    winRate: string;
    profitFactor: number;
  };
  analysis: string;
}

export function useBacktest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BacktestResult | null>(null);

  const runBacktest = async (request: BacktestRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/backtest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Failed to run backtest');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    runBacktest,
    loading,
    error,
    result,
  };
} 