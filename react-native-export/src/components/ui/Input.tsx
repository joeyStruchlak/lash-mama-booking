// Input Component
// Styled text input with label and error states

import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors, spacing, textStyles, borderRadius } from '@/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = ({ label, error, helperText, style, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.muted.foreground}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {helperText && !error && <Text style={styles.helper}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  label: {
    ...textStyles.label,
    color: colors.foreground,
    marginBottom: spacing[2],
  },
  input: {
    ...textStyles.body,
    backgroundColor: colors.cream.light,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    color: colors.foreground,
  },
  inputFocused: {
    borderColor: colors.gold.DEFAULT,
    backgroundColor: colors.cream.DEFAULT,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    ...textStyles.caption,
    color: colors.error,
    marginTop: spacing[1],
  },
  helper: {
    ...textStyles.caption,
    color: colors.muted.foreground,
    marginTop: spacing[1],
  },
});

export default Input;
