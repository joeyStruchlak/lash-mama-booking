// Staff Dashboard Screen
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, textStyles } from '@/theme';
import Card from '@/components/ui/Card';
import ScreenHeader from '@/components/layout/ScreenHeader';

const DashboardScreen = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={styles.container}>
      <ScreenHeader title="Dashboard" subtitle="Today's Overview" />
      <ScrollView contentContainerStyle={{ padding: spacing[4], paddingBottom: insets.bottom + spacing[24] }}>
        <Card variant="luxury" style={{ marginBottom: spacing[4], padding: spacing[5] }}>
          <Text style={textStyles.h3}>Today's Appointments</Text>
          <Text style={[textStyles.h1, { color: colors.gold.DEFAULT }]}>5</Text>
        </Card>
        <Card style={{ marginBottom: spacing[4], padding: spacing[5] }}>
          <Text style={textStyles.label}>Next Client</Text>
          <Text style={textStyles.h4}>Sarah M. - Volume Refill</Text>
          <Text style={[textStyles.caption, { color: colors.muted.foreground }]}>2:00 PM</Text>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream.DEFAULT },
});

export default DashboardScreen;
