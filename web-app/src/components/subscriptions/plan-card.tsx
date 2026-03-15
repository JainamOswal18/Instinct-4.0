import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Plan = {
    name: string;
    price: number | null;
    features: string[];
    cta: string;
    isPopular: boolean;
};

type PlanCardProps = {
    plan: Plan;
    billingCycle: string;
};

export default function PlanCard({ plan, billingCycle }: PlanCardProps) {
    const formatINR = (amount: number) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);

    return (
        <Card className={cn("flex flex-col", plan.isPopular && "border-primary ring-2 ring-primary shadow-lg")}>
            {plan.isPopular && (
                <div className="py-1 px-4 bg-primary text-primary-foreground text-center text-sm font-semibold rounded-t-lg -mt-px">
                    Most Popular
                </div>
            )}
            <CardHeader className="items-center text-center">
                <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline">
                    {plan.price !== null ? (
                        <>
                            <span className="text-4xl font-bold tracking-tight">{formatINR(plan.price)}</span>
                            <span className="ml-1 text-xl font-semibold text-muted-foreground">{billingCycle}</span>
                        </>
                    ) : (
                        <span className="text-4xl font-bold tracking-tight">Custom</span>
                    )}
                </div>
                <CardDescription>For growing businesses and individuals</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ul className="space-y-4">
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
                    {plan.cta}
                </Button>
            </CardFooter>
        </Card>
    );
}
