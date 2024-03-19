import axios, { AxiosRequestConfig } from "axios";
import { Cryptography } from "./cryptography";
import { HttpMethod } from "../constants";

export class APICommunication {
  private cryptography: Cryptography | null;
  private signatureBase64 = "";

  constructor(cryptography: Cryptography | null) {
    this.cryptography = cryptography;
  }

  async sendRequest(
    method: HttpMethod,
    endpoint: string,
    additionalParams: Record<string, any> = {},
    headers: Record<string, string> = {}
  ): Promise<any> {
    const timestamp = Date.now();
    const window = 60000;

    if (this.cryptography) {
      const paramString = this.buildOrderedParamString(timestamp, window, additionalParams);
      this.signatureBase64 = this.createSignature(paramString);
    }

    const requestHeaders = {
      "X-API-Key": this.cryptography ? this.cryptography.getApiKeyBase64() : "",
      "X-Signature": this.signatureBase64,
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

  private buildOrderedParamString(
    timestamp: number,
    window: number,
    additionalParams: Record<string, any> = {}
  ) {
    const params = new URLSearchParams();

    params.append("timestamp", timestamp.toString());
    params.append("window", window.toString());

    Object.entries(additionalParams).forEach(([key, value]) => {
      params.append(key, value);
    });

    const orderedParams = Array.from(params.entries()).sort();
    return new URLSearchParams(orderedParams).toString();
  }

  private createSignature(paramString: string) {
    if (!this.cryptography) return "";

    const encodedParams = this.cryptography.encodeParams(paramString);
    const signature = this.cryptography.generateSignature(encodedParams);
    return this.cryptography.encodeBase64(signature);
  }
}
