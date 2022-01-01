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
      <div className="container-fluid d-flex h-100 mh-100 flex-column">
        <div className="row flex-fill d-flex flex-wrap flex-lg-nowrap h-100 content-wrapper">
          <div className="flex-row col-lg d-flex align-items-center m-0 p-0">
            <Video className={match ? "" : "d-none"} />
            <div id="content" className={match ? "d-none" : "container-fluid content"}>
              <div className="row">
                <div className="bigscreen-content">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              match ? "flex-row col-lg d-flex flex-fill m-0 p-0 chat" : "d-none d-lg-flex flex-row m-0 p-0 chat"
            }
          >
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigScreen;
