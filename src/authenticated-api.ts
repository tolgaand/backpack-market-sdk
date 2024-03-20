import { APIClient } from "./utils/api-client";
import { Cryptography } from "./utils/cryptography";
import { AUTHENTICATED_ENDPOINTS } from "./constants/authenticated-endpoints";
import { INSTRUCTIONS } from "./constants/instructions";
import { HttpMethod } from "./constants";
import {
  BalancesResponse,
  CancelOrderBody,
  CancelOrderResponse,
  CancelOrdersBody,
  DepositAddressQueryParams,
  DepositAddressResponse,
  DepositsQueryParams,
  DepositsResponse,
  ExecuteOrderBody,
  ExecuteOrderResponse,
  FillHistoryQueryParams,
  FillHistoryResponse,
  OpenOrderQueryParams,
  OpenOrderResponse,
  OpenOrdersQueryParams,
  OpenOrdersResponse,
  OrderHistoryQueryParams,
  OrderHistoryResponse,
  WithdrawalResponse,
  WithdrawalsQueryParams,
  WithdrawalsResponse,
} from "./interfaces";

export class AuthenticatedAPI {
  private apiClient: APIClient;

  constructor(params: { apiKey: string; secretKey: string }, apiClient?: APIClient) {
    const { apiKey, secretKey } = params;

    if (!apiKey || !secretKey) throw new Error("API Key and Secret Key are required");

    const cryptography = new Cryptography(apiKey, secretKey);
    this.apiClient = apiClient ?? new APIClient(cryptography);
  }

  getBalances = (): Promise<BalancesResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, AUTHENTICATED_ENDPOINTS.CAPITAL, {
      instruction: INSTRUCTIONS.BALANCE_QUERY,
    });

  getDeposits = (params?: DepositsQueryParams): Promise<DepositsResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, AUTHENTICATED_ENDPOINTS.DEPOSITS(params), {
      instruction: INSTRUCTIONS.DEPOSIT_QUERY_ALL,
    });

  getDepositAddress = (params: DepositAddressQueryParams): Promise<DepositAddressResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, AUTHENTICATED_ENDPOINTS.DEPOSIT_ADDRESS(params), {
      instruction: INSTRUCTIONS.DEPOSIT_ADDRESS_QUERY,
    });

  getWithdrawals = (params?: WithdrawalsQueryParams): Promise<WithdrawalsResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, AUTHENTICATED_ENDPOINTS.WITHDRAWALS(params), {
      instruction: INSTRUCTIONS.WITHDRAWAL_QUERY_ALL,
    });

  requestWithdrawal = (params: ExecuteOrderBody): Promise<WithdrawalResponse> =>
    this.apiClient.sendRequest(HttpMethod.POST, AUTHENTICATED_ENDPOINTS.WITHDRAWALS(), {
      ...params,
      instruction: INSTRUCTIONS.WITHDRAW,
    });

  getOrderHistory = (params?: OrderHistoryQueryParams): Promise<OrderHistoryResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, AUTHENTICATED_ENDPOINTS.ORDER_HISTORY(params), {
      instruction: INSTRUCTIONS.ORDER_HISTORY_QUERY_ALL,
    });

  getFillHistory = (params?: FillHistoryQueryParams): Promise<FillHistoryResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, AUTHENTICATED_ENDPOINTS.FILL_HISTORY(params), {
      instruction: INSTRUCTIONS.FILL_HISTORY_QUERY_ALL,
    });

  executeOrder = (params: ExecuteOrderBody): Promise<ExecuteOrderResponse> =>
    this.apiClient.sendRequest(HttpMethod.POST, AUTHENTICATED_ENDPOINTS.ORDER(), {
      ...params,
      instruction: INSTRUCTIONS.ORDER_EXECUTE,
    });

  getOpenOrder = (params: OpenOrderQueryParams): Promise<OpenOrderResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, AUTHENTICATED_ENDPOINTS.ORDER(params), {
      instruction: INSTRUCTIONS.ORDER_QUERY,
    });

  cancelOrder = (params: CancelOrderBody): Promise<CancelOrderResponse> =>
    this.apiClient.sendRequest(HttpMethod.DELETE, AUTHENTICATED_ENDPOINTS.ORDER(), {
      ...params,
      instruction: INSTRUCTIONS.ORDER_CANCEL,
    });

  getOpenOrders = (params?: OpenOrdersQueryParams): Promise<OpenOrdersResponse> =>
    this.apiClient.sendRequest(HttpMethod.GET, AUTHENTICATED_ENDPOINTS.ORDERS(params), {
      instruction: INSTRUCTIONS.ORDER_QUERY_ALL,
    });

  cancelOpenOrders = (params: CancelOrdersBody): Promise<CancelOrderResponse> =>
    this.apiClient.sendRequest(HttpMethod.DELETE, AUTHENTICATED_ENDPOINTS.ORDERS(), {
      ...params,
      instruction: INSTRUCTIONS.ORDER_CANCEL_ALL,
    });
}
