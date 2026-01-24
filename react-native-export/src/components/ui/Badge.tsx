// Badge Component
// Status badges and labels

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, textStyles, borderRadius } from '@/theme';

type BadgeVariant = 'default' | 'gold' | 'success' | 'warning' | 'error';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: string;
  style?: ViewStyle;
}

const Badge = ({ label, variant = 'default', icon, style }: BadgeProps) => {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.label, styles[`${variant}Text` as keyof typeof styles]]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[2.5],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  icon: {
    fontSize: 12,
    marginRight: spacing[1],
  },
  label: {
    ...textStyles.caption,
    fontWeight: '600',
  },

  // Variants
  default: {
    backgroundColor: colors.beige.DEFAULT,
  },
  defaultText: {
    color: colors.foreground,
  },

  gold: {
    backgroundColor: colors.gold.subtle,
  },
  goldText: {
    color: colors.gold.dark,
  },

  success: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
  },
  successText: {
    color: colors.success,
  },

  warning: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  warningText: {
    color: colors.warning,
  },

  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  errorText: {
    color: colors.error,
  },
});

export default Badge;
