import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Button } from './ui/button';
// import { HomeIcon } from '@radix-ui/react-icons';
import { EditSubscription } from './EditSubscription';
import { Service } from '@/lib/types';

const billingType = (period: string) => {
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

const SubscriptionCard = async ({ service }: { service: Service }) => {
  const icon = await fetch(`https://www.google.com/s2/favicons?domain=${service.url}&sz=64`);

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row gap-4 justify-between space-y-0 pb-2'>
        <div className='flex flex-row items center gap-4'>
          <Avatar className=''>
            <AvatarImage className='p-1' src={icon.url} alt={service.service} />
            <AvatarFallback className=''>{service.service[0]}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col justify-center'>
            <CardTitle>{service.service}</CardTitle>
            <CardDescription>{service.url}</CardDescription>
          </div>
        </div>
        <EditSubscription variant='edit' service={service} />
      </CardHeader>
      <CardContent>
        <div className='flex flex-col m-4 gap-2'>
          <div className='flex flex-row justify-between text-lg'>
            <p>Price:</p>
            <p>
              ${service.price / 100}/{billingType(service.billing)}
            </p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>Start Date:</p>
            <p>{format(service.startDate, 'PPP')}</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>Email:</p>
            <p>{service.email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        {/* <Button variant='secondary' className=''>
          <HomeIcon className='mr-1 h-4 w-4' /> Family
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
