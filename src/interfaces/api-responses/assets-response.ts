import { Blockchain } from "../shared/common.interface";

interface Token {
  blockchain: Blockchain;
  depositEnabled: boolean;
  minimumDeposit: string;
  withdrawEnabled: boolean;
  minimumWithdrawal: string;
  maximumWithdrawal: string;
  withdrawalFee: string;
}

interface Asset {
  symbol: string;
  tokens: Token[];
}

export interface AssetsResponse extends Array<Asset> {}
