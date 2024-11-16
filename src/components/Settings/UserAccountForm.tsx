'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { LoadingUserAccountForm } from './LoadingUserAccountForm';
import { editAccount } from '@/actions/actions';

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: AccountFormValues = {
  name: '',
  email: '',
};

export function UserAccountForm() {
  const { data, error, isPending } = authClient.useSession();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data?.user) {
      form.reset({
        name: data.user.name,
        email: data.user.email,
      });
    }
  }, [data, form]);

  const onSubmit = async (accountInfo: AccountFormValues) => {
    console.log(data);

    await editAccount(data.user.id, accountInfo);
  };

  if (error)
    return (
      <h1>
        {error.status} {error.message}
      </h1>
    );
  if (isPending) return <LoadingUserAccountForm />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Your name' {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Your email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Update account</Button>
      </form>
    </Form>
  );
}
