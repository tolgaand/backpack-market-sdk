import axios from "axios";
import createMockInstance from "jest-create-mock-instance";
import { MarketAPI } from "../src/market-api";
import { APIClient } from "../src/utils/api-client";
import { HttpMethod } from "../src/constants";
import { MARKET_ENDPOINTS } from "../src/constants/market-endpoints";
import { KlineInterval } from "../src/interfaces/types";

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
    const method = HttpMethod.GET;
    const endpoint = MARKET_ENDPOINTS.ASSETS;

    // Act
    const result = await marketApi.getAssets();

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
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
    const params = { symbol };
    const endpoint = MARKET_ENDPOINTS.TICKER(params);

    // Act
    const result = await marketApi.getTicker(params);

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
    const params = { symbol };
    const endpoint = MARKET_ENDPOINTS.DEPTH(params);

    // Act
    const result = await marketApi.getDepth(params);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });

  test("getKlines", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const symbol = "SOL_USDC";
    const interval = KlineInterval["1m"];
    const params = { symbol, interval };
    const endpoint = MARKET_ENDPOINTS.KLINES(params);

    // Act
    const result = await marketApi.getKlines(params);

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
    const params = { symbol };
    const endpoint = MARKET_ENDPOINTS.RECENT_TRADES(params);

    // Act
    const result = await marketApi.getRecentTrades(params);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });

  test("getHistoricalTrades", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const symbol = "SOL_USDC";
    const params = { symbol };
    const endpoint = MARKET_ENDPOINTS.HISTORICAL_TRADES(params);

    // Act
    const result = await marketApi.getHistoricalTrades(params);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint);
  });
});
