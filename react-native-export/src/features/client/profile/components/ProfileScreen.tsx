// Profile Screen (More tab)
// User profile, settings, and additional navigation

import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, textStyles, borderRadius, shadows } from '@/theme';
import Card from '@/components/ui/Card';

interface MenuItemProps {
  icon: string;
  label: string;
  subtitle?: string;
  onPress: () => void;
  showBadge?: boolean;
}

const MenuItem = ({ icon, label, subtitle, onPress, showBadge }: MenuItemProps) => (
  <Pressable style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>
      <Text style={styles.menuIconText}>{icon}</Text>
    </View>
    <View style={styles.menuContent}>
      <Text style={styles.menuLabel}>{label}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    {showBadge && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>3</Text>
      </View>
    )}
    <Text style={styles.menuArrow}>›</Text>
  </Pressable>
);

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { 
          paddingTop: insets.top + spacing[4],
          paddingBottom: insets.bottom + spacing[24] 
        }
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SM</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Sarah Mitchell</Text>
          <View style={styles.vipBadge}>
            <Text style={styles.vipBadgeIcon}>👑</Text>
            <Text style={styles.vipBadgeText}>VIP Member</Text>
          </View>
        </View>
        <Pressable style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </Pressable>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Pressable style={styles.quickAction}>
          <View style={styles.quickActionIcon}>
            <Text style={styles.quickActionIconText}>📅</Text>
          </View>
          <Text style={styles.quickActionLabel}>My Bookings</Text>
        </Pressable>
        <Pressable style={styles.quickAction}>
          <View style={styles.quickActionIcon}>
            <Text style={styles.quickActionIconText}>🎁</Text>
          </View>
          <Text style={styles.quickActionLabel}>Refer Friend</Text>
        </Pressable>
        <Pressable style={styles.quickAction}>
          <View style={styles.quickActionIcon}>
            <Text style={styles.quickActionIconText}>💬</Text>
          </View>
          <Text style={styles.quickActionLabel}>Messages</Text>
        </Pressable>
      </View>

      {/* Menu Sections */}
      <Text style={styles.sectionTitle}>Account</Text>
      <Card style={styles.menuSection}>
        <MenuItem 
          icon="👤" 
          label="Personal Details" 
          subtitle="Name, email, phone"
          onPress={() => {}}
        />
        <View style={styles.menuDivider} />
        <MenuItem 
          icon="📍" 
          label="Address" 
          subtitle="Sydney, NSW"
          onPress={() => {}}
        />
        <View style={styles.menuDivider} />
        <MenuItem 
          icon="💳" 
          label="Payment Methods" 
          subtitle="Visa •••• 4242"
          onPress={() => {}}
        />
      </Card>

      <Text style={styles.sectionTitle}>Preferences</Text>
      <Card style={styles.menuSection}>
        <MenuItem 
          icon="🔔" 
          label="Notifications" 
          onPress={() => {}}
          showBadge
        />
        <View style={styles.menuDivider} />
        <MenuItem 
          icon="🎨" 
          label="Appearance" 
          subtitle="Light mode"
          onPress={() => {}}
        />
        <View style={styles.menuDivider} />
        <MenuItem 
          icon="🔐" 
          label="Privacy & Security" 
          onPress={() => {}}
        />
      </Card>

      <Text style={styles.sectionTitle}>More</Text>
      <Card style={styles.menuSection}>
        <MenuItem 
          icon="📚" 
          label="Courses" 
          subtitle="Learn lash artistry"
          onPress={() => {}}
        />
        <View style={styles.menuDivider} />
        <MenuItem 
          icon="📍" 
          label="Get Directions" 
          subtitle="Navigate to salon"
          onPress={() => {}}
        />
        <View style={styles.menuDivider} />
        <MenuItem 
          icon="ℹ️" 
          label="About Lash Mama" 
          onPress={() => {}}
        />
        <View style={styles.menuDivider} />
        <MenuItem 
          icon="📞" 
          label="Contact Us" 
          onPress={() => {}}
        />
      </Card>

      {/* Sign Out */}
      <Pressable style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream.DEFAULT,
  },
  content: {
    paddingHorizontal: spacing[4],
  },

  // Profile header
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  avatar: {
    width: spacing[16],
    height: spacing[16],
    borderRadius: spacing[8],
    backgroundColor: colors.gold.subtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[4],
  },
  avatarText: {
    ...textStyles.h2,
    color: colors.gold.DEFAULT,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...textStyles.h3,
    color: colors.foreground,
    marginBottom: spacing[1],
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gold.subtle,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[0.5],
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  vipBadgeIcon: {
    fontSize: 12,
    marginRight: spacing[1],
  },
  vipBadgeText: {
    ...textStyles.caption,
    color: colors.gold.dark,
    fontWeight: '600',
  },
  editButton: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gold.DEFAULT,
  },
  editButtonText: {
    ...textStyles.label,
    color: colors.gold.DEFAULT,
  },

  // Quick actions
  quickActions: {
    flexDirection: 'row',
    marginBottom: spacing[6],
    gap: spacing[3],
  },
  quickAction: {
    flex: 1,
    backgroundColor: colors.cream.light,
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    alignItems: 'center',
    ...shadows.sm,
  },
  quickActionIcon: {
    width: spacing[10],
    height: spacing[10],
    borderRadius: spacing[5],
    backgroundColor: colors.gold.subtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },
  quickActionIconText: {
    fontSize: 20,
  },
  quickActionLabel: {
    ...textStyles.caption,
    color: colors.foreground,
    textAlign: 'center',
  },

  // Sections
  sectionTitle: {
    ...textStyles.label,
    color: colors.muted.foreground,
    marginBottom: spacing[2],
    marginTop: spacing[2],
  },
  menuSection: {
    marginBottom: spacing[4],
    padding: 0,
    overflow: 'hidden',
  },

  // Menu items
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
  },
  menuIcon: {
    width: spacing[10],
    height: spacing[10],
    borderRadius: spacing[5],
    backgroundColor: colors.beige.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  menuIconText: {
    fontSize: 20,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    ...textStyles.label,
    color: colors.foreground,
  },
  menuSubtitle: {
    ...textStyles.caption,
    color: colors.muted.foreground,
  },
  menuArrow: {
    fontSize: 24,
    color: colors.muted.foreground,
    marginLeft: spacing[2],
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing[16],
  },
  badge: {
    minWidth: spacing[5],
    height: spacing[5],
    borderRadius: spacing[2.5],
    backgroundColor: colors.gold.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[1.5],
    marginRight: spacing[2],
  },
  badgeText: {
    ...textStyles.caption,
    color: colors.cream.DEFAULT,
    fontWeight: '700',
  },

  // Sign out
  signOutButton: {
    paddingVertical: spacing[4],
    alignItems: 'center',
    marginTop: spacing[4],
  },
  signOutText: {
    ...textStyles.label,
    color: colors.error,
  },

  version: {
    ...textStyles.caption,
    color: colors.muted.foreground,
    textAlign: 'center',
    marginTop: spacing[2],
  },
});

export default ProfileScreen;
