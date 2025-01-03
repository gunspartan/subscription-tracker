import { ProcessedServices, Service } from '@/lib/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return (Math.round(price) / 100).toFixed(2);
}

export function processServices(services: ProcessedServices[]): ProcessedServices[] {
  let mergedServices = services;

  if (mergedServices.length >= 5) {
    // Merge services from the 5th index into the 'Other' category
    mergedServices = services.slice(0, 4);
    const otherServices = services.slice(4);

    const otherTotal = otherServices.reduce((acc, service) => {
      const monthlyPrice = calculateMonthlyPrice(service);
      return acc + monthlyPrice;
    }, 0);

    mergedServices.push({
      id: 'other',
      service: 'Other',
      price: otherTotal,
      url: '',
      billing: '',
      activatedAt: new Date(),
      deactivatedAt: null,
      email: '',
      family: [],
    });
  }

  const servicesWithColors = mergedServices.map((service, index) => {
    const monthlyPrice = calculateMonthlyPrice(service);
    const curr = {
      ...service,
      price: Math.round(monthlyPrice) / 100,
      fill: `hsl(var(--chart-${index < 5 ? index + 1 : 5}))`,
    };

    return curr;
  });

  return servicesWithColors;
}

export function calculateMonthlyPrice(service: Service) {
  let monthlyPrice = service.price;
  switch (service.billing) {
    case 'Yearly':
      monthlyPrice = service.price / 12;
      break;
    case 'Monthly':
      monthlyPrice = service.price * 1;
      break;
    case 'Weekly':
      monthlyPrice = service.price * 4;
      break;
    case 'Daily':
      monthlyPrice = service.price * 30;
      break;
  }

  return monthlyPrice;
}

export function getMonthlySpending(services: Service[]) {
  const monthly = services.reduce((acc, service) => {
    if (service.billing === 'Yearly') {
      return acc + service.price / 12;
    } else if (service.billing === 'Weekly') {
      return acc + service.price * 4;
    } else if (service.billing === 'Daily') {
      return acc + service.price * 30;
    }

    return acc + service.price;
  }, 0);

  return formatPrice(monthly);
}

export function calculateTotalSpending(service: Service, endDate = new Date()) {
  // Calculate the spending up to the deactivation date
  if (service.deactivatedAt && service.deactivatedAt < endDate) {
    return calculateTotalSpending(service, service.deactivatedAt);
  }

  // If the service has already been deactivated
  if (
    service.activatedAt.getMonth() > endDate.getMonth() &&
    service.activatedAt.getFullYear() >= endDate.getFullYear()
  ) {
    return 0;
  }

  const startMonth = service.activatedAt.getMonth();
  const startYear = service.activatedAt.getFullYear();

  const monthlyPrice = calculateMonthlyPrice(service);

  const months = (endDate.getFullYear() - startYear) * 12 + endDate.getMonth() - startMonth;
  // Include the current month
  return monthlyPrice * (months + 1);
}
