import type { Section } from "../types";

/**
 * Calculates the current scroll progress as a value between 0 and 1
 */
export function calculateScrollProgress(): number {
  const scrollTop = window.scrollY;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  
  // Ensure we return a valid progress value between 0 and 1
  if (scrollHeight <= 0) return 0;
  
  const progress = scrollTop / scrollHeight;
  return Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
}

/**
 * Calculates which section the user is currently viewing
 */
export function getCurrentSectionIndex(
  progress: number,
  totalSections: number,
): number {
  if (totalSections === 0) return 0;
  const sectionProgress = progress * totalSections;
  return Math.min(Math.floor(sectionProgress), totalSections - 1);
}

/**
 * Calculates the transition progress within the current section (0-1)
 */
export function getSectionTransitionProgress(
  progress: number,
  totalSections: number,
): number {
  if (totalSections === 0) return 0;
  const sectionProgress = progress * totalSections;
  const currentSectionIndex = Math.floor(sectionProgress);
  return sectionProgress - currentSectionIndex;
}

/**
 * Gets the colors for the current scroll position with interpolation
 */
export function getInterpolatedColors(
  sections: Section[],
  scrollProgress: number,
): { backgroundColor: string; textColor: string } {
  // Return default colors if no sections are available
  if (sections.length === 0) {
    return {
      backgroundColor: "rgb(0, 0, 0)",
      textColor: "rgb(255, 255, 255)",
    };
  }

  // Ensure scrollProgress is valid
  const validProgress = Math.max(0, Math.min(1, scrollProgress));
  
  const totalSections = sections.length;
  const currentIndex = getCurrentSectionIndex(validProgress, totalSections);
  const nextIndex = Math.min(currentIndex + 1, totalSections - 1);
  const transitionProgress = getSectionTransitionProgress(
    validProgress,
    totalSections,
  );

  const currentSection = sections[Math.min(currentIndex, totalSections - 1)];
  const nextSection = sections[nextIndex];

  // Additional safety check in case sections are still undefined
  if (!currentSection || !nextSection) {
    return {
      backgroundColor: sections[0]?.color || "rgb(0, 0, 0)",
      textColor: sections[0]?.textColor || "rgb(255, 255, 255)",
    };
  }

  return {
    backgroundColor: interpolateColor(
      currentSection.color,
      nextSection.color,
      transitionProgress,
    ),
    textColor: interpolateColor(
      currentSection.textColor,
      nextSection.textColor,
      transitionProgress,
    ),
  };
}

function interpolateColor(
  color1: string,
  color2: string,
  factor: number,
): string {
  const rgb1 = color1.match(/\d+/g)?.map(Number) || [0, 0, 0];
  const rgb2 = color2.match(/\d+/g)?.map(Number) || [0, 0, 0];

  const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * factor);
  const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * factor);
  const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

