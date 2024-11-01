'use server';

import prisma from '@/lib/db';
import { Service } from '@/lib/types';

export async function addService(service: Omit<Service, 'id'>) {
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
    },
  });
}

export async function editService(service: Service) {
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
}
