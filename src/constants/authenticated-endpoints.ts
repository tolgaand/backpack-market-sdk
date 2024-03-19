import { BASE_URL } from ".";
import { buildUrl } from "../utils/build-url";

export const AUTHENTICATED_ENDPOINTS = {
  CAPITAL: buildUrl({ endpoint: "/capital" }),

  DEPOSITS: (limit: number, offset: number) =>
    buildUrl({
      endpoint: "/capital/deposits",
      baseUrl: BASE_URL.WAPI,
      params: { limit: limit.toString(), offset: offset.toString() },
    }),

  DEPOSIT_ADDRESS: (blockchain: string) =>
    buildUrl({
      endpoint: "/capital/deposit/address",
      baseUrl: BASE_URL.WAPI,
      params: { blockchain },
    }),

  WITHDRAWALS: (limit?: number, offset?: number) =>
    buildUrl({
      endpoint: "/capital/withdrawals",
      baseUrl: BASE_URL.WAPI,
      params: { limit: limit?.toString(), offset: offset?.toString() },
    }),

  ORDER_HISTORY: (limit: number, offset: number, symbol?: string) =>
    buildUrl({
      endpoint: "/history/orders",
      baseUrl: BASE_URL.WAPI,
      params: { symbol, limit: limit.toString(), offset: offset.toString() },
    }),

  FILL_HISTORY: (limit: number, offset: number, symbol?: string) =>
    buildUrl({
      endpoint: "/history/fills",
      baseUrl: BASE_URL.WAPI,
      params: { symbol, limit: limit.toString(), offset: offset.toString() },
    }),

  ORDER: (symbol?: string, orderId?: string, clientId?: string) =>
    buildUrl({
      endpoint: "/order",
      params: { symbol, orderId, clientId },
    }),

  ORDERS: (symbol?: string) =>
    buildUrl({
      endpoint: "/orders",
      params: { symbol },
    }),
};
