import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { EditSubscriptionDialog } from './EditSubscriptionDialog';
import { Service } from '@/lib/types';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import FamilyDialog from './FamilyDialog';

const abbreviatedBilling = (period: string) => {
  switch (period) {
    case 'Monthly':
      return 'mo';
    case 'Yearly':
      return 'yr';
    case 'Weekly':
      return 'wk';
    case 'Daily':
      return 'day';
    default:
      return 'mo';
  }
};

const pricePerMonthFamily = (price: number, numFamily: number, billingPeriod: string) => {
  return (
    (Math.round(price / (numFamily + 1)) / 100).toFixed(2) +
    '/' +
    abbreviatedBilling(billingPeriod) +
    ' per person'
  );
};

const SubscriptionCard = async ({ service }: { service: Service }) => {
  const icon = await fetch(`https://www.google.com/s2/favicons?domain=${service.url}&sz=64`);

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row gap-4 justify-between space-y-0 pb-2'>
        <Link className='flex flex-row items center gap-4' target='_blank' href={service.url}>
          <Avatar className=''>
            <AvatarImage className='p-1' src={icon.url} alt={service.service} />
            <AvatarFallback className=''>{service.service[0]}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col justify-center'>
            <CardTitle>{service.service}</CardTitle>
            <CardDescription>{service.url}</CardDescription>
          </div>
        </Link>
        <EditSubscriptionDialog variant='edit' service={service} />
      </CardHeader>
      <CardContent>
        <div className='flex flex-col m-4 gap-2'>
          <div className='flex flex-row justify-between text-lg'>
            <p>Price:</p>
            <div className='flex flex-col'>
              <p className='text-end'>
                ${service.price / 100 + '/' + abbreviatedBilling(service.billing)}
              </p>
              <p
                className={`${
                  service.family.length ? '' : 'invisible'
                } text-xs text-muted-foreground text-end`}
              >
                ${pricePerMonthFamily(service.price, service.family.length, service.billing)}
              </p>
            </div>
          </div>
          <div className='flex flex-row justify-between mb-4'>
            <p>Start Date:</p>
            <p>{format(service.activatedAt, 'PPP')}</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>Email:</p>
            <p>{service.email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <Badge variant='outline' className={service.deactivatedAt ? '' : 'hidden'}>
          <LockClosedIcon className='mr-1 h-4 w-4' /> Deactivated
        </Badge>
        <FamilyDialog service={service} />
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
