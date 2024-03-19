import { APIClient } from "./utils/api-client";
import { Asset, Market, Ticker, Trade, Kline, SystemStatus } from "./types";
import { MARKET_ENDPOINTS } from "./constants/market-endpoints";
import { HttpMethod } from "./constants";

export class MarketAPI {
  private apiClient: APIClient;

  constructor() {
    this.apiClient = new APIClient(null);
  }

  async getAssets(): Promise<Asset[]> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.ASSETS);
  }

  async getMarkets(): Promise<Market[]> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.MARKETS);
  }

  async getTicker(symbol: string): Promise<Ticker> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.TICKER(symbol));
  }

  async getTickers(): Promise<Ticker[]> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.TICKERS);
  }

  async getDepth(symbol: string): Promise<any> {
    // Define a specific type for depth
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.DEPTH(symbol));
  }

  async getKlines(
    symbol: string,
    interval: string,
    startTime?: number,
    endTime?: number
  ): Promise<Kline[]> {
    return this.apiClient.sendRequest(
      HttpMethod.GET,
      MARKET_ENDPOINTS.KLINES(symbol, interval, startTime, endTime)
    );
  }

  async getStatus(): Promise<SystemStatus> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.STATUS);
  }

  async getPing(): Promise<string> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.PING);
  }

  async getSystemTime(): Promise<number> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.TIME);
  }

  async getRecentTrades(symbol: string, limit: number = 100): Promise<Trade[]> {
    return this.apiClient.sendRequest(
      HttpMethod.GET,
      MARKET_ENDPOINTS.RECENT_TRADES(symbol, limit)
    );
  }

  async getHistoricalTrades(
    symbol: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<Trade[]> {
    return this.apiClient.sendRequest(
      HttpMethod.GET,
      MARKET_ENDPOINTS.HISTORICAL_TRADES(symbol, limit, offset)
    );
  }
}
