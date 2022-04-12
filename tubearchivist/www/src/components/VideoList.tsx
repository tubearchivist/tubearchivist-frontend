import NextImage from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player/file";
import { useQuery } from "react-query";
import IconClose from "../images/icon-close.svg";
import IconPlay from "../images/icon-play.svg";
import { TA_BASE_URL } from "../lib/constants";
import { getVideos } from "../lib/getVideos";
import { formatNumbers } from "../lib/utils";
import { Datum, Videos } from "../types/video";

export const VideoList = () => {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<Datum>();
  const { data: queryData } = useQuery("videos", getVideos);
  const { data: videos } = queryData;

  const handleSelectedVideo = (video: Datum) => {
    setSelectedVideoUrl(video);
  };

  const handleRemoveVideoPlayer = () => {
    setSelectedVideoUrl(undefined);
  };

  if (!videos) {
    return (
      <div className="boxed-content">
        <h2>No videos found...</h2>
        <p>
          If you`&apos;`ve already added a channel or playlist, try going to the{" "}
          <a href="{% url 'downloads">downloads page</a> to start the scan and
          download tasks.
        </p>
      </div>
    );
  }

  return (
    <>
      {selectedVideoUrl && (
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
                    {formatNumbers(
                      selectedVideoUrl.stats.view_count.toString()
                    )}
                  </span>
                  <span>|</span>
                  <img src="/img/icon-thumb.svg" alt="thumbs-up" />
                  <span>
                    {formatNumbers(
                      selectedVideoUrl.stats.like_count.toString()
                    )}
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
      )}

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
              <select
                name="sort"
                id="sort"
                onChange={() => console.log("onChange sort")}
              >
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
              onClick={() => console.log("grid view")}
              data-origin="home"
              data-value="grid"
              alt="grid view"
            />
            <img
              src="/img/icon-listview.svg"
              onClick={() => console.log("list view")}
              data-origin="home"
              data-value="list"
              alt="list view"
            />
          </div>
        </div>
        <div className="video-list list">
          {videos &&
            videos?.map((video) => {
              return (
                <div key={video.youtube_id} className="video-item list">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelectedVideo(video)}
                  >
                    <div className="video-thumb-wrap list">
                      <div className="video-thumb">
                        <NextImage
                          src={`${TA_BASE_URL}/cache/${video.vid_thumb_url}`}
                          alt="video-thumb"
                          width={250}
                          height={145}
                          // blurDataURL={placeholder}
                          // placeholder="blur"
                        />
                        {/* {% if video.source.player.progress %} */}
                        <div
                          className="video-progress-bar"
                          id={`progress-${video.youtube_id}`}
                          // style={{ width: video.player.progress }} // TODO: /video/youtube_id/progress
                        ></div>
                        {/* {% else %} */}
                        <div
                          className="video-progress-bar"
                          id={`progress-${video.youtube_id}`}
                          style={{ width: "0%" }}
                        ></div>
                        {/* {% endif %} */}
                      </div>
                      <div className="video-play">
                        <NextImage
                          width={40}
                          height={40}
                          src={IconPlay}
                          alt="play-icon"
                        />
                      </div>
                    </div>
                  </a>
                  <div className="video-desc list">
                    <div
                      className="video-desc-player"
                      id={`video-info-${video.youtube_id}`}
                    >
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
                      <a
                        className="video-more"
                        href={`/video/${video.youtube_id}`}
                      >
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
