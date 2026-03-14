// mock/subscription.ts
import { SurveyData, ProposedPlan } from '../store/useAuthStore';

/**
 * Generate a subscription proposal from survey data.
 * Called by the admin/engineer flow once they've done the site visit.
 * NOT called automatically on survey submit.
 */
export async function generateProposal(surveyData: SurveyData): Promise<ProposedPlan> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Estimate capacity from monthly consumption (avg 120 kWh/kW/month in India)
  const solarCapacity = Math.max(1, Math.ceil(surveyData.monthlyConsumption / 120));

  // 1 kWh battery per 300 kWh monthly consumption
  const batteryStorage = Math.max(1, Math.ceil(surveyData.monthlyConsumption / 300));

  // ₹350/kW solar + ₹500/kWh battery
  const monthlyFee = solarCapacity * 350 + batteryStorage * 500;

  // Assume 50% reduction in current bill
  const estimatedSavings = Math.floor(surveyData.monthlyBill * 0.5);

  // 1 kW produces ~120 kWh/month in India
  const estimatedProduction = solarCapacity * 120;

  // Build whatsIncluded based on selected services
  const included: string[] = [];
  const services = surveyData.energyServices ?? [];

  if (services.includes('solar')) {
    included.push(`${solarCapacity} kW Solar Panel System`);
    included.push('Grid Integration & Net Metering');
  }
  if (services.includes('battery')) {
    included.push(`${batteryStorage} kWh Battery Storage`);
  }
  if (services.includes('lighting')) {
    included.push('Smart LED Lighting System');
  }
  if (services.includes('cooling')) {
    included.push('Energy-Efficient Cooling Solution');
  }

  included.push(
    'Smart Energy Monitoring Dashboard',
    'Professional Installation',
    '24-month Maintenance & Support',
    'Performance Guarantee',
    'Mobile App Access',
  );

  const proposal: ProposedPlan = {
    id: `proposal_${Date.now()}`,
    solarCapacity,
    batteryStorage,
    monthlyFee,
    estimatedSavings,
    estimatedProduction,
    contractDuration: 24,
    installationFee: 0,
    securityDeposit: 5000,
    whatsIncluded: included,
    generatedAt: new Date().toISOString(),
  };

  return proposal;
}

export function getPlanType(solarCapacity: number): 'basic' | 'premium' | 'pro' | 'enterprise' {
  if (solarCapacity <= 5) return 'basic';
  if (solarCapacity <= 10) return 'premium';
  if (solarCapacity <= 15) return 'pro';
  return 'enterprise';
}

export async function processPayment(
  proposalId: string,
  paymentMethod: 'UPI' | 'Card' | 'NetBanking',
  amount: number
): Promise<{ success: boolean; transactionId: string }> {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return {
    success: true,
    transactionId: `TXN_${Date.now()}`,
  };
}