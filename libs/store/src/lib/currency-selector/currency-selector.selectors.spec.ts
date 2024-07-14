import {
  CurrencySelectorModel,
  ExchangeRate,
} from './currency-selector.models';
import { CurrencySelectorPartialState } from './currency-selector.reducer';
import * as CurrencySelectorSelectors from './currency-selector.selectors';

describe('CurrencySelector Selectors', () => {
  const createCurrencySelectorSymbols = (
    name: string
  ): CurrencySelectorModel => ({
    id: name,
    name,
  });

  const createCurrencySelectorEchangeRate = (
    from: string,
    to: string,
    amount: number,
    result: number,
    timestamp: number
  ): ExchangeRate => ({
    from,
    to,
    amount,
    result,
    timestamp,
  });

  let state: CurrencySelectorPartialState;

  beforeEach(() => {
    state = {
      currencySelector: {
        symbols: [
          createCurrencySelectorSymbols('USD'),
          createCurrencySelectorSymbols('EUR'),
        ],
        exchangeRate: createCurrencySelectorEchangeRate(
          'EUR',
          'USD',
          100,
          0.8,
          Date.parse(new Date().toDateString())
        ),
        errorMessage: '',
      },
    };
  });

  describe('CurrencySelector Selectors', () => {
    it('selectCurrencySymbols() should return the list of CurrencySymbols', () => {
      const results = CurrencySelectorSelectors.selectCurrencySymbols(state);
      expect(results.length).toBe(2);
    });

    it('selectCurrencySymbolsForSelect() should return the transformed list of CurrencySymbols', () => {
      const result =
        CurrencySelectorSelectors.selectCurrencySymbolsForSelect(state);
      expect(result[0].id).toBe('USD');
      expect(result[0].label).toBe('USD');
      expect(result[1].id).toBe('EUR');
      expect(result[1].label).toBe('EUR');
    });

    it('selectExchangeRates() should return the current exchangeRate', () => {
      const result =
        CurrencySelectorSelectors.selectExchangeRate(state);

      expect(result?.from).toBeDefined()
    });
  });
});
