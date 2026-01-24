// Services Screen
// Display all available services with categories

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, textStyles, borderRadius, shadows } from '@/theme';
import Card from '@/components/ui/Card';
import ScreenHeader from '@/components/layout/ScreenHeader';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
}

const SERVICES: Service[] = [
  // Lash Extensions
  { id: '1', name: 'Natural Full Set', description: 'Subtle enhancement for everyday elegance', price: '$200', duration: '2 hrs', category: 'lashes' },
  { id: '2', name: 'Hybrid Full Set', description: 'Perfect blend of classic and volume', price: '$240', duration: '2 hrs', category: 'lashes' },
  { id: '3', name: 'Volume Full Set', description: 'Dramatic, fluffy lash look', price: '$280', duration: '2.5 hrs', category: 'lashes' },
  { id: '4', name: 'Mega Volume Full Set', description: 'Maximum drama and density', price: '$320', duration: '3 hrs', category: 'lashes' },
  { id: '5', name: 'Natural Refill', description: 'Maintain your natural lashes', price: '$80', duration: '1 hr', category: 'refills' },
  { id: '6', name: 'Volume Refill', description: 'Keep your volume looking fresh', price: '$120', duration: '1.5 hrs', category: 'refills' },
  { id: '7', name: 'Mega Volume Refill', description: 'Maintain your mega volume', price: '$140', duration: '1.5 hrs', category: 'refills' },
  // Makeup
  { id: '8', name: 'Bridal Makeup', description: 'Picture-perfect wedding day look', price: '$350', duration: '2 hrs', category: 'makeup' },
  { id: '9', name: 'Special Event Makeup', description: 'Glamorous looks for any occasion', price: '$180', duration: '1 hr', category: 'makeup' },
  // Hair
  { id: '10', name: 'Bridal Hair Styling', description: 'Elegant updos and styling', price: '$300', duration: '2 hrs', category: 'hair' },
];

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'lashes', label: 'Lash Extensions' },
  { id: 'refills', label: 'Refills' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'hair', label: 'Hair' },
];

const ServicesScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Our Services" subtitle="Premium beauty services" />
      
      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((category) => (
          <Pressable
            key={category.id}
            onPress={() => setActiveCategory(category.id)}
            style={[
              styles.categoryPill,
              activeCategory === category.id && styles.categoryPillActive,
            ]}
          >
            <Text style={[
              styles.categoryText,
              activeCategory === category.id && styles.categoryTextActive,
            ]}>
              {category.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Services List */}
      <ScrollView 
        style={styles.servicesList}
        contentContainerStyle={[
          styles.servicesContent,
          { paddingBottom: insets.bottom + spacing[20] }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {filteredServices.map((service) => (
          <Card key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <View style={styles.serviceMeta}>
                <Text style={styles.servicePrice}>{service.price}</Text>
                <Text style={styles.serviceDuration}>{service.duration}</Text>
              </View>
            </View>
            <Pressable style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </Pressable>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream.DEFAULT,
  },
  
  // Categories
  categoriesContainer: {
    maxHeight: spacing[12],
    marginBottom: spacing[4],
  },
  categoriesContent: {
    paddingHorizontal: spacing[4],
    gap: spacing[2],
  },
  categoryPill: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    backgroundColor: colors.beige.DEFAULT,
    marginRight: spacing[2],
  },
  categoryPillActive: {
    backgroundColor: colors.gold.DEFAULT,
  },
  categoryText: {
    ...textStyles.label,
    color: colors.muted.foreground,
  },
  categoryTextActive: {
    color: colors.cream.DEFAULT,
  },
  
  // Services
  servicesList: {
    flex: 1,
  },
  servicesContent: {
    paddingHorizontal: spacing[4],
    gap: spacing[3],
  },
  serviceCard: {
    padding: spacing[4],
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },
  serviceInfo: {
    flex: 1,
    marginRight: spacing[3],
  },
  serviceName: {
    ...textStyles.h4,
    color: colors.foreground,
    marginBottom: spacing[1],
  },
  serviceDescription: {
    ...textStyles.bodySmall,
    color: colors.muted.foreground,
  },
  serviceMeta: {
    alignItems: 'flex-end',
  },
  servicePrice: {
    ...textStyles.h3,
    color: colors.gold.DEFAULT,
  },
  serviceDuration: {
    ...textStyles.caption,
    color: colors.muted.foreground,
  },
  bookButton: {
    backgroundColor: colors.gold.subtle,
    paddingVertical: spacing[2.5],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  bookButtonText: {
    ...textStyles.buttonSmall,
    color: colors.gold.dark,
  },
});

export default ServicesScreen;
