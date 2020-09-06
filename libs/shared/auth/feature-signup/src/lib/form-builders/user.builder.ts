// Angular
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Validators
import { SignupValidatorsService } from './signup-validators.service';
// Shared Env
import { environment } from '@r-apply/shared/environments';

@Injectable()
export class UserBuilder {
  constructor(private fb: FormBuilder, private signupValidators: SignupValidatorsService) {}

  /**
   * Build and return a `FormGroup` with the required fields and
   * validation for the User
   */
  public build(): FormGroup {
    return this.fb.group({
      campaignUuid: [environment.campaignUuid, [Validators.required]],
      data: this.fb.group(
        {
          firstName: [null, [Validators.required]],
          lastName: [null, [Validators.required]],
          email: [null, [Validators.required, Validators.email], [this.signupValidators.validateEmail.bind(this)]],
          password: [null, [Validators.required]],
          passwordConfirm: [null, [Validators.required]],
        },
        { validators: [this.signupValidators.passwordMatcher] }
      ),
    });
  }
}

export const userBuilders: any[] = [UserBuilder];
