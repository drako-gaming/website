export interface BettingGameOption {
  description: string;
  id: number;
  total: number;
};

export interface BettingGame {
  id: number|null;
  objective: string|null;
  options: BettingGameOption[];
  status: string;
  winningOption: number|null;
  total: number;
  alreadyBet: boolean;
};
