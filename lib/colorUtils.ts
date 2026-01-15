/**
 * Parses a hex color string into an RGB object.
 * @param hex - The hex color string (e.g., "#RRGGBB").
 * @returns An object with r, g, b properties (0-255).
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculates the relative luminance of a color.
 * @param rgb - An object with r, g, b properties (0-255).
 * @returns The relative luminance value (0-1).
 */
function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
    const srgb = [rgb.r, rgb.g, rgb.b].map(val => val / 255);
    const linearRgb = srgb.map(val => {
      if (val <= 0.03928) {
        return val / 12.92;
      }
      return Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * linearRgb[0] + 0.7152 * linearRgb[1] + 0.0722 * linearRgb[2];
}

/**
 * Calculates the contrast ratio between two colors based on WCAG guidelines.
 * @param color1 - Hex string for the first color.
 * @param color2 - Hex string for the second color.
 * @returns The contrast ratio.
 */
function getContrast(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return 1;
  }

  const relLum1 = getRelativeLuminance(rgb1);
  const relLum2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(relLum1, relLum2);
  const darker = Math.min(relLum1, relLum2);

  return (lighter + 0.05) / (darker + 0.05);
}


/**
 * Selects the best color from a palette for text contrast.
 * It finds the color with the highest contrast against a target color (default white)
 * that meets a minimum contrast ratio.
 * @param palette - An array of hex color strings.
 * @param targetColor - The color to compare against (e.g., text color), defaults to white.
 * @param minContrast - The minimum acceptable contrast ratio. WCAG AA for large text is 3.
 * @returns The best hex color string, or null if none meet the criteria.
 */
export function selectBestContrastColor(
  palette: string[],
  targetColor: string = '#FFFFFF',
  minContrast: number = 3.0
): string | null {
  if (!palette || palette.length === 0) {
    return null;
  }

  const contrasts = palette.map(color => ({
    color,
    contrast: getContrast(color, targetColor),
  }));

  const suitableColors = contrasts.filter(c => c.contrast >= minContrast);

  if (suitableColors.length === 0) {
    return null; // No color meets the minimum contrast
  }

  // Sort by contrast in descending order and return the color with the highest contrast
  suitableColors.sort((a, b) => b.contrast - a.contrast);

  return suitableColors[0].color;
}
