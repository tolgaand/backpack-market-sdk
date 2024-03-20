interface BalanceDetails {
  available: string;
  locked: string;
  staked: string;
}

export interface BalancesResponse {
  [property: string]: BalanceDetails;
}
