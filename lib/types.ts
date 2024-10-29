export type Service = {
  service: string;
  url: string;
  price: number;
  billing: string;
  startDate: Date;
  deactivatedAt: Date | null;
  email: string;
  family: string[];
};

export type ProcessedServices = Service & {
  fill?: string;
};
