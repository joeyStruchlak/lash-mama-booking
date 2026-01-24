// Admin screens stubs
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, textStyles } from '@/theme';
import ScreenHeader from '@/components/layout/ScreenHeader';

const AdminDashboardScreen = () => (
  <View style={styles.container}>
    <ScreenHeader title="Admin Dashboard" subtitle="Full System Access" />
    <View style={styles.content}><Text style={textStyles.h4}>Admin Dashboard</Text></View>
  </View>
);

export const ClientsScreen = () => (
  <View style={styles.container}>
    <ScreenHeader title="Clients" />
    <View style={styles.content}><Text style={textStyles.h4}>Client Database</Text></View>
  </View>
);

export const StaffManagementScreen = () => (
  <View style={styles.container}>
    <ScreenHeader title="Staff" />
    <View style={styles.content}><Text style={textStyles.h4}>Staff Management</Text></View>
  </View>
);

export const AnalyticsScreen = () => (
  <View style={styles.container}>
    <ScreenHeader title="Analytics" />
    <View style={styles.content}><Text style={textStyles.h4}>Business Analytics</Text></View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream.DEFAULT },
  content: { flex: 1, padding: spacing[4], alignItems: 'center', justifyContent: 'center' },
});

export default AdminDashboardScreen;
