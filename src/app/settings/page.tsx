import { Separator } from '@/components/ui/separator';
import { UserAccountForm } from '@/components/Settings/UserAccountForm';

export default function SettingsAccountPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Account</h3>
        <p className='text-sm text-muted-foreground'>Edit your account details.</p>
      </div>
      <Separator />
      <UserAccountForm />
    </div>
  );
}
