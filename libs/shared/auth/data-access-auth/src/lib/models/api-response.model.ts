// Enum
import { EmailCheckStatus } from '../enums/email-check-status.enum';

export interface ApiResponse {
  data: {
    status?: EmailCheckStatus;
  };
  message?: string;
  token?: string;
}
