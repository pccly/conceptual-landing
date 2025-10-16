import { useEffect, useState } from 'react';
import type { Section } from '../types';
import { getInterpolatedColors } from '../utils/scroll';

interface ColorState {
  backgroundColor: string;
  textColor: string;
}

/**
 * Custom hook to manage smooth color transitions based on scroll progress
 */
export function useColorTransition(sections: Section[], scrollProgress: number): ColorState {
  const [colors, setColors] = useState<ColorState>({
    backgroundColor: sections[0]?.color || 'rgb(0, 0, 0)',
    textColor: sections[0]?.textColor || 'rgb(255, 255, 255)',
  });

  useEffect(() => {
    if (sections.length === 0) return;

    const interpolatedColors = getInterpolatedColors(sections, scrollProgress);
    setColors(interpolatedColors);
  }, [scrollProgress, sections]);

  return colors;
}

