import { HubConnectionBuilder, LogLevel, HttpTransportType } from "@microsoft/signalr";
import { withCallbacks, signalMiddleware } from "redux-signalr";
import { updateBalance } from "../features/profile/profileSlice";
import { Profile } from "../features/profile/types";
import { updateBettingGame, updateBet } from "../features/betting/bettingSlice";//
import { BettingGame } from "../features/betting/types";
import { Bet } from "../features/betting/types";//

const connection = new HubConnectionBuilder()
  .configureLogging(LogLevel.Debug)
  .withUrl("/api/userHub", {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .build();

const callbacks = withCallbacks()
  .add("CurrencyUpdated", (lastTransactionId: number, balance: number) => (dispatch) => {
    dispatch(
      updateBalance({
        balance: balance,
        lastTransactionId: lastTransactionId,
      } as Profile)
    );
  })
  .add("BetStatusChanged", (resource: BettingGame) => (dispatch) => {
    dispatch(updateBettingGame(resource));
  })//
  .add("ViewerBet", (resource:Bet) => (dispatch) => {
    dispatch(updateBet(resource));
  });

export const signal = signalMiddleware({
  callbacks,
  connection,
});
