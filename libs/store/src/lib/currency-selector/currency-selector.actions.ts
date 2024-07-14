import { createAction, props } from '@ngrx/store';
import {
  CurrencySelectorModel,
  ExchangeRate,
} from './currency-selector.models';

export const getCurrencySelectorSymbols = createAction(
  '[CurrencySelector/API] Get Symbols'
);

export const getCurrencySelectorSymbolsSuccess = createAction(
  '[CurrencySelector/API] Get Symbols Success',
  props<{ symbols: CurrencySelectorModel[] }>()
);

export const getCurrencySelectorSymbolsFailure = createAction(
  '[CurrencySelector/API] Get Symbols Failure',
  props<{ errorMessage: string }>()
);

export const getCurrencyExchangeRates = createAction(
  '[CurrencySelector/API] Get Currency Exchange Rates',
  props<{ amount: number; fromSymbol: string; toSymbol: string }>()
);

export const getCurrencyExchangeRateSuccess = createAction(
  '[CurrencySelector/API] Get Currency Exchange Rates Success',
  props<{ exchangeRate: ExchangeRate }>()
);

export const getCurrencyExchangeRateFailure = createAction(
  '[CurrencySelector/API] Get Currency Exchange Rates Failure',
  props<{ errorMessage: string }>()
);
