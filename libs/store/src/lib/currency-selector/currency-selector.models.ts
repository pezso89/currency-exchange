/**
 * Interface for the 'CurrencySelector' data
 */
export interface CurrencySelectorModel {
  id: string;
  name: string;
}

export interface ExchangeRate {
  result: number;
  timestamp: number;
  from: string;
  to: string;
  amount: number;
}
