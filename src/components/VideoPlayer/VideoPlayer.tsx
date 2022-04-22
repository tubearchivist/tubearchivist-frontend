import NextImage from "next/image";
import NextLink from "next/link";
import ReactPlayer from "react-player";
import IconClose from "../../images/icon-close.svg";
import { getTAUrl } from "../../lib/constants";
import { formatNumbers } from "../../lib/utils";
import { Data } from "../../types/video";

const TA_BASE_URL = getTAUrl();

type VideoPlayerProps = {
  selectedVideo: Data;
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
  if (!selectedVideo) return;
  return (
    <>
      {selectedVideo && (
        <div className="player-wrapper">
          <div className="video-player">
            <ReactPlayer
              controls={true}
              width="100%"
              height="100%"
              light={false}
              playing // TODO: Not currently working
              playsinline
              url={`${TA_BASE_URL.client}${selectedVideo?.media_url}`}
            />
            <SponsorBlock />
            {showStats ? (
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
                <NextLink href={`/video/${selectedVideo.youtube_id}/`}>
                  <a>
                    <h2 id="video-title">{selectedVideo.title}</h2>
                  </a>
                </NextLink>
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
