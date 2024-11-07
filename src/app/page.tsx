import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import wek from '../public/img/3d3dwek.png';

export default function Home() {
  return (
    <div className='flex min-h-[calc(100vh - 4rem)] w-full flex-col'>
      <div className='mt-12 flex justify-center flex-col items-center'>
        <h1 className='scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl'>
          Track your subscriptions
        </h1>
        <p className='leading-7'>Stay on top of your finances</p>
        <div className='aspect-video h-[50vh] mx-96 my-24'>
          <Image
            className='h-full w-full border-red border-solid border rounded-md object-cover'
            src={wek}
            placeholder='empty'
            alt='Subscription Tracker Screenshot'
            priority={true}
          />
        </div>

        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
          Sign up to get started!
        </h2>
        <Button className='my-4 text-xl'>Sign Up</Button>
        <div className='mt-2 text-center text-sm'>
          Already have an account?{' '}
          <Link href='#' className='underline'>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
