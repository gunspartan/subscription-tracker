export type Service = {
  service: string;
  url: string;
  price: number;
  billing: string;
  startDate: Date;
  deactivatedAt: Date | null;
  email: string;
};

export type ProcessedServices = {
  service: string;
  price: number;
  fill?: string;
};
