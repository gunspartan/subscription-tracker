import { ProcessedServices, Service } from '@/lib/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function processServices(services: ProcessedServices[]): ProcessedServices[] {
  // Merge services from the 5th index into the 'Other' category
  const mergedServices = services.slice(0, 4);
  const otherServices = services.slice(4);

  const otherTotal = otherServices.reduce((acc, service) => acc + service.price, 0);

  mergedServices.push({
    service: 'Other',
    price: otherTotal,
  });

  const servicesWithColors = mergedServices.map((service, index) => {
    const curr = {
      ...service,
      fill: `hsl(var(--chart-${index < 5 ? index + 1 : 5}))`,
    };

    return curr;
  });

  return servicesWithColors;
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

  return (Math.round(monthly) / 100).toFixed(2);
}

export function calculateTotalSpending(service: Service, toDate = new Date()) {
  if (service.startDate > toDate) {
    return 0;
  }

  const startMonth = service.startDate.getMonth();
  const startYear = service.startDate.getFullYear();

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

  const months = (toDate.getFullYear() - startYear) * 12 + toDate.getMonth() - startMonth;
  return monthlyPrice * months;
}
