import { Dashboard } from '@/components/Dashboard';
import Nav from '@/components/Nav';
import SubscriptionCard from '@/components/SubscriptionCard';

export default function Home() {
  const services = [
    {
      service: 'Netflix',
      link: 'https://netflix.com',
      price: 12.99,
      billing: 'Monthly',
      date: '2021-09-01',
      email: 'johndoe@gmail.com',
    },
    {
      service: 'Netflix',
      link: 'https://netflix.com',
      price: 12.99,
      billing: 'Monthly',
      date: '2021-09-01',
      email: 'johndoe@gmail.com',
    },
    {
      service: 'Netflix',
      link: 'https://netflix.com',
      price: 12.99,
      billing: 'Monthly',
      date: '2021-09-01',
      email: 'johndoe@gmail.com',
    },
  ];

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Nav />
      <div className='mx-0 md:max-w-[60vw] w-full sm:mx-auto'>
        <Dashboard />
        <main className='grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 md:gap-8 md:p-8'>
          <SubscriptionCard data={services[0]} />
          <SubscriptionCard data={services[0]} />
          <SubscriptionCard data={services[0]} />
          <SubscriptionCard data={services[0]} />
          <SubscriptionCard data={services[0]} />
          <SubscriptionCard data={services[0]} />
          <SubscriptionCard data={services[0]} />
        </main>
      </div>
    </div>
  );
}
