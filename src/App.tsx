import React from 'react';
import Chat from './features/chat/Chat';
import Video from './features/video/Video';

function App() {
  return (
<div className="m-0 p-0 h-100 d-md-flex flex-column">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Drako LIVE</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Subscribe</a>
                    </li>
                </ul>
                <ul className="navbar-nav d-flex">
                    <li className="nav-item">
                        <a className="nav-link">Login</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div className="container-fluid d-flex h-100 flex-column">
        <div className="row flex-fill d-flex">
            <Video />
            <Chat />
        </div>
    </div>
</div>
  );
}

export default App;
