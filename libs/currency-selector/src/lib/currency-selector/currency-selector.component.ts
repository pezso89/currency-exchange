import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import {
  ButtonComponent,
  CardComponent,
  InputComponent,
  SelectComponent,
} from '@currency-exchange/ui';
import { CustomValidators } from '@currency-exchange/core';
import * as fromCurrencySelectorActions from '@currency-exchange/store';

@Component({
  selector: 'lib-currency-selector',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
    SelectComponent,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  styleUrls: ['./currency-selector.component.scss'],
  templateUrl: './currency-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencySelectorComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);
  readonly currencySelectorForm = this.formBuilder.group({
    amount: [
      1,
      [Validators.required, CustomValidators.onlyPositiveNumbersValidator()],
    ],
    fromSymbol: ['', Validators.required],
    toSymbol: ['', Validators.required],
  });

  readonly currencySymbols$ = this.store.select(
    fromCurrencySelectorActions.selectCurrencySymbolsForSelect
  );

  readonly exchangeRate$ = this.store.select(
    fromCurrencySelectorActions.selectExchangeRate
  );

  ngOnInit(): void {
    this.store.dispatch(fromCurrencySelectorActions.getCurrencySelectorSymbols());
  }

  onSubmit() {
    if (!this.currencySelectorForm.valid) {
      return;
    }
    const { amount, fromSymbol, toSymbol } = this.currencySelectorForm.value;
    this.store.dispatch(
      fromCurrencySelectorActions.getCurrencyExchangeRates({
        amount: amount ?? 1,
        fromSymbol: fromSymbol ?? 'EUR',
        toSymbol: toSymbol ?? 'USD',
      })
    );
  }
}
