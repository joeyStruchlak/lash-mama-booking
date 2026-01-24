// Lash Mama Gradient System
// Luxury gradient configurations for LinearGradient

import { colors } from './colors';

export const gradients = {
  // Primary gold gradient (for buttons, headers)
  gold: {
    colors: [colors.gold.DEFAULT, colors.gold.dark],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  
  goldLight: {
    colors: [colors.gold.light, colors.gold.DEFAULT],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  
  goldSubtle: {
    colors: ['rgba(201, 168, 113, 0.15)', 'rgba(201, 168, 113, 0.05)'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  
  // Background gradients
  cream: {
    colors: [colors.cream.light, colors.cream.dark],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  
  beige: {
    colors: [colors.beige.light, colors.beige.dark],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  
  // Hero gradients
  hero: {
    colors: [colors.charcoal.DEFAULT, colors.charcoal.dark],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  
  heroOverlay: {
    colors: ['rgba(44, 44, 44, 0.9)', 'rgba(44, 44, 44, 0.7)'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  
  // Card gradients
  cardLuxury: {
    colors: ['rgba(201, 168, 113, 0.1)', colors.cream.DEFAULT],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  
  cardElevated: {
    colors: [colors.cream.light, colors.beige.light],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  
  // Status gradients
  success: {
    colors: ['#22C55E', '#16A34A'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  
  warning: {
    colors: ['#F59E0B', '#D97706'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  
  // VIP special gradient
  vip: {
    colors: [colors.gold.light, colors.gold.DEFAULT, colors.gold.dark],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    locations: [0, 0.5, 1],
  },
  
  // Glass effect overlay
  glass: {
    colors: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
} as const;

export type Gradients = typeof gradients;
