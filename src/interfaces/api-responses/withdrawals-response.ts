interface Withdrawal {
  id: number;
  blockchain: string;
  clientId: string;
  identifier: string;
  quantity: string;
  fee: string;
  symbol: string;
  status: string;
  subaccountId: number;
  toAddress: string;
  transactionHash: string;
  createdAt: string;
}

export interface WithdrawalsResponse extends Array<Withdrawal> {}
