import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import * as fromCurrencySelector from '@currency-exchange/store';
import { CurrencySelectorEffects } from '@currency-exchange/store';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'currency-selector', pathMatch: 'full' },
  {
    path: 'currency-selector',
    loadComponent: () =>
      import('@currency-exchange/currency-selector').then(
        (c) => c.CurrencySelectorComponent
      ),
    providers: [
      provideEffects(CurrencySelectorEffects),
      provideState(
        fromCurrencySelector.CURRENCY_SELECTOR_FEATURE_KEY,
        fromCurrencySelector.currencySelectorReducer
      ),
    ],
  },
];
