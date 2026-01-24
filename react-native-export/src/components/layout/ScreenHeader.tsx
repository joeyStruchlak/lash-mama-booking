// Screen Header Component
// Consistent header for screens

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, textStyles } from '@/theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

const ScreenHeader = ({ 
  title, 
  subtitle, 
  showBack = false,
  rightAction 
}: ScreenHeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing[2] }]}>
      <View style={styles.content}>
        {showBack && (
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cream.DEFAULT,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  backButton: {
    marginRight: spacing[3],
    padding: spacing[1],
  },
  backIcon: {
    fontSize: 28,
    color: colors.gold.DEFAULT,
    fontWeight: '300',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...textStyles.h3,
    color: colors.foreground,
  },
  subtitle: {
    ...textStyles.caption,
    color: colors.muted.foreground,
    marginTop: spacing[0.5],
  },
  rightAction: {
    marginLeft: spacing[3],
  },
});

export default ScreenHeader;
