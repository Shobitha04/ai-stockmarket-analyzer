import { useEffect, useState } from 'react';

/**
 * Custom hook to ensure components only render on the client side
 * This prevents hydration errors for components with dynamic content
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Custom hook for client-side timestamps
 * Returns null on server, Date on client
 */
export function useClientTimestamp() {
  const [timestamp, setTimestamp] = useState<Date | null>(null);
  const isClient = useClientOnly();

  useEffect(() => {
    if (isClient) {
      setTimestamp(new Date());
    }
  }, [isClient]);

  const updateTimestamp = () => {
    if (isClient) {
      setTimestamp(new Date());
    }
  };

  return { timestamp, updateTimestamp, isClient };
} 