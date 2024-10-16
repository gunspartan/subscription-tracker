import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { HomeIcon, Pencil1Icon } from '@radix-ui/react-icons';

type SubscriptionCardProps = {
  service: string;
  link: string;
  price: number;
  billing: string;
  date: string;
  email: string;
};

const SubscriptionCard = async ({ data }: { data: SubscriptionCardProps }) => {
  const icon = await fetch(`https://www.google.com/s2/favicons?domain=${data.link}&sz=128`);

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

  return (
    <Card className='w-96 '>
      <CardHeader className='flex flex-row gap-4 items-center relative'>
        <Avatar className=''>
          <AvatarImage className='' src={icon.url} alt={data.service} />
          <AvatarFallback className=''>{data.service[0]}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <CardTitle>{data.service}</CardTitle>
          <CardDescription>{data.link}</CardDescription>
        </div>
        <Button variant='ghost' size='icon' className='absolute right-5 top-5 z-10'>
          <Pencil1Icon />
        </Button>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between'>
            <p>Price:</p>
            <p>
              ${data.price}/{billingType(data.billing)}
            </p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>Date:</p>
            <p>{data.date}</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>Email:</p>
            <p>{data.email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button variant='secondary' className=''>
          <HomeIcon className='mr-1 h-4 w-4' /> Family
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
