import { Link } from "@remix-run/react";
import IconClose from "~/images/icon-close.svg";
import { formatNumbers } from "~/lib/utils";

const API_URL =
  typeof document !== "undefined" ? window.ENV.API_URL : process.env.API_URL;

type VideoPlayerProps = {
  selectedVideo: any;
  handleRemoveVideoPlayer?: () => void;
  isHome?: boolean;
  showStats?: boolean;
};

const VideoPlayer = ({
  selectedVideo,
  handleRemoveVideoPlayer,
  isHome = true,
  showStats = true,
}: VideoPlayerProps) => {
  return (
    <>
      {selectedVideo && (
        <div className="player-wrapper">
          <div className="video-player">
            <video
              controls={true}
              autoPlay={true}
              width="100%"
              height="100%"
              src={`${API_URL}${selectedVideo?.media_url}`}
            />
            <SponsorBlock />
            {showStats ? (
              <div className="player-title boxed-content">
                <img
                  className="close-button"
                  src={IconClose}
                  width={30}
                  height={30}
                  alt="close-icon"
                  onClick={handleRemoveVideoPlayer}
                  title="Close player"
                />
                <div className="thumb-icon player-stats">
                  <img src="/img/icon-eye.svg" alt="views icon" />
                  <span>
                    {formatNumbers(selectedVideo.stats.view_count.toString())}
                  </span>
                  <span>|</span>
                  <img src="/img/icon-thumb.svg" alt="thumbs-up" />
                  <span>
                    {formatNumbers(selectedVideo.stats.like_count.toString())}
                  </span>
                </div>
                <div className="player-channel-playlist">
                  <h3>
                    <a href="/channel/${channelId}/">
                      {selectedVideo.channel.channel_name}
                    </a>
                  </h3>
                  {/* ${playlist} */}
                </div>
                <Link to={`/video/${selectedVideo.youtube_id}/`}>
                  <h2 id="video-title">{selectedVideo.title}</h2>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;

function SponsorBlock() {
  return (
    <>
      {/* <div className="notifications" id="notifications"></div> */}
      <div className="sponsorblock" id="sponsorblock">
        {/* {% if video.sponsorblock.is_enabled %} */}
        {/* {% if video.sponsorblock.segments|length == 0 %} */}
        <h4>
          This video doesn&apos;t have any sponsor segments added. To add a
          segment go to{" "}
          <u>
            <a href="https://www.youtube.com/watch?v={{ video.youtube_id }}">
              this video on YouTube
            </a>
          </u>{" "}
          and add a segment using the{" "}
          <u>
            <a href="https://sponsor.ajay.app/">SponsorBlock</a>
          </u>{" "}
          extension.
        </h4>
        {/* {% elif video.sponsorblock.has_unlocked %} */}
        <h4>
          This video has unlocked sponsor segments. Go to{" "}
          <u>
            <a href="https://www.youtube.com/watch?v={{ video.youtube_id }}">
              this video on YouTube
            </a>
          </u>{" "}
          and vote on the segments using the{" "}
          <u>
            <a href="https://sponsor.ajay.app/">SponsorBlock</a>
          </u>{" "}
          extension.
        </h4>
        {/* {% endif %} */}
        {/* {% endif %} */}
      </div>
    </>
  );
}
