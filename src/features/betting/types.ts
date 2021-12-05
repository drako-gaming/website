export interface BettingGameOption {
  description: string;
  id?: string;
  total?: number;
}

export interface BettingGame {
  id?: string;
  objective: string;
  options: BettingGameOption[];
  status?: string;
  winningOption?: number;
  total?: number;
  alreadyBet?: boolean;
}

export interface BetResult {
  userTwitchId: string;
  userTwitchDisplayName: string;
  amount: number;
  awarded: number;
}

export interface BetStore {
  game: BettingGame;
  winners: BetResult[];
}
