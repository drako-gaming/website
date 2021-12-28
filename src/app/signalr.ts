import { HubConnectionBuilder, LogLevel, HttpTransportType } from "@microsoft/signalr";
import { withCallbacks, signalMiddleware } from "redux-signalr";
import { updateBalance } from "../features/profile/profileSlice";
import { Profile } from "../features/profile/types";
import { updateBettingGame } from "../features/betting/bettingSlice";
import { BettingGame } from "../features/betting/types";

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
  });

export const signal = signalMiddleware({
  callbacks,
  connection,
});
