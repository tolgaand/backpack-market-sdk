import { Blockchain } from "../types";

export interface DepositsQueryParams {
  limit?: number;
  offset?: number;
}

export interface DepositAddressQueryParams {
  blockchain: Blockchain;
}
