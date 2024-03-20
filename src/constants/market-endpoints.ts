import {
  DepthQueryParams,
  HistoricalTradesQueryParams,
  KlinesQueryParams,
  RecentTradesQueryParams,
  TickerQueryParams,
} from "../interfaces";
import { buildUrl } from "../utils/build-url";

export const MARKET_ENDPOINTS = {
  ASSETS: buildUrl({ endpoint: "/assets" }),
  MARKETS: buildUrl({ endpoint: "/markets" }),
  TICKERS: buildUrl({ endpoint: "/tickers" }),
  STATUS: buildUrl({ endpoint: "/status" }),
  PING: buildUrl({ endpoint: "/ping" }),
  TIME: buildUrl({ endpoint: "/time" }),

  TICKER: (params: TickerQueryParams) => buildUrl({ endpoint: "/ticker", params }),

  DEPTH: (params: DepthQueryParams) => buildUrl({ endpoint: "/depth", params }),

  RECENT_TRADES: (params: RecentTradesQueryParams) =>
    buildUrl({
      endpoint: "/trades",
      params,
    }),

  HISTORICAL_TRADES: (params: HistoricalTradesQueryParams) =>
    buildUrl({
      endpoint: "/trades/history",
      params,
    }),

  KLINES: (params: KlinesQueryParams) =>
    buildUrl({
      endpoint: "/klines",
      params,
    }),
};
