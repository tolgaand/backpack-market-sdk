import { BASE_URL } from "../constants";

export function buildUrl(baseUrl: BASE_URL, endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${baseUrl}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}
