// Mock data for EaaS Nexus Resident Dashboard

// Interfaces
export interface HourlyEnergyData {
    hour: string;
    consumption: number;
}

export interface Plan {
    name: string;
    features: string[];
    price: number;
    billingCycle: string;
}

export interface Invoice {
    id: string;
    date: string;
    amount: number;
    status: string;
}

export interface LiveStats {
    currentUsage: number;
    estimatedBill: number;
    billAccuracy: number;
    carbonSaved: number;
}

export interface Advice {
    title: string;
    message: string;
    potentialSavings: number;
    category: string;
}

export interface ServiceStatus {
    status: string;
    uptime: number;
    lastSync: string;
    gridConnection: string;
    solarGeneration: string;
    batteryBackup: number;
}

export interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    priority: 'low' | 'medium' | 'high';
}

export interface SupportTicket {
    id: string;
    title: string;
    status: string;
    priority: string;
    createdDate: string;
    resolvedDate: string | null;
}

export interface MonthlySavings {
    month: string;
    savings: number;
}

export interface QuickAction {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export interface AvailablePlan {
    id: string;
    name: string;
    type: string;
    category: string;
    capacity: string;
    price: number;
    setupFee: number;
    billingCycle: string;
    popular: boolean;
    features: string[];
    savings: string;
    carbonOffset: string;
    roi: string;
    description: string;
}

export interface ApplianceConsumption {
    appliance: string;
    consumption: number;
    percentage: number;
    cost: number;
    color: string;
}

export interface YearlyComparison {
    month: string;
    current: number;
    lastYear: number;
    neighbor: number;
}

export interface PeakUsagePattern {
    id: number;
    timeSlot: string;
    avgConsumption: number;
    cost: number;
    recommendation: string;
    savingPotential: number;
    priority: string;
}

export interface Report {
    id: string;
    title: string;
    description: string;
    type: string;
    size: string;
    date: string;
    icon: string;
}

export interface NeighborComparison {
    yourRank: number;
    totalHomes: number;
    percentile: number;
    avgConsumption: number;
    neighborAvg: number;
    topPerformer: number;
    savings: number;
    message: string;
}

// 24-hour energy consumption data (in kWh)
export const hourlyEnergyData: HourlyEnergyData[] = [
    { hour: '00:00', consumption: 0.8 },
    { hour: '01:00', consumption: 0.6 },
    { hour: '02:00', consumption: 0.5 },
    { hour: '03:00', consumption: 0.5 },
    { hour: '04:00', consumption: 0.6 },
    { hour: '05:00', consumption: 0.9 },
    { hour: '06:00', consumption: 1.2 },
    { hour: '07:00', consumption: 1.8 },
    { hour: '08:00', consumption: 2.1 },
    { hour: '09:00', consumption: 1.9 },
    { hour: '10:00', consumption: 1.6 },
    { hour: '11:00', consumption: 1.4 },
    { hour: '12:00', consumption: 1.3 },
    { hour: '13:00', consumption: 1.2 },
    { hour: '14:00', consumption: 1.1 },
    { hour: '15:00', consumption: 1.3 },
    { hour: '16:00', consumption: 1.5 },
    { hour: '17:00', consumption: 1.8 },
    { hour: '18:00', consumption: 2.3 },
    { hour: '19:00', consumption: 2.6 },
    { hour: '20:00', consumption: 2.4 },
    { hour: '21:00', consumption: 2.0 },
    { hour: '22:00', consumption: 1.5 },
    { hour: '23:00', consumption: 1.1 },
];

// Current subscription plan details
export const currentPlan: Plan = {
    name: 'Pro',
    features: [
        'Real-time monitoring',
        'AI fault detection',
        'Advanced analytics',
        'Priority support',
        'Carbon footprint tracking',
        'Custom alerts',
    ],
    price: 499,
    billingCycle: 'monthly',
};

// Invoice history
export const invoiceHistory: Invoice[] = [
    {
        id: 'INV-2026-001',
        date: '2026-02-01',
        amount: 1125.0,
        status: 'Paid',
    },
    {
        id: 'INV-2026-002',
        date: '2026-01-01',
        amount: 1050.0,
        status: 'Paid',
    },
    {
        id: 'INV-2025-012',
        date: '2025-12-01',
        amount: 1200.0,
        status: 'Paid',
    },
    {
        id: 'INV-2025-011',
        date: '2025-11-01',
        amount: 980.0,
        status: 'Paid',
    },
];

// Live stats
export const liveStats: LiveStats = {
    currentUsage: 12.5,
    estimatedBill: 1125.0,
    billAccuracy: 10,
    carbonSaved: 1.2,
};

// AI Savings Advisor
export const aiAdvice: Advice = {
    title: 'AC Usage Optimization',
    message: 'Your AC usage is high. Shifting usage to 2 PM could save you ₹150 this week.',
    potentialSavings: 150,
    category: 'cooling',
};

// Service Status & Reliability Metrics
export const serviceStatus: ServiceStatus = {
    status: 'Active',
    uptime: 99.8,
    lastSync: '2 minutes ago',
    gridConnection: 'Stable',
    solarGeneration: 'Optimal',
    batteryBackup: 85,
};

// Notifications & Alerts
export const notifications: Notification[] = [
    {
        id: 1,
        type: 'savings',
        title: 'Monthly Savings Update',
        message: 'You saved ₹450 this month compared to traditional grid usage',
        timestamp: '2 hours ago',
        read: false,
        priority: 'low',
    },
    {
        id: 2,
        type: 'service',
        title: 'System Maintenance Scheduled',
        message: 'Routine maintenance scheduled for Feb 20, 2026 at 2:00 AM',
        timestamp: '1 day ago',
        read: false,
        priority: 'medium',
    },
    {
        id: 3,
        type: 'alert',
        title: 'High Usage Alert',
        message: 'Your energy consumption is 15% higher than usual today',
        timestamp: '3 hours ago',
        read: true,
        priority: 'high',
    },
];

// Support Tickets / Fault Management
export const supportTickets: SupportTicket[] = [
    {
        id: 'TKT-2026-001',
        title: 'Smart meter sync issue',
        status: 'Resolved',
        priority: 'Medium',
        createdDate: '2026-02-15',
        resolvedDate: '2026-02-16',
    },
    {
        id: 'TKT-2026-002',
        title: 'Billing clarification needed',
        status: 'In Progress',
        priority: 'Low',
        createdDate: '2026-02-17',
        resolvedDate: null,
    },
];

// Monthly Savings Tracking
export const monthlySavings: MonthlySavings[] = [
    { month: 'Aug', savings: 320 },
    { month: 'Sep', savings: 410 },
    { month: 'Oct', savings: 380 },
    { month: 'Nov', savings: 450 },
    { month: 'Dec', savings: 520 },
    { month: 'Jan', savings: 490 },
    { month: 'Feb', savings: 450 },
];

// Quick Actions for <5 minute subscription
export const quickActions: QuickAction[] = [
    {
        id: 1,
        title: 'Upgrade Plan',
        description: 'Switch to a higher tier',
        icon: 'upgrade',
    },
    {
        id: 2,
        title: 'Report Issue',
        description: 'Create support ticket',
        icon: 'alert',
    },
    {
        id: 3,
        title: 'View Analytics',
        description: 'Detailed usage reports',
        icon: 'chart',
    },
    {
        id: 4,
        title: 'Smart Alerts',
        description: 'Configure notifications',
        icon: 'bell',
    },
];

// ==================== SUBSCRIPTION MANAGEMENT ====================

// Available EaaS Plans
export const availablePlans: AvailablePlan[] = [
    {
        id: 'solar-basic',
        name: 'Solar Basic',
        type: 'Solar',
        category: 'Renewable Energy',
        capacity: '3 kW',
        price: 1499,
        setupFee: 0,
        billingCycle: 'month',
        popular: false,
        features: [
            '3kW Solar Panel Installation',
            '25-year performance warranty',
            'Free installation & setup',
            'Real-time monitoring',
            'Grid-tied system',
            'Net-metering enabled',
            'Annual maintenance (1 visit)',
        ],
        savings: '₹800/month',
        carbonOffset: '0.5 tonnes/year',
        roi: '4-5 years',
        description: 'Perfect for small homes and apartments. Reduce your electricity bills with clean solar energy.',
    },
    {
        id: 'solar-pro',
        name: 'Solar Pro',
        type: 'Solar',
        category: 'Renewable Energy',
        capacity: '5 kW',
        price: 2299,
        setupFee: 0,
        billingCycle: 'month',
        popular: true,
        features: [
            '5kW Solar Panel Installation',
            '25-year performance warranty',
            'Free installation & setup',
            'Real-time monitoring with AI',
            'Grid-tied + Battery backup',
            'Net-metering enabled',
            'Quarterly maintenance (4 visits/year)',
            'Priority support',
            'Weather-based optimization',
        ],
        savings: '₹1,500/month',
        carbonOffset: '1.2 tonnes/year',
        roi: '3-4 years',
        description: 'Most popular choice for medium-sized homes. Maximum savings with smart energy management.',
    },
    {
        id: 'solar-premium',
        name: 'Solar Premium',
        type: 'Solar',
        category: 'Renewable Energy',
        capacity: '10 kW',
        price: 3999,
        setupFee: 0,
        billingCycle: 'month',
        popular: false,
        features: [
            '10kW Solar Panel Installation',
            '25-year performance warranty',
            'Free installation & setup',
            'Advanced AI monitoring',
            'Grid-tied + 10kWh Battery',
            'Net-metering enabled',
            'Monthly maintenance (12 visits/year)',
            '24/7 Priority support',
            'Weather-based optimization',
            'Energy export revenue sharing',
            'Smart home integration',
        ],
        savings: '₹3,200/month',
        carbonOffset: '2.5 tonnes/year',
        roi: '3 years',
        description: 'Enterprise-grade solution for large homes and small businesses. Maximum energy independence.',
    },
    {
        id: 'battery-basic',
        name: 'Battery Backup Basic',
        type: 'Battery',
        category: 'Energy Storage',
        capacity: '5 kWh',
        price: 999,
        setupFee: 0,
        billingCycle: 'month',
        popular: false,
        features: [
            '5kWh Lithium Battery',
            '10-year warranty',
            'Free installation',
            'Auto-switchover (< 10ms)',
            'Supports 2-3 hours backup',
            'Real-time charge monitoring',
            'Annual maintenance',
        ],
        savings: '₹400/month',
        carbonOffset: '0.2 tonnes/year',
        roi: '5-6 years',
        description: 'Essential backup power for critical appliances during outages.',
    },
    {
        id: 'battery-pro',
        name: 'Battery Backup Pro',
        type: 'Battery',
        category: 'Energy Storage',
        capacity: '10 kWh',
        price: 1799,
        setupFee: 0,
        billingCycle: 'month',
        popular: true,
        features: [
            '10kWh Lithium Battery',
            '10-year warranty',
            'Free installation',
            'Instant switchover (< 5ms)',
            'Supports 5-6 hours backup',
            'Real-time monitoring with AI',
            'Load prioritization',
            'Quarterly maintenance',
            'Solar charging compatible',
        ],
        savings: '₹750/month',
        carbonOffset: '0.4 tonnes/year',
        roi: '4-5 years',
        description: 'Complete home backup with intelligent load management.',
    },
    {
        id: 'cooling-smart',
        name: 'Smart Cooling',
        type: 'Cooling',
        category: 'Climate Control',
        capacity: '1.5 Ton AC',
        price: 899,
        setupFee: 0,
        billingCycle: 'month',
        popular: false,
        features: [
            '1.5 Ton 5-Star Inverter AC',
            '5-year warranty',
            'Free installation',
            'Smart thermostat included',
            'Auto temperature optimization',
            'Energy usage tracking',
            'Bi-annual maintenance',
            'Air quality monitoring',
        ],
        savings: '₹600/month',
        carbonOffset: '0.3 tonnes/year',
        roi: '3-4 years',
        description: 'Energy-efficient cooling with smart automation and air quality monitoring.',
    },
    {
        id: 'combo-solar-battery',
        name: 'Solar + Battery Combo',
        type: 'Combo',
        category: 'Complete Solution',
        capacity: '5 kW + 10 kWh',
        price: 3499,
        setupFee: 0,
        billingCycle: 'month',
        popular: true,
        features: [
            '5kW Solar + 10kWh Battery',
            '25-year solar warranty',
            '10-year battery warranty',
            'Complete energy independence',
            'Zero electricity bills possible',
            'Net-metering enabled',
            'AI-powered optimization',
            'Monthly maintenance',
            'Priority support',
            'Weather forecasting',
        ],
        savings: '₹2,500/month',
        carbonOffset: '1.8 tonnes/year',
        roi: '3 years',
        description: 'Ultimate energy solution combining solar generation and battery storage for complete independence.',
    },
];

// ==================== ANALYTICS & REPORTS ====================

// Consumption by Appliance
export const applianceConsumption: ApplianceConsumption[] = [
    { appliance: 'Air Conditioner', consumption: 450, percentage: 35, cost: 540, color: '#ef4444' },
    { appliance: 'Refrigerator', consumption: 180, percentage: 14, cost: 216, color: '#3b82f6' },
    { appliance: 'Water Heater', consumption: 200, percentage: 16, cost: 240, color: '#f59e0b' },
    { appliance: 'Washing Machine', consumption: 80, percentage: 6, cost: 96, color: '#8b5cf6' },
    { appliance: 'Lighting', consumption: 120, percentage: 9, cost: 144, color: '#10b981' },
    { appliance: 'TV & Entertainment', consumption: 90, percentage: 7, cost: 108, color: '#ec4899' },
    { appliance: 'Kitchen Appliances', consumption: 110, percentage: 9, cost: 132, color: '#f97316' },
    { appliance: 'Others', consumption: 50, percentage: 4, cost: 60, color: '#6b7280' },
];

// Comparative Analytics - Year over Year
export const yearlyComparison: YearlyComparison[] = [
    { month: 'Jan', current: 320, lastYear: 380, neighbor: 350 },
    { month: 'Feb', current: 310, lastYear: 370, neighbor: 340 },
    { month: 'Mar', current: 340, lastYear: 400, neighbor: 370 },
    { month: 'Apr', current: 380, lastYear: 450, neighbor: 410 },
    { month: 'May', current: 420, lastYear: 490, neighbor: 450 },
    { month: 'Jun', current: 450, lastYear: 520, neighbor: 480 },
    { month: 'Jul', current: 440, lastYear: 510, neighbor: 470 },
    { month: 'Aug', current: 430, lastYear: 500, neighbor: 460 },
    { month: 'Sep', current: 390, lastYear: 460, neighbor: 420 },
    { month: 'Oct', current: 360, lastYear: 430, neighbor: 390 },
    { month: 'Nov', current: 330, lastYear: 390, neighbor: 360 },
    { month: 'Dec', current: 340, lastYear: 400, neighbor: 370 },
];

// Peak Usage Patterns
export const peakUsagePatterns: PeakUsagePattern[] = [
    {
        id: 1,
        timeSlot: 'Morning Peak (6 AM - 9 AM)',
        avgConsumption: 2.1,
        cost: 252,
        recommendation: 'Shift water heater usage to off-peak hours (11 PM - 5 AM) to save ₹80/month',
        savingPotential: 80,
        priority: 'high',
    },
    {
        id: 2,
        timeSlot: 'Evening Peak (6 PM - 10 PM)',
        avgConsumption: 2.4,
        cost: 288,
        recommendation: 'Use AC in eco-mode during peak hours. Potential savings: ₹120/month',
        savingPotential: 120,
        priority: 'high',
    },
    {
        id: 3,
        timeSlot: 'Afternoon (12 PM - 4 PM)',
        avgConsumption: 1.3,
        cost: 156,
        recommendation: 'Optimal time for running washing machine and dishwasher',
        savingPotential: 0,
        priority: 'low',
    },
    {
        id: 4,
        timeSlot: 'Night (10 PM - 6 AM)',
        avgConsumption: 0.7,
        cost: 84,
        recommendation: 'Great! You\'re already optimizing night-time usage',
        savingPotential: 0,
        priority: 'low',
    },
];

// Downloadable Reports Metadata
export const availableReports: Report[] = [
    {
        id: 'monthly-consumption',
        title: 'Monthly Consumption Report',
        description: 'Detailed breakdown of your energy usage for the current month',
        type: 'PDF',
        size: '2.4 MB',
        date: '2026-02-01',
        icon: 'file',
    },
    {
        id: 'annual-summary',
        title: 'Annual Summary 2025',
        description: 'Complete year-end report with savings and carbon offset',
        type: 'PDF',
        size: '5.1 MB',
        date: '2026-01-01',
        icon: 'file',
    },
    {
        id: 'carbon-certificate',
        title: 'Carbon Offset Certificate',
        description: 'Official certificate of your environmental contribution',
        type: 'PDF',
        size: '1.2 MB',
        date: '2026-01-15',
        icon: 'award',
    },
    {
        id: 'tax-savings',
        title: 'Tax Savings Report',
        description: 'Documentation for claiming tax benefits on solar installation',
        type: 'PDF',
        size: '800 KB',
        date: '2026-01-10',
        icon: 'file',
    },
];

// Neighbor Comparison (anonymized)
export const neighborComparison: NeighborComparison = {
    yourRank: 12,
    totalHomes: 45,
    percentile: 73,
    avgConsumption: 320,
    neighborAvg: 380,
    topPerformer: 250,
    savings: 60,
    message: 'You\'re doing better than 73% of your neighbors!',
};
