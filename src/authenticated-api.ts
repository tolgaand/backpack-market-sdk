import { APICommunication } from "./utils/api-communication";
import { Cryptography } from "./utils/cryptography";
import { Balance, Deposit, Withdrawal, DepositAddress, Order, Fill } from "./types";

export class AuthenticatedAPI {
	private apiCommunication: APICommunication;

	constructor(params: { apiKey: string; secretKey: string }) {
		const { apiKey, secretKey } = params;

		if (!apiKey || !secretKey) throw new Error("API Key and Secret Key are required");

		const cryptography = new Cryptography(apiKey, secretKey);
		this.apiCommunication = new APICommunication(cryptography);
	}

	async getBalances(): Promise<Record<string, Balance>> {
		return this.apiCommunication.sendRequest("GET", "/api/v1/capital", {
			instruction: "balanceQuery",
		});
	}

	async getDeposits({ limit = 100, offset = 0 }: { limit?: number; offset?: number } = {}): Promise<
		Deposit[]
	> {
		return this.apiCommunication.sendRequest(
			"GET",
			`/wapi/v1/capital/deposits?limit=${limit}&offset=${offset}`,
			{ instruction: "depositQueryAll" }
		);
	}

	async getDepositAddress(blockchain: string): Promise<DepositAddress> {
		return this.apiCommunication.sendRequest(
			"GET",
			`/wapi/v1/capital/deposit/address?blockchain=${blockchain}`,
			{ instruction: "depositAddressQuery" }
		);
	}

	async getWithdrawals(params: { limit?: number; offset?: number } = {}): Promise<Withdrawal[]> {
		const { limit = 100, offset = 0 } = params;
		return this.apiCommunication.sendRequest(
			"GET",
			`/wapi/v1/capital/withdrawals?limit=${limit}&offset=${offset}`,
			{
				instruction: "withdrawalQueryAll",
			}
		);
	}

	async requestWithdrawal(params: {
		address: string;
		blockchain: string;
		quantity: number;
		symbol: string;
		clientId?: number;
		twoFactorToken?: string;
	}): Promise<Withdrawal> {
		const { address, blockchain, quantity, symbol, clientId, twoFactorToken } = params;

		const body = {
			address,
			blockchain,
			quantity,
			symbol,
			clientId,
			twoFactorToken,
		};
		return this.apiCommunication.sendRequest("POST", "/wapi/v1/capital/withdrawals", {
			...body,
			instruction: "withdraw",
		});
	}

	async getOrderHistory(
		params: { limit?: number; offset?: number; symbol?: string } = {}
	): Promise<Order[]> {
		const { limit = 100, offset = 0, symbol } = params;

		let endpoint = `/wapi/v1/history/orders?limit=${limit}&offset=${offset}`;
		if (symbol) {
			endpoint += `&symbol=${symbol}`;
		}
		return this.apiCommunication.sendRequest("GET", endpoint, {
			instruction: "orderHistoryQueryAll",
		});
	}

	async getFillHistory(symbol?: string, limit: number = 100, offset: number = 0): Promise<Fill[]> {
		let endpoint = `/wapi/v1/history/fills?limit=${limit}&offset=${offset}`;
		if (symbol) {
			endpoint += `&symbol=${symbol}`;
		}
		return this.apiCommunication.sendRequest("GET", endpoint, {
			instruction: "fillHistoryQueryAll",
		});
	}

	async executeOrder({
		clientId,
		orderType,
		postOnly,
		price,
		quantity,
		quoteQuantity,
		selfTradePrevention,
		side,
		symbol,
		timeInForce,
		triggerPrice,
	}: {
		clientId?: number;
		orderType: string | "Market" | "Limit";
		postOnly?: boolean;
		price: number;
		quantity: number;
		quoteQuantity?: string;
		selfTradePrevention?: string | "RejectTaker" | "RejectMaker" | "RejectBoth" | "Allow";
		side: string | "Bid" | "Ask";
		symbol: string;
		timeInForce?: string;
		triggerPrice?: string;
	}): Promise<Order> {
		const body = {
			clientId,
			orderType,
			postOnly,
			price,
			quantity,
			quoteQuantity,
			selfTradePrevention,
			side,
			symbol,
			timeInForce,
			triggerPrice,
		};
		return this.apiCommunication.sendRequest("POST", "/api/v1/order", {
			...body,
			instruction: "orderExecute",
		});
	}

	async getOpenOrder({
		orderId,
		clientId,
		symbol,
	}: {
		orderId?: string;
		clientId?: string;
		symbol: string;
	}): Promise<Order> {
		let endpoint = "/api/v1/order?";
		if (orderId) {
			endpoint += `orderId=${orderId}`;
		} else if (clientId) {
			endpoint += `clientId=${clientId}`;
		}
		if (symbol) {
			endpoint += `&symbol=${symbol}`;
		}
		return this.apiCommunication.sendRequest("GET", endpoint, {
			instruction: "orderQuery",
		});
	}

	async cancelOrder({ orderId, symbol }: { orderId: string; symbol: string }): Promise<Order> {
		const body = { orderId, symbol };
		return this.apiCommunication.sendRequest("DELETE", "/api/v1/order", {
			...body,
			instruction: "orderCancel",
		});
	}

	async getOpenOrders(symbol?: string): Promise<Order[]> {
		let endpoint = "/api/v1/orders";
		if (symbol) {
			endpoint += `?symbol=${symbol}`;
		}
		return this.apiCommunication.sendRequest("GET", endpoint, {
			instruction: "orderQueryAll",
		});
	}

	async cancelOpenOrders(symbol: string): Promise<string> {
		const body = { symbol };
		return this.apiCommunication.sendRequest("DELETE", "/api/v1/orders", {
			...body,
			instruction: "orderCancelAll",
		});
	}
}
