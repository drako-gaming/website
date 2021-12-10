export interface Profile {
  isAuthenticated: boolean;
  displayName: string;
  balance: number;
  initialBalance: number;
  lastTransactionId: number;
  roles: string[];
}
