// Lash Mama Theme - Main Export
// Centralized design system access

export { colors } from './colors';
export { fontFamilies, fontSizes, fontWeights, lineHeights, letterSpacing, textStyles } from './typography';
export { spacing, layout } from './spacing';
export { shadows } from './shadows';
export { gradients } from './gradients';
export { borderRadius, radius } from './borderRadius';

// Re-export types
export type { Colors } from './colors';
export type { FontFamilies, FontSizes, TextStyles } from './typography';
export type { Spacing, Layout } from './spacing';
export type { Shadows } from './shadows';
export type { Gradients } from './gradients';
export type { BorderRadius, Radius } from './borderRadius';

// Theme object for easy access
import { colors } from './colors';
import { fontFamilies, fontSizes, fontWeights, textStyles } from './typography';
import { spacing, layout } from './spacing';
import { shadows } from './shadows';
import { gradients } from './gradients';
import { borderRadius, radius } from './borderRadius';

export const theme = {
  colors,
  fonts: {
    families: fontFamilies,
    sizes: fontSizes,
    weights: fontWeights,
  },
  textStyles,
  spacing,
  layout,
  shadows,
  gradients,
  borderRadius,
  radius,
} as const;

export type Theme = typeof theme;
export default theme;
