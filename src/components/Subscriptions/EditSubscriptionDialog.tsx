'use client';

import { useState } from 'react';
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
import { CalendarIcon, MinusIcon, Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Service } from '@/lib/types';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  FormDescription,
} from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { addService, editService } from '@/actions/actions';

// Family array needs to be an array of objects for react-hook-form
const familySchema = z.object({
  name: z.string(),
});

const formSchema = z.object({
  service: z.string(),
  url: z.string().url(),
  price: z.string(),
  activatedAt: z.date(),
  email: z.string().email(),
  billing: z.string(),
  deactivatedAt: z.date().optional(),
  family: z.array(familySchema),
});

const defaultFormValues = {
  id: '',
  service: '',
  url: '',
  price: 0,
  activatedAt: new Date(),
  deactivatedAt: null,
  email: '',
  billing: 'Monthly',
  family: [],
};

export function EditSubscriptionDialog({
  variant = 'edit',
  service = defaultFormValues,
}: {
  variant: 'edit' | 'new';
  service?: Service;
}) {
  const [open, setOpen] = useState(false);
  const [isFamilyPlan, setIsFamilyPlan] = useState(service.family.length > 0);
  const [configureFamilyPlan, setConfigureFamilyPlan] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: service.service,
      url: service.url,
      price: (service.price / 100).toString(),
      activatedAt: service.activatedAt,
      email: service.email,
      billing: service.billing,
      deactivatedAt: service.deactivatedAt ?? undefined, // Optional fields need to be set to undefined for date picker
      family: service.family.map((name) => ({ name })),
    },
  });

  const { fields, append, remove } = useFieldArray({ name: 'family', control: form.control });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isFamilyPlan && !configureFamilyPlan) {
      setConfigureFamilyPlan(true);
      // Don't submit the form if family plan is enabled
      // And the user hasn't configured the family members
      return;
    }

    const data = {
      id: service.id,
      service: values.service,
      url: values.url,
      price: Math.round(parseFloat(values.price) * 100), // Convert to cents
      billing: values.billing,
      activatedAt: values.activatedAt,
      deactivatedAt: values.deactivatedAt ?? null,
      email: values.email,
      family: isFamilyPlan
        ? values.family.map((member) => member.name) // Format the array for backend
        : [], // Remove family array if not a family plan
    };

    if (variant === 'new') {
      addService(data);
    }

    if (variant === 'edit') {
      editService(data);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        form.reset();
        setConfigureFamilyPlan(false);
        setIsFamilyPlan(service.family.length > 0);
      }}
    >
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
              <DialogTitle className='flex gap-2 items-center'>
                {variant === 'edit' ? <Pencil1Icon /> : <PlusIcon />}{' '}
                {variant === 'edit' ? 'Edit' : 'New'} Subscription
              </DialogTitle>
              <DialogDescription>
                Make changes to your subscription here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div
              className={`${
                configureFamilyPlan ? 'hidden' : ''
              } col-span-2 flex flex-col justify-center`}
            >
              <FormField
                control={form.control}
                name='service'
                render={({ field }) => (
                  <FormItem className='mb-4'>
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
                  <FormItem className='mb-4'>
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
                  <FormItem className='mb-4'>
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
                  <FormItem className='mb-4'>
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
                name='activatedAt'
                render={({ field }) => (
                  <FormItem className='flex flex-col col-span-2 mb-4'>
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
                name='deactivatedAt'
                render={({ field }) => (
                  <FormItem className='flex flex-col col-span-2 mb-4'>
                    <FormLabel>End Date</FormLabel>
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
                  <FormItem className='mb-4'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='johndoe@gmail.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className='w-full col-span-2' />
              <div className='w-full space-y-2 mt-4'>
                <div className='flex items-center justify-between '>
                  <Label>Family Plan</Label>
                  <Checkbox
                    checked={isFamilyPlan}
                    onCheckedChange={() => setIsFamilyPlan(!isFamilyPlan)}
                  />
                </div>
              </div>
            </div>
            <div className={`${configureFamilyPlan ? '' : 'hidden'} col-span-2`}>
              <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <FormLabel>Family Members</FormLabel>
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  onClick={() => append({ name: '' })}
                >
                  <PlusIcon className='ml-1 h-4 w-4' />
                </Button>
              </div>
              {fields.length ? (
                fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name='family'
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div className='flex flex-row items-center justify-between space-y-0 gap-2 mb-2'>
                            <Input
                              placeholder='John Doe'
                              {...form.register(`family.${index}.name` as const, {
                                required: true,
                              })}
                            />
                            <Button
                              type='button'
                              variant='ghost'
                              size='icon'
                              onClick={() => remove(index)}
                            >
                              <MinusIcon className='h-4 w-4' />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))
              ) : (
                <FormDescription>You have no family members added.</FormDescription>
              )}
            </div>
            <DialogFooter className='col-span-2'>
              {configureFamilyPlan && (
                <Button
                  variant='ghost'
                  type='button'
                  onClick={() => {
                    setConfigureFamilyPlan(false);
                  }}
                >
                  Back
                </Button>
              )}
              <Button type='submit' disabled={configureFamilyPlan && !fields.length}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
