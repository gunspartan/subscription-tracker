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
    <div className='grid grid-cols-2 m-5 gap-5'>
      {services.map((data, index) => (
        <SubscriptionCard key={index} data={data} />
      ))}
    </div>
  );
}
