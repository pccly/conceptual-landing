import { useEffect, useState } from 'react';
import { calculateScrollProgress } from '../utils/scroll';

/**
 * Custom hook to track scroll progress (0-1)
 */
export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = calculateScrollProgress();
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
}

