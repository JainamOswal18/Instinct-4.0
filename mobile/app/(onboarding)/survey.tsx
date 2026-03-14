// app/(onboarding)/survey.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore, useCurrentProperty, SurveyData } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

type PropertyType = 'residential' | 'commercial';
type EnergyService = 'solar' | 'battery' | 'lighting' | 'cooling';

const ENERGY_SERVICES: { id: EnergyService; icon: string; label: string; description: string }[] = [
  { id: 'solar',   icon: '☀️', label: 'Solar Energy',      description: 'Generate clean electricity from sunlight' },
  { id: 'battery', icon: '🔋', label: 'Battery Storage',   description: 'Store energy and use it when you need it' },
  { id: 'lighting',icon: '💡', label: 'Smart Lighting',    description: 'Efficient lighting solutions for every space' },
  { id: 'cooling', icon: '❄️', label: 'Cooling Solutions', description: 'Energy-efficient climate control systems' },
];

// ── Validation ────────────────────────────────────────────────────────────────

interface FieldErrors {
  energyServices?: string;
  address?: string;
  monthlyBill?: string;
  monthlyConsumption?: string;
  occupants?: string;
}

function validateAddress(val: string): string | undefined {
  if (!val.trim()) return 'Please enter your property address.';
  if (val.trim().length < 10) return 'Please enter a complete address.';
  if (val.trim().length > 200) return 'Address is too long (max 200 characters).';
}

function validateMonthlyBill(val: string): string | undefined {
  const n = parseFloat(val);
  if (!val.trim()) return 'Please enter your monthly electricity bill.';
  if (isNaN(n) || n <= 0) return 'Please enter a valid positive number.';
  if (n < 200) return 'Bills below ₹200/month are too low for energy services to be cost-effective.';
  if (n > 500000) return 'Please enter a realistic value (max ₹5,00,000).';
}

function validateMonthlyConsumption(val: string): string | undefined {
  const n = parseFloat(val);
  if (!val.trim()) return 'Please enter your monthly energy consumption.';
  if (isNaN(n) || n <= 0) return 'Please enter a valid positive number.';
  if (n < 30) return 'Minimum meaningful consumption is 30 kWh/month.';
  if (n > 50000) return 'Please enter a realistic value (max 50,000 kWh).';
}

