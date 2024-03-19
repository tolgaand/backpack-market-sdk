import { AuthenticatedAPI } from "../src/authenticated-api";

describe("AuthenticatedAPI", () => {
  let authenticatedApi: AuthenticatedAPI;

  beforeAll(() => {
    authenticatedApi = new AuthenticatedAPI({
      apiKey: "<your-api-key>",
      secretKey: "<y>our-secret-key>",
    });
  });

  test("getBalances", async () => {
    const balances = await authenticatedApi.getBalances();
    expect(balances).toBeDefined();
  });

  test("getDeposits", async () => {
    const deposits = await authenticatedApi.getDeposits();
    expect(deposits).toBeDefined();
  });

  test("getDepositAddress", async () => {
    const depositAddress = await authenticatedApi.getDepositAddress("BTC");
    expect(depositAddress).toBeDefined();
  });

  test("getWithdrawals", async () => {
    const withdrawals = await authenticatedApi.getWithdrawals();
    expect(withdrawals).toBeDefined();
  });

  test("requestWithdrawal", async () => {
    const withdrawal = await authenticatedApi.requestWithdrawal({
      quantity: 1,
      symbol: "SOL_USDC",
      blockchain: "Solana",
      address: "xx",
    });
    expect(withdrawal).toBeDefined();
  });

  test("getOrderHistory", async () => {
    const orderHistory = await authenticatedApi.getOrderHistory();
    expect(orderHistory).toBeDefined();
  });

  test("getFillHistory", async () => {
    const fillHistory = await authenticatedApi.getFillHistory();
    expect(fillHistory).toBeDefined();
  });

  test("getOpenOrder", async () => {
    const openOrder = await authenticatedApi.getOpenOrder({
      symbol: "SOL_USDC",
    });
    expect(openOrder).toBeDefined();
  });

  test("cancelOrder", async () => {
    const cancelOrder = await authenticatedApi.cancelOrder({
      symbol: "SOL_USDC",
      orderId: "123",
    });
    expect(cancelOrder).toBeDefined();
  });

  describe("executeOrder", () => {
    test("should execute an order", async () => {
      const orderData = {
        orderType: "Limit",
        price: 1,
        quantity: 1,
        side: "Bid",
        symbol: "BTCUSDT",
      };
      const executedOrder = await authenticatedApi.executeOrder(orderData);
      expect(executedOrder).toBeDefined();
      expect(executedOrder.symbol).toEqual(orderData.symbol);
    });
  });

  test("getOpenOrders", async () => {
    const openOrders = await authenticatedApi.getOpenOrders();
    expect(openOrders).toBeDefined();
  });

  test("cancelOpenOrders", async () => {
    const cancelOpenOrders = await authenticatedApi.cancelOpenOrders("SOL_USDC");
    expect(cancelOpenOrders).toBeDefined();
  });
});
