// import type { Metadata } from 'next';
import '../globals.css';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className='h-[calc(100vh-4rem)] flex flex-col items-center justify-center'>
        {children}
      </div>
    </main>
  );
}
