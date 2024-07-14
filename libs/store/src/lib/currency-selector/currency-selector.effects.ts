import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as CurrencySelectorActions from './currency-selector.actions';
import {
  MetalPriceAPIErrors,
  MetalPriceHttpService,
} from '@currency-exchange/core';
import { ExchangeRate } from './currency-selector.models';

@Injectable()
export class CurrencySelectorEffects {
  private readonly actions$ = inject(Actions);
  private readonly metalPriceHttpService = inject(MetalPriceHttpService);

  getCurrencySymbols$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencySelectorActions.getCurrencySelectorSymbols),
      switchMap(() => {
        return this.metalPriceHttpService.getSymbols().pipe(
          map(({ symbols }) => {
            const transformedSymbols = Object.keys(symbols).map((key) => ({
              id: key,
              name: key,
            }));

            return CurrencySelectorActions.getCurrencySelectorSymbolsSuccess({
              symbols: transformedSymbols,
            });
          })
        );
      }),
      catchError((error: MetalPriceAPIErrors) => {
        console.error('Error', error);
        return of(
          CurrencySelectorActions.getCurrencySelectorSymbolsFailure({
            errorMessage: error.symbols.info,
          })
        );
      })
    )
  );

  getExhangeRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencySelectorActions.getCurrencyExchangeRates),
      switchMap(({ amount, fromSymbol, toSymbol }) => {
        return this.metalPriceHttpService
          .getExchangeRate(amount, fromSymbol, toSymbol)
          .pipe(
            map(({ info: { timestamp }, query, result }) => {
              const exchangeRate: ExchangeRate = {
                ...query,
                timestamp,
                result,
              };
              return CurrencySelectorActions.getCurrencyExchangeRateSuccess({
                exchangeRate,
              });
            })
          );
      }),
      catchError((error: MetalPriceAPIErrors) => {
        console.error('Error', error);
        return of(
          CurrencySelectorActions.getCurrencyExchangeRateFailure({
            errorMessage: error.symbols.info,
          })
        );
      })
    )
  );
}
