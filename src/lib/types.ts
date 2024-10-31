export type Service = {
  service: string;
  url: string;
  price: number;
  billing: string;
  activatedAt: Date;
  deactivatedAt?: Date;
  email: string;
  family: { name: string }[];
};

export type ProcessedServices = Service & {
  fill?: string;
};
