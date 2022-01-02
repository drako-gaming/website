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
}

export interface BetResult {
  userTwitchId: string;
  userTwitchDisplayName: string;
  optionId: string;
  amount: number;
  awarded: number;
}

export interface BetStore {
  game: BettingGame;
  winners: BetResult[];
  bet: Bet;
}

export interface Bet {
  optionId: string | null;
  amount: number;
  awarded: number;
}
