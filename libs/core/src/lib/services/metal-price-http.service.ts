import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_KEY, BASE_URL } from '../injection-tokens/injection.tokens';
import { Observable } from 'rxjs';
import {
  MetalPriceAPIConvertResponse,
  MetalPriceAPISymbolsResponse,
} from '../api-types/metal-price-api.model';

@Injectable({ providedIn: 'root' })
export class MetalPriceHttpService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);
  private readonly apiKey = inject(API_KEY);

  getSymbols(): Observable<MetalPriceAPISymbolsResponse> {
    return this.httpClient.get<MetalPriceAPISymbolsResponse>(
      `${this.baseUrl}/symbols?api_key=${this.apiKey}`
    );
  }

  getExchangeRate(amount: number, fromSymbol: string, toSymbol: string) {
    return this.httpClient.get<MetalPriceAPIConvertResponse>(
      `${this.baseUrl}/convert?api_key=${this.apiKey}&from=${fromSymbol}&to=${toSymbol}&amount=${amount}`
    );
  }
}
