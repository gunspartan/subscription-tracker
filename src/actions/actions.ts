'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { Service } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export async function addService(service: Omit<Service, 'id'>) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session?.user) throw new Error('User not found');

  const user = session.user;

  await prisma.service.create({
    data: {
      service: service.service,
      url: service.url,
      price: service.price,
      billing: service.billing,
      activatedAt: service.activatedAt,
      deactivatedAt: service.deactivatedAt,
      email: service.email,
      family: service.family,
      userId: user.id,
    },
  });

  revalidatePath('/');
}

export async function editService(service: Service) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session?.user) throw new Error('User not found');

  await prisma.service.update({
    where: { id: service.id },
    data: {
      service: service.service,
      url: service.url,
      price: service.price,
      billing: service.billing,
      activatedAt: service.activatedAt,
      deactivatedAt: service.deactivatedAt,
      email: service.email,
      family: service.family,
    },
  });

  revalidatePath('/');
}

export async function editAccount(userId: string, accountInfo: { name: string; email: string }) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      name: accountInfo.name,
      email: accountInfo.email,
    },
  });

  revalidatePath('/');
}
