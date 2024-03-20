import { APIClient } from "./utils/api-client";
import { MARKET_ENDPOINTS } from "./constants/market-endpoints";
import { HttpMethod } from "./constants";
import {
  AssetsResponse,
  DepthQueryParams,
  DepthResponse,
  HistoricalTradesQueryParams,
  HistoricalTradesResponse,
  KlinesQueryParams,
  KlinesResponse,
  MarketsResponse,
  RecentTradesQueryParams,
  RecentTradesResponse,
  StatusResponse,
  TickerQueryParams,
  TickersResponse,
} from "./interfaces";

export class MarketAPI {
  private apiClient: APIClient;

  constructor(apiClient = new APIClient(null)) {
    this.apiClient = apiClient;
  }

  getAssets = (): Promise<AssetsResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.ASSETS);

  getMarkets = (): Promise<MarketsResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.MARKETS);

  getTicker = (params: TickerQueryParams): Promise<TickersResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.TICKER(params));

  getTickers = (): Promise<TickersResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.TICKERS);

  getDepth = (params: DepthQueryParams): Promise<DepthResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.DEPTH(params));

  getKlines = (params: KlinesQueryParams): Promise<KlinesResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.KLINES(params));

  getStatus = (): Promise<StatusResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.STATUS);

  getPing = (): Promise<string> =>
    this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.PING);

  getSystemTime = (): Promise<number> =>
    this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.TIME);

  getRecentTrades = (params: RecentTradesQueryParams): Promise<RecentTradesResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.RECENT_TRADES(params));

  getHistoricalTrades = (params: HistoricalTradesQueryParams): Promise<HistoricalTradesResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, MARKET_ENDPOINTS.HISTORICAL_TRADES(params));
}
