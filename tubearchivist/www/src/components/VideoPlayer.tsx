import NextImage from "next/image";
import ReactPlayer from "react-player";
import IconClose from "../images/icon-close.svg";
import { formatNumbers } from "../lib/utils";

export const VideoPlayer = ({ selectedVideoUrl, handleRemoveVideoPlayer }) => {
  if (!selectedVideoUrl) return;
  return (
    <>
      <div className="player-wrapper">
        <div className="video-player">
          <ReactPlayer
            controls={true}
            width="100%"
            height="100%"
            light="false"
            playing // TODO: Not currently working
            playsinline
            url={`${process.env.NEXT_PUBLIC_TUBEARCHIVIST_URL}/media/${selectedVideoUrl.media_url}`}
          />
          <div className="player-title boxed-content">
            <NextImage
              className="close-button"
              src={IconClose}
              width={30}
              height={30}
              alt="close-icon"
              onClick={handleRemoveVideoPlayer}
              title="Close player"
            />
            {/* ${watchStatusIndicator}
    ${castButton}
     */}
            <div className="thumb-icon player-stats">
              <img src="/img/icon-eye.svg" alt="views icon" />
              <span>
                {formatNumbers(selectedVideoUrl.stats.view_count.toString())}
              </span>
              <span>|</span>
              <img src="/img/icon-thumb.svg" alt="thumbs-up" />
              <span>
                {formatNumbers(selectedVideoUrl.stats.like_count.toString())}
              </span>
            </div>
            <div className="player-channel-playlist">
              <h3>
                <a href="/channel/${channelId}/">
                  {selectedVideoUrl.channel.channel_name}
                </a>
              </h3>
              {/* ${playlist} */}
            </div>
            <a href="/video/${videoId}/">
              <h2 id="video-title">{selectedVideoUrl.title}</h2>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
