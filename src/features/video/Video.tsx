function Video() {
    return (
        <div className="col h-100 d-flex flex-row align-items-stretch m-0 p-0">
            <iframe title="Video" src="https://player.twitch.tv?channel=drako&parent=localhost" width="100%" height="100%">
            </iframe>
        </div>
    );
}

export default Video;
