// Staff Calendar Screen  
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, textStyles } from '@/theme';
import ScreenHeader from '@/components/layout/ScreenHeader';

const CalendarScreen = () => (
  <View style={styles.container}>
    <ScreenHeader title="Calendar" subtitle="Your Schedule" />
    <View style={styles.content}>
      <Text style={textStyles.h4}>Calendar View</Text>
      <Text style={[textStyles.body, { color: colors.muted.foreground }]}>
        Calendar component implementation here
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream.DEFAULT },
  content: { flex: 1, padding: spacing[4], alignItems: 'center', justifyContent: 'center' },
});

export default CalendarScreen;
