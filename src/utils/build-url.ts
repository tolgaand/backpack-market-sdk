import { BASE_URL } from "../constants";
import {
  DepthQueryParams,
  KlinesQueryParams,
  TickerQueryParams,
  DepositsQueryParams,
  OpenOrderQueryParams,
  OpenOrdersQueryParams,
  FillHistoryQueryParams,
  WithdrawalsQueryParams,
  OrderHistoryQueryParams,
  RecentTradesQueryParams,
  DepositAddressQueryParams,
  HistoricalTradesQueryParams,
} from "../interfaces";

type ParamsType =
  | DepthQueryParams
  | KlinesQueryParams
  | TickerQueryParams
  | DepositsQueryParams
  | OpenOrderQueryParams
  | OpenOrdersQueryParams
  | FillHistoryQueryParams
  | WithdrawalsQueryParams
  | OrderHistoryQueryParams
  | RecentTradesQueryParams
  | DepositAddressQueryParams
  | HistoricalTradesQueryParams;

export function buildUrl(options: { endpoint: string; params?: ParamsType; baseUrl?: BASE_URL }) {
  options.params = options.params || {};
  options.baseUrl = options.baseUrl || BASE_URL.API;

  const url = new URL(`${options.baseUrl}${options.endpoint}`);

  Object.entries(options.params).forEach(([key, value]) => {
    if (!value) return;
    url.searchParams.append(key, value);
  });
  return url.toString();
}