function validateOccupants(val: string): string | undefined {
  const n = parseInt(val);
  if (!val.trim()) return 'Please enter the number of occupants.';
  if (isNaN(n) || n <= 0) return 'Please enter a valid positive number.';
  if (n > 200) return 'Please enter a realistic value (max 200).';
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SurveyScreen() {
  const router = useRouter();
  const currentProperty = useCurrentProperty();
  const { saveSurveyData } = useAuthStore();
  const { addNotification } = useNotificationStore();

  const [selectedServices, setSelectedServices] = useState<EnergyService[]>([]);
  const [propertyType, setPropertyType] = useState<PropertyType>('residential');
  const [address, setAddress] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [monthlyConsumption, setMonthlyConsumption] = useState('');
  const [peakHours, setPeakHours] = useState('6-9 PM');
  const [occupants, setOccupants] = useState('');
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Roof area removed — engineer measures on-site
  const totalSteps = 6;

  const applianceOptions = [
    'Air Conditioner', 'Water Heater', 'Washing Machine', 'Refrigerator',
    'Dishwasher', 'Electric Stove', 'Microwave', 'TV',
  ];

  const peakHourOptions = [
    '6-9 AM', '9 AM-12 PM', '12-3 PM', '3-6 PM', '6-9 PM', '9 PM-12 AM',
  ];

  const toggleService = (service: EnergyService) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
    setFieldErrors(e => ({ ...e, energyServices: undefined }));
  };

  const toggleAppliance = (appliance: string) => {
    setSelectedAppliances(prev =>
      prev.includes(appliance) ? prev.filter(a => a !== appliance) : [...prev, appliance]
    );
  };

  const validateCurrentStep = (): boolean => {
    const errors: FieldErrors = {};
    let valid = true;

    if (currentStep === 1 && selectedServices.length === 0) {
      errors.energyServices = 'Please select at least one energy service.';
      valid = false;
    }
    if (currentStep === 3) {
      const err = validateAddress(address);
      if (err) { errors.address = err; valid = false; }
    }
    if (currentStep === 4) {
      const err = validateMonthlyBill(monthlyBill);
      if (err) { errors.monthlyBill = err; valid = false; }
    }
    if (currentStep === 5) {
      const err = validateMonthlyConsumption(monthlyConsumption);
      if (err) { errors.monthlyConsumption = err; valid = false; }
    }
    if (currentStep === 6) {
      const err = validateOccupants(occupants);
      if (err) { errors.occupants = err; valid = false; }
    }

    setFieldErrors(errors);
    return valid;
  };

  const handleNext = () => {
    Keyboard.dismiss();
    if (!validateCurrentStep()) return;
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    Keyboard.dismiss();
    setFieldErrors({});
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
    else router.back();
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!validateCurrentStep()) return;
    if (!currentProperty) return;

    setIsSubmitting(true);

    const surveyData: SurveyData = {
      propertyType,
      address,
      monthlyBill: parseFloat(monthlyBill),
      monthlyConsumption: parseFloat(monthlyConsumption),
      peakHours,
      occupants: parseInt(occupants),
      appliances: selectedAppliances,
      energyServices: selectedServices,
      submittedAt: new Date().toISOString(),
    };

    saveSurveyData(currentProperty.id, surveyData);

    addNotification({
      type: 'success',
      title: 'Survey Submitted! ✓',
      message: 'Our team has received your details. An engineer will contact you within 24 hours to schedule a site visit.',
      read: false, dismissible: true, persistent: true,
    });

    addNotification({
      type: 'info',
      title: 'What happens next?',
      message: 'An engineer will visit your property, assess the site, and generate a custom energy proposal for you.',
      read: false, dismissible: false, persistent: true,
      action: { label: 'View Status', route: '/(onboarding)/survey-submitted' },
    });

    setIsSubmitting(false);
    router.replace('/(onboarding)/survey-submitted');
  };

  // ── Step renderers ──────────────────────────────────────────────────────────

  const renderStep = () => {
    switch (currentStep) {

      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Energy Services</Text>
            <Text style={styles.stepDescription}>
              Which energy services are you interested in? Select all that apply.
            </Text>
            <View style={styles.servicesGrid}>
              {ENERGY_SERVICES.map(service => {
                const isActive = selectedServices.includes(service.id);
                return (
                  <TouchableOpacity
                    key={service.id}
                    style={[styles.serviceCard, isActive && styles.serviceCardActive]}
                    onPress={() => toggleService(service.id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.serviceCardTop}>
                      <Text style={styles.serviceIcon}>{service.icon}</Text>
                      <View style={[styles.serviceCheckbox, isActive && styles.serviceCheckboxActive]}>
                        {isActive && <Text style={styles.serviceCheck}>✓</Text>}
                      </View>
                    </View>
                    <Text style={[styles.serviceLabel, isActive && styles.serviceLabelActive]}>
                      {service.label}
                    </Text>
                    <Text style={styles.serviceDescription}>{service.description}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {fieldErrors.energyServices && (
              <Text style={styles.errorText}>⚠ {fieldErrors.energyServices}</Text>
            )}
            <View style={styles.helperCard}>
              <Text style={styles.helperText}>
                💡 You can add more services later. Our engineer will assess what's best suited for your property.
              </Text>
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Property Type</Text>
            <Text style={styles.stepDescription}>
              What type of property are you installing on?
            </Text>
            <View style={styles.optionsGrid}>
              {(['residential', 'commercial'] as PropertyType[]).map(type => (
                <TouchableOpacity
                  key={type}
                  style={[styles.optionCard, propertyType === type && styles.optionCardActive]}
                  onPress={() => setPropertyType(type)}
                >
                  <Text style={styles.optionIcon}>{type === 'residential' ? '🏠' : '🏢'}</Text>
                  <Text style={[styles.optionText, propertyType === type && styles.optionTextActive]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Property Address</Text>
            <Text style={styles.stepDescription}>
              Where will the installation take place?
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.textArea, fieldErrors.address && styles.inputError]}
                placeholder="Enter complete address (Building, Street, Area, City, Pincode)"
                placeholderTextColor={colors.textTertiary}
                value={address}
                onChangeText={v => { setAddress(v); setFieldErrors(e => ({ ...e, address: undefined })); }}
                multiline
                numberOfLines={3}
                returnKeyType="done"
                blurOnSubmit
              />
              {fieldErrors.address && (
                <Text style={styles.errorText}>⚠ {fieldErrors.address}</Text>
              )}
            </View>
            <View style={styles.helperCard}>
              <Text style={styles.helperText}>
                💡 Our engineer will visit this location and measure the space during the site visit.
              </Text>
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Monthly Electricity Bill</Text>
            <Text style={styles.stepDescription}>
              What is your average monthly electricity bill?
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputPrefix}>₹</Text>
              <TextInput
                style={[styles.input, styles.inputWithPrefix, fieldErrors.monthlyBill && styles.inputError]}
                placeholder="e.g., 5000"
                placeholderTextColor={colors.textTertiary}
                value={monthlyBill}
                onChangeText={v => { setMonthlyBill(v); setFieldErrors(e => ({ ...e, monthlyBill: undefined })); }}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <Text style={styles.inputUnit}>per month</Text>
              {fieldErrors.monthlyBill && (
                <Text style={styles.errorText}>⚠ {fieldErrors.monthlyBill}</Text>
              )}
            </View>
            <View style={styles.helperCard}>
              <Text style={styles.helperText}>
                💡 Average Indian household: ₹1,500–₹8,000/month. Commercial: ₹10,000+.
              </Text>
            </View>
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Energy Consumption</Text>
            <Text style={styles.stepDescription}>
              Average monthly energy consumption?
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, fieldErrors.monthlyConsumption && styles.inputError]}
                placeholder="e.g., 350"
                placeholderTextColor={colors.textTertiary}
                value={monthlyConsumption}
                onChangeText={v => { setMonthlyConsumption(v); setFieldErrors(e => ({ ...e, monthlyConsumption: undefined })); }}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <Text style={styles.inputUnit}>kWh / month</Text>
              {fieldErrors.monthlyConsumption && (
                <Text style={styles.errorText}>⚠ {fieldErrors.monthlyConsumption}</Text>
              )}
            </View>
            <View style={styles.helperCard}>
              <Text style={styles.helperText}>
                💡 Typical home: 100–500 kWh/month. Found on your electricity bill under "Units consumed".
              </Text>
            </View>

            <Text style={styles.subSectionTitle}>Peak Usage Hours</Text>
            <Text style={styles.subSectionDescription}>
              When does your household use the most electricity?
            </Text>
            <View style={styles.peakHoursGrid}>
              {peakHourOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  style={[styles.peakHourOption, peakHours === option && styles.peakHourOptionActive]}
                  onPress={() => { Keyboard.dismiss(); setPeakHours(option); }}
                >
                  <Text style={[styles.peakHourText, peakHours === option && styles.peakHourTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 6:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Household Details</Text>
            <Text style={styles.stepDescription}>
              A few final details to size your system accurately.
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Number of Occupants</Text>
              <TextInput
                style={[styles.input, fieldErrors.occupants && styles.inputError]}
                placeholder="e.g., 4"
                placeholderTextColor={colors.textTertiary}
                value={occupants}
                onChangeText={v => { setOccupants(v); setFieldErrors(e => ({ ...e, occupants: undefined })); }}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              {fieldErrors.occupants && (
                <Text style={styles.errorText}>⚠ {fieldErrors.occupants}</Text>
              )}
            </View>

            <Text style={styles.subSectionTitle}>Major Appliances</Text>
            <Text style={styles.subSectionDescription}>Select all that apply (optional)</Text>
            <View style={styles.appliancesGrid}>
              {applianceOptions.map(appliance => (
                <TouchableOpacity
                  key={appliance}
                  style={[styles.applianceOption, selectedAppliances.includes(appliance) && styles.applianceOptionActive]}
                  onPress={() => toggleAppliance(appliance)}
                >
                  <View style={[styles.applianceCheckbox, selectedAppliances.includes(appliance) && styles.applianceCheckboxActive]}>
                    {selectedAppliances.includes(appliance) && (
                      <Text style={styles.applianceCheck}>✓</Text>
                    )}
                  </View>
                  <Text style={[styles.applianceText, selectedAppliances.includes(appliance) && styles.applianceTextActive]}>
                    {appliance}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Energy Survey</Text>
          <Text style={styles.subtitle}>Step {currentStep} of {totalSteps}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {renderStep()}
          <View style={{ height: 100 }} />
        </ScrollView>

        <View style={styles.footer}>
          {currentStep < totalSteps ? (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <LinearGradient
                colors={[colors.primary, colors.accentSecondary]}
                style={styles.nextGradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                <Text style={styles.nextText}>Next →</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.nextButton, isSubmitting && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <LinearGradient
                colors={[colors.primary, colors.accentSecondary]}
                style={styles.nextGradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                {isSubmitting
                  ? <ActivityIndicator color={colors.primaryDark} />
                  : <Text style={styles.nextText}>Submit Survey ✓</Text>
                }
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  backBtn: { padding: spacing.xs, marginRight: spacing.sm },
  backArrow: { fontSize: 24, color: colors.primary },
  headerContent: { flex: 1 },
  title: { fontSize: typography.h2, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: typography.small, color: colors.textSecondary },

  progressContainer: { paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  progressBar: { height: 8, backgroundColor: colors.surface, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },

  keyboardAvoid: { flex: 1 },
  scrollView: { flex: 1, paddingHorizontal: spacing.md },
  stepContent: { paddingVertical: spacing.lg },
  stepTitle: { fontSize: typography.h3, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.xs },
  stepDescription: { fontSize: typography.body, color: colors.textSecondary, marginBottom: spacing.lg, lineHeight: 22 },

  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  serviceCard: { width: '47%', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 2, borderColor: colors.border },
  serviceCardActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  serviceCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  serviceIcon: { fontSize: 32 },
  serviceCheckbox: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  serviceCheckboxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  serviceCheck: { fontSize: 12, fontWeight: '700', color: colors.primaryDark },
  serviceLabel: { fontSize: typography.body, fontWeight: '700', color: colors.textSecondary, marginBottom: 2 },
  serviceLabelActive: { color: colors.primary },
  serviceDescription: { fontSize: typography.tiny, color: colors.textTertiary, lineHeight: 16 },

  optionsGrid: { flexDirection: 'row', gap: spacing.md },
  optionCard: { flex: 1, backgroundColor: colors.surface, padding: spacing.xl, borderRadius: borderRadius.lg, borderWidth: 2, borderColor: colors.border, alignItems: 'center' },
  optionCardActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  optionIcon: { fontSize: 48, marginBottom: spacing.md },
  optionText: { fontSize: typography.body, fontWeight: '600', color: colors.textSecondary },
  optionTextActive: { color: colors.primary },

  inputContainer: { marginBottom: spacing.md, position: 'relative' },
  inputLabel: { fontSize: typography.small, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md, fontSize: typography.h4, color: colors.textPrimary, fontWeight: '600' },
  inputError: { borderColor: colors.error, borderWidth: 2 },
  inputWithPrefix: { paddingLeft: spacing.xl },
  inputPrefix: { position: 'absolute', left: spacing.md, top: '50%', transform: [{ translateY: -12 }], fontSize: typography.h4, fontWeight: '600', color: colors.textPrimary, zIndex: 1 },
  inputUnit: { marginTop: spacing.xs, fontSize: typography.small, color: colors.textTertiary, textAlign: 'right' },
  errorText: { marginTop: 4, fontSize: typography.small, color: colors.error, fontWeight: '500' },
  textArea: { height: 100, textAlignVertical: 'top', paddingTop: spacing.md },

  helperCard: { backgroundColor: colors.primaryLight, padding: spacing.sm, borderRadius: borderRadius.sm, marginTop: spacing.sm },
  helperText: { fontSize: typography.small, color: colors.primary, lineHeight: 18 },

  subSectionTitle: { fontSize: typography.body, fontWeight: '700', color: colors.textPrimary, marginTop: spacing.lg, marginBottom: spacing.xs },
  subSectionDescription: { fontSize: typography.small, color: colors.textSecondary, marginBottom: spacing.md },

  peakHoursGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  peakHourOption: { backgroundColor: colors.surface, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  peakHourOptionActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  peakHourText: { fontSize: typography.small, fontWeight: '600', color: colors.textSecondary },
  peakHourTextActive: { color: colors.primary },

  appliancesGrid: { gap: spacing.sm },
  applianceOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  applianceOptionActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  applianceCheckbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: colors.border, marginRight: spacing.sm, justifyContent: 'center', alignItems: 'center' },
  applianceCheckboxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  applianceCheck: { fontSize: 14, fontWeight: '700', color: colors.primaryDark },
  applianceText: { fontSize: typography.body, fontWeight: '600', color: colors.textSecondary },
  applianceTextActive: { color: colors.primary },

  footer: { padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  nextButton: { borderRadius: borderRadius.lg, overflow: 'hidden' },
  nextGradient: { padding: spacing.md, alignItems: 'center' },
  nextText: { fontSize: typography.h4, fontWeight: '700', color: colors.primaryDark },
  buttonDisabled: { opacity: 0.6 },
});