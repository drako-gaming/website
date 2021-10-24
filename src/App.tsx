import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
<div className="m-0 p-0 h-100 d-md-flex flex-column">

    <div id="main-nav" className="navbar navbar-expand-lg navbar-dark">
    <div className="container">

        <a className="brand float-left" href="/">Drako LIVE</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsemenu" aria-controls="collapsemenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsemenu">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item d-block d-sm-none">
                    <a className="nav-link" title="Home" href="/">Home</a>
                </li>

                    <li className="nav-item d-block d-sm-none">
                        <a className="nav-link" title="Sign in" href="/login">Sign In</a>
                    </li>

                <li className="nav-item">
                    <a className="nav-link" title="MENU ITEM LEFT" href="/">Menu Item Left</a>
                </li>

                <li className="nav-item subscribe">
                    <a className="nav-link" href="/subscribe" rel="subscribe" title="Get your own subscription"><span>Subscribe</span></a>
                </li>

            </ul>

            <ul className="navbar-nav" id="secondary-navbar">

                    <li className="nav-item">
                        <a title="Sign In" className="nav-link" rel="login">
                            <i className="fas fa-sign-in-alt"></i>
                            <span className="nav-label">Sign In</span>
                        </a>
                    </li>
                 </ul>
        </div>

    </div>
</div>

    <div className="container-fluid d-flex h-100 flex-column">
        <div className="row flex-fill d-flex">
            <div className="col h-100 d-flex flex-row align-items-stretch m-0 p-0">
                <iframe src="https://player.twitch.tv?channel=drako&parent=localhost" width="100%" height="100%">
                </iframe>
            </div>
            <div className="col d-flex flex-row m-0 p-0" style={{ maxWidth: 340 }}>
                <iframe
                    src="https://www.twitch.tv/embed/drako/chat?parent=localhost&darkpopout"
                    width="100%"
                    height="100%"
                    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-modals">
                </iframe>
            </div>
        </div>
    </div>
</div>
  );
}

export default App;
