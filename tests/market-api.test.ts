import { MarketAPI } from "../src/market-api";

describe("MarketAPI", () => {
  let marketApi: MarketAPI;

  beforeAll(() => {
    marketApi = new MarketAPI();
  });

  test("getAssets", async () => {
    const assets = await marketApi.getAssets();
    expect(assets).toBeDefined();
  });

  test("getMarkets", async () => {
    const markets = await marketApi.getMarkets();
    expect(markets).toBeDefined();
  });

  test("getTicker", async () => {
    const ticker = await marketApi.getTicker("SOL_USDC");
    expect(ticker).toBeDefined();
  });

  test("getTickers", async () => {
    const tickers = await marketApi.getTickers();
    expect(tickers).toBeDefined();
  });

  test("getDepth", async () => {
    const depth = await marketApi.getDepth("SOL_USDC");
    expect(depth).toBeDefined();
  });

  test("getKlines", async () => {
    const klines = await marketApi.getKlines("SOL_USDC", "1h");
    expect(klines).toBeDefined();
  });

  test("getStatus", async () => {
    const status = await marketApi.getStatus();
    expect(status).toBeDefined();
  });

  test("getPing", async () => {
    const ping = await marketApi.getPing();
    expect(ping).toBeDefined();
  });

  test("getSystemTime", async () => {
    const time = await marketApi.getSystemTime();
    expect(time).toBeDefined();
  });

  test("getRecentTrades", async () => {
    const trades = await marketApi.getRecentTrades("SOL_USDC");
    expect(trades).toBeDefined();
  });

  test("getHistoricalTrades", async () => {
    const trades = await marketApi.getHistoricalTrades("SOL_USDC");
    expect(trades).toBeDefined();
  });
});
