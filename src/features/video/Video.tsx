import { FunctionComponent } from "react";

interface VideoProps {
  className: string;
}

const Video: FunctionComponent<VideoProps> = (props) => {
  var loc = "https://player.twitch.tv?channel=drako&parent=" + window.location.hostname;

  return <iframe className={props.className} title="Video" src={loc} width="100%" height="100%"></iframe>;
};

Video.displayName = "Video";
export default Video;
