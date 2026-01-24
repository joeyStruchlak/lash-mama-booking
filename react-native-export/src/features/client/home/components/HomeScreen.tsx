// Client Home Screen
// Main client-facing home with navigation and hero

import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, textStyles, borderRadius, shadows, gradients } from '@/theme';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const navigationButtons = [
    { id: 'book', label: 'Book Appointment', icon: '📅', route: '/(client)/book' },
    { id: 'services', label: 'Our Services', icon: '✨', route: '/(client)/services' },
    { id: 'vip', label: 'VIP Clients', icon: '👑', route: '/(client)/vip', isSpecial: true },
    { id: 'courses', label: 'Courses', icon: '📚', route: '/(client)/courses' },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing[4] }
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <LinearGradient
          colors={gradients.hero.colors}
          start={gradients.hero.start}
          end={gradients.hero.end}
          style={styles.heroGradient}
        >
          {/* Decorative blur circles */}
          <View style={styles.heroDecorTop} />
          <View style={styles.heroDecorBottom} />
          
          <View style={styles.heroContent}>
            <Text style={styles.heroSubtitle}>Welcome to</Text>
            <Text style={styles.heroTitle}>Lash Mama</Text>
            <Text style={styles.heroDescription}>
              Premium lash extensions & beauty services in Sydney
            </Text>
            
            {/* Social proof */}
            <View style={styles.socialProof}>
              <View style={styles.proofItem}>
                <Text style={styles.proofValue}>15+</Text>
                <Text style={styles.proofLabel}>Years Experience</Text>
              </View>
              <View style={styles.proofDivider} />
              <View style={styles.proofItem}>
                <Text style={styles.proofValue}>500+</Text>
                <Text style={styles.proofLabel}>Happy Clients</Text>
              </View>
              <View style={styles.proofDivider} />
              <View style={styles.proofItem}>
                <Text style={styles.proofValue}>5★</Text>
                <Text style={styles.proofLabel}>Google Rating</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Navigation Buttons Grid */}
      <View style={styles.navGrid}>
        {navigationButtons.map((button) => (
          <Pressable
            key={button.id}
            style={({ pressed }) => [
              styles.navButton,
              button.isSpecial && styles.navButtonSpecial,
              pressed && styles.navButtonPressed,
            ]}
            onPress={() => router.push(button.route as any)}
          >
            {button.isSpecial && (
              <LinearGradient
                colors={gradients.goldSubtle.colors}
                style={StyleSheet.absoluteFill}
              />
            )}
            <Text style={styles.navButtonIcon}>{button.icon}</Text>
            <Text style={[
              styles.navButtonLabel,
              button.isSpecial && styles.navButtonLabelSpecial
            ]}>
              {button.label}
            </Text>
            {button.isSpecial && (
              <View style={styles.specialBadge}>
                <Text style={styles.specialBadgeText}>Exclusive</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      {/* Featured Services Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <Pressable onPress={() => router.push('/(client)/services')}>
            <Text style={styles.sectionLink}>View All</Text>
          </Pressable>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesScroll}
        >
          {[
            { name: 'Volume Full Set', price: '$280', duration: '2.5 hrs' },
            { name: 'Mega Volume Refill', price: '$140', duration: '1.5 hrs' },
            { name: 'Natural Lashes', price: '$200', duration: '2 hrs' },
          ].map((service, index) => (
            <Card key={index} style={styles.serviceCard} variant="elevated">
              <View style={styles.serviceImagePlaceholder}>
                <Text style={styles.servicePlaceholderText}>✨</Text>
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
              <View style={styles.serviceDetails}>
                <Text style={styles.servicePrice}>{service.price}</Text>
                <Text style={styles.serviceDuration}>{service.duration}</Text>
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Waiting List Section */}
      <Card style={styles.waitingListCard} variant="luxury">
        <View style={styles.waitingListHeader}>
          <View style={styles.waitingListIcon}>
            <Text style={styles.waitingListIconText}>⏰</Text>
          </View>
          <View style={styles.waitingListContent}>
            <Text style={styles.waitingListTitle}>Waiting List with Purni</Text>
            <Text style={styles.waitingListSubtitle}>Book directly with the CEO</Text>
          </View>
        </View>
        <Button 
          title="Join Waiting List" 
          variant="luxury"
          onPress={() => {}}
        />
      </Card>

      {/* Testimonials Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What Our Clients Say</Text>
        <Card style={styles.testimonialCard}>
          <Text style={styles.testimonialQuote}>
            "Best lash extensions I've ever had! The attention to detail is incredible."
          </Text>
          <View style={styles.testimonialAuthor}>
            <View style={styles.testimonialAvatar}>
              <Text style={styles.testimonialAvatarText}>S</Text>
            </View>
            <View>
              <Text style={styles.testimonialName}>Sarah M.</Text>
              <Text style={styles.testimonialDate}>VIP Member</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Bottom spacing for tab bar */}
      <View style={{ height: spacing[24] }} />
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
    marginBottom: spacing[6],
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    ...shadows.lg,
  },
  heroGradient: {
    padding: spacing[6],
    paddingVertical: spacing[10],
    position: 'relative',
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
  heroSubtitle: {
    ...textStyles.bodySmall,
    color: colors.cream.dark,
    opacity: 0.8,
    marginBottom: spacing[1],
  },
  heroTitle: {
    ...textStyles.h1,
    color: colors.cream.DEFAULT,
    marginBottom: spacing[2],
  },
  heroDescription: {
    ...textStyles.body,
    color: colors.cream.dark,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  
  // Social proof
  socialProof: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.xl,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  proofItem: {
    alignItems: 'center',
    flex: 1,
  },
  proofValue: {
    ...textStyles.h3,
    color: colors.gold.DEFAULT,
  },
  proofLabel: {
    ...textStyles.caption,
    color: colors.cream.dark,
    opacity: 0.7,
  },
  proofDivider: {
    width: 1,
    height: spacing[8],
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: spacing[3],
  },
  
  // Navigation grid
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing[2],
    marginBottom: spacing[6],
  },
  navButton: {
    width: '50%',
    padding: spacing[2],
  },
  navButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  navButtonSpecial: {
    // Special styling handled by gradient
  },
  navButtonIcon: {
    fontSize: 32,
    marginBottom: spacing[2],
  },
  navButtonLabel: {
    ...textStyles.label,
    color: colors.foreground,
    textAlign: 'center',
  },
  navButtonLabelSpecial: {
    color: colors.gold.dark,
  },
  specialBadge: {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
    backgroundColor: colors.gold.DEFAULT,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[0.5],
    borderRadius: borderRadius.full,
  },
  specialBadgeText: {
    ...textStyles.caption,
    color: colors.cream.DEFAULT,
    fontWeight: '600',
  },
  
  // Sections
  section: {
    marginBottom: spacing[6],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  sectionTitle: {
    ...textStyles.h3,
    color: colors.foreground,
  },
  sectionLink: {
    ...textStyles.label,
    color: colors.gold.DEFAULT,
  },
  
  // Services
  servicesScroll: {
    paddingRight: spacing[4],
  },
  serviceCard: {
    width: 180,
    marginRight: spacing[3],
    padding: spacing[3],
  },
  serviceImagePlaceholder: {
    height: 100,
    backgroundColor: colors.beige.DEFAULT,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  servicePlaceholderText: {
    fontSize: 32,
  },
  serviceName: {
    ...textStyles.label,
    color: colors.foreground,
    marginBottom: spacing[2],
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  servicePrice: {
    ...textStyles.h4,
    color: colors.gold.DEFAULT,
  },
  serviceDuration: {
    ...textStyles.caption,
    color: colors.muted.foreground,
  },
  
  // Waiting list
  waitingListCard: {
    marginBottom: spacing[6],
    padding: spacing[5],
  },
  waitingListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  waitingListIcon: {
    width: spacing[12],
    height: spacing[12],
    borderRadius: borderRadius.xl,
    backgroundColor: colors.gold.subtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  waitingListIconText: {
    fontSize: 24,
  },
  waitingListContent: {
    flex: 1,
  },
  waitingListTitle: {
    ...textStyles.h4,
    color: colors.foreground,
  },
  waitingListSubtitle: {
    ...textStyles.bodySmall,
    color: colors.muted.foreground,
  },
  
  // Testimonials
  testimonialCard: {
    padding: spacing[5],
  },
  testimonialQuote: {
    ...textStyles.body,
    color: colors.foreground,
    fontStyle: 'italic',
    marginBottom: spacing[4],
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialAvatar: {
    width: spacing[10],
    height: spacing[10],
    borderRadius: spacing[5],
    backgroundColor: colors.gold.subtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  testimonialAvatarText: {
    ...textStyles.h4,
    color: colors.gold.DEFAULT,
  },
  testimonialName: {
    ...textStyles.label,
    color: colors.foreground,
  },
  testimonialDate: {
    ...textStyles.caption,
    color: colors.gold.DEFAULT,
  },
});

export default HomeScreen;
