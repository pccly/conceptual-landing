/**
 * Parses an RGB color string and returns an array of [r, g, b] values
 */
export function parseRgbColor(color: string): number[] {
  const match = color.match(/\d+/g);
  return match ? match.map(Number) : [0, 0, 0];
}

/**
 * Interpolates between two RGB colors based on a factor (0-1)
 */
export function interpolateColor(color1: string, color2: string, factor: number): string {
  const rgb1 = parseRgbColor(color1);
  const rgb2 = parseRgbColor(color2);

  const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * factor);
  const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * factor);
  const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Calculates the perceived brightness of an RGB color (0-255)
 * Uses the luminance formula for better accuracy
 */
export function calculateBrightness(color: string): number {
  const [r, g, b] = parseRgbColor(color);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * Calculates a brightness multiplier for star visibility
 * Returns a value between 0.2 and 1.0
 */
export function getBrightnessMultiplier(backgroundColor: string): number {
  const brightness = calculateBrightness(backgroundColor);
  return Math.max(0.2, 1 - brightness / 255);
}

