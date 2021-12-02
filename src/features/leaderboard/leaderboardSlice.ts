import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../../app/store";
import { baseUrl } from "../../api/api";
import axios from "axios";
import { User } from "./types";

const initialState: User[] = [];

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    updateLeaderboard(_, action: PayloadAction<User[]>) {
      return action.payload;
    },
  },
});

export const loadLeaderboard = (): AppThunk => async (dispatch: AppDispatch) => {
  const response = await axios.get(baseUrl + "leaderboard");

  if (response.status === 200) {
    dispatch(leaderboardSlice.actions.updateLeaderboard(response.data));
  }
};

export const { updateLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
