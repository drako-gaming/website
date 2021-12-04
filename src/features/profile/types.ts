export interface Profile {
  isAuthenticated: boolean;
  twitchId: string;
  displayName: string;
  balance: number;
  lastTransactionId: number;
  roles: string[];
}
