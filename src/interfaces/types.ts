export enum Blockchain {
  Solana = "Solana",
  Ethereum = "Ethereum",
  Polygon = "Polygon",
  Bitcoin = "Bitcoin",
}

export enum KlineInterval {
  "1m" = "1m",
  "3m" = "3m",
  "5m" = "5m",
  "15m" = "15m",
  "30m" = "30m",
  "1h" = "1h",
  "2h" = "2h",
  "4h" = "4h",
  "6h" = "6h",
  "8h" = "8h",
  "12h" = "12h",
  "1d" = "1d",
  "3d" = "3d",
  "1w" = "1w",
  "1month" = "1month",
}

export enum OrderType {
  Limit = "Limit",
  Market = "Market",
}

export enum TimeInForce {
  "GTC" = "GTC",
  "IOC" = "IOC",
  "FOK" = "FOK",
}

export enum Side {
  Bid = "Bid",
  Ask = "Ask",
}

export enum SelfTradePrevention {
  RejectTaker = "RejectTaker",
  RejectMaker = "RejectMaker",
  RejectBoth = "RejectBoth",
  Allow = "Allow",
}
