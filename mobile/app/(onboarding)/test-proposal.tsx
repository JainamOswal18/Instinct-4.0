// app/(onboarding)/test-proposal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore, useCurrentProperty } from '../../store/useAuthStore';
import { generateProposal } from '../../mock/subscription';
import { colors, spacing, typography } from '../../theme/colors';

export default function TestProposal() {
  const router = useRouter();
  const currentProperty = useCurrentProperty();
  const { saveSurveyData, saveProposal } = useAuthStore();

  const handleGenerateProposal = async () => {
    if (!currentProperty) return;

    const mockSurveyData = {
      propertyType: 'residential' as const,
      address: '123 Solar Street, Green Colony, Mumbai 400001',
      // roofArea removed — measured by engineer on-site
      monthlyBill: 5000,
      monthlyConsumption: 800,
      peakHours: '6-9 PM',
      occupants: 4,
      appliances: ['Air Conditioner', 'Water Heater', 'Refrigerator', 'Washing Machine'],
      energyServices: ['solar', 'battery'] as ('solar' | 'battery' | 'lighting' | 'cooling')[],
      submittedAt: new Date().toISOString(),
    };

    // Sets status → SURVEY_SUBMITTED
    saveSurveyData(currentProperty.id, mockSurveyData);

    // Sets status → PLAN_PROPOSED
    const proposal = await generateProposal(mockSurveyData);
    saveProposal(currentProperty.id, proposal);

    router.push('/(onboarding)/proposal');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Test Proposal Generator</Text>
        <Text style={styles.subtitle}>
          Generates a mock proposal using hardcoded survey data and navigates to the proposal screen.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleGenerateProposal}>
          <Text style={styles.buttonText}>Generate Proposal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.primaryDark,
  },
});