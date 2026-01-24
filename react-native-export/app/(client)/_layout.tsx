// Client Routes Layout
// Bottom tab navigation for client app

import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '@/theme';

// Icons (using simple View placeholders - replace with actual icons)
const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => (
  <View
    style={[
      styles.iconContainer,
      focused && styles.iconContainerActive,
    ]}
  >
    <View style={[styles.iconPlaceholder, focused && styles.iconActive]} />
  </View>
);

export default function ClientLayout() {
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
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ focused }) => <TabIcon name="services" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: 'Book',
          tabBarIcon: ({ focused }) => <TabIcon name="book" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="vip"
        options={{
          title: 'VIP',
          tabBarIcon: ({ focused }) => <TabIcon name="vip" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'More',
          tabBarIcon: ({ focused }) => <TabIcon name="more" focused={focused} />,
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
  tabItem: {
    paddingTop: spacing[2],
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
