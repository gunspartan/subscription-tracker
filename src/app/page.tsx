import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import subscriptionTracker from '../public/img/subscription-tracker.jpeg';

export default function Home() {
  return (
    <div className='flex min-h-[calc(100vh - 4rem)] w-full flex-col'>
      <div className='mt-12 flex justify-center flex-col items-center'>
        <div className='flex justify-center items-center flex-col m-12'>
          <h1 className='scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl text-muted-foreground'>
            Stay on top of your finances.
          </h1>
          <h1 className='scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl'>
            Track your subscriptions
          </h1>
        </div>
        <h2 className='scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-muted-foreground'>
          Sign up to get started!
        </h2>
        <Link href='/sign-up'>
          <Button className='my-2 text-xl'>Sign Up</Button>
        </Link>
        <div className='mt-2 text-center text-sm'>
          Already have an account?{' '}
          <Link href='/sign-in' className='underline'>
            Sign in
          </Link>
        </div>
        <div className='aspect-video max-w-[80vw] max-h-[50vh] mx-2 lg:mx-48 md:mx-24 sm:mx-4 my-12'>
          <Image
            className='h-full w-full border-red border-solid border rounded-md object-cover'
            src={subscriptionTracker}
            placeholder='empty'
            alt='Subscription Tracker Screenshot'
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
