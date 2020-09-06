// Angular
import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
// Shared Auth Data Access Models
import { User } from '@r-apply/shared/auth/data-access-auth';

@Component({
  selector: 'r-apply-user-review',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.scss'],
})
export class UserReviewComponent {
  // Inputs
  @Input() user: User;
  @Input() loading: boolean;
  // Outputs
  @Output() signupUserEmitter: EventEmitter<User> = new EventEmitter<User>();

  hidePassword = true;

  constructor() {}

  onSignup() {
    this.signupUserEmitter.emit(this.user);
  }
}
