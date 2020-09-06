// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// RxJs
import { map, exhaustMap } from 'rxjs/operators';
// NgRx
import { createEffect, Actions, ofType } from '@ngrx/effects';
// NgRx Nrwl
import { fetch } from '@nrwl/angular';
// NgRx - Auth
import * as AuthActions from './auth.actions';
// Models
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';
// Enums
import { EmailCheckStatus } from '../enums/email-check-status.enum';
// Services
import { AuthApiService } from '../services/auth-api.service';
import { EmailCheck } from '../models';

@Injectable()
export class AuthEffects {
  // Signup
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      fetch({
        run: (action) => {
          return this.authApiService.signup(action.user).pipe(
            map((response: ApiResponse) => {
              const { message, token } = response;
              return AuthActions.signupSuccess({
                token,
                success: message,
              });
            })
          );
        },

        onError: (action, error) => {
          const errorToShow = 'Error registering the new user!';
          return AuthActions.signupFailure({ error: errorToShow });
        },
      })
    )
  );

  // Check email
  checkEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkEmail),
      fetch({
        run: (action) => {
          const { email } = action;
          return this.authApiService.checkEmail(email).pipe(
            map((response: ApiResponse) => {
              const { data } = response;
              const emailCheck: EmailCheck = {
                result: true,
                lastEmail: email,
              };
              if (data.status === EmailCheckStatus.OK) {
                emailCheck.result = false;
              } else if (data.status === EmailCheckStatus.EXISTS) {
                emailCheck.result = true;
              }
              return AuthActions.checkEmailSuccess({
                emailCheck,
              });
            })
          );
        },

        onError: (action, error) => {
          const errorToShow = 'Error checking the email!';
          return AuthActions.checkEmailFailure({ error: errorToShow });
        },
      })
    )
  );

  constructor(private actions$: Actions, private authApiService: AuthApiService) {}
}
