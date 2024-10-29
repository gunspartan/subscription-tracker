'use client';

import { CreditCard, DollarSign } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubscriptionPie } from './SubscriptionPie';
import { TotalSpendingChart } from './TotalSpendingChart';
import { CardStackIcon } from '@radix-ui/react-icons';
import { calculateTotalSpending, getMonthlySpending } from '@/lib/utils';
import { Service } from '@/lib/types';

export function Dashboard({ services }: { services: Service[] }) {
  const filteredServices = services.filter((service) => !service.deactivatedAt);
  const monthlySpending = getMonthlySpending(filteredServices);
  const totalSpending = services.map((service) => calculateTotalSpending(service));

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
      <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
        <Card x-chunk='dashboard-01-chunk-0'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Spent</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${(Math.round(totalSpending.reduce((acc, total) => acc + total)) / 100).toFixed(2)}
            </div>
            <TotalSpendingChart services={services} />
          </CardContent>
        </Card>
        <Card x-chunk='dashboard-01-chunk-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Subscriptions</CardTitle>
            <CardStackIcon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent className='h-full flex items-center justify-center'>
            <div>
              <h1 className='text-center text-7xl mb-8 pb-4 font-bold'>
                {filteredServices.length}
              </h1>
            </div>
          </CardContent>
        </Card>
        <Card
          x-chunk='dashboard-01-chunk-2'
          className='md:col-span-2 lg:col-span-1 sm:col-span-1 flex flex-col'
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Monthly Spending</CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent className=''>
            <div className='text-2xl font-bold'>${monthlySpending}</div>
            <SubscriptionPie services={filteredServices} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
