import { useState } from "react";
import IconPlay from "~/images/icon-play.svg";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import type { Datum } from "~/types/Videos";

type ViewStyle = "grid grid-3" | "list";

const VideoList = ({ videos }: { videos: Datum[] }) => {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<Datum>();
  const [viewStyle, setViewStyle] = useState<ViewStyle>("grid grid-3");

  const handleSelectedVideo = (video: Datum) => {
    setSelectedVideoUrl(video);
  };

  const handleRemoveVideoPlayer = () => {
    setSelectedVideoUrl(undefined);
  };

  const handleSetViewstyle = (selectedViewStyle: ViewStyle) => {
    setViewStyle(selectedViewStyle);
  };

  if (!videos) {
    return (
      <div className="boxed-content">
        <h2>No videos found...</h2>
        <p>
          If you&apos;ve already added a channel or playlist, try going to the{" "}
          <a href="{% url 'downloads">downloads page</a> to start the scan and download tasks.
        </p>
      </div>
    );
  }

  return (
    <>
      <VideoPlayer
        handleRemoveVideoPlayer={handleRemoveVideoPlayer}
        selectedVideo={selectedVideoUrl}
      />

      <div className="boxed-content">
        <div className="title-bar">
          <h1>Recent Videos</h1>
        </div>
        <div className="view-controls">
          <div className="toggle">
            <span>Hide watched:</span>
            <div className="toggleBox">
              <input
                id="hide_watched"
                // onClick="toggleCheckbox(this)"
                type="checkbox"
              />
              {/* {% if not hide_watched %} */}
              <label htmlFor="" className="ofbtn">
                Off
              </label>
              {/* {% else %} */}
              <label htmlFor="" className="onbtn">
                On
              </label>
              {/* {% endif %} */}
            </div>
          </div>
          <div className="sort">
            <div id="hidden-form">
              <span>Sort by:</span>
              <select name="sort" id="sort" onChange={() => console.log("onChange sort")}>
                <option value="published">date published</option>
                <option value="downloaded">date downloaded</option>
                <option value="views">views</option>
                <option value="likes">likes</option>
              </select>
              <select
                name="sord-order"
                id="sort-order"
                onChange={() => console.log("onChange sort-order")}
              >
                <option value="asc">asc</option>
                <option value="desc">desc</option>
              </select>
            </div>
          </div>
          <div className="view-icons">
            <img
              src="/img/icon-sort.svg"
              alt="sort-icon"
              onClick={() => console.log("showForm")}
              id="animate-icon"
            />
            <img
              src="/img/icon-gridview.svg"
              onClick={() => handleSetViewstyle("grid grid-3")}
              alt="grid view"
            />
            <img
              src="/img/icon-listview.svg"
              onClick={() => handleSetViewstyle("list")}
              alt="list view"
            />
          </div>
        </div>
        <div className={`video-list ${viewStyle}`}>
          {videos.map((video) => {
            return (
              <div key={video.youtube_id} className={`video-item ${viewStyle}`}>
                <div style={{ cursor: "pointer" }} onClick={() => handleSelectedVideo(video)}>
                  <div className={`video-thumb-wrap ${viewStyle}`}>
                    <div className="video-thumb">
                      <img src={`http://localhost:8000${video.vid_thumb_url}`} alt="video-thumb" />
                      {/* {% if video.source.player.progress %} */}
                      <div
                        className="video-progress-bar"
                        id={`progress-${video.youtube_id}`}
                        // style={{ width: video.youtube_id. }} // TODO: /video/youtube_id/progress
                      />
                      {/* {% else %} */}
                      {/* <div
                        className="video-progress-bar"
                        id={`progress-${video.youtube_id}`}
                        style={{ width: "0%" }}
                      /> */}
                      {/* {% endif %} */}
                    </div>
                    <div className="video-play">
                      <img width={40} height={40} src={IconPlay} alt="play-icon" />
                    </div>
                  </div>
                </div>
                <div className={`video-desc ${viewStyle}`}>
                  <div className="video-desc-player" id={`video-info-${video.youtube_id}`}>
                    {video.player.watched ? (
                      <img
                        src="/img/icon-seen.svg"
                        alt="seen-icon"
                        data-id={video.youtube_id}
                        data-status="watched"
                        // onClick="updateVideoWatchStatus(this)"
                        className="watch-button"
                        title="Mark as unwatched"
                      />
                    ) : (
                      <img
                        src="/img/icon-unseen.svg"
                        alt="unseen-icon"
                        data-id={video.youtube_id}
                        data-status="unwatched"
                        // onClick="updateVideoWatchStatus(this)"
                        className="watch-button"
                        title="Mark as watched"
                      />
                    )}

                    <span>
                      {video.published} | {video.player.duration_str}
                    </span>
                  </div>
                  <div>
                    <a href={`/channel/${video.channel.channel_id}`}>
                      <h3>{video.channel.channel_name}</h3>
                    </a>
                    <a className="video-more" href={`/video/${video.youtube_id}`}>
                      <h2>{video.title}</h2>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default VideoList;
