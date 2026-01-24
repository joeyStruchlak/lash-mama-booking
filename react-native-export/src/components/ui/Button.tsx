// Button Component
// Reusable button with luxury variants

import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, textStyles, borderRadius, shadows, gradients } from '@/theme';

type ButtonVariant = 'luxury' | 'soft' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

const Button = ({
  title,
  onPress,
  variant = 'luxury',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  fullWidth = false,
}: ButtonProps) => {
  const sizeStyles = {
    small: {
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[2],
      borderRadius: borderRadius.lg,
    },
    medium: {
      paddingHorizontal: spacing[6],
      paddingVertical: spacing[3],
      borderRadius: borderRadius.xl,
    },
    large: {
      paddingHorizontal: spacing[8],
      paddingVertical: spacing[4],
      borderRadius: borderRadius['2xl'],
    },
  };

  const textSizeStyles = {
    small: textStyles.buttonSmall,
    medium: textStyles.button,
    large: textStyles.button,
  };

  const isLuxury = variant === 'luxury';

  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator 
          color={isLuxury ? colors.cream.DEFAULT : colors.gold.DEFAULT} 
          size="small" 
        />
      ) : (
        <Text style={[
          textSizeStyles[size],
          styles[`${variant}Text` as keyof typeof styles] as TextStyle,
          disabled && styles.disabledText,
        ]}>
          {title}
        </Text>
      )}
    </>
  );

  if (isLuxury && !disabled) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={({ pressed }) => [
          styles.base,
          sizeStyles[size],
          fullWidth && styles.fullWidth,
          pressed && styles.pressed,
          style,
        ]}
      >
        <LinearGradient
          colors={gradients.gold.colors}
          start={gradients.gold.start}
          end={gradients.gold.end}
          style={[StyleSheet.absoluteFill, { borderRadius: sizeStyles[size].borderRadius }]}
        />
        {buttonContent}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        styles[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {buttonContent}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },

  // Variants
  luxury: {
    backgroundColor: colors.gold.DEFAULT,
    ...shadows.gold,
  },
  luxuryText: {
    color: colors.cream.DEFAULT,
  },
  
  soft: {
    backgroundColor: colors.gold.subtle,
  },
  softText: {
    color: colors.gold.dark,
  },
  
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.gold.DEFAULT,
  },
  outlineText: {
    color: colors.gold.DEFAULT,
  },
  
  ghost: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: colors.gold.DEFAULT,
  },
});

export default Button;
