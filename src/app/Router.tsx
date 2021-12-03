import React, { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import BigScreen from "../layouts/BigScreen";
import Popout from "../layouts/Popout";
import BettingAdmin from "../features/betting/BettingAdmin";
import Leaderboard from "../features/leaderboard/Leaderboard";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const Router: FunctionComponent = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const isModerator = profile.roles && profile.roles.includes("moderator");

  return (
    <Routes>
      <Route path="/" element={<BigScreen />}>
        <Route path="leaderboard" element={<Leaderboard />} />
        {isModerator ? <Route path="betAdmin" element={<BettingAdmin />} /> : ""}
      </Route>
      <Route path="/popout" element={<Popout />}>
        {isModerator ? <Route path="betAdmin" element={<BettingAdmin />} /> : ""}
      </Route>
    </Routes>
  );
};

export default Router;
