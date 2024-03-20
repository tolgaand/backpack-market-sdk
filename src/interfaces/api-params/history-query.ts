export interface OrderHistoryQueryParams {
  orderId?: string;
  symbol?: string;
  offset?: number;
  limit?: number;
}

export interface FillHistoryQueryParams {
  orderId?: string;
  from?: number;
  to?: number;
  symbol?: string;
  limit?: number;
  offset?: number;
}
