interface TradeResponse {
  id: number;
  price: string;
  quantity: string;
  quoteQuantity: string;
  timestamp: number;
  isBuyerMaker: boolean;
}

interface TradesResponse extends Array<TradeResponse> {}

export interface RecentTradesResponse extends Array<TradeResponse> {}
export interface HistoricalTradesResponse extends Array<TradeResponse> {}
