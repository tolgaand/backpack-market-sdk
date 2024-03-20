import { BASE_URL } from ".";
import {
  CancelOrderBody,
  DepositAddressQueryParams,
  DepositsQueryParams,
  ExecuteOrderBody,
  FillHistoryQueryParams,
  OpenOrderQueryParams,
  OpenOrdersQueryParams,
  OrderHistoryQueryParams,
  WithdrawalsBody,
  WithdrawalsQueryParams,
} from "../interfaces";
import { buildUrl } from "../utils/build-url";

export const AUTHENTICATED_ENDPOINTS = {
  CAPITAL: buildUrl({ endpoint: "/capital" }),

  DEPOSITS: (params?: DepositsQueryParams) =>
    buildUrl({
      endpoint: "/capital/deposits",
      baseUrl: BASE_URL.WAPI,
      params,
    }),

  DEPOSIT_ADDRESS: (params: DepositAddressQueryParams) =>
    buildUrl({
      endpoint: "/capital/deposit/address",
      baseUrl: BASE_URL.WAPI,
      params,
    }),

  WITHDRAWALS: (params?: WithdrawalsQueryParams) =>
    buildUrl({
      endpoint: "/capital/withdrawals",
      baseUrl: BASE_URL.WAPI,
      params,
    }),

  ORDER_HISTORY: (params?: OrderHistoryQueryParams) =>
    buildUrl({
      endpoint: "/history/orders",
      baseUrl: BASE_URL.WAPI,
      params,
    }),

  FILL_HISTORY: (params?: FillHistoryQueryParams) =>
    buildUrl({
      endpoint: "/history/fills",
      baseUrl: BASE_URL.WAPI,
      params,
    }),

  ORDER: (params?: OpenOrderQueryParams) =>
    buildUrl({
      endpoint: "/order",
      params,
    }),

  ORDERS: (params?: OpenOrdersQueryParams) =>
    buildUrl({
      endpoint: "/orders",
      params,
    }),
};
