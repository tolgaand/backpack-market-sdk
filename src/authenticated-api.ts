import { APIClient } from "./utils/api-client";
import { Cryptography } from "./utils/cryptography";
import { Balance, Deposit, Withdrawal, DepositAddress, Order, Fill } from "./types";
import { AUTHENTICATED_ENDPOINTS } from "./constants/authenticated-endpoints";
import { INSTRUCTIONS } from "./constants/instructions";
import { HttpMethod } from "./constants";

export class AuthenticatedAPI {
  private apiClient: APIClient;

  constructor(params: { apiKey: string; secretKey: string }, apiClient: APIClient) {
    const { apiKey, secretKey } = params;

    if (!apiKey || !secretKey) throw new Error("API Key and Secret Key are required");

    const cryptography = new Cryptography(apiKey, secretKey);
    this.apiClient = apiClient ?? new APIClient(cryptography);
  }

  async getBalances(): Promise<Record<string, Balance>> {
    return this.apiClient.sendRequest(HttpMethod.GET, AUTHENTICATED_ENDPOINTS.CAPITAL, {
      instruction: INSTRUCTIONS.BALANCE_QUERY,
    });
  }

  async getDeposits({ limit = 100, offset = 0 }: { limit?: number; offset?: number } = {}): Promise<
    Deposit[]
  > {
    return this.apiClient.sendRequest(
      HttpMethod.GET,
      AUTHENTICATED_ENDPOINTS.DEPOSITS(limit, offset),
      { instruction: INSTRUCTIONS.DEPOSIT_QUERY_ALL }
    );
  }

  async getDepositAddress(blockchain: string): Promise<DepositAddress> {
    return this.apiClient.sendRequest(
      HttpMethod.GET,
      AUTHENTICATED_ENDPOINTS.DEPOSIT_ADDRESS(blockchain),
      { instruction: INSTRUCTIONS.DEPOSIT_ADDRESS_QUERY }
    );
  }

  async getWithdrawals(params: { limit?: number; offset?: number } = {}): Promise<Withdrawal[]> {
    const { limit = 100, offset = 0 } = params;
    return this.apiClient.sendRequest(
      HttpMethod.GET,
      AUTHENTICATED_ENDPOINTS.WITHDRAWALS(limit, offset),
      {
        instruction: INSTRUCTIONS.WITHDRAWAL_QUERY_ALL,
      }
    );
  }

  async requestWithdrawal(params: {
    address: string;
    blockchain: string;
    quantity: number;
    symbol: string;
    clientId?: number;
    twoFactorToken?: string;
  }): Promise<Withdrawal> {
    const { address, blockchain, quantity, symbol, clientId, twoFactorToken } = params;

    const body = {
      address,
      blockchain,
      quantity,
      symbol,
      clientId,
      twoFactorToken,
    };
    return this.apiClient.sendRequest(HttpMethod.POST, AUTHENTICATED_ENDPOINTS.WITHDRAWALS(), {
      ...body,
      instruction: INSTRUCTIONS.WITHDRAW,
    });
  }

  async getOrderHistory(
    params: { limit?: number; offset?: number; symbol?: string } = {}
  ): Promise<Order[]> {
    const { limit = 100, offset = 0, symbol } = params;

    return this.apiClient.sendRequest(
      HttpMethod.GET,
      AUTHENTICATED_ENDPOINTS.ORDER_HISTORY(limit, offset, symbol),
      {
        instruction: INSTRUCTIONS.ORDER_HISTORY_QUERY_ALL,
      }
    );
  }

  async getFillHistory(symbol?: string, limit: number = 100, offset: number = 0): Promise<Fill[]> {
    return this.apiClient.sendRequest(
      HttpMethod.GET,
      AUTHENTICATED_ENDPOINTS.FILL_HISTORY(limit, offset, symbol),
      {
        instruction: INSTRUCTIONS.FILL_HISTORY_QUERY_ALL,
      }
    );
  }

  async executeOrder({
    clientId,
    orderType,
    postOnly,
    price,
    quantity,
    quoteQuantity,
    selfTradePrevention,
    side,
    symbol,
    timeInForce,
    triggerPrice,
  }: {
    clientId?: number;
    orderType: string | "Market" | "Limit";
    postOnly?: boolean;
    price: number;
    quantity: number;
    quoteQuantity?: string;
    selfTradePrevention?: string | "RejectTaker" | "RejectMaker" | "RejectBoth" | "Allow";
    side: string | "Bid" | "Ask";
    symbol: string;
    timeInForce?: string;
    triggerPrice?: string;
  }): Promise<Order> {
    const body = {
      clientId,
      orderType,
      postOnly,
      price,
      quantity,
      quoteQuantity,
      selfTradePrevention,
      side,
      symbol,
      timeInForce,
      triggerPrice,
    };
    return this.apiClient.sendRequest(HttpMethod.POST, AUTHENTICATED_ENDPOINTS.ORDER(), {
      ...body,
      instruction: INSTRUCTIONS.ORDER_EXECUTE,
    });
  }

  async getOpenOrder({
    orderId,
    clientId,
    symbol,
  }: {
    orderId?: string;
    clientId?: string;
    symbol: string;
  }): Promise<Order> {
    return this.apiClient.sendRequest(
      HttpMethod.GET,
      AUTHENTICATED_ENDPOINTS.ORDER(symbol, orderId, clientId),
      {
        instruction: INSTRUCTIONS.ORDER_QUERY,
      }
    );
  }

  async cancelOrder({ orderId, symbol }: { orderId: string; symbol: string }): Promise<Order> {
    const body = { orderId, symbol };
    return this.apiClient.sendRequest(HttpMethod.DELETE, AUTHENTICATED_ENDPOINTS.ORDER(), {
      ...body,
      instruction: INSTRUCTIONS.ORDER_CANCEL,
    });
  }

  async getOpenOrders(symbol?: string): Promise<Order[]> {
    return this.apiClient.sendRequest(HttpMethod.GET, AUTHENTICATED_ENDPOINTS.ORDERS(symbol), {
      instruction: INSTRUCTIONS.ORDER_QUERY_ALL,
    });
  }

  async cancelOpenOrders(symbol: string): Promise<string> {
    return this.apiClient.sendRequest(HttpMethod.DELETE, AUTHENTICATED_ENDPOINTS.ORDERS(), {
      symbol,
      instruction: INSTRUCTIONS.ORDER_CANCEL_ALL,
    });
  }
}
