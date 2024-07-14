import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CurrencySelectorActions from './currency-selector.actions';
import { CurrencySelectorEffects } from './currency-selector.effects';
import { CurrencySelectorModel } from './currency-selector.models';
import {
  API_KEY,
  BASE_URL,
  MetalPriceAPIConvertResponse,
  MetalPriceHttpService,
} from '@currency-exchange/core';
import { provideHttpClient } from '@angular/common/http';

describe('CurrencySelectorEffects', () => {
  let actions: Observable<Action>;
  let effects: CurrencySelectorEffects;
  let service: MetalPriceHttpService;

  const createCurrencySelectorSymbols = (
    name: string
  ): CurrencySelectorModel => ({
    id: name,
    name,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CurrencySelectorEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        provideHttpClient(),
        {
          provide: MetalPriceHttpService,
          useValue: { getSymbols: jest.fn(), getExchangeRate: jest.fn() },
        },
        { provide: BASE_URL, useValue: 'BASE_URL' },
        { provide: API_KEY, useValue: 'API_KEY' },
      ],
    });

    effects = TestBed.inject(CurrencySelectorEffects);
    service = TestBed.inject(MetalPriceHttpService);
  });

  describe('CurrencySelectorEffects', () => {
    it('getCurrencySymbols$', () => {
      const symbolsApiResponse = {
        success: true,
        symbols: { EUR: 'EUR', HUF: 'HUF' },
      };
      const symbols = [
        createCurrencySelectorSymbols('EUR'),
        createCurrencySelectorSymbols('HUF'),
      ];
      actions = hot('-a', {
        a: CurrencySelectorActions.getCurrencySelectorSymbols(),
      });
      const response = cold('-a|', { a: symbolsApiResponse });
      const expected = cold('--b', {
        b: CurrencySelectorActions.getCurrencySelectorSymbolsSuccess({
          symbols,
        }),
      });
      service.getSymbols = jest.fn(() => response);

      expect(effects.getCurrencySymbols$).toBeObservable(expected);
    });

    it('getExhangeRate$', () => {
      const exchangeApiResponse: MetalPriceAPIConvertResponse = {
        success: true,
        query: {
          from: 'EUR',
          to: 'HUF',
          amount: 1,
        },
        info: { timestamp: Date.parse(new Date().toISOString()), quote: 392 },
        result: 392,
      };
      actions = hot('-a', {
        a: CurrencySelectorActions.getCurrencyExchangeRates({
          fromSymbol: 'EUR',
          toSymbol: 'HUF',
          amount: 1,
        }),
      });
      const response = cold('-a|', { a: exchangeApiResponse });
      const expected = cold('--b', {
        b: CurrencySelectorActions.getCurrencyExchangeRateSuccess({
          exchangeRate: {
            ...exchangeApiResponse.query,
            timestamp: exchangeApiResponse.info.timestamp,
            result: exchangeApiResponse.result,
          },
        }),
      });
      service.getExchangeRate = jest.fn(() => response);

      expect(effects.getExhangeRate$).toBeObservable(expected);
    });
  });
});
