import * as CurrencySelectorActions from './currency-selector.actions';
import {
  CurrencySelectorModel,
  ExchangeRate,
} from './currency-selector.models';
import {
  CurrencySelectorState,
  initialCurrencySelectorState,
  currencySelectorReducer,
} from './currency-selector.reducer';

describe('CurrencySelector Reducer', () => {
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

  describe('CurrencySelectorSymbol actions', () => {
    it('getCurrencySelectorSymbols should return the default state', () => {
      const action = CurrencySelectorActions.getCurrencySelectorSymbols();

      const result: CurrencySelectorState = currencySelectorReducer(
        initialCurrencySelectorState,
        action
      );

      expect(result.symbols.length).toEqual(0);
    });

    it('getCurrencySelectorSymbolsSuccess should return the list of symbols', () => {
      const action = CurrencySelectorActions.getCurrencySelectorSymbolsSuccess({
        symbols: [createCurrencySelectorSymbols('EUR')],
      });

      const result: CurrencySelectorState = currencySelectorReducer(
        initialCurrencySelectorState,
        action
      );

      expect(result.symbols.length).toEqual(1);
    });

    it('getCurrencySelectorSymbolsFailure should return the errorMessage', () => {
      const action = CurrencySelectorActions.getCurrencySelectorSymbolsFailure({
        errorMessage: 'error',
      });

      const result: CurrencySelectorState = currencySelectorReducer(
        initialCurrencySelectorState,
        action
      );

      expect(result.errorMessage).toEqual('error');
    });
  });

  describe('CurrencyExchangeRate actions', () => {
    it('getCurrencyExchangeRateSuccess should return the current exchangeRate', () => {
      const action = CurrencySelectorActions.getCurrencyExchangeRateSuccess({
        exchangeRate: createCurrencySelectorEchangeRate(
          'EUR',
          'USD',
          100,
          0.8,
          Date.parse(new Date().toDateString())
        ),
      });

      const result: CurrencySelectorState = currencySelectorReducer(
        initialCurrencySelectorState,
        action
      );

      expect(result.exchangeRate).not.toBeNull();
    });

    it('getCurrencyExchangeRateFailure should return the list of symbols', () => {
      const action = CurrencySelectorActions.getCurrencyExchangeRateFailure({
        errorMessage: 'error',
      });

      const result: CurrencySelectorState = currencySelectorReducer(
        initialCurrencySelectorState,
        action
      );

      expect(result.errorMessage).toEqual('error');
    });
  });
});
