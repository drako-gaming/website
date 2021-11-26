import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

const App: FunctionComponent = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
App.displayName = "App";

export default App;
