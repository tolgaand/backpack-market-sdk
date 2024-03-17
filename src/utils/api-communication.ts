import axios, { AxiosRequestConfig } from "axios";
import { Cryptography } from "./cryptography";

axios.defaults.baseURL = "https://api.backpack.exchange";

export class APICommunication {
  private cryptography: Cryptography | null;

  constructor(cryptography: Cryptography | null) {
    this.cryptography = cryptography;
  }

  async sendRequest(
    method: "GET" | "POST" | "DELETE",
    endpoint: string,
    additionalParams: Record<string, any> = {},
    headers: Record<string, string> = {}
  ): Promise<any> {
    const timestamp = Date.now();
    const window = 60000;

    const params: Record<string, any> = {
      ...additionalParams,
      timestamp,
      window,
    };
    const orderedParams: Record<string, any> = {};
    Object.keys(params)
      .sort()
      .forEach((key) => {
        orderedParams[key] = params[key];
      });

    const paramString = Object.entries(orderedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    let signatureBase64 = "";
    if (this.cryptography) {
      const encodedParams = this.cryptography.encodeParams(paramString);
      const signature = this.cryptography.generateSignature(encodedParams);
      signatureBase64 = this.cryptography.encodeBase64(signature);
    }

    const requestHeaders = {
      "X-API-Key": this.cryptography ? this.cryptography.getApiKeyBase64() : "",
      "X-Signature": signatureBase64,
      "X-Timestamp": timestamp,
      "X-Window": window,
      "Content-Type": "application/json",
      ...headers,
    };

    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      headers: requestHeaders,
      ...((method === "POST" || method === "DELETE") && {
        data: additionalParams,
      }),
      params: method === "GET" && additionalParams,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
