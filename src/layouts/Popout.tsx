import React, { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

const Popout: FunctionComponent = () => (
  <div className="container-fluid">
    <div className="row row-cols-1 d-flex justify-content-center">
      <div className="col popout">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Popout;
