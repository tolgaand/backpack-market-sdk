import { buildUrl } from "../utils/build-url";

export const MARKET_ENDPOINTS = {
  ASSETS: buildUrl({ endpoint: "/assets" }),
  MARKETS: buildUrl({ endpoint: "/markets" }),
  TICKERS: buildUrl({ endpoint: "/tickers" }),
  STATUS: buildUrl({ endpoint: "/status" }),
  PING: buildUrl({ endpoint: "/ping" }),
  TIME: buildUrl({ endpoint: "/time" }),

  TICKER: (symbol: string) => buildUrl({ endpoint: "/ticker", params: { symbol } }),
  DEPTH: (symbol: string) => buildUrl({ endpoint: "/depth", params: { symbol } }),
  RECENT_TRADES: (symbol: string, limit: number) =>
    buildUrl({
      endpoint: "/trades",
      params: { symbol, limit: limit.toString() },
    }),
  HISTORICAL_TRADES: (symbol: string, limit: number, offset: number) =>
    buildUrl({
      endpoint: "/trades/history",
      params: { symbol, limit: limit.toString(), offset: offset.toString() },
    }),
  KLINES: (symbol: string, interval: string, startTime?: number, endTime?: number) =>
    buildUrl({
      endpoint: "/klines",
      params: {
        symbol,
        interval,
        startTime: startTime?.toString(),
        endTime: endTime?.toString(),
      },
    }),
};
