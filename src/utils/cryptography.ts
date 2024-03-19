import * as nacl from "tweetnacl";
import * as naclUtil from "tweetnacl-util";

export class Cryptography {
  private apiKeyUint8Array: Uint8Array;
  private secretKeyUint8Array: Uint8Array;

  constructor(apiKeyBase64: string, secretKeyBase64: string) {
    this.apiKeyUint8Array = naclUtil.decodeBase64(apiKeyBase64);
    this.secretKeyUint8Array = naclUtil.decodeBase64(secretKeyBase64);
  }

  encodeParams(paramsString: string): Uint8Array {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(paramsString);
  }

  generateSignature(encodedParams: Uint8Array): Uint8Array {
    const signatureKey = new Uint8Array([...this.secretKeyUint8Array, ...this.apiKeyUint8Array]);
    return nacl.sign.detached(encodedParams, signatureKey);
  }

  encodeBase64(buffer: Uint8Array): string {
    return naclUtil.encodeBase64(buffer);
  }

  getApiKeyBase64(): string {
    return naclUtil.encodeBase64(this.apiKeyUint8Array);
  }
}
