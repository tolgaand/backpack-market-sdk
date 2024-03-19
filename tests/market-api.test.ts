import axios from "axios";
import createMockInstance from "jest-create-mock-instance";
import { MarketAPI } from "../src/market-api";
import { APIClient } from "../src/utils/api-client";
import { HttpMethod } from "../src/constants";
import { MARKET_ENDPOINTS } from "../src/constants/market-endpoints";

jest.mock("axios");

const mAxios = axios as jest.MockedFunction<typeof axios>;
mAxios.mockResolvedValue({});

describe("MarketAPI", () => {
  let marketApi: MarketAPI;
  let apiClient: jest.Mocked<APIClient>;

  const data = { success: true };

  beforeEach(() => {
    apiClient = createMockInstance(APIClient);
    marketApi = new MarketAPI(apiClient);
    apiClient.sendRequest.mockResolvedValue(data);
  });

  test("getAssets", async () => {
    // Arrange
    const endpoint = MARKET_ENDPOINTS.ASSETS;

    // Act
    const result = await marketApi.getAssets();

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(HttpMethod.GET, endpoint);
  });

  test("getMarkets", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const endpoint = MARKET_ENDPOINTS.MARKETS;

    // Act
    const result = await marketApi.getMarkets();

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });

  test("getTicker", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const symbol = "SOL_USDC";
    const endpoint = MARKET_ENDPOINTS.TICKER(symbol);

    // Act
    const result = await marketApi.getTicker(symbol);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });

  test("getTickers", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const endpoint = MARKET_ENDPOINTS.TICKERS;

    // Act
    const result = await marketApi.getTickers();

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });

  test("getDepth", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const symbol = "SOL_USDC";
    const endpoint = MARKET_ENDPOINTS.DEPTH(symbol);

    // Act
    const result = await marketApi.getDepth(symbol);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });

  test("getKlines", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const symbol = "SOL_USDC";
    const interval = "1h";
    const endpoint = MARKET_ENDPOINTS.KLINES(symbol, interval);

    // Act
    const result = await marketApi.getKlines(symbol, interval);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });

  test("getStatus", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const endpoint = MARKET_ENDPOINTS.STATUS;

    // Act
    const result = await marketApi.getStatus();

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });

  test("getPing", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const endpoint = MARKET_ENDPOINTS.PING;

    // Act
    const result = await marketApi.getPing();

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });

  test("getSystemTime", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const endpoint = MARKET_ENDPOINTS.TIME;

    // Act
    const result = await marketApi.getSystemTime();

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });

  test("getRecentTrades", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const symbol = "SOL_USDC";
    const limit = 100;
    const endpoint = MARKET_ENDPOINTS.RECENT_TRADES(symbol, limit);

    // Act
    const result = await marketApi.getRecentTrades(symbol, limit);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });

  test("getHistoricalTrades", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const symbol = "SOL_USDC";
    const limit = 100;
    const offset = 10;
    const endpoint = MARKET_ENDPOINTS.HISTORICAL_TRADES(symbol, limit, offset);

    // Act
    const result = await marketApi.getHistoricalTrades(symbol, limit, offset);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });
});
