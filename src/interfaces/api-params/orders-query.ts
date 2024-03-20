import { OrderType, SelfTradePrevention, Side, TimeInForce } from "../types";

export interface OpenOrderQueryParams {
  clientId?: number;
  orderId?: string;
  symbol: string;
}

export interface ExecuteOrderBody {
  clientId?: number;
  orderType: OrderType;
  postOnly?: boolean;
  price?: string;
  quantity?: string;
  quoteQuantity?: string;
  selfTradePrevention?: SelfTradePrevention;
  side: Side;
  symbol: string;
  timeInForce?: TimeInForce;
  triggerPrice?: string;
}

export interface CancelOrderBody {
  clientId?: number;
  orderId?: string;
  symbol: string;
}

export interface OpenOrdersQueryParams {
  symbol?: string;
}

export interface CancelOrdersBody {
  symbol: string;
}
