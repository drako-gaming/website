import React, { FunctionComponent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AnimatedNumber from "react-animated-number";
import { RootState } from "../../app/store";
import BettingOpenForm from "./BettingOpenForm";
import BettingWinnerForm from "./BettingWinnerForm";
import { closeBetting, cancelBetting } from "./bettingSlice";

const BettingAdmin: FunctionComponent = () => {
  const [state, setState] = useState({ openingBet: false, choosingWinner: false });
  const dispatch = useDispatch();
  const betting = useSelector((state: RootState) => state.betting);

  if (state.openingBet) {
    return <BettingOpenForm onCls={() => setState({ ...state, openingBet: false })} />;
  }
  if (state.choosingWinner) {
    return <BettingWinnerForm onCls={() => setState({ ...state, choosingWinner: false })} />;
  }

  switch (betting.game.status) {
    case "Canceled":
      const cancelledOptions = betting.game.options.map((item) => (
        <tr>
          <td>{item.description}</td>
          <td>{item.total} scales</td>
        </tr>
      ));
      return (
        <div className="text-center">
          <h1>
            Betting is <span className="text-red">cancelled</span>
          </h1>
          <p className="lead">{betting.game.objective}</p>
          <table className="table table-borderless">
            <tbody>{cancelledOptions}</tbody>
          </table>
          <p>All bets have been refunded.</p>
          <form>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => setState({ ...state, openingBet: true })}
              >
                Start new bet
              </button>
            </div>
          </form>
        </div>
      );

    case "Open":
      return (
        <div className="text-center">
          <h1>
            Betting is <span className="text-green">open</span>
          </h1>
          <p className="lead">{betting.game.objective}</p>
          <h2>
            <AnimatedNumber className="fs-1" value={betting.game.total} duration={1500} stepPrecision={0} />
          </h2>
          <p>scales wagered</p>
          <form>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => dispatch(closeBetting(betting.game.id!))}
              >
                Close betting
              </button>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-danger w-100"
                onClick={() => dispatch(cancelBetting(betting.game.id!))}
              >
                Cancel betting
              </button>
            </div>
          </form>
        </div>
      );

    case "Closed":
      const options = betting.game.options.map((item) => (
        <tr key={item.id}>
          <td>{item.description}</td>
          <td>{item.total} scales</td>
        </tr>
      ));
      return (
        <div className="text-center">
          <h1>
            Betting is <span className="text-red">closed</span>
          </h1>
          <p className="lead">{betting.game.objective}</p>
          <table className="table table-borderless">
            <tbody>{options}</tbody>
          </table>
          <form>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => setState({ ...state, choosingWinner: true })}
              >
                Choose winner
              </button>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-danger w-100"
                onClick={() => dispatch(cancelBetting(betting.game.id!))}
              >
                Cancel betting
              </button>
            </div>
          </form>
        </div>
      );

    case "Done":
      const winners =
        betting.winners.length > 0 ? (
          betting.winners.map((item, i) => (
            <tr key={item.userTwitchId}>
              <td>{i + 1}</td>
              <td>{item.userTwitchDisplayName}</td>
              <td>{item.amount}</td>
              <td>{item.awarded}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>
              <p></p>
              <p className="lead">Nobody won</p>
            </td>
          </tr>
        );
      return (
        <div className="text-center">
          <h1>Betting is done</h1>
          <p className="lead">{betting.game.objective}</p>
          <p className="fs-3">
            Result:{" "}
            <span className="text-info">
              {betting.game.options.find((x) => x.id === betting.game.winningOption)?.description}
            </span>
          </p>
          <table className="table table-sm">
            <thead>
              <tr>
                <td>Rank</td>
                <td>Name</td>
                <td>Scales Spent</td>
                <td>Scales Won</td>
              </tr>
            </thead>
            <tbody>{winners}</tbody>
          </table>
          <form>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => setState({ ...state, openingBet: true })}
              >
                Start new bet
              </button>
            </div>
          </form>
        </div>
      );
  }

  return <div>oops {betting.game.status}</div>;
};

BettingAdmin.displayName = "Betting admin";
export default BettingAdmin;
