type OrderBookEntry = [string, string];

export interface DepthResponse {
  asks: OrderBookEntry[];
  bids: OrderBookEntry[];
  lastUpdateId: string;
}
