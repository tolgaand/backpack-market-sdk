export const MARKET_ENDPOINTS = {
  ASSETS: "/assets",
  MARKETS: "/markets",
  TICKERS: "/tickers",
  STATUS: "/status",
  PING: "/ping",
  TIME: "/time",

  TICKER: (symbol: string) => `/ticker?symbol=${symbol}`,
  DEPTH: (symbol: string) => `/depth?symbol=${symbol}`,
  RECENT_TRADES: (symbol: string, limit: number) => `/trades?symbol=${symbol}&limit=${limit}`,
  HISTORICAL_TRADES: (symbol: string, limit: number, offset: number) =>
    `/trades/history?symbol=${symbol}&limit=${limit}&offset=${offset}`,

  KLINES: (symbol: string, interval: number, startTime: number, endTime: number) => {
    const params = new URLSearchParams();

    params.set("symbol", symbol);
    params.set("interval", interval.toString());

    if (startTime) {
      params.set("startTime", startTime.toString());
    }
    if (endTime !== undefined) {
      params.set("endTime", endTime.toString());
    }
    return `/klines?${params.toString()}`;
  },
};
