import { APICommunication } from "./utils/api-communication";
import { Asset, Market, Ticker, Trade, Kline, SystemStatus } from "./types";

export class MarketAPI {
  private apiCommunication: APICommunication;

  constructor() {
    this.apiCommunication = new APICommunication(null);
  }

  async getAssets(): Promise<Asset[]> {
    return this.apiCommunication.sendRequest("GET", "/api/v1/assets");
  }

  async getMarkets(): Promise<Market[]> {
    return this.apiCommunication.sendRequest("GET", "/api/v1/markets");
  }

  async getTicker(symbol: string): Promise<Ticker> {
    return this.apiCommunication.sendRequest(
      "GET",
      `/api/v1/ticker?symbol=${symbol}`
    );
  }

  async getTickers(): Promise<Ticker[]> {
    return this.apiCommunication.sendRequest("GET", "/api/v1/tickers");
  }

  async getDepth(symbol: string): Promise<any> {
    // Define a specific type for depth
    return this.apiCommunication.sendRequest(
      "GET",
      `/api/v1/depth?symbol=${symbol}`
    );
  }

  async getKlines(
    symbol: string,
    interval: string,
    startTime?: number,
    endTime?: number
  ): Promise<Kline[]> {
    let url = `/api/v1/klines?symbol=${symbol}&interval=${interval}`;
    if (startTime) url += `&startTime=${startTime}`;
    if (endTime) url += `&endTime=${endTime}`;

    return this.apiCommunication.sendRequest("GET", url);
  }

  async getStatus(): Promise<SystemStatus> {
    return this.apiCommunication.sendRequest("GET", "/api/v1/status");
  }

  async getPing(): Promise<string> {
    return this.apiCommunication.sendRequest("GET", "/api/v1/ping");
  }

  async getSystemTime(): Promise<number> {
    return this.apiCommunication.sendRequest("GET", "/api/v1/time");
  }

  async getRecentTrades(symbol: string, limit: number = 100): Promise<Trade[]> {
    return this.apiCommunication.sendRequest(
      "GET",
      `/api/v1/trades?symbol=${symbol}&limit=${limit}`
    );
  }

  async getHistoricalTrades(
    symbol: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<Trade[]> {
    return this.apiCommunication.sendRequest(
      "GET",
      `/api/v1/trades/history?symbol=${symbol}&limit=${limit}&offset=${offset}`
    );
  }
}
