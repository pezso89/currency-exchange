import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static onlyPositiveNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return parseInt(control.value) > 0
        ? null
        : { notPositiveNumber: true };
    };
  }
}
