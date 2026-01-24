// Staff Routes Layout
// Bottom tab navigation for staff app

import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '@/theme';

const TabIcon = ({ focused }: { focused: boolean }) => (
  <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
    <View style={[styles.iconPlaceholder, focused && styles.iconActive]} />
  </View>
);

export default function StaffLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          { paddingBottom: Math.max(insets.bottom, spacing[2]) },
        ],
        tabBarActiveTintColor: colors.gold.DEFAULT,
        tabBarInactiveTintColor: colors.muted.foreground,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.cream.light,
    borderTopWidth: 0,
    height: spacing[16],
    ...Platform.select({
      ios: shadows.md,
      android: { elevation: 8 },
    }),
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: spacing[0.5],
  },
  iconContainer: {
    width: spacing[7],
    height: spacing[7],
    borderRadius: radius.navItem,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerActive: {
    backgroundColor: colors.gold.subtle,
  },
  iconPlaceholder: {
    width: spacing[5],
    height: spacing[5],
    borderRadius: spacing[1],
    backgroundColor: colors.muted.foreground,
  },
  iconActive: {
    backgroundColor: colors.gold.DEFAULT,
  },
});
