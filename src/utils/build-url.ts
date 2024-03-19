import { BASE_URL } from "../constants";

export function buildUrl(options: {
  endpoint: string;
  params?: Record<string, string | undefined>;
  baseUrl?: BASE_URL;
}) {
  options.params = options.params || {};
  options.baseUrl = options.baseUrl || BASE_URL.API;

  const url = new URL(`${options.baseUrl}${options.endpoint}`);

  Object.entries(options.params).forEach(([key, value]) => {
    if (!value) return;
    url.searchParams.append(key, value);
  });
  return url.toString();
}
