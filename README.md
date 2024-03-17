# backpack-market SDK

This SDK provides TypeScript developers with a simplified interface to interact with the Backpack Exchange API, abstracting away the complexities of authentication and request signing.

**Documentation:** [Backpack Exchange API Docs](https://docs.backpack.exchange/)

This is a third-party SDK and not officially provided by Backpack Exchange.

## Features

- Market Data Access: Fetch prices, market statistics, and historical trades.
- Account Management: Retrieve balances, deposit addresses, and withdrawal history.
- Trading Operations: Execute orders, manage trades, and access order history.

### Market APIs

These are public endpoints that provide market data such as asset prices, market statistics, and historical trade data.

| Function                | Description                            |
| ----------------------- | -------------------------------------- |
| `getAssets()`           | Retrieves all available assets.        |
| `getMarkets()`          | Fetches supported market pairs.        |
| `getTicker()`           | Gets ticker information for a symbol.  |
| `getTickers()`          | Obtains tickers for all markets.       |
| `getDepth()`            | Retrieves the depth of the order book. |
| `getKlines()`           | Fetches K-line data for charting.      |
| `getStatus()`           | Checks the exchange's system status.   |
| `getPing()`             | Tests the API's connectivity.          |
| `getSystemTime()`       | Gets the current system time.          |
| `getRecentTrades()`     | Retrieves recent trades for a symbol.  |
| `getHistoricalTrades()` | Fetches historical trades data.        |

### Authenticated APIs

These endpoints require authentication and are used for account-specific operations like trading, deposits, withdrawals, and account management.

| Function              | Description                              |
| --------------------- | ---------------------------------------- |
| `getBalances()`       | Retrieves account balances.              |
| `getDeposits()`       | Fetches deposit history.                 |
| `getDepositAddress()` | Gets a deposit address for a blockchain. |
| `getWithdrawals()`    | Retrieves withdrawal history.            |
| `requestWithdrawal()` | Initiates a withdrawal.                  |
| `getOrderHistory()`   | Fetches the history of orders.           |
| `getFillHistory()`    | Retrieves historical fills.              |
| `getOpenOrder()`      | Gets an open order.                      |
| `cancelOrder()`       | Cancels an order.                        |
| `executeOrder()`      | Executes a new order.                    |
| `getOpenOrders()`     | Retrieves all open orders.               |
| `cancelOpenOrders()`  | Cancels all open orders for a symbol.    |

## Authentication

The SDK handles authenticated requests using ED25519 keypair signing, necessary for operations that mutate state.

## Installation

```bash
# Install with npm
npm install backpack-market-sdk

# Install with yarn
yarn add backpack-market-sdk
```

## Usage

### Market API

```typescript
import { MarketAPI } from "backpack-market-sdk";

const marketApi = new MarketAPI();

async function main() {
  const assets = await marketApi.getAssets();
  console.log(assets);
}

main();
```

### Authenticated API

```typescript
import { AuthenticatedAPI } from "backpack-market-sdk";

const apiKey = "your_api_key";
const secretKey = "your_secret_key";
const authenticatedApi = new AuthenticatedAPI({
  apiKey,
  secretKey,
});

async function main() {
  const balances = await authenticatedApi.getBalances();
  console.log(balances);
}

main();
```
