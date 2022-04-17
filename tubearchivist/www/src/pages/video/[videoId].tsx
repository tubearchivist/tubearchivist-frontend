import { GetServerSideProps, NextPage } from "next";
import NextImage from "next/image";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CustomHead } from "../../components/CustomHead";
import { Layout } from "../../components/Layout";
import { TA_BASE_URL } from "../../lib/constants";
import { getVideo } from "../../lib/getVideos";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const session = await getSession(context);
  const videoId = context.query.videoId;

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery(["video", videoId], () =>
    getVideo(session.ta_token.token, videoId as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};

const Video: NextPage = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const { data: session } = useSession();
  const { data, error, isLoading } = useQuery(
    ["video", session.ta_token.token],
    () => getVideo(session.ta_token.token, videoId as string),
    {
      enabled: !!session?.ta_token?.token,
    }
  );

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Layout>
      <CustomHead title={data?.data?.title} />
      <VideoPlayer showStats={false} isHome={false} selectedVideo={data.data} />

      <div className="boxed-content">
        <div className="title-bar">
          {/* {% if cast %} */}
          {/* <google-cast-launcher id="castbutton"></google-cast-launcher> */}
          {/* {% endif %} */}
          <h1 id="video-title">{data?.data?.title}</h1>
        </div>
        <div className="info-box info-box-3">
          <div className="info-box-item">
            <div className="round-img">
              <a href="{% url 'channel_id' video.channel.channel_id %}">
                <NextImage
                  src={`${TA_BASE_URL}/cache/channels/${data.data.channel.channel_id}_thumb.jpg`}
                  alt="channel-thumb"
                  width={90}
                  height={90}
                />
              </a>
            </div>
            <div>
              <h3>
                <a href="{% url 'channel_id' video.channel.channel_id %}">
                  {" "}
                  {data?.data?.channel?.channel_name}{" "}
                </a>
              </h3>
              {/* {% if video.channel.channel_subs >= 1000000 %} */}
              <p>Subscribers: {data?.data?.channel?.channel_subs} </p>
              {/* {% else %} */}
              {/* <p>Subscribers: video.channel.channel_subs|intcomma </p> */}
              {/* {% endif %} */}
            </div>
          </div>
          <div className="info-box-item">
            <div>
              <p>Published: {data?.data?.published} </p>
              <p>Last refreshed: {data?.data?.vid_last_refresh} </p>
              <p className="video-info-watched">
                Watched:
                {/* {% if video.player.watched %} */}
                <img
                  src="/img/icon-seen.svg"
                  alt="seen-icon"
                  // onClick="updateVideoWatchStatus(this)"
                  className="watch-button"
                  title="Mark as unwatched"
                />
                {/* {% else %} */}
                <img
                  src="/img/icon-unseen.svg"
                  alt="unseen-icon"
                  // onClick="updateVideoWatchStatus(this)"
                  className="watch-button"
                  title="Mark as watched"
                />
                {/* {% endif %} */}
              </p>
              {/* {% if video.active %} */}
              <p>
                Youtube:{" "}
                <a
                  href={`https://www.youtube.com/watch?v=${data?.data?.youtube_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Active
                </a>
              </p>
              {/* {% else %} */}
              <p>Youtube: Deactivated</p>
              {/* {% endif %} */}
              <a download="" href={`/media/${data?.data?.media_url}`}>
                <button id="download-item">Download File</button>
              </a>
              <button
                // onClick="deleteConfirm()"
                id="delete-item"
              >
                Delete Video
              </button>
              <div className="delete-confirm" id="delete-button">
                <span>Are you sure? </span>
                <button
                  className="danger-button"
                  // onclick="deleteVideo(this)"
                  data-id="{{ video.youtube_id }}"
                  data-redirect="{{ video.channel.channel_id }}"
                >
                  Delete
                </button>{" "}
                <button
                // onClick="cancelDelete()"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="info-box-item">
            <div>
              <p className="thumb-icon">
                <img src="/img/icon-eye.svg" alt="views" />:
                {data.data.stats.view_count}{" "}
              </p>
              <p className="thumb-icon like">
                <img src="/img/icon-thumb.svg" alt="thumbs-up" />:
                {data.data.stats.like_count}{" "}
              </p>
              {/* {% if video.stats.dislike_count %} */}
              {data.data.stats.dislike_count > 0 ? (
                <p className="thumb-icon">
                  <img
                    className="dislike"
                    src="/img/icon-thumb.svg"
                    alt="thumbs-down"
                  />
                  : {data?.data?.stats?.dislike_count}{" "}
                </p>
              ) : null}

              {/* {% endif %} */}
              {/* {% if video.stats.average_rating %} */}
              {data.data.stats.average_rating ? (
                <p className="rating-stars">
                  Rating:
                  {/* {% for star in video.stats.average_rating %} */}
                  <img src={`img/icon-star-{{ star }}.svg`} alt="{{ star }}" />
                  {/* {% endfor %} */}
                </p>
              ) : null}
              {/* {% endif %} */}
            </div>
          </div>
        </div>
        {/* {% if video.description %} */}
        <div className="info-box-item description-box">
          <p>
            Description:{" "}
            <button
              // onClick="textReveal()"
              id="text-reveal-button"
            >
              Show
            </button>
          </p>
          <div id="text-reveal" className="description-text">
            {data?.data?.description}
          </div>
        </div>
        {/* {% endif %} */}

        {/* {% if playlist_nav %} */}
        {/* {% for playlist_item in playlist_nav %} */}

        <div className="playlist-wrap">
          <a href="{% url 'playlist_id' playlist_item.playlist_meta.playlist_id %}">
            <h3>
              Playlist playlist_item.playlist_meta.current_idx|add:1 :
              playlist_item.playlist_meta.playlist_name{" "}
            </h3>
          </a>
          <div className="playlist-nav">
            <div className="playlist-nav-item">
              {/* {% if playlist_item.playlist_previous %} */}
              <a href="{% url 'video' playlist_item.playlist_previous.youtube_id %}">
                <img
                  src="/cache/{{ playlist_item.playlist_previous.vid_thumb }}"
                  alt="previous thumbnail"
                />
              </a>
              <div className="playlist-desc">
                <p>Previous:</p>
                <a href="{% url 'video' playlist_item.playlist_previous.youtube_id %}">
                  <h3>
                    {" "}
                    playlist_item.playlist_previous.idx|add:1
                    playlist_item.playlist_previous.title{" "}
                  </h3>
                </a>
              </div>
              {/* {% endif %} */}
            </div>
            <div className="playlist-nav-item">
              {/* {% if playlist_item.playlist_next %} */}
              <div className="playlist-desc">
                <p>Next:</p>
                <a href="{% url 'video' playlist_item.playlist_next.youtube_id %}">
                  <h3>
                    {" "}
                    playlist_item.playlist_next.idx|add:1
                    playlist_item.playlist_next.title
                  </h3>
                </a>
              </div>
              <a href="{% url 'video' playlist_item.playlist_next.youtube_id %}">
                <img
                  src="/cache/{{ playlist_item.playlist_next.vid_thumb }}"
                  alt="previous thumbnail"
                />
              </a>
              {/* {% endif %} */}
            </div>
          </div>
        </div>
        {/* {% endfor %}
    {% endif %} */}
      </div>
    </Layout>
  );
};

export default Video;
