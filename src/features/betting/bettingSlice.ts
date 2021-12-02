import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../../app/store";
import { Bet, BetStore, BettingGame } from "./types";
import { baseUrl } from "../../api/api";
import { UseFormSetError } from "react-hook-form";

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
      if (!state.game.id || state.game.id === action.payload.id || action.payload.status === "Open") {
        return {
          ...state,
          game: {
            ...action.payload,
            total: +action.payload.total!,
            options: action.payload.options.map((item) => {
              return {
                ...item,
                total: +item.total!,
              };
            }),
          },
        };
      }

      return state;
    },
    updateBets(state: BetStore, action: PayloadAction<Bet[]>) {
      return {
        ...state,
        bets: action.payload,
      };
    },
  },
});

const loadBets =
  (gameId: string, winningOptionId: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    const response = await axios.get(baseUrl + `betting/${gameId}/bets?optionId=${winningOptionId}`);

    if (response.status === 200) {
      dispatch(bettingSlice.actions.updateBets(response.data));
    }
  };

export const loadBetting = (): AppThunk => async (dispatch: AppDispatch) => {
  const response = await axios.get(baseUrl + "betting");

  if (response.status === 200) {
    dispatch(bettingSlice.actions.updateBettingGame(response.data));
    if (response.data.winningOption) {
      dispatch(loadBets(response.data.id, response.data.winningOption));
    }
  }

  // TODO: Dispatch failure actions
};

export const openBetting =
  (resource: BettingGame, setError: UseFormSetError<any>): AppThunk =>
  async (dispatch: AppDispatch) => {
    const response = await axios.post<BettingGame>(baseUrl + "betting", resource);

    if (response.status === 201) {
      dispatch(bettingSlice.actions.updateBettingGame(response.data));
    }

    // TODO: Dispatch failure actions
    setError("server", { type: "server", message: "Error from server" });
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
      dispatch(loadBets(gameId, winningOptionId));
    }
    // TODO: Dispatch failure actions
  };

export const { updateBettingGame } = bettingSlice.actions;
export default bettingSlice.reducer;
