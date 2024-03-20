import { APIClient } from "./utils/api-client";
import { MARKET_ENDPOINTS } from "./constants/market-endpoints";
import { HttpMethod } from "./constants";
import {
  AssetsResponse,
  DepthResponse,
  HistoricalTradesResponse,
  KlinesResponse,
  MarketsResponse,
  RecentTradesResponse,
  StatusResponse,
  TickersResponse,
} from "./interfaces";

export class MarketAPI {
  private apiClient: APIClient;

  constructor() {
    this.apiClient = new APIClient(null);
  }

  async getAssets(): Promise<AssetsResponse> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.ASSETS);
  }

  async getMarkets(): Promise<MarketsResponse> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.MARKETS);
  }

  async getTicker(symbol: string): Promise<TickersResponse> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.TICKER(symbol));
  }

  async getTickers(): Promise<TickersResponse> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.TICKERS);
  }

  async getDepth(symbol: string): Promise<DepthResponse> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.DEPTH(symbol));
  }

  async getKlines(
    symbol: string,
    interval: string,
    startTime?: number,
    endTime?: number
  ): Promise<KlinesResponse> {
    return this.apiClient.sendRequest(
      HttpMethod.GET,
      MARKET_ENDPOINTS.KLINES(symbol, interval, startTime, endTime)
    );
  }

  async getStatus(): Promise<StatusResponse> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.STATUS);
  }

  async getPing(): Promise<string> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.PING);
  }

  async getSystemTime(): Promise<number> {
    return this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.TIME);
  }

  async getRecentTrades(symbol: string, limit: number = 100): Promise<RecentTradesResponse> {
    return this.apiClient.sendRequest(
      HttpMethod.GET,
      MARKET_ENDPOINTS.RECENT_TRADES(symbol, limit)
    );
  }

  async getHistoricalTrades(
    symbol: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<HistoricalTradesResponse> {
    return this.apiClient.sendRequest(
      HttpMethod.GET,
      MARKET_ENDPOINTS.HISTORICAL_TRADES(symbol, limit, offset)
    );
  }
}
