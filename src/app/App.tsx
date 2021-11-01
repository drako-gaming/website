import React, { FunctionComponent } from "react";
import Header from "../common/header/index";
import Chat from "../features/chat/Chat";
import Video from "../features/video/Video";

const App: FunctionComponent = () => (
  <div className="m-0 p-0 h-100 d-md-flex flex-column">
    <Header />
    <div className="container-fluid d-flex h-100 flex-column">
      <div className="row flex-fill d-flex">
        <Video />
        <Chat />
      </div>
    </div>
  </div>
);
App.displayName = "App";

export default App;
