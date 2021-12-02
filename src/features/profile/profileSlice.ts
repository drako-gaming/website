import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../../app/store";
import { Profile } from "./types";
import { fetchProfile } from "../../api/api";
import { loadBetting } from "../betting/bettingSlice";

const initialState: Profile = {
  isAuthenticated: false,
  displayName: "",
  balance: 0,
  lastTransactionId: 0,
  roles: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile(_, action: PayloadAction<Profile>) {
      return {
        ...action.payload,
        balance: +action.payload.balance,
        lastTransactionId: +action.payload.lastTransactionId,
      };
    },
    updateBalance(state, action: PayloadAction<Profile>) {
      if (+action.payload.lastTransactionId <= state.lastTransactionId) {
        return state;
      }
      return {
        ...state,
        balance: +action.payload.balance,
        lastTransactionId: +action.payload.lastTransactionId,
      };
    },
  },
});

export const loadProfile = (): AppThunk => async (dispatch: AppDispatch) => {
  const profile = await fetchProfile();
  dispatch(profileSlice.actions.updateProfile(profile));
  dispatch(loadBetting());
};

export const { updateProfile, updateBalance } = profileSlice.actions;
export default profileSlice.reducer;
