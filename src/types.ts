export interface Asset {
  symbol: string;
  tokens: string[];
}

export interface Market {
  symbol: string;
  baseSymbol: string;
  quoteSymbol: string;
  filters: Record<string, unknown>;
}

export interface Ticker {
  symbol: string;
  firstPrice: string;
  lastPrice: string;
  priceChange: string;
  priceChangePercent: string;
  high: string;
  low: string;
  volume: string;
  quoteVolume: string;
  trades: number;
}

export interface Trade {
  id: number;
  price: string;
  quantity: string;
  quoteQuantity: string;
  timestamp: number;
  isBuyerMaker: boolean;
}

export interface Kline {
  start: string;
  open: string;
  high: string;
  low: string;
  close: string;
  end: string;
  volume: string;
  trades: string;
}

export interface SystemStatus {
  status: string;
  message: string;
}

export interface Balance {
  available: string;
  locked: string;
  staked: string;
}

export interface Deposit {
  id: number;
  toAddress: string;
  fromAddress: string;
  confirmationBlockNumber: number;
  providerId: string;
  source: string;
  status: string;
  transactionHash: string;
  subaccountId: number;
  symbol: string;
  quantity: string;
  createdAt: string;
}

export interface Withdrawal {
  id: number;
  blockchain: "Solana" | "Ethereum" | "Polygon" | "Bitcoin";
  clientId: string;
  identifier: string;
  quantity: string;
  fee: string;
  symbol: string;
  status: string;
  subaccountId: number;
  toAddress: string;
  transactionHash: string;
  createdAt: string;
}

export interface DepositAddress {
  address: string;
}

export interface Order {
  id: string;
  orderType: string;
  symbol: string;
  side: string;
  price: string;
  triggerPrice: string;
  quantity: string;
  quoteQuantity: string;
  timeInForce: string;
  selfTradePrevention: string;
  postOnly: boolean;
  status: string;
  createdAt: number;
}

export interface Fill {
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

export interface DepositQuery {
  limit: number;
  offset: number;
}

export interface WithdrawalQuery extends DepositQuery {}

export interface WithdrawalRequest {
  address: string;
  blockchain: "Solana" | "Ethereum" | "Polygon" | "Bitcoin";
  quantity: number;
  symbol: string;
  clientId?: string;
  twoFactorToken?: string;
}

export interface OrderHistoryQuery {
  symbol?: string;
  limit?: number;
  offset?: number;
}

export interface ExecuteOrderParams {
  clientId?: number;
  orderType: string | "Limit" | "Market";
  postOnly?: boolean;
  price: number;
  quantity: number;
  quoteQuantity?: string;
  selfTradePrevention?:
    | string
    | "RejectTaker"
    | "RejectMaker"
    | "RejectBoth"
    | "Allow";
  side: string | "Bid" | "Ask";
  symbol: string;
  timeInForce?: string;
  triggerPrice?: string;
}

export interface OrderQuery {
  orderId?: string;
  clientId?: string;
  symbol?: string;
}

export interface CancelOrderParams {
  orderId: string;
  symbol: string;
}

export interface CancelOpenOrdersParams {
  symbol: string;
}
