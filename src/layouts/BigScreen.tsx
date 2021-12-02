import React, { FunctionComponent } from "react";
import Header from "../common/header/index";
import { Outlet, useMatch } from "react-router-dom";
import Chat from "../features/chat/Chat";
import Video from "../features/video/Video";

const BigScreen: FunctionComponent = () => {
  let match = useMatch({ path: "/", end: true });

  return (
    <div className="m-0 p-0 h-100 d-md-flex flex-column">
      <Header />
      <div className="container-fluid d-flex h-100 flex-column">
        <div className="row flex-fill d-flex">
          <div className="col h-100 d-flex flex-row align-items-stretch m-0 p-0">
            <Video className={match ? "" : "d-none"} />
            <div className={match ? "d-none" : "container-fluid"} style={{ overflowY: "scroll" }}>
              <div className="row">
                <div className="col-md-4 offset-md-4">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default BigScreen;
