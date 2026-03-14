// hooks/useEnergyServices.ts
import { useCurrentProperty } from '../store/useAuthStore';

export type EnergyService = 'solar' | 'battery' | 'lighting' | 'cooling';

export function useEnergyServices() {
  const currentProperty = useCurrentProperty();
  const services: EnergyService[] = currentProperty?.surveyData?.energyServices ?? [];

  return {
    hasSolar:    services.includes('solar'),
    hasBattery:  services.includes('battery'),
    hasLighting: services.includes('lighting'),
    hasCooling:  services.includes('cooling'),
    services,
    hasAny: services.length > 0,
    label: services.length > 0
      ? services.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' · ')
      : 'Energy',
  };
}