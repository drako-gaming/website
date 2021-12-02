export interface Profile {
  isAuthenticated: boolean;
  displayName: string;
  balance: number;
  lastTransactionId: number;
  roles: string[];
}
