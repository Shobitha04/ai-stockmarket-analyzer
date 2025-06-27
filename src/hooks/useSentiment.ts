import { useState } from 'react';

interface Article {
  title: string;
  url: string;
  publishedAt: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  summary: string;
}

interface AggregateSentiment {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface SentimentAnalysis {
  articles: Article[];
  aggregateSentiment: AggregateSentiment;
  analysis: string;
}

interface UseSentimentResult {
  analysis: SentimentAnalysis | null;
  loading: boolean;
  error: string | null;
  analyzeSentiment: (params: SentimentParams) => Promise<void>;
}

interface SentimentParams {
  symbol?: string;
  sector?: string;
}

export function useSentiment(): UseSentimentResult {
  const [analysis, setAnalysis] = useState<SentimentAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeSentiment = async (params: SentimentParams) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze sentiment');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    analysis,
    loading,
    error,
    analyzeSentiment,
  };
} 