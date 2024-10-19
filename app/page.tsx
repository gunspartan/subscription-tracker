import { Dashboard } from '@/components/Dashboard';
import { EditSubscription } from '@/components/EditSubscription';
import Nav from '@/components/Nav';
import SubscriptionCard from '@/components/SubscriptionCard';

export default function Home() {
  const services = [
    {
      service: 'Netflix',
      link: 'https://netflix.com',
      price: 11.99,
      billing: 'Monthly',
      date: new Date('2024-09-01'),
      email: 'johndoe@gmail.com',
    },
    {
      service: 'Amazon Prime',
      link: 'https://amazon.com',
      price: 12.99,
      billing: 'Monthly',
      date: new Date('2024-09-01'),

      email: 'johndoe@gmail.com',
    },
    {
      service: 'YouTube Premium',
      link: 'https://youtube.com',
      price: 5.99,
      billing: 'Monthly',
      date: new Date('2024-09-01'),

      email: 'johndoe@gmail.com',
    },
    {
      service: 'Netflix',
      link: 'https://netflix.com',
      price: 2.99,
      billing: 'Monthly',
      date: new Date('2024-09-01'),

      email: 'johndoe@gmail.com',
    },
    {
      service: 'Amazon Prime',
      link: 'https://amazon.com',
      price: 1.99,
      billing: 'Monthly',
      date: new Date('2024-09-01'),

      email: 'johndoe@gmail.com',
    },
    {
      service: 'YouTube Premium',
      link: 'https://youtube.com',
      price: 12.99,
      billing: 'Monthly',
      date: new Date('2024-09-01'),

      email: 'johndoe@gmail.com',
    },

    {
      service: 'YouTube Premium',
      link: 'https://youtube.com',
      price: 12.99,
      billing: 'Monthly',
      date: new Date('2024-09-01'),

      email: 'johndoe@gmail.com',
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
