export interface IColumns {
  paymentId: string;
  status: string;
  name: string;
  email: string;
  date_created: Date;
  date_approved: Date;
}

export interface Payments {
  paymentId: string;
  status: string;
  name: string;
  email: string;
  date_created: Date;
  date_approved: Date;
}

export interface PaginatedPaymentsResponse {
  data: Payments[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
