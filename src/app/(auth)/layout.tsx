// import type { Metadata } from 'next';
import '../globals.css';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className='h-screen flex flex-col items-center justify-center'>{children}</div>
    </main>
  );
}
