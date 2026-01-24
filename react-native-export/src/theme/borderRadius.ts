// Lash Mama Border Radius System
// Consistent rounded corners

export const borderRadius = {
  none: 0,
  sm: 4,
  DEFAULT: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

// Semantic radius aliases
export const radius = {
  // Components
  button: borderRadius.xl,
  buttonSmall: borderRadius.lg,
  buttonPill: borderRadius.full,
  
  card: borderRadius['2xl'],
  cardLarge: borderRadius['3xl'],
  
  input: borderRadius.lg,
  
  badge: borderRadius.full,
  
  avatar: borderRadius.full,
  avatarSquare: borderRadius.xl,
  
  // Touch targets
  touchable: borderRadius.lg,
  
  // Modals/sheets
  modal: borderRadius['3xl'],
  bottomSheet: borderRadius['3xl'],
  
  // Navigation
  tabIndicator: borderRadius.full,
  navItem: borderRadius.xl,
} as const;

export type BorderRadius = typeof borderRadius;
export type Radius = typeof radius;
