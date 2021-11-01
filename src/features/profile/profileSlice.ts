import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../../app/store";
import { Profile } from "./types";
import { fetchProfile } from "../../api/api";

const initialState: Profile = {
  isAuthenticated: false,
  displayName: "",
  balance: 0,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<Profile>) {
      return action.payload;
    },
    updateBalance(state, action: PayloadAction<Profile>) {
      return {
        ...state,
        balance: action.payload.balance,
      };
    },
  },
});

export const loadProfile = (): AppThunk => async (dispatch: AppDispatch) => {
  const profile = await fetchProfile();
  dispatch(profileSlice.actions.updateProfile(profile));
};

export const { updateProfile, updateBalance } = profileSlice.actions;
export default profileSlice.reducer;
