import { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { loadLeaderboard } from "./leaderboardSlice";

const Leaderboard: FunctionComponent = () => {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state: RootState) => state.leaderboard);

  useEffect(() => {
    dispatch(loadLeaderboard());
  }, [dispatch]);

  return (
    <table className="table w-100">
      <thead>
        <tr>
          <td>Rank</td>
          <td>Name</td>
          <td>Scales</td>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((x, i) => (
          <tr key={x.displayName + i}>
            <td>{x.rank}</td>
            <td>{x.displayName}</td>
            <td>{x.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
