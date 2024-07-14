import { createReducer, on, Action } from '@ngrx/store';

import * as CurrencySelectorActions from './currency-selector.actions';
import {
  CurrencySelectorModel,
  ExchangeRate,
} from './currency-selector.models';

export const CURRENCY_SELECTOR_FEATURE_KEY = 'currencySelector';

export interface CurrencySelectorState {
  symbols: CurrencySelectorModel[];
  exchangeRate?: ExchangeRate | null;
  errorMessage: string;
}

export interface CurrencySelectorPartialState {
  readonly [CURRENCY_SELECTOR_FEATURE_KEY]: CurrencySelectorState;
}

export const initialCurrencySelectorState: CurrencySelectorState = {
  symbols: [],
  exchangeRate: null,
  errorMessage: '',
};

const reducer = createReducer(
  initialCurrencySelectorState,
  on(
    CurrencySelectorActions.getCurrencySelectorSymbolsSuccess,
    (state, { symbols }) => ({
      ...state,
      symbols,
    })
  ),
  on(
    CurrencySelectorActions.getCurrencyExchangeRateSuccess,
    (state, { exchangeRate }) => ({
      ...state,
      exchangeRate,
    })
  ),
  on(
    CurrencySelectorActions.getCurrencySelectorSymbolsFailure,
    CurrencySelectorActions.getCurrencyExchangeRateFailure,
    (state, { errorMessage }) => ({ ...state, errorMessage })
  )
);

export function currencySelectorReducer(
  state: CurrencySelectorState | undefined,
  action: Action
) {
  return reducer(state, action);
}
