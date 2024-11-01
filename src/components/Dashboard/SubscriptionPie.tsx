import { Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { processServices } from '@/lib/utils';
import { Service } from '@/lib/types';

const chartConfig = {
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function SubscriptionPie({ services }: { services: Service[] }) {
  const processedServices = processServices(services);

  return (
    <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={processedServices} dataKey='price' nameKey='service' />
      </PieChart>
    </ChartContainer>
  );
}
