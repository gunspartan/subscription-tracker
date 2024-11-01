export type Service = {
  id: string;
  service: string;
  url: string;
  price: number;
  billing: string;
  activatedAt: Date;
  deactivatedAt: Date | null;
  email: string;
  family: string[];
};

export type ProcessedServices = Service & {
  fill?: string;
};
