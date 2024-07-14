import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CURRENCY_SELECTOR_FEATURE_KEY,
  CurrencySelectorState,
} from './currency-selector.reducer';
import { CurrencySelectorModel } from './currency-selector.models';

// Lookup the 'CurrencySelector' feature state managed by NgRx
export const selectCurrencySelectorState =
  createFeatureSelector<CurrencySelectorState>(CURRENCY_SELECTOR_FEATURE_KEY);

export const selectCurrencySymbols = createSelector(
  selectCurrencySelectorState,
  (state: CurrencySelectorState) => state.symbols
);

export const selectCurrencySymbolsForSelect = createSelector(
  selectCurrencySymbols,
  (symbols: CurrencySelectorModel[]) =>
    symbols.map(({ id }) => ({ id, label: id }))
);

export const selectExchangeRate = createSelector(
  selectCurrencySelectorState,
  (state: CurrencySelectorState) => state.exchangeRate
);
