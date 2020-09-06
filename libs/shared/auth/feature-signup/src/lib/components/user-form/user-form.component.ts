// Angular
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
// Shared Auth Data Access Models
import { User, EmailCheck } from '@r-apply/shared/auth/data-access-auth';
// Form Builder
import * as fromBuilders from '../../form-builders';
import { ParentErrorStateMatcher } from '../../form-builders/parent-err-state-matcher';

@Component({
  selector: 'r-apply-user-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  //Inputs
  @Input() emailCheck: EmailCheck;
  @Input() loading: boolean;
  // Outputs
  @Output() reviewUserEmitter: EventEmitter<User> = new EventEmitter<User>();

  userFormGroup: FormGroup = null;
  // We need this matcher for showing the password no match error
  parentStateMatcher = new ParentErrorStateMatcher();
  // Toggle password visibility
  hidePassword = true;
  hidePasswordConfirm = true;

  constructor(private userBuilder: fromBuilders.UserBuilder) {}

  // Get form controls/groups
  get dataGroup() {
    return this.userFormGroup.get('data');
  }

  get firstNameControl() {
    return this.userFormGroup.get('data.firstName');
  }

  get lastNameControl() {
    return this.userFormGroup.get('data.lastName');
  }

  get emailControl() {
    return this.userFormGroup.get('data.email');
  }

  get passwordControl() {
    return this.userFormGroup.get('data.password');
  }

  get passwordConfirmControl() {
    return this.userFormGroup.get('data.passwordConfirm');
  }

  get passwordNotMatching() {
    return this.dataGroup.invalid && this.passwordConfirmControl.valid;
  }

  get emailCheckIsValid() {
    return this.emailCheck && this.emailCheck.result === false;
  }

  ngOnInit() {
    this.userFormGroup = this.userBuilder.build();
  }

  onSubmit(user: User) {
    this.reviewUserEmitter.emit(user);
  }
}
