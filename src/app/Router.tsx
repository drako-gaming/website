import React, { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import BigScreen from "../layouts/BigScreen";

const Router : FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<BigScreen />} />
  </Routes>
);

export default Router;
