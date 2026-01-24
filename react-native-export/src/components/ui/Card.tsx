// Card Component
// Reusable card with luxury variants

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows, gradients } from '@/theme';

type CardVariant = 'default' | 'elevated' | 'luxury';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
}

const Card = ({ children, variant = 'default', style }: CardProps) => {
  if (variant === 'luxury') {
    return (
      <View style={[styles.base, styles.luxury, style]}>
        <LinearGradient
          colors={gradients.cardLuxury.colors}
          start={gradients.cardLuxury.start}
          end={gradients.cardLuxury.end}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.luxuryBorder} />
        {children}
      </View>
    );
  }

  return (
    <View style={[
      styles.base,
      styles[variant],
      style,
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius['2xl'],
    padding: spacing[4],
    overflow: 'hidden',
  },

  // Variants
  default: {
    backgroundColor: colors.cream.light,
    ...shadows.sm,
  },
  
  elevated: {
    backgroundColor: colors.cream.light,
    ...shadows.md,
  },
  
  luxury: {
    backgroundColor: colors.cream.light,
    ...shadows.goldSubtle,
  },
  
  luxuryBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1,
    borderColor: colors.gold.muted,
  },
});

export default Card;
