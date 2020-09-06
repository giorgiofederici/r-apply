// Angular
import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
// Shared Auth Data Access Models
import { User, EmailCheck } from '@r-apply/shared/auth/data-access-auth';

@Component({
  selector: 'r-apply-signup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  // Inputs
  @Input() loading: boolean;
  @Input() error: string;
  @Input() success: string;
  @Input() user: User;
  @Input() emailCheck: EmailCheck;
  // Outputs
  @Output() reviewUserEmitter: EventEmitter<User> = new EventEmitter<User>();
  @Output() signupUserEmitter: EventEmitter<User> = new EventEmitter<User>();

  constructor() {}

  get isSuccess() {
    if (this.success) {
      return true;
    }
    return false;
  }

  get feedbackMessage() {
    if (this.isSuccess) {
      return this.success;
    }
    return this.error;
  }

  onReviewUser(event: User) {
    this.reviewUserEmitter.emit(event);
  }

  onSignupUser(event: User) {
    this.signupUserEmitter.emit(event);
  }
}
