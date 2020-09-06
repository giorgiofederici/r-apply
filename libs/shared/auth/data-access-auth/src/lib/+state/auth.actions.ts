// NgRx
import { createAction, props } from '@ngrx/store';
// Models
import { User } from '../models/user.model';
import { EmailCheck } from '../models/email-check.model';

// Set User
export const setUser = createAction('[Auth] Set User', props<{ user: User }>());

// Signup
export const signup = createAction('[Auth] Signup', props<{ user: User }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ token: string; success: string }>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: any }>());

// Check Email
export const checkEmail = createAction('[Auth] Check Email', props<{ email: string }>());
export const checkEmailSuccess = createAction('[Auth] Check Email Success', props<{ emailCheck: EmailCheck }>());
export const checkEmailFailure = createAction('[Auth] Check Email Failure', props<{ error: any }>());
