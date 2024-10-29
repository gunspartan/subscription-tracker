import { Dashboard } from '@/components/Dashboard/Dashboard';
import { EditSubscription } from '@/components/EditSubscription';
import Nav from '@/components/Nav';
import SubscriptionCard from '@/components/SubscriptionCard';

export default function Home() {
  const services = [
    {
      service: 'Netflix',
      url: 'https://netflix.com',
      price: 1000,
      billing: 'Yearly',
      activatedAt: new Date('2024-09-01'),
      deactivatedAt: new Date(),
      email: 'johndoe@gmail.com',
      family: [{ name: 'Jane Doe' }, { name: 'John Doe' }],
    },
    {
      service: 'Amazon Prime',
      url: 'https://amazon.com',
      price: 1000,
      billing: 'Monthly',
      activatedAt: new Date('2022-09-01'),
      email: 'johndoe@gmail.com',
      family: [],
    },
    {
      service: 'Amazon Prime',
      url: 'https://amazon.com',
      price: 1000,
      billing: 'Daily',
      activatedAt: new Date('2022-09-01'),
      email: 'johndoe@gmail.com',
      family: [],
    },
    {
      service: 'Amazon Prime',
      url: 'https://amazon.com',
      price: 1000,
      billing: 'Monthly',
      activatedAt: new Date('2022-09-01'),
      email: 'johndoe@gmail.com',
      family: [],
    },
  ];

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Nav />
      <div className='mx-0 md:max-w-[60vw] w-full sm:mx-auto'>
        <Dashboard services={services} />
        <div className='flex justify-end px-4 md:px-8'>
          <EditSubscription variant='new' />
        </div>
        <main className='grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 md:gap-8 md:p-8'>
          {services.map((service, index) => (
            <SubscriptionCard key={index} service={service} />
          ))}
        </main>
      </div>
    </div>
  );
}
