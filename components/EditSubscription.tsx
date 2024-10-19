import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';

export function EditSubscription({ variant = 'edit' }: { variant: 'edit' | 'new' }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={`${variant === 'edit' ? 'ghost' : 'default'}`}
          size={`${variant === 'edit' ? 'icon' : 'default'}`}
        >
          {variant === 'edit' ? <Pencil1Icon /> : <PlusIcon />}
          {variant === 'new' && 'Add New'}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{variant === 'edit' ? 'Edit' : 'New'} Subscription</DialogTitle>
          <DialogDescription>
            Make changes to your subscription here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input id='name' value='Pedro Duarte' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='url' className='text-right'>
              URL
            </Label>
            <Input id='url' type='url' value='https://netflix.com' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='price' className='text-right'>
              Price
            </Label>
            <Input id='Price' type='number' value='12.99' className='col-span-3' />
          </div>
          {/* Use Date Picker */}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='start-date' className='text-right'>
              Start Date
            </Label>
            <Input id='start-date' type='date' value='' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='email' className='text-right'>
              Email
            </Label>
            <Input id='email' type='email' value='https://netflix.com' className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
