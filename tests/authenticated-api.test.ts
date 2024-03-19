import axios from "axios";
import createMockInstance from "jest-create-mock-instance";
import { AuthenticatedAPI } from "../src/authenticated-api";
import { APIClient } from "../src/utils/api-client";
import { AUTHENTICATED_ENDPOINTS } from "../src/constants/authenticated-endpoints";
import { HttpMethod } from "../src/constants";
import * as naclUtil from "tweetnacl-util";
import { INSTRUCTIONS } from "../src/constants/instructions";

jest.mock("axios");

const mAxios = axios as jest.MockedFunction<typeof axios>;
mAxios.mockResolvedValue({});

describe("AuthenticatedAPI", () => {
  let authenticatedApi: AuthenticatedAPI;
  let apiClient: jest.Mocked<APIClient>;

  const data = { success: true };

  beforeEach(() => {
    apiClient = createMockInstance(APIClient);

    const apiKey = naclUtil.encodeBase64(new Uint8Array(10));
    const secretKey = naclUtil.encodeBase64(new Uint8Array(10));

    authenticatedApi = new AuthenticatedAPI({ apiKey, secretKey }, apiClient);
    apiClient.sendRequest.mockResolvedValue(data);
  });

  test("getBalances", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const endpoint = AUTHENTICATED_ENDPOINTS.CAPITAL;

    // Act
    const result = await authenticatedApi.getBalances();

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint, {
      instruction: INSTRUCTIONS.BALANCE_QUERY,
    });
  });

  test("getDeposits", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const limit = 100;
    const offset = 10;
    const endpoint = AUTHENTICATED_ENDPOINTS.DEPOSITS(limit, offset);

    // Act
    const result = await authenticatedApi.getDeposits({ limit, offset });

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint, {
      instruction: INSTRUCTIONS.DEPOSIT_QUERY_ALL,
    });
  });

  test("getDepositAddress", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const blockchain = "BTC";
    const endpoint = AUTHENTICATED_ENDPOINTS.DEPOSIT_ADDRESS(blockchain);

    // Act
    const result = await authenticatedApi.getDepositAddress(blockchain);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint, {
      instruction: INSTRUCTIONS.DEPOSIT_ADDRESS_QUERY,
    });
  });

  test("getWithdrawals", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const limit = 100;
    const offset = 10;
    const endpoint = AUTHENTICATED_ENDPOINTS.WITHDRAWALS(limit, offset);

    // Act
    const result = await authenticatedApi.getWithdrawals({ limit, offset });

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint, {
      instruction: INSTRUCTIONS.WITHDRAWAL_QUERY_ALL,
    });
  });

  test("requestWithdrawal", async () => {
    // Arrange
    const method = HttpMethod.POST;
    const endpoint = AUTHENTICATED_ENDPOINTS.WITHDRAWALS();
    const body = {
      quantity: 1,
      symbol: "SOL_USDC",
      blockchain: "Solana",
      address: "xxx",
    };

    // Act
    const result = await authenticatedApi.requestWithdrawal(body);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint, {
      ...body,
      instruction: INSTRUCTIONS.WITHDRAW,
    });
  });

  test("getOrderHistory", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const limit = 100;
    const offset = 10;
    const symbol = "SOL_USDC";
    const endpoint = AUTHENTICATED_ENDPOINTS.ORDER_HISTORY(limit, offset, symbol);

    // Act
    const result = await authenticatedApi.getOrderHistory({ limit, offset, symbol });

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint, {
      instruction: INSTRUCTIONS.ORDER_HISTORY_QUERY_ALL,
    });
  });

  test("getFillHistory", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const limit = 100;
    const offset = 10;
    const symbol = "SOL_USDC";
    const endpoint = AUTHENTICATED_ENDPOINTS.FILL_HISTORY(limit, offset, symbol);

    // Act
    const result = await authenticatedApi.getFillHistory(symbol, limit, offset);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint, {
      instruction: INSTRUCTIONS.FILL_HISTORY_QUERY_ALL,
    });
  });

  test("getOpenOrder", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const orderId = "1";
    const clientId = "2";
    const symbol = "SOL_USDC";
    const endpoint = AUTHENTICATED_ENDPOINTS.ORDER(symbol, orderId, clientId);

    // Act
    const result = await authenticatedApi.getOpenOrder({ orderId, clientId, symbol });

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint, {
      instruction: INSTRUCTIONS.ORDER_QUERY,
    });
  });

  test("cancelOrder", async () => {
    // Arrange
    const method = HttpMethod.DELETE;
    const endpoint = AUTHENTICATED_ENDPOINTS.ORDER();
    const body = {
      orderId: "1",
      symbol: "SOL_USDC",
    };

    // Act
    const result = await authenticatedApi.cancelOrder(body);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint, {
      ...body,
      instruction: INSTRUCTIONS.ORDER_CANCEL,
    });
  });

  test("executeOrder", async () => {
    // Arrange
    const method = HttpMethod.POST;
    const endpoint = AUTHENTICATED_ENDPOINTS.ORDER();
    const body = {
      orderType: "Limit",
      price: 1,
      quantity: 1,
      side: "Bid",
      symbol: "BTCUSDT",
    };

    // Act
    const result = await authenticatedApi.executeOrder(body);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint, {
      ...body,
      instruction: INSTRUCTIONS.ORDER_EXECUTE,
    });
  });

  test("getOpenOrders", async () => {
    // Arrange
    const method = HttpMethod.GET;
    const symbol = "SOL_USDC";
    const endpoint = AUTHENTICATED_ENDPOINTS.ORDERS(symbol);

    // Act
    const result = await authenticatedApi.getOpenOrders(symbol);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint, {
      instruction: INSTRUCTIONS.ORDER_QUERY_ALL,
    });
  });

  test("cancelOpenOrders", async () => {
    // Arrange
    const method = HttpMethod.DELETE;
    const endpoint = AUTHENTICATED_ENDPOINTS.ORDERS();
    const symbol = "SOL_USDC";

    // Act
    const result = await authenticatedApi.cancelOpenOrders(symbol);

    // Assert
    expect(result).toEqual(data);
    expect(apiClient.sendRequest).toHaveBeenCalledTimes(1);
    expect(apiClient.sendRequest).toHaveBeenCalledWith(method, endpoint, {
      symbol,
      instruction: INSTRUCTIONS.ORDER_CANCEL_ALL,
    });
  });
});
