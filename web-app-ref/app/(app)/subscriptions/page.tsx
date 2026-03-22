'use client';

import PlanCard from '@/components/subscriptions/plan-card';
import { subscriptionPlans } from '@/lib/mock-data';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

export default function SubscriptionsPage() {
  const [isYearly, setIsYearly] = useState(false);
  
  const getPrice = (price: number | null) => {
    if (price === null) return null;
    return isYearly ? Math.round(price * 12 * 0.8) : price;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-foreground sm:text-5xl">
          Find the perfect plan
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Unlock advanced features and get the most out of your energy management.
        </p>
        <div className="flex items-center justify-center space-x-2 mt-6">
            <Label htmlFor="billing-cycle" className={!isYearly ? 'text-primary font-semibold' : ''}>Monthly</Label>
            <Switch id="billing-cycle" checked={isYearly} onCheckedChange={setIsYearly} />
            <Label htmlFor="billing-cycle" className={isYearly ? 'text-primary font-semibold' : ''}>Yearly</Label>
            <span className="ml-2 rounded-full bg-accent/20 px-2.5 py-1 text-xs font-semibold text-accent-foreground">SAVE 20%</span>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <PlanCard 
            key={plan.name} 
            plan={{...plan, price: getPrice(plan.price) }} 
            billingCycle={plan.price === null ? '' : (isYearly ? '/yr' : '/mo')} 
          />
        ))}
      </div>
    </div>
  );
}
