import { KlineInterval } from "../types";

export interface KlinesQueryParams {
  symbol: string;
  interval: KlineInterval;
  startTime?: number;
  endTime?: number;
}
