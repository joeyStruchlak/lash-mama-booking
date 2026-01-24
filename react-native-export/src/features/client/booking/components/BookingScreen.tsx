// Booking Screen
// Multi-step booking flow

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, textStyles, borderRadius, shadows } from '@/theme';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ScreenHeader from '@/components/layout/ScreenHeader';

type BookingStep = 'service' | 'artist' | 'datetime' | 'confirm';

interface Artist {
  id: string;
  name: string;
  role: string;
  available: boolean;
}

const ARTISTS: Artist[] = [
  { id: '1', name: 'Lash Mama (Purni)', role: 'CEO & Senior Lash Artist', available: false },
  { id: '2', name: 'Nikki', role: 'Senior Lash Artist', available: true },
  { id: '3', name: 'Beau', role: 'Makeup Artist', available: true },
  { id: '4', name: 'Natali', role: 'Lash Artist', available: true },
];

const BookingScreen = () => {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const steps: BookingStep[] = ['service', 'artist', 'datetime', 'confirm'];
  const currentStepIndex = steps.indexOf(currentStep);

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <View style={[
            styles.stepDot,
            index <= currentStepIndex && styles.stepDotActive,
          ]}>
            <Text style={[
              styles.stepNumber,
              index <= currentStepIndex && styles.stepNumberActive,
            ]}>
              {index + 1}
            </Text>
          </View>
          {index < steps.length - 1 && (
            <View style={[
              styles.stepLine,
              index < currentStepIndex && styles.stepLineActive,
            ]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  const renderServiceStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Select a Service</Text>
      <Text style={styles.stepSubtitle}>Choose the service you'd like to book</Text>
      
      {[
        { id: 'volume', name: 'Volume Full Set', price: '$280' },
        { id: 'mega', name: 'Mega Volume Full Set', price: '$320' },
        { id: 'refill', name: 'Volume Refill', price: '$120' },
      ].map((service) => (
        <Pressable
          key={service.id}
          style={[
            styles.selectionCard,
            selectedService === service.id && styles.selectionCardActive,
          ]}
          onPress={() => setSelectedService(service.id)}
        >
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionName}>{service.name}</Text>
            <Text style={styles.selectionPrice}>{service.price}</Text>
          </View>
          <View style={[
            styles.radioOuter,
            selectedService === service.id && styles.radioOuterActive,
          ]}>
            {selectedService === service.id && <View style={styles.radioInner} />}
          </View>
        </Pressable>
      ))}
    </View>
  );

  const renderArtistStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Choose Your Artist</Text>
      <Text style={styles.stepSubtitle}>Select who you'd like to see</Text>
      
      {ARTISTS.map((artist) => (
        <Pressable
          key={artist.id}
          style={[
            styles.artistCard,
            selectedArtist === artist.id && styles.artistCardActive,
            !artist.available && styles.artistCardDisabled,
          ]}
          onPress={() => artist.available && setSelectedArtist(artist.id)}
          disabled={!artist.available}
        >
          <View style={styles.artistAvatar}>
            <Text style={styles.artistAvatarText}>
              {artist.name.charAt(0)}
            </Text>
          </View>
          <View style={styles.artistInfo}>
            <Text style={[
              styles.artistName,
              !artist.available && styles.artistNameDisabled,
            ]}>
              {artist.name}
            </Text>
            <Text style={styles.artistRole}>{artist.role}</Text>
            {!artist.available && (
              <View style={styles.waitlistBadge}>
                <Text style={styles.waitlistText}>Waitlist Only</Text>
              </View>
            )}
          </View>
          {artist.available && (
            <View style={[
              styles.radioOuter,
              selectedArtist === artist.id && styles.radioOuterActive,
            ]}>
              {selectedArtist === artist.id && <View style={styles.radioInner} />}
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );

  const renderDateTimeStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Select Date & Time</Text>
      <Text style={styles.stepSubtitle}>Choose your preferred appointment slot</Text>
      
      <Card style={styles.calendarPlaceholder}>
        <Text style={styles.placeholderText}>Calendar Component</Text>
        <Text style={styles.placeholderSubtext}>
          Date picker would go here
        </Text>
      </Card>
      
      <Text style={styles.timeLabel}>Available Times</Text>
      <View style={styles.timeGrid}>
        {['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM'].map((time) => (
          <Pressable key={time} style={styles.timeSlot}>
            <Text style={styles.timeText}>{time}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderConfirmStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Confirm Booking</Text>
      <Text style={styles.stepSubtitle}>Review your appointment details</Text>
      
      <Card style={styles.summaryCard} variant="luxury">
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service</Text>
          <Text style={styles.summaryValue}>Volume Full Set</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Artist</Text>
          <Text style={styles.summaryValue}>Nikki</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Date & Time</Text>
          <Text style={styles.summaryValue}>Jan 15, 2024 at 2:00 PM</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Deposit Required</Text>
          <Text style={styles.summaryValueGold}>$50</Text>
        </View>
      </Card>
      
      <View style={styles.depositNotice}>
        <Text style={styles.depositText}>
          A $50 deposit is required to secure your booking. This will be deducted from your final service cost.
        </Text>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'service': return renderServiceStep();
      case 'artist': return renderArtistStep();
      case 'datetime': return renderDateTimeStep();
      case 'confirm': return renderConfirmStep();
    }
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Book Appointment" />
      
      {renderStepIndicator()}
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing[24] }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {renderCurrentStep()}
      </ScrollView>
      
      {/* Bottom Actions */}
      <View style={[styles.bottomActions, { paddingBottom: insets.bottom + spacing[4] }]}>
        {currentStepIndex > 0 && (
          <Button 
            title="Back" 
            variant="soft" 
            onPress={handleBack}
            style={styles.backButton}
          />
        )}
        <Button 
          title={currentStep === 'confirm' ? 'Pay Deposit & Book' : 'Continue'}
          variant="luxury"
          onPress={handleNext}
          style={styles.continueButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream.DEFAULT,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
  },
  
  // Step indicator
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
  },
  stepDot: {
    width: spacing[8],
    height: spacing[8],
    borderRadius: spacing[4],
    backgroundColor: colors.beige.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: colors.gold.DEFAULT,
  },
  stepNumber: {
    ...textStyles.labelSmall,
    color: colors.muted.foreground,
  },
  stepNumberActive: {
    color: colors.cream.DEFAULT,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.beige.DEFAULT,
    marginHorizontal: spacing[2],
  },
  stepLineActive: {
    backgroundColor: colors.gold.DEFAULT,
  },
  
  // Step content
  stepContent: {
    paddingTop: spacing[4],
  },
  stepTitle: {
    ...textStyles.h2,
    color: colors.foreground,
    marginBottom: spacing[1],
  },
  stepSubtitle: {
    ...textStyles.body,
    color: colors.muted.foreground,
    marginBottom: spacing[6],
  },
  
  // Selection cards
  selectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    backgroundColor: colors.cream.light,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: spacing[3],
  },
  selectionCardActive: {
    borderColor: colors.gold.DEFAULT,
    backgroundColor: colors.gold.subtle,
  },
  selectionInfo: {
    flex: 1,
  },
  selectionName: {
    ...textStyles.label,
    color: colors.foreground,
    marginBottom: spacing[0.5],
  },
  selectionPrice: {
    ...textStyles.h4,
    color: colors.gold.DEFAULT,
  },
  radioOuter: {
    width: spacing[6],
    height: spacing[6],
    borderRadius: spacing[3],
    borderWidth: 2,
    borderColor: colors.muted.foreground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: colors.gold.DEFAULT,
  },
  radioInner: {
    width: spacing[3],
    height: spacing[3],
    borderRadius: spacing[1.5],
    backgroundColor: colors.gold.DEFAULT,
  },
  
  // Artist cards
  artistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    backgroundColor: colors.cream.light,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: spacing[3],
  },
  artistCardActive: {
    borderColor: colors.gold.DEFAULT,
    backgroundColor: colors.gold.subtle,
  },
  artistCardDisabled: {
    opacity: 0.6,
  },
  artistAvatar: {
    width: spacing[12],
    height: spacing[12],
    borderRadius: spacing[6],
    backgroundColor: colors.gold.subtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  artistAvatarText: {
    ...textStyles.h3,
    color: colors.gold.DEFAULT,
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    ...textStyles.label,
    color: colors.foreground,
  },
  artistNameDisabled: {
    color: colors.muted.foreground,
  },
  artistRole: {
    ...textStyles.caption,
    color: colors.muted.foreground,
  },
  waitlistBadge: {
    backgroundColor: colors.gold.subtle,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[0.5],
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginTop: spacing[1],
  },
  waitlistText: {
    ...textStyles.caption,
    color: colors.gold.dark,
    fontWeight: '600',
  },
  
  // Calendar
  calendarPlaceholder: {
    padding: spacing[8],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  placeholderText: {
    ...textStyles.h4,
    color: colors.muted.foreground,
  },
  placeholderSubtext: {
    ...textStyles.caption,
    color: colors.muted.foreground,
    marginTop: spacing[1],
  },
  timeLabel: {
    ...textStyles.label,
    color: colors.foreground,
    marginBottom: spacing[3],
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  timeSlot: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2.5],
    backgroundColor: colors.beige.DEFAULT,
    borderRadius: borderRadius.lg,
  },
  timeText: {
    ...textStyles.label,
    color: colors.foreground,
  },
  
  // Summary
  summaryCard: {
    padding: spacing[5],
    marginBottom: spacing[4],
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  summaryLabel: {
    ...textStyles.body,
    color: colors.muted.foreground,
  },
  summaryValue: {
    ...textStyles.label,
    color: colors.foreground,
  },
  summaryValueGold: {
    ...textStyles.h4,
    color: colors.gold.DEFAULT,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  depositNotice: {
    backgroundColor: colors.gold.subtle,
    padding: spacing[4],
    borderRadius: borderRadius.lg,
  },
  depositText: {
    ...textStyles.bodySmall,
    color: colors.gold.dark,
    textAlign: 'center',
  },
  
  // Bottom actions
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    backgroundColor: colors.cream.DEFAULT,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing[3],
  },
  backButton: {
    flex: 0.4,
  },
  continueButton: {
    flex: 1,
  },
});

export default BookingScreen;
