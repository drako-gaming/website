import React, { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import BigScreen from "../layouts/BigScreen";
import Popout from "../layouts/Popout";
import Video from "../features/video/Video";
import BettingAdmin from "../features/betting/BettingAdmin";

const Router: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<BigScreen />}>
      <Route index element={<Video />} />
    </Route>
    <Route path="/popout" element={<Popout />}>
      <Route path="betAdmin" element={<BettingAdmin />} />
    </Route>
  </Routes>
);

export default Router;
