// components/PropertySwitcher.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/useAuthStore';
import { colors, spacing, typography, borderRadius } from '../theme/colors';

export default function PropertySwitcher() {
  const router = useRouter();
  const { user, switchProperty } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);

  if (!user || user.properties.length <= 1) {
    return null; // Don't show if only one property
  }

  const currentProperty = user.properties.find(p => p.id === user.currentPropertyId);

  const handleSelectProperty = (propertyId: string) => {
    switchProperty(propertyId);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.trigger}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.triggerText}>{currentProperty?.name || 'Select Property'}</Text>
        <Text style={styles.triggerIcon}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Property</Text>
            
            {user.properties.map((property) => (
              <TouchableOpacity
                key={property.id}
                style={[
                  styles.propertyOption,
                  property.id === user.currentPropertyId && styles.propertyOptionActive,
                ]}
                onPress={() => handleSelectProperty(property.id)}
              >
                <View style={styles.propertyInfo}>
                  <Text style={styles.propertyName}>{property.name}</Text>
                  <Text style={styles.propertyAddress}>{property.address}</Text>
                </View>
                {property.id === user.currentPropertyId && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.addPropertyButton}
              onPress={() => {
                setModalVisible(false);
                router.push('/(customer)/add-property');
              }}
            >
              <Text style={styles.addPropertyText}>+ Add New Property</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  triggerText: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.textPrimary,
    marginRight: spacing.xs,
  },
  triggerIcon: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: typography.h4,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  propertyOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  propertyOptionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  propertyAddress: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
  checkmark: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '700',
  },
  addPropertyButton: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  addPropertyText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.primary,
  },
});