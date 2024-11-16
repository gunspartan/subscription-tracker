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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Skeleton } from '../ui/skeleton';

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

const defaultValues: AccountFormValues = {
  name: '',
  email: '',
};

export function LoadingUserAccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={() => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Skeleton className='h-9 flex-grow' />
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
          render={() => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Skeleton className='h-9 flex-grow' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled>
          Update account
        </Button>
      </form>
    </Form>
  );
}
