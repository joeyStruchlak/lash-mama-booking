// Lash Mama Spacing System
// Consistent spacing scale for layouts

export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
} as const;

// Semantic spacing aliases
export const layout = {
  // Screen padding
  screenPaddingHorizontal: spacing[4],
  screenPaddingVertical: spacing[6],
  
  // Section spacing
  sectionGap: spacing[8],
  
  // Card spacing
  cardPadding: spacing[5],
  cardGap: spacing[4],
  
  // Component spacing
  inputHeight: spacing[12],
  buttonHeight: spacing[11],
  buttonHeightSmall: spacing[9],
  
  // Icon sizes
  iconSizeSmall: spacing[4],
  iconSizeMedium: spacing[5],
  iconSizeLarge: spacing[6],
  
  // Touch targets
  minTouchTarget: spacing[11],
  
  // Bottom navigation
  bottomNavHeight: spacing[20],
  tabBarHeight: spacing[14],
} as const;

export type Spacing = typeof spacing;
export type Layout = typeof layout;
