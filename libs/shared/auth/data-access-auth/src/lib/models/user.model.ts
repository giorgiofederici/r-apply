export interface User {
  campaignUuid: string;
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  };
}
