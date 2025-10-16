'use client';

import { useEffect, useRef } from 'react';
import type { Star } from '../types';
import { getBrightnessMultiplier } from '../utils/colors';
import { generateAllStars, calculateStarStyles } from '../utils/stars';

interface StarsProps {
  currentBgColor: string;
  sectionCount: number;
}

const STARS_PER_SECTION = 100;

export default function Stars({ currentBgColor, sectionCount }: StarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[][]>([]);

  // Generate and render stars on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Generate stars for all sections
    starsRef.current = generateAllStars(sectionCount, STARS_PER_SECTION);

    // Render stars to DOM
    renderStars(container, starsRef.current, currentBgColor);

    // Handle window resize
    const handleResize = () => {
      starsRef.current = generateAllStars(sectionCount, STARS_PER_SECTION);
      renderStars(container, starsRef.current, currentBgColor);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sectionCount]);

  // Update star visibility when background color changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container || starsRef.current.length === 0) return;

    updateStarVisibility(container, starsRef.current, currentBgColor);
  }, [currentBgColor]);

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: `${sectionCount * 100}vh`,
        zIndex: 5,
      }}
    />
  );
}

/**
 * Renders all stars to the DOM
 */
function renderStars(
  container: HTMLDivElement,
  allStars: Star[][],
  backgroundColor: string
): void {
  container.innerHTML = '';
  const brightnessMultiplier = getBrightnessMultiplier(backgroundColor);

  allStars.forEach((sectionStars, sectionIndex) => {
    sectionStars.forEach((star) => {
      const starElement = document.createElement('div');
      starElement.className = 'absolute rounded-full';

      const styles = calculateStarStyles(star, sectionIndex, brightnessMultiplier);
      Object.assign(starElement.style, styles);

      container.appendChild(starElement);
    });
  });
}

/**
 * Updates star opacity and glow based on background brightness
 */
function updateStarVisibility(
  container: HTMLDivElement,
  allStars: Star[][],
  backgroundColor: string
): void {
  const brightnessMultiplier = getBrightnessMultiplier(backgroundColor);
  const allStarElements = container.querySelectorAll<HTMLDivElement>('div > div');

  allStarElements.forEach((starElement, index) => {
    const sectionIndex = Math.floor(index / STARS_PER_SECTION);
    const starIndex = index % STARS_PER_SECTION;
    const star = allStars[sectionIndex]?.[starIndex];

    if (star) {
      const opacity = star.opacity * brightnessMultiplier;
      starElement.style.opacity = opacity.toString();

      // Update glow effect for larger stars
      if (star.size > 1.5) {
        starElement.style.boxShadow = `0 0 ${star.size * 2}px ${star.size * 0.5}px rgba(255, 255, 255, ${opacity * 0.3})`;
      }
    }
  });
}
