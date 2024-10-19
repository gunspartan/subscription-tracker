'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Service } from '@/types';
import { calculateTotalSpending } from '@/lib/utils';

// const chartData = [
//   { month: 'January', price: 186 },
//   { month: 'February', price: 305 },
//   { month: 'March', price: 237 },
//   { month: 'April', price: 73 },
//   { month: 'May', price: 209 },
//   { month: 'June', price: 214 },
// ];

const chartConfig = {
  spending: {
    label: 'spending',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function TotalSpendingChart({ services }: { services: Service[] }) {
  const today = new Date();

  const chartData = [];
  for (let i = today.getMonth() - 5; i <= today.getMonth(); i++) {
    const month = i < 0 ? i + 12 : i;
    chartData.push({
      month: new Date(today.getFullYear(), month).toLocaleString('default', { month: 'long' }),
      spending: (
        Math.round(
          services
            .map((service) => calculateTotalSpending(service, new Date(today.getFullYear(), month)))
            .reduce((acc, total) => acc + total, 0) * 100
        ) / 100
      ).toFixed(2),
    });
  }

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey='spending' fill='var(--color-spending)' radius={8}>
          <LabelList position='top' offset={12} className='fill-foreground' fontSize={12} />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
