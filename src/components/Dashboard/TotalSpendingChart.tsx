'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Service } from '@/lib/types';
import { calculateTotalSpending, formatPrice } from '@/lib/utils';

const chartConfig = {
  spending: {
    label: 'Total Spending',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function TotalSpendingChart({ services }: { services: Service[] }) {
  const today = new Date();

  const chartData = [];
  for (let i = today.getMonth() - 5; i <= today.getMonth(); i++) {
    const month = i < 0 ? i + 12 : i;
    chartData.push({
      month: new Date(today.getFullYear(), month).toLocaleString('default', { month: 'long' }),
      spending: formatPrice(
        services
          .map((service) => calculateTotalSpending(service, new Date(today.getFullYear(), month)))
          .reduce((acc, total) => acc + total, 0)
      ),
    });
  }

  return (
    <ChartContainer config={chartConfig} className='h-full w-full'>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          allowDataOverflow={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey='spending' fill='var(--color-spending)' radius={8}></Bar>
      </BarChart>
    </ChartContainer>
  );
}
