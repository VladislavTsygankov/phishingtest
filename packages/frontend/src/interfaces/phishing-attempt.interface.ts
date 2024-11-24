export enum PhishingStatus {
  INIT = "init",
  PENDING = "pending",
  FAILED = "failed",
  RESOLVED = "resolved",
}

export interface IPhishingAttempt {
  _id?: string;
  email: string;
  status: PhishingStatus;
}
