export interface RecentTradesQueryParams {
  symbol: string;
  limit?: number;
}

export interface HistoricalTradesQueryParams extends RecentTradesQueryParams {
  offset?: number;
}
