import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../../app/store";
import { BettingGame } from "./types";
import { fetchCurrentBettingGame } from "../../api/api";

const initialState: BettingGame = {
  id: null,
  objective: null,
  options: [],
  winningOption: null,
  status: "Cancelled",
  total: 0,
  alreadyBet: false
};

const bettingSlice = createSlice({
  name: "betting",
  initialState,
  reducers: {
    updateBettingGame(state, action: PayloadAction<BettingGame>) {
        return action.payload;
    }
  }
});

export const loadBetting = (): AppThunk => async (dispatch: AppDispatch) => {
  const bettingGame = await fetchCurrentBettingGame();
  dispatch(bettingSlice.actions.updateBettingGame(bettingGame));
};

export const { updateBettingGame } = bettingSlice.actions;
export default bettingSlice.reducer;
