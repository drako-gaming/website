import { FunctionComponent } from "react";

const Chat: FunctionComponent = () => {
  var loc = "https://www.twitch.tv/embed/drako/chat?parent=" + window.location.hostname + "&darkpopout";

  return (
    <div className="col d-flex flex-row m-0 p-0" style={{ maxWidth: 340 }}>
      <iframe title="Twitch Chat" src={loc} width="100%" height="100%"></iframe>
    </div>
  );
};

Chat.displayName = "Chat";
export default Chat;
