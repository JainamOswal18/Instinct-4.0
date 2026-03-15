import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockStats } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, Zap, TrendingUp, IndianRupee, Wind } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  'Current Usage': Zap,
  'Est. Monthly Bill': IndianRupee,
  'CO2 Saved This Month': Wind,
  'Grid Status': TrendingUp,
};

type Stat = {
  label: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

type StatsCardsProps = {
  stats?: Stat[];
}

export default function StatsCards({ stats = mockStats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = iconMap[stat.label] || Zap;
        const isIncrease = stat.changeType === 'increase';
        return (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className={cn(
                  'flex items-center gap-1',
                  isIncrease ? 'text-red-500' : 'text-green-500'
                )}>
                  {isIncrease ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
