// Stub screens for remaining features
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, textStyles } from '@/theme';
import ScreenHeader from '@/components/layout/ScreenHeader';

export const StaffHomeScreen = () => (
  <View style={styles.container}>
    <ScreenHeader title="Welcome Back" subtitle="Staff Portal" />
    <View style={styles.content}><Text style={textStyles.h4}>Staff Home</Text></View>
  </View>
);

export const MessagesScreen = () => (
  <View style={styles.container}>
    <ScreenHeader title="Messages" />
    <View style={styles.content}><Text style={textStyles.h4}>Messages</Text></View>
  </View>
);

export const NotesScreen = () => (
  <View style={styles.container}>
    <ScreenHeader title="Client Notes" />
    <View style={styles.content}><Text style={textStyles.h4}>Notes</Text></View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream.DEFAULT },
  content: { flex: 1, padding: spacing[4], alignItems: 'center', justifyContent: 'center' },
});

export default StaffHomeScreen;
