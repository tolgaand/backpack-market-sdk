import { OrderType } from "../order-type";
import { Side } from "../side";

interface OrderResponse {
  orderType: OrderType;
  id: string;
  clientId: number;
  symbol: string;
  side: Side;
  quantity: string;
  executedQuantity: string;
  quoteQuantity: string;
  executedQuoteQuantity: string;
  triggerPrice: string;
  timeInForce: string;
  selfTradePrevention: string;
  status: string;
  createdAt: number;
}

export interface OrderHistoryResponse
  extends Omit<OrderResponse, "executedQuantity" | "executedQuoteQuantity"> {
  price: string;
  postOnly: boolean;
}

export interface OpenOrderResponse extends OrderResponse {}
export interface CancelOrderResponse extends OrderResponse {}
export interface ExecuteOrderResponse extends OrderResponse {}

export interface OpenOrdersResponse extends Array<OrderResponse> {}
export interface CancelOrdersResponse extends Array<OrderResponse> {}
