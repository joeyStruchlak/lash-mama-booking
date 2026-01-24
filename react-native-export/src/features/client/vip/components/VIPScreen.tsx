// VIP Screen
// VIP membership status, benefits, and history

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, textStyles, borderRadius, shadows, gradients } from '@/theme';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

type VIPTab = 'overview' | 'benefits' | 'history';

const VIP_DISCOUNTS = [
  { id: '1', name: '$10 Off Every Refill', value: '$10', icon: '💰' },
  { id: '2', name: '$20 Off Birthday Refills', value: '$20', icon: '🎂' },
  { id: '3', name: '$30 Off Mega Volume Full Set', value: '$30', icon: '👑' },
  { id: '4', name: '$30 Off Volume Full Set', value: '$30', icon: '✨' },
  { id: '5', name: '$400 Off All Lash Courses', value: '$400', icon: '📚' },
  { id: '6', name: '$100 Gift Pack at Year End', value: '$100', icon: '🎁' },
];

const VIPScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<VIPTab>('overview');
  
  // Mock VIP data
  const vipData = {
    isVIP: true,
    memberSince: 'March 2022',
    consecutiveBookings: 12,
    streak: 12,
    referrals: 8,
    nextAppointment: {
      date: 'Jan 15, 2024',
      service: 'Mega Volume Full Set',
      artist: 'Lash Mama',
    },
  };

  const tabs: { id: VIPTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'history', label: 'History' },
  ];

  const renderOverview = () => (
    <>
      {/* Upcoming Appointment */}
      <Card style={styles.appointmentCard} variant="luxury">
        <Text style={styles.cardTitle}>Upcoming Appointment</Text>
        <View style={styles.appointmentDetails}>
          <Text style={styles.appointmentService}>{vipData.nextAppointment.service}</Text>
          <Text style={styles.appointmentMeta}>
            {vipData.nextAppointment.date} with {vipData.nextAppointment.artist}
          </Text>
        </View>
        <View style={styles.appointmentActions}>
          <Button title="Reschedule" variant="soft" size="small" />
          <Button title="View Details" variant="luxury" size="small" />
        </View>
      </Card>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{vipData.consecutiveBookings}</Text>
          <Text style={styles.statLabel}>Bookings</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValueGold}>{vipData.streak}</Text>
          <Text style={styles.statLabel}>Month Streak</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{vipData.referrals}</Text>
          <Text style={styles.statLabel}>Referrals</Text>
        </Card>
      </View>

      {/* Quick Benefits Preview */}
      <Card style={styles.benefitsPreview}>
        <View style={styles.benefitsHeader}>
          <Text style={styles.cardTitle}>Your VIP Benefits</Text>
          <Pressable onPress={() => setActiveTab('benefits')}>
            <Text style={styles.viewAllLink}>View All</Text>
          </Pressable>
        </View>
        <View style={styles.benefitsGrid}>
          {VIP_DISCOUNTS.slice(0, 3).map((discount) => (
            <View key={discount.id} style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>{discount.icon}</Text>
              <Text style={styles.benefitValue}>{discount.value}</Text>
            </View>
          ))}
        </View>
      </Card>
    </>
  );

  const renderBenefits = () => (
    <View style={styles.benefitsList}>
      {VIP_DISCOUNTS.map((discount) => (
        <Card key={discount.id} style={styles.benefitCard}>
          <View style={styles.benefitCardIcon}>
            <Text style={styles.benefitCardIconText}>{discount.icon}</Text>
          </View>
          <View style={styles.benefitCardContent}>
            <Text style={styles.benefitCardValue}>{discount.value}</Text>
            <Text style={styles.benefitCardName}>{discount.name}</Text>
          </View>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>Active</Text>
          </View>
        </Card>
      ))}
    </View>
  );

  const renderHistory = () => (
    <View style={styles.historyList}>
      {[
        { date: 'Dec 28, 2023', service: 'Volume Refills', artist: 'Nikki' },
        { date: 'Nov 30, 2023', service: 'Mega Volume Full Set', artist: 'Lash Mama' },
        { date: 'Oct 25, 2023', service: 'Volume Refills', artist: 'Nikki' },
        { date: 'Sep 28, 2023', service: 'Bridal Makeup Trial', artist: 'Beau' },
      ].map((booking, index) => (
        <Card key={index} style={styles.historyCard}>
          <View style={styles.historyIcon}>
            <Text style={styles.historyIconText}>📅</Text>
          </View>
          <View style={styles.historyContent}>
            <Text style={styles.historyService}>{booking.service}</Text>
            <Text style={styles.historyMeta}>
              {booking.date} with {booking.artist}
            </Text>
          </View>
        </Card>
      ))}
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + spacing[24] }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={[styles.heroContainer, { paddingTop: insets.top + spacing[4] }]}>
        <LinearGradient
          colors={gradients.hero.colors}
          start={gradients.hero.start}
          end={gradients.hero.end}
          style={styles.heroGradient}
        >
          <View style={styles.heroDecorTop} />
          <View style={styles.heroDecorBottom} />
          
          <View style={styles.heroContent}>
            <View style={styles.vipBadge}>
              <Text style={styles.vipBadgeIcon}>👑</Text>
            </View>
            <Text style={styles.heroTitle}>VIP Member</Text>
            <Text style={styles.heroSubtitle}>Member since {vipData.memberSince}</Text>
            
            <View style={styles.vipStatusBadge}>
              <Text style={styles.vipStatusText}>Exclusive VIP Benefits Active</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.tabActive,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.tabTextActive,
            ]}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'benefits' && renderBenefits()}
        {activeTab === 'history' && renderHistory()}
      </View>
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
  
  // Hero
  heroContainer: {
    marginBottom: spacing[4],
  },
  heroGradient: {
    padding: spacing[6],
    paddingBottom: spacing[8],
    position: 'relative',
    overflow: 'hidden',
  },
  heroDecorTop: {
    position: 'absolute',
    top: -spacing[16],
    right: -spacing[8],
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.gold.subtle,
  },
  heroDecorBottom: {
    position: 'absolute',
    bottom: -spacing[12],
    left: -spacing[8],
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.gold.subtle,
    opacity: 0.5,
  },
  heroContent: {
    alignItems: 'center',
  },
  vipBadge: {
    width: spacing[16],
    height: spacing[16],
    borderRadius: borderRadius['2xl'],
    backgroundColor: 'rgba(201, 168, 113, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  vipBadgeIcon: {
    fontSize: 32,
  },
  heroTitle: {
    ...textStyles.h1,
    color: colors.cream.DEFAULT,
    marginBottom: spacing[1],
  },
  heroSubtitle: {
    ...textStyles.body,
    color: colors.cream.dark,
    opacity: 0.8,
    marginBottom: spacing[4],
  },
  vipStatusBadge: {
    backgroundColor: 'rgba(201, 168, 113, 0.2)',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
  },
  vipStatusText: {
    ...textStyles.label,
    color: colors.gold.DEFAULT,
  },
  
  // Tabs
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
    gap: spacing[2],
  },
  tab: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2.5],
    borderRadius: borderRadius.full,
    backgroundColor: colors.beige.DEFAULT,
  },
  tabActive: {
    backgroundColor: colors.gold.DEFAULT,
  },
  tabText: {
    ...textStyles.label,
    color: colors.muted.foreground,
  },
  tabTextActive: {
    color: colors.cream.DEFAULT,
  },
  
  // Cards
  cardTitle: {
    ...textStyles.h4,
    color: colors.foreground,
    marginBottom: spacing[3],
  },
  
  // Appointment card
  appointmentCard: {
    padding: spacing[5],
    marginBottom: spacing[4],
  },
  appointmentDetails: {
    marginBottom: spacing[4],
  },
  appointmentService: {
    ...textStyles.h3,
    color: colors.foreground,
    marginBottom: spacing[1],
  },
  appointmentMeta: {
    ...textStyles.body,
    color: colors.muted.foreground,
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  
  // Stats
  statsGrid: {
    flexDirection: 'row',
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  statCard: {
    flex: 1,
    padding: spacing[4],
    alignItems: 'center',
  },
  statValue: {
    ...textStyles.h2,
    color: colors.foreground,
  },
  statValueGold: {
    ...textStyles.h2,
    color: colors.gold.DEFAULT,
  },
  statLabel: {
    ...textStyles.caption,
    color: colors.muted.foreground,
    marginTop: spacing[1],
  },
  
  // Benefits preview
  benefitsPreview: {
    padding: spacing[5],
    marginBottom: spacing[4],
  },
  benefitsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  viewAllLink: {
    ...textStyles.label,
    color: colors.gold.DEFAULT,
  },
  benefitsGrid: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  benefitItem: {
    flex: 1,
    backgroundColor: colors.gold.subtle,
    padding: spacing[3],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 24,
    marginBottom: spacing[1],
  },
  benefitValue: {
    ...textStyles.h4,
    color: colors.gold.dark,
  },
  
  // Benefits list
  benefitsList: {
    gap: spacing[3],
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
  },
  benefitCardIcon: {
    width: spacing[12],
    height: spacing[12],
    borderRadius: borderRadius.xl,
    backgroundColor: colors.gold.subtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  benefitCardIconText: {
    fontSize: 24,
  },
  benefitCardContent: {
    flex: 1,
  },
  benefitCardValue: {
    ...textStyles.h3,
    color: colors.gold.DEFAULT,
  },
  benefitCardName: {
    ...textStyles.bodySmall,
    color: colors.muted.foreground,
  },
  activeBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[0.5],
    borderRadius: borderRadius.full,
  },
  activeBadgeText: {
    ...textStyles.caption,
    color: colors.cream.DEFAULT,
    fontWeight: '600',
  },
  
  // History
  historyList: {
    gap: spacing[3],
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
  },
  historyIcon: {
    width: spacing[10],
    height: spacing[10],
    borderRadius: spacing[5],
    backgroundColor: colors.gold.subtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  historyIconText: {
    fontSize: 20,
  },
  historyContent: {
    flex: 1,
  },
  historyService: {
    ...textStyles.label,
    color: colors.foreground,
  },
  historyMeta: {
    ...textStyles.caption,
    color: colors.muted.foreground,
  },
});

export default VIPScreen;
