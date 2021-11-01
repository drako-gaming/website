import { combineReducers, configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import profile from "../features/profile/profileSlice";

const rootReducer = combineReducers({
  profile,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
