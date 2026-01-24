// Lash Mama Premium Color Palette
// Gold-standard luxury beauty theme

export const colors = {
  // Primary Brand Colors
  gold: {
    DEFAULT: '#C9A871',
    light: '#D4B88A',
    dark: '#B8975F',
    muted: 'rgba(201, 168, 113, 0.6)',
    subtle: 'rgba(201, 168, 113, 0.15)',
  },
  
  // Background Colors
  cream: {
    DEFAULT: '#FAF7F2',
    light: '#FDFCFA',
    dark: '#F5F1E8',
  },
  
  beige: {
    DEFAULT: '#F5F1E8',
    light: '#F8F5EE',
    dark: '#EDE7DB',
  },
  
  charcoal: {
    DEFAULT: '#2C2C2C',
    light: '#3D3D3D',
    dark: '#1A1A1A',
  },
  
  // Semantic Colors
  foreground: '#2C2C2C',
  background: '#FAF7F2',
  
  muted: {
    DEFAULT: '#F5F1E8',
    foreground: '#737373',
  },
  
  // Status Colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // UI Colors
  border: 'rgba(201, 168, 113, 0.2)',
  ring: 'rgba(201, 168, 113, 0.5)',
  
  // Overlay Colors
  overlay: {
    light: 'rgba(250, 247, 242, 0.95)',
    dark: 'rgba(44, 44, 44, 0.8)',
  },
} as const;

export type Colors = typeof colors;
