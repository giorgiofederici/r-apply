// Angular
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';
// RxJs
import { Observable, of } from 'rxjs';
import { switchMap, tap, filter, take, catchError, debounceTime, delay } from 'rxjs/operators';
// NgRx
import { Store, select } from '@ngrx/store';
import { checkEmail, getAuthEmailCheck, EmailCheck } from '@r-apply/shared/auth/data-access-auth';

@Injectable()
export class SignupValidatorsService {
  constructor(private store: Store<{}>) {}

  passwordMatcher(control: AbstractControl): { [key: string]: boolean } {
    const password = control.get('password');
    const confirm = control.get('passwordConfirm');
    if (!password || !confirm) return null;
    return password.value === confirm.value ? null : { passwordNoMatch: true };
  }

  validateEmail = (control: AbstractControl) => {
    const emailToCheck = control.value;
    return this.getFromStore(emailToCheck).pipe(
      switchMap((emailCheck: EmailCheck) => {
        const result = emailCheck && emailCheck.result ? { emailAlreadyUsed: true } : null;
        return of(result);
      }),
      catchError(() => of({ emailAlreadyUsed: true }))
    );
  };

  getFromStore(emailToCheck: string): Observable<any> {
    return this.store.pipe(
      debounceTime(400),
      select(getAuthEmailCheck),
      tap((emailCheck: EmailCheck) => {
        if (
          isNullOrUndefined(emailCheck) ||
          isNullOrUndefined(emailCheck.result) ||
          emailToCheck !== emailCheck.lastEmail
        ) {
          this.store.dispatch(checkEmail({ email: emailToCheck }));
        }
      }),
      filter((emailCheck: EmailCheck) => {
        return !isNullOrUndefined(emailCheck) && emailCheck.lastEmail === emailToCheck;
      }),
      take(1)
    );
  }
}
