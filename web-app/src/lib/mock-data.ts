
import { PlaceHolderImages } from './placeholder-images';

export const mockUser = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar-1')?.imageUrl,
};

export const energyServices = [
  {
    id: 'solar',
    title: 'Solar Energy',
    description: 'Harness the power of the sun with our high-efficiency solar panel installations.',
    imageId: 'solar-energy'
  },
  {
    id: 'battery',
    title: 'Battery Backup',
    description: 'Ensure uninterrupted power supply with our advanced battery storage solutions.',
    imageId: 'battery-backup'
  },
  {
    id: 'lighting',
    title: 'Lighting as a Service',
    description: 'Energy-efficient smart lighting solutions tailored for your space.',
    imageId: 'lighting-service'
  },
  {
    id: 'cooling',
    title: 'Cooling as a Service',
    description: 'Eco-friendly air conditioning and climate control systems.',
    imageId: 'cooling-service'
  },
  {
    id: 'ev-charging',
    title: 'EV Charging',
    description: 'Rapid charging stations for your electric vehicles, at home or office.',
    imageId: 'ev-charging'
  },
  {
    id: 'water-heating',
    title: 'Water Heating as a Service',
    description: 'Efficient and smart water heating systems for all your needs.',
    imageId: 'water-heating'
  }
];

export const mockRequests = [
  {
    id: 'req-1',
    user: 'John Smith',
    service: 'Solar Energy',
    status: 'in-progress',
    date: '2024-05-15',
    consumption: '450 kWh'
  },
  {
    id: 'req-2',
    user: 'Sarah Miller',
    service: 'EV Charging',
    status: 'pending',
    date: '2024-05-16',
    consumption: '320 kWh'
  }
];

export const mockStats = [
  { label: 'Current Usage', value: '12.5 kWh', change: '+5.2%', changeType: 'increase' },
  { label: 'Est. Monthly Bill', value: '$112.50', change: '-2.1%', changeType: 'decrease' },
  { label: 'CO2 Saved This Month', value: '8.2 kg', change: '+10%', changeType: 'decrease' },
  { label: 'Grid Status', value: 'Online', change: 'Stable', changeType: 'decrease' },
];

export const mockDevices = [
  { id: 'sm-001', name: 'Main Meter', status: 'Online', health: 98 },
  { id: 'sm-002', name: 'HVAC System', status: 'Online', health: 95 },
  { id: 'sm-003', name: 'Solar Panel Inverter', status: 'Needs Attention', health: 75 },
  { id: 'sm-004', name: 'EV Charger', status: 'Offline', health: 0 },
  { id: 'sm-005', name: 'Water Heater', status: 'Online', health: 100 },
];

export const mockEnergyData = [
  { time: '00:00', consumption: 2.1 },
  { time: '01:00', consumption: 1.8 },
  { time: '02:00', consumption: 1.5 },
  { time: '03:00', consumption: 1.4 },
  { time: '04:00', consumption: 1.6 },
  { time: '05:00', consumption: 2.0 },
  { time: '06:00', consumption: 3.5 },
  { time: '07:00', consumption: 4.8 },
  { time: '08:00', consumption: 5.2 },
  { time: '09:00', consumption: 4.5 },
  { time: '10:00', consumption: 4.0 },
  { time: '11:00', consumption: 4.2 },
  { time: '12:00', consumption: 4.8 },
  { time: '13:00', consumption: 4.6 },
  { time: '14:00', consumption: 4.1 },
  { time: '15:00', consumption: 3.8 },
  { time: '16:00', consumption: 4.3 },
  { time: '17:00', consumption: 5.5 },
  { time: '18:00', consumption: 6.8 },
  { time: '19:00', consumption: 7.2 },
  { time: '20:00', consumption: 6.5 },
  { time: '21:00', consumption: 5.1 },
  { time: '22:00', consumption: 3.9 },
  { time: '23:00', consumption: 2.8 },
];

export const subscriptionPlans = [
    {
        name: "Basic",
        price: 29,
        features: [
            "Real-time energy monitoring",
            "Monthly billing reports",
            "Basic fault detection",
            "Email support"
        ],
        cta: "Choose Basic",
        isPopular: false,
    },
    {
        name: "Pro",
        price: 59,
        features: [
            "All Basic features",
            "Advanced analytics & ROI",
            "Carbon footprint tracking",
            "AI-powered fault detection",
            "Priority chat support"
        ],
        cta: "Choose Pro",
        isPopular: true,
    },
    {
        name: "Enterprise",
        price: null,
        features: [
            "All Pro features",
            "DISCOM integration",
            "Dedicated account manager",
            "API access & custom integrations",
            "24/7 phone support"
        ],
        cta: "Contact Sales",
        isPopular: false,
    }
];
