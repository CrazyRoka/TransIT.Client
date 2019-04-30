import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { AbstractControl } from '@angular/forms';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'required',
    format: requiredFormat
  },
  {
    error: 'minlength',
    format: minLengthFormat
  },
  {
    error: 'maxlength',
    format: maxLengthFormat
  },
  {
    error: 'MatchPassword',
    format: MatchPasswordFormat
  }
];

export function requiredFormat(label: string, error: any): string {
  return `Поле "${label}" є обов'язковим`;
}

export function minLengthFormat(label: string, error: any): string {
  return `Мінімальна довжина поля - ${error.requiredLength}`;
}

export function maxLengthFormat(label: string, error: any): string {
  return `Максимальна довжина поля - ${error.requiredLength}`;
}
export function MatchPasswordFormat(label: string, error: any): string {
  return `Паролі не співпадають`;
}
export function MatchPassword(AC: AbstractControl) {
  let password = AC.get('password').value;
  let confirmPassword = AC.get('confirmPassword').value;
  if (password != confirmPassword) {
    AC.get('confirmPassword').setErrors({ MatchPassword: true });
  } else {
    return null;
  }
}
