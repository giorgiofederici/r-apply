//Angular
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'r-apply-signup-feedback',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup-feedback.component.html',
  styleUrls: ['signup-feedback.component.scss'],
})
export class SignupFeedbackComponent {
  // Inputs
  @Input() isSuccess: boolean;
  @Input() message: string;

  constructor() {}
}
