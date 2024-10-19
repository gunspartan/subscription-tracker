export type Service = {
  service: string;
  link: string;
  price: number;
  billing: string;
  date: Date;
  email: string;
};

export type ProcessedServices = {
  service: string;
  price: number;
  fill?: string;
};
