import { CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { CardStackIcon } from '@radix-ui/react-icons';

const Nav = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  const handleSignOut = async () => {
    'use server';

    await auth.api.signOut({
      headers: headers(),
    });

    redirect('/');
  };

  return (
    <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10'>
      <Link
        href='/dashboard'
        className='flex flex-row justify-start items-center gap-2 text-primary'
      >
        <CardStackIcon className='h-8 w-8 ' />
        <h1 className='text-xl'>Tracker</h1>
      </Link>
      <div className='flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <CircleUser className='h-5 w-5' />
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href='/settings'>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <form action={handleSignOut}>
                <DropdownMenuItem>
                  <button>Logout</button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button>
            <Link href='/sign-in'>Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Nav;
