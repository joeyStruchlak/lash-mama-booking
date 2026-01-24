// Lash Mama Shadow System
// Luxury depth effects

import { Platform } from 'react-native';
import { colors } from './colors';

// iOS shadows
const iosShadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  
  sm: {
    shadowColor: colors.charcoal.DEFAULT,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  
  DEFAULT: {
    shadowColor: colors.charcoal.DEFAULT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  
  md: {
    shadowColor: colors.charcoal.DEFAULT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  
  lg: {
    shadowColor: colors.charcoal.DEFAULT,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  
  xl: {
    shadowColor: colors.charcoal.DEFAULT,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  
  // Luxury gold glow shadow
  gold: {
    shadowColor: colors.gold.DEFAULT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  
  goldSubtle: {
    shadowColor: colors.gold.DEFAULT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  
  // Inner shadow effect (simulated)
  inner: {
    shadowColor: colors.charcoal.DEFAULT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
} as const;

// Android elevation
const androidElevations = {
  none: 0,
  sm: 1,
  DEFAULT: 2,
  md: 4,
  lg: 8,
  xl: 12,
  gold: 6,
  goldSubtle: 3,
  inner: 0,
} as const;

export const shadows = Platform.select({
  ios: iosShadows,
  android: Object.fromEntries(
    Object.entries(androidElevations).map(([key, value]) => [
      key,
      { elevation: value },
    ])
  ),
  default: iosShadows,
}) as typeof iosShadows;

export type Shadows = typeof shadows;
