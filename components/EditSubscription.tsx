'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
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
import { CalendarIcon, Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Service } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormMessage, FormItem, FormLabel } from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from './ui/calendar';
import { DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const formSchema = z.object({
  service: z.string(),
  url: z.string().url(),
  price: z.string(),
  startDate: z.date(),
  email: z.string().email(),
  billing: z.string(),
  deactivatedAt: z.date().nullable(),
});

export function EditSubscription({
  variant = 'edit',
  service = {
    service: '',
    url: '',
    price: 0,
    startDate: new Date(),
    email: '',
    billing: 'Monthly',
    deactivatedAt: null,
  },
}: {
  variant: 'edit' | 'new';
  service?: Service;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: service.service || '',
      url: service.url || '',
      price: (service.price / 100).toString() ?? 0,
      startDate: service.startDate || new Date(),
      email: service.email || '',
      billing: service.billing || 'Monthly',
      deactivatedAt: service.deactivatedAt || null,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 grid grid-cols-2 gap-x-2'
          >
            <DialogHeader className='col-span-2'>
              <DialogTitle>{variant === 'edit' ? 'Edit' : 'New'} Subscription</DialogTitle>
              <DialogDescription>
                Make changes to your subscription here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name='service'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <Input placeholder='Netflix' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder='https://netflix.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className='flex items-center space-x-1'>
                      <DollarSign className='h-4 w-4 m-2' />
                      <Input placeholder='9.99' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='billing'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Period</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Monthly' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Monthly'>Monthly</SelectItem>
                        <SelectItem value='Yearly'>Yearly</SelectItem>
                        <SelectItem value='Weekly'>Weekly</SelectItem>
                        <SelectItem value='Daily'>Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormItem className='flex flex-col col-span-2'>
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='johndoe@gmail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='col-span-2'>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
