import { useEffect } from "react";

/**
 * Custom hook to scroll to top on component mount and prevent scroll restoration
 */
export function useScrollToTop(): void {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);
}
