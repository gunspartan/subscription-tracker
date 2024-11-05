import { Dashboard } from '@/components/Dashboard/Dashboard';
import { EditSubscriptionDialog } from '@/components/Subscriptions/EditSubscriptionDialog';
import SubscriptionCard from '@/components/Subscriptions/SubscriptionCard';
import prisma from '@/lib/db';

export default async function Home() {
  const services = await prisma.service.findMany();

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <div className='mx-0 md:max-w-[60vw] w-full sm:mx-auto'>
        <Dashboard services={services} />
        <div className='flex justify-end px-4 md:px-8'>
          <EditSubscriptionDialog variant='new' />
        </div>
        <main className='grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 md:gap-8 md:p-8'>
          {services.length ? (
            services.map((service, index) => <SubscriptionCard key={index} service={service} />)
          ) : (
            <div className='text-center col-span-full'>
              <h1 className='text-2xl font-bold text-muted-foreground '>No services yet.</h1>
              <p className='text-xs text-muted-foreground'>Add a new service to get started. </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
