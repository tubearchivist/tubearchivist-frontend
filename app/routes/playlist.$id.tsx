import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { API_URL } from "~/lib/constants";
import { API_KEY } from "~/lib/constants.server";
import { getChannel } from "~/lib/getChannels";
import { getPlaylist, getPlaylistVideos } from "~/lib/getPlaylists";
import type { Channel } from "~/types/channel";
import type { Playlist } from "~/types/playlist";
import type { PlaylistVideos } from "~/types/playlistVideos";

export const loader: LoaderFunction = async ({ params, context, request }) => {
  const playlist = await getPlaylist(API_KEY, params.id);
  const channel = await getChannel(API_KEY, playlist.data.playlist_channel_id);
  const videos = await getPlaylistVideos(API_KEY, params.id);

  const channelThumb = `http://localhost:8000${channel.data.channel_thumb_url}`;
  return { playlist, channel, channelThumb, videos };
};

export const PlaylistPage = () => {
  const { playlist, channel, channelThumb, videos } = useLoaderData<{
    playlist: Playlist;
    channel: Channel;
    channelThumb: string;
    videos: PlaylistVideos;
  }>();

  return (
    <>
      <div className="boxed-content">
        <div className="title-bar">
          <h1>{playlist.data.playlist_name}</h1>
        </div>

        <div className="info-box info-box-3">
          <div className="info-box-item">
            <div className="round-img">
              <Link to={`/channel/${channel.data.channel_id}`}>
                <img src={channelThumb} alt="channel thumb" />
              </Link>
            </div>
            <div>
              <h3>
                <Link to={`/channel/${channel.data.channel_id}`}>{channel.data.channel_name}</Link>
              </h3>
              <span>Subscribers: {channel.data.channel_subs.toLocaleString("en-US")}</span>
            </div>
          </div>

          <div className="info-box-item">
            <div>
              <p>Last refreshed: {playlist.data.playlist_last_refresh}</p>
              <p>
                Playlist:{" "}
                {playlist.data.playlist_subscribed ? (
                  <button className="unsubscribe">Unsubscribe</button>
                ) : (
                  <button>Subscribe</button>
                )}
              </p>
              <p>
                Youtube:{" "}
                <a
                  href={`https://www.youtube.com/playlist?list=${playlist.data.playlist_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Active
                </a>
              </p>
              <button id="delete-item">Delete Playlist</button>
              <div className="delete-confirm" id="delete-button">
                <span>Delete {playlist.data.playlist_name}</span>
                <button data-action="metadata" data-id="{{ playlist_info.playlist_id }}">
                  Delete metadata
                </button>
                <button
                  data-action="all"
                  className="danger-button"
                  data-id="{{ playlist_info.playlist_id }}"
                >
                  Delete all
                </button>
                <br />
                <button>Cancel</button>
              </div>
            </div>
          </div>

          <div className="info-box-item">
            <div>
              <p>Total Videos archived: {playlist.data.playlist_entries.length}</p>
              <p>
                Watched:{" "}
                <button title={`Mark all videos from ${playlist.data.playlist_name} as watched`}>
                  Mark as watched
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="description-box">
          <p id="text-expand" className="description-text">
            {playlist.data.playlist_description}
          </p>
          <button id="text-expand-button">Show more</button>
        </div>
      </div>
      <div className="boxed-content grid-3 grid">
        <div className="view-controls">
          <div className="toggle">
            <span>Hide watched videos:</span>
            <div className="toggleBox">
              <input type="checkbox" name="" id="hide_watched" />
              <label htmlFor="hide_watched" className="ofbtn">
                Off
              </label>
              <label htmlFor="hide_watched" className="onbtn">
                On
              </label>
            </div>
          </div>
          <div className="view-icons">
            <div className="grid-count">
              <img src="/img/icon-add.svg" alt="grid plus row" />
              <img src="/img/icon-substract.svg" alt="grid minus row" />
            </div>
            <img src="/img/icon-gridview.svg" alt="grid view" />
            <img src="/img/icon-listview.svg" alt="list view" />
          </div>
        </div>
      </div>

      <div id="player" className="player-wrapper"></div>

      <div className="boxed-content boxed-d">
        <div className="video-list grid-3 grid">
          {videos.data.map((video) => (
            <div key={video.youtube_id} className="video-item grid">
              <a href="#player">
                <div className="video-thumb-wrap grid">
                  <div className="video-thumb">
                    <img src={`${API_URL}${video.vid_thumb_url}`} alt="video thumbnail" />
                    <div
                      className="video-progress-bar"
                      style={{ width: video.player.duration }}
                    ></div>
                  </div>
                  <div className="video-play">
                    <img src="/img/icon-play.svg" alt="play button" />
                  </div>
                </div>
              </a>
              <div className="video-desc grid">
                <div className="video-desc-player">
                  {video.player.watched ? (
                    <img src="/img/icon-seen.svg" alt="seen indicator" className="watch-button" />
                  ) : (
                    <img src="/img/icon-unseen.svg" alt="seen indicator" className="watch-button" />
                  )}
                  <span>
                    {video.published} | {video.player.duration_str}
                  </span>
                </div>
                <div>
                  <a href="/video/:id" className="video-more">
                    <h2>{video.title}</h2>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  console.log(error);
  return (
    <div className="boxed-content">
      <div className="title-bar">
        <h1>Error: </h1>
        <p>{error.message}</p>
      </div>
    </div>
  );
};

export default PlaylistPage;
