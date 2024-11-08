'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

const signUpSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
  });

export function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const { name, email, password } = values;
    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onRequest: () => {
          setIsSubmitting(true);
        },
        onSuccess: () => {
          form.reset();
          setIsSubmitting(false);
          router.push('/sign-in');
        },
        onError: (ctx) => {
          alert(ctx.error.message);
          router.push('/sign-in');
          setIsSubmitting(false);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className={`${isSubmitting ? 'opacity-75' : ''} mx-auto max-w-sm`}>
          <CardHeader>
            <CardTitle className='text-2xl'>Sign up</CardTitle>
            <CardDescription>Enter your details below to create to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <FormControl>
                      <Input id='name' type='name' placeholder='John Doe' required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <FormControl>
                      <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <div className='flex items-center'>
                      <FormLabel htmlFor='password'>Password</FormLabel>
                    </div>
                    <FormControl>
                      <Input id='password' type='password' required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <div className='flex items-center'>
                      <FormLabel htmlFor='password'>Confirm Password</FormLabel>
                    </div>
                    <FormControl>
                      <Input id='password' type='password' required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                Sign Up
              </Button>
              {/* <Button variant='outline' className='w-full' disabled={isSubmitting}>
                Sign up with Google
              </Button> */}
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <Link href='/sign-in' className='underline'>
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
