interface DepositResponse {
  id: number;
  toAddress: string;
  fromAddress: string;
  confirmationBlockNumber: number;
  providerId: string;
  source: string;
  status: string;
  transactionHash: string;
  subaccountId: number;
  symbol: string;
  quantity: string;
  createdAt: string;
}

export interface DepositAddressResponse {
  address: string;
}

export interface DepositsResponse extends Array<DepositResponse> {}
