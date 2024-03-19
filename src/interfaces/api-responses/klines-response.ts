interface Kline {
  start: string;
  open: string;
  high: string;
  low: string;
  close: string;
  end: string;
  volume: string;
  trades: string;
}

export interface KlinesResponse extends Array<Kline> {}
