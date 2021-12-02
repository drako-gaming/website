import { combineReducers, configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import profile from "../features/profile/profileSlice";
import betting from "../features/betting/bettingSlice";
import leaderboard from "../features/leaderboard/leaderboardSlice";
import { signal } from "./signalr";

const rootReducer = combineReducers({
  profile,
  betting,
  leaderboard,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(signal),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
