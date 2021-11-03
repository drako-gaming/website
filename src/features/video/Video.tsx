import { FunctionComponent } from "react";

const Video: FunctionComponent = () => {
  var loc = "https://player.twitch.tv?channel=drako&parent=" + window.location.hostname;

  return (
    <div className="col h-100 d-flex flex-row align-items-stretch m-0 p-0">
      <iframe title="Video" src={loc} width="100%" height="100%"></iframe>
    </div>
  );
};

Video.displayName = "Video";
export default Video;
