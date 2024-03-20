import { Blockchain } from "../types";

export interface WithdrawalsQueryParams {
  limit?: number;
  page?: number;
}

export interface WithdrawalsBody {
  address: string;
  blockchain: Blockchain;
  clientId?: string;
  quantity: string;
  symbol: string;
  twoFactorToken?: string;
}
