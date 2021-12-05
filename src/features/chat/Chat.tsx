import { FunctionComponent } from "react";

const Chat: FunctionComponent = () => {
  var loc = "https://www.twitch.tv/embed/drako/chat?parent=" + window.location.hostname + "&darkpopout";

  return <iframe title="Twitch Chat" src={loc} width="100%" height="100%"></iframe>;
};

Chat.displayName = "Chat";
export default Chat;
