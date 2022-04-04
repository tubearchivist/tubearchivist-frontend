import { Videos } from "../types/video";

export const VideoList = ({ videos }: { videos: Videos }) => {
  if (!videos) {
    return (
      <div className="boxed-content">
        <h2>No videos found...</h2>
        <p>
          If you've already added a channel or playlist, try going to the{" "}
          <a href="{% url 'downloads">downloads page</a> to start the scan and
          download tasks.
        </p>
      </div>
    );
  }

  return (
    <>
      <div id="player" className="player-wrapper"></div>
      <div className="boxed-content">
        <div className="video-list list">
          {/* {% if results %}
            {% for video in results %} */}
          {videos &&
            videos?.data?.map((video) => (
              <div key={video.youtube_id} className="video-item list">
                <a
                  href="#player"
                  // data-id="{{ video.source.youtube_id }}"
                  data-id={video.youtube_id}
                  // onClick="createPlayer(this)"
                >
                  <div className="video-thumb-wrap list">
                    <div className="video-thumb">
                      <img
                        src="/cache/{{ video.source.vid_thumb_url }}"
                        alt="video-thumb"
                      />
                      {/* {% if video.source.player.progress %} */}
                      <div
                        className="video-progress-bar"
                        // id="progress-{{ video.source.youtube_id }}"
                        id={`progress-${video.youtube_id}`}
                        // style="width: {{video.source.player.progress}}%;"
                      ></div>
                      {/* {% else %} */}
                      <div
                        className="video-progress-bar"
                        // id="progress-{{ video.source.youtube_id }}"
                        id={`progress-${video.youtube_id}`}
                        // style="width: 0%;"
                      ></div>
                      {/* {% endif %} */}
                    </div>
                    <div className="video-play">
                      <img src="/img/icon-play.svg" alt="play-icon" />
                    </div>
                  </div>
                </a>
                <div className="video-desc list">
                  <div
                    className="video-desc-player"
                    // id="video-info-{{ video.source.youtube_id }}"
                    id={video.youtube_id}
                  >
                    {/* {% if video.source.player.watched %} */}
                    <img
                      src="/img/icon-seen.svg"
                      alt="seen-icon"
                      data-id="{{ video.source.youtube_id }}"
                      data-status="watched"
                      // onClick="updateVideoWatchStatus(this)"
                      className="watch-button"
                      title="Mark as unwatched"
                    />
                    {/* {% else %} */}
                    <img
                      src="/img/icon-unseen.svg"
                      alt="unseen-icon"
                      data-id="{{ video.source.youtube_id }}"
                      data-status="unwatched"
                      // onClick="updateVideoWatchStatus(this)"
                      className="watch-button"
                      title="Mark as watched"
                    />
                    {/* {% endif %} */}
                    {/* <span>{{ video.source.published }} | {{ video.source.player.duration_str }}</span> */}
                  </div>
                  <div>
                    {/* <a href="{% url 'channel_id' video.source.channel.channel_id %}"><h3>{{ video.source.channel.channel_name }}</h3></a> */}
                    {/* <a className="video-more" href="{% url 'video' video.source.youtube_id %}"><h2>{{ video.source.title }}</h2></a> */}
                  </div>
                </div>
              </div>
            ))}

          {/* {% endfor %}
        {% else %} */}

          {/* {% endif %} */}
        </div>
      </div>
    </>
  );
};
