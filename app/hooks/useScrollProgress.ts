import { useEffect, useState } from "react";
import { calculateScrollProgress } from "../utils/scroll";

/**
 * Custom hook to track scroll progress (0-1) with smooth interpolation
 */
export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = calculateScrollProgress();
      setScrollProgress(progress);
    };

    // Initial call with a small delay to ensure DOM is ready
    const initialTimeout = setTimeout(() => {
      handleScroll();
    }, 0);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollProgress;
}

