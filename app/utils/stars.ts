import type { Star } from "../types";

/**
 * Generates a random array of stars for a single section
 */
export function generateStarsForSection(starsPerSection = 100): Star[] {
  const stars: Star[] = [];

  for (let i = 0; i < starsPerSection; i++) {
    stars.push({
      x: Math.random() * 100, // Percentage
      y: Math.random() * 100, // Percentage within section
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
    });
  }

  return stars;
}

/**
 * Generates stars for all sections
 */
export function generateAllStars(
  sectionCount: number,
  starsPerSection = 100,
): Star[][] {
  return Array.from({ length: sectionCount }, () =>
    generateStarsForSection(starsPerSection),
  );
}

/**
 * Calculates star styles including position, size, and glow effect
 */
export function calculateStarStyles(
  star: Star,
  sectionIndex: number,
  brightnessMultiplier: number,
): React.CSSProperties {
  const topPosition = sectionIndex * 100 + star.y;
  const opacity = star.opacity * brightnessMultiplier;

  const styles: React.CSSProperties = {
    left: `${star.x}%`,
    top: `${topPosition}vh`,
    width: `${star.size}px`,
    height: `${star.size}px`,
    backgroundColor: "white",
    opacity: opacity.toString(),
    mixBlendMode: "screen",
  };

  // Add glow effect for larger stars
  if (star.size > 1.5) {
    styles.boxShadow = `0 0 ${star.size * 2}px ${star.size * 0.5}px rgba(255, 255, 255, ${opacity * 0.3})`;
  }

  return styles;
}
