import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../../app/store";
import { BetStore, BettingGame } from "./types";
import { baseUrl } from "../../api/api";

const initialState: BetStore = {
  game: {
    objective: "",
    status: "Never",
    options: [],
  },
  bets: [],
};

const bettingSlice = createSlice({
  name: "betting",
  initialState,
  reducers: {
    updateBettingGame(state: BetStore, action: PayloadAction<BettingGame>) {
      if (state.game.id === action.payload.id || action.payload.status === "Open") {
        return {
          ...state,
          game: action.payload,
        };
      }

      return state;
    },
  },
});

export const loadBetting = (): AppThunk => async (dispatch: AppDispatch) => {
  const response = await axios.get(baseUrl + "betting");

  if (response.status === 200) {
    dispatch(bettingSlice.actions.updateBettingGame(response.data));
  }

  // TODO: Dispatch failure actions
};

export const openBetting =
  (resource: BettingGame): AppThunk =>
  async (dispatch: AppDispatch) => {
    const response = await axios.post<BettingGame>(baseUrl + "betting", resource);

    if (response.status === 201) {
      dispatch(bettingSlice.actions.updateBettingGame(response.data));
    }

    // TODO: Dispatch failure actions
  };

export const closeBetting =
  (gameId: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    const response = await axios.patch(baseUrl + `betting/${gameId}`, { status: "Closed" });

    if (response.status === 200) {
      dispatch(bettingSlice.actions.updateBettingGame(response.data));
    }
    // TODO: Dispatch failure actions
  };

export const chooseWinner =
  (gameId: string, winningOptionId: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    const payload = {
      status: "Done",
      winningOption: winningOptionId,
    };

    const response = await axios.patch(baseUrl + `betting/${gameId}`, payload);

    if (response.status === 200) {
      dispatch(bettingSlice.actions.updateBettingGame(response.data));
    }
    // TODO: Dispatch failure actions
  };

export const { updateBettingGame } = bettingSlice.actions;
export default bettingSlice.reducer;
