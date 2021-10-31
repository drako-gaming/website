import { FunctionComponent } from "react";

const Chat: FunctionComponent = () => (
  <div className="col d-flex flex-row m-0 p-0" style={{ maxWidth: 340 }}>
    <iframe
      title="Twitch Chat"
      src="https://www.twitch.tv/embed/drako/chat?parent=localhost&darkpopout"
      width="100%"
      height="100%"
    ></iframe>
  </div>
);

Chat.displayName = "Chat";
export default Chat;
