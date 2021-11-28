import React, { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

const Popout: FunctionComponent = () => (
  <div className="container">
    <div className="row row-cols-1 row-cols-lg-3">
      <div className="col"></div>
      <div className="col">
        <Outlet />
      </div>
      <div className="col"></div>
    </div>
  </div>
);

export default Popout;
