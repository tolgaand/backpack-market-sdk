interface FillHistory {
  tradeId: number;
  orderId: string;
  symbol: string;
  side: string;
  price: string;
  quantity: string;
  fee: string;
  feeSymbol: string;
  isMaker: boolean;
  timestamp: string;
}

export interface FillHistoryResponse extends Array<FillHistory> {}
