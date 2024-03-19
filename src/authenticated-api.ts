import { APICommunication } from "./utils/api-communication";
import { Cryptography } from "./utils/cryptography";
import { Balance, Deposit, Withdrawal, DepositAddress, Order, Fill } from "./types";
import { AUTHENTICATED_ENDPOINTS } from "./constants/authenticated-endpoints";

export class AuthenticatedAPI {
  private apiCommunication: APICommunication;

  constructor(params: { apiKey: string; secretKey: string }) {
    const { apiKey, secretKey } = params;

    if (!apiKey || !secretKey) throw new Error("API Key and Secret Key are required");

    const cryptography = new Cryptography(apiKey, secretKey);
    this.apiCommunication = new APICommunication(cryptography);
  }

  async getBalances(): Promise<Record<string, Balance>> {
    return this.apiCommunication.sendRequest("GET", AUTHENTICATED_ENDPOINTS.CAPITAL, {
      instruction: "balanceQuery",
    });
  }

  async getDeposits({ limit = 100, offset = 0 }: { limit?: number; offset?: number } = {}): Promise<
    Deposit[]
  > {
    return this.apiCommunication.sendRequest(
      "GET",
      AUTHENTICATED_ENDPOINTS.DEPOSITS(limit, offset),
      { instruction: "depositQueryAll" }
    );
  }

  async getDepositAddress(blockchain: string): Promise<DepositAddress> {
    return this.apiCommunication.sendRequest(
      "GET",
      AUTHENTICATED_ENDPOINTS.DEPOSIT_ADDRESS(blockchain),
      { instruction: "depositAddressQuery" }
    );
  }

  async getWithdrawals(params: { limit?: number; offset?: number } = {}): Promise<Withdrawal[]> {
    const { limit = 100, offset = 0 } = params;
    return this.apiCommunication.sendRequest(
      "GET",
      AUTHENTICATED_ENDPOINTS.WITHDRAWALS(limit, offset),
      {
        instruction: "withdrawalQueryAll",
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
    return this.apiCommunication.sendRequest("POST", AUTHENTICATED_ENDPOINTS.WITHDRAWALS(), {
      ...body,
      instruction: "withdraw",
    });
  }

  async getOrderHistory(
    params: { limit?: number; offset?: number; symbol?: string } = {}
  ): Promise<Order[]> {
    const { limit = 100, offset = 0, symbol } = params;

    return this.apiCommunication.sendRequest(
      "GET",
      AUTHENTICATED_ENDPOINTS.ORDER_HISTORY(limit, offset, symbol),
      {
        instruction: "orderHistoryQueryAll",
      }
    );
  }

  async getFillHistory(symbol?: string, limit: number = 100, offset: number = 0): Promise<Fill[]> {
    return this.apiCommunication.sendRequest(
      "GET",
      AUTHENTICATED_ENDPOINTS.FILL_HISTORY(limit, offset, symbol),
      {
        instruction: "fillHistoryQueryAll",
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
    return this.apiCommunication.sendRequest("POST", AUTHENTICATED_ENDPOINTS.ORDER(), {
      ...body,
      instruction: "orderExecute",
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
    return this.apiCommunication.sendRequest(
      "GET",
      AUTHENTICATED_ENDPOINTS.ORDER(symbol, orderId, clientId),
      {
        instruction: "orderQuery",
      }
    );
  }

  async cancelOrder({ orderId, symbol }: { orderId: string; symbol: string }): Promise<Order> {
    const body = { orderId, symbol };
    return this.apiCommunication.sendRequest("DELETE", AUTHENTICATED_ENDPOINTS.ORDER(), {
      ...body,
      instruction: "orderCancel",
    });
  }

  async getOpenOrders(symbol?: string): Promise<Order[]> {
    return this.apiCommunication.sendRequest("GET", AUTHENTICATED_ENDPOINTS.ORDERS(symbol), {
      instruction: "orderQueryAll",
    });
  }

  async cancelOpenOrders(symbol: string): Promise<string> {
    return this.apiCommunication.sendRequest("DELETE", AUTHENTICATED_ENDPOINTS.ORDERS(), {
      symbol,
      instruction: "orderCancelAll",
    });
  }
}
