interface PriceFilter {
  minPrice: string;
  maxPrice: string;
  tickSize: string;
}

interface QuantityFilter {
  minQuantity: string;
  maxQuantity: string;
  stepSize: string;
}

interface LeverageFilter {
  minLeverage: string;
  maxLeverage: string;
  stepSize: string;
}

interface MarketFilters {
  price: PriceFilter;
  quantity: QuantityFilter;
  leverage: LeverageFilter;
}

export interface MarketsResponse {
  symbol: string;
  baseSymbol: string;
  quoteSymbol: string;
  filters: MarketFilters;
}
