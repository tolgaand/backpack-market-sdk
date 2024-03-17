import { MarketAPI } from "./market-api";
import { AuthenticatedAPI } from "./authenticated-api";
import { Cryptography } from "./utils/cryptography";

interface BackpackMarketOptions {
  apiKey?: string;
  secretKey?: string;
}

export class BackpackMarket {
  market: MarketAPI;
  private authenticatedApi: AuthenticatedAPI;

  constructor(options: BackpackMarketOptions) {
    const cryptography =
      options.apiKey && options.secretKey
        ? new Cryptography(options.apiKey, options.secretKey)
        : null;

    this.market = new MarketAPI();
    this.authenticatedApi = new AuthenticatedAPI(cryptography);
  }

  async getBalances() {
    return this.authenticatedApi.getBalances();
  }
}
