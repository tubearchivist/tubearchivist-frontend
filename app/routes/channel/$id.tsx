import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { API_KEY, API_URL } from "~/lib/constants.server";
import { getChannel } from "~/lib/getChannels";
import type { Channel } from "~/types/channel";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  const channel = await getChannel(API_KEY, id);
  return channel;
};

const ChannelPage = () => {
  const channel = useLoaderData<Channel>();

  return (
    <>
      <div className="boxed-content">
        <div className="channel-banner">
          <Link to={`/channel/${channel.data.channel_id}/`}>
            <img
              src={`${API_URL}${channel.data.channel_banner_url}`}
              alt="channel_banner"
            />
          </Link>
        </div>

        <div className="info-box-item channel-nav">
          <a href="{% url 'channel_id' channel_info.channel_id %}">
            <h3>Videos</h3>
          </a>
          <a href="{% url 'channel_id_playlist' channel_info.channel_id %}">
            <h3>Playlists</h3>
          </a>
          <a href="{% url 'channel_id_about' channel_info.channel_id %}">
            <h3>About</h3>
          </a>
          {/* {% if has_pending %} */}
          <a href="{% url 'downloads' %}?channel={{ channel_info.channel_id }}">
            <h3>Downloads</h3>
          </a>
          {/* {% endif %} */}
        </div>

        <div id="notifications"></div>

        <div className="info-box info-box-2">
          <div className="info-box-item">
            <div className="round-img">
              <a href="">
                <img
                  src={`${API_URL}${channel.data.channel_thumb_url}`}
                  alt="channel thumbnail"
                />
              </a>
            </div>
            <div>
              <h3>
                <a href="">{channel.data.channel_name}</a>
              </h3>
              <p>
                Subscribers: {channel.data.channel_subs.toLocaleString("en-US")}
              </p>
              {channel.data.channel_subscribed ? (
                <button className="unsubscribe">Unsubscribe</button>
              ) : (
                <button>Subscribe</button>
              )}
            </div>
          </div>
          <div className="info-box-item">
            <div>
              <p>
                Total Views:{" "}
                {channel.data.channel_views.toLocaleString("en-US")}
              </p>
              <button
                title={`Mark all videos from ${channel.data.channel_name} as watched`}
              >
                Mark as watched
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="boxed-content boxed-3">
        <div className="view-controls">
          <div className="toggle">
            <span>Hide Watched videos:</span>
            <div className="toggleBox">
              <input type="checkbox" name="hide_watched" id="hide_watched" />
              <label className="ofbtn" htmlFor="hide_watched">
                Off
              </label>
              <label className="onbtn" htmlFor="hide_watched">
                On
              </label>
            </div>

            <div className="sort">
              <div id="hidden-form">
                <span>Sort by:</span>
                <select name="sort" id="sort">
                  <option value="published">date published</option>
                  <option value="downloaded">date downloaded</option>
                  <option value="views">views</option>
                  <option value="likes">likes</option>
                </select>
                <select name="sort-order" id="sort-order">
                  <option value="asc">asc</option>
                  <option value="desc">desc</option>
                </select>
              </div>
            </div>

            <div className="view-icons">
              <img src="/img/icon-sort.svg" alt="sort icon" />
              <div className="grid-count">
                <img src="/img/icon-add.svg" alt="grid plus row" />
                <img src="/img/icon-substract.svg" alt="grid minus row" />
              </div>
              <img src="/img/icon-gridview.svg" alt="grid view" />
              <img src="/img/icon-listview.svg" alt="list view" />
            </div>
          </div>
        </div>
      </div>
      <div className="boxed-content boxed-3">
        <div className="video-list grid-3">
          <div className="video-item grid">
            <a href="">
              <div className="video-thumb-wrap grid">
                <div className="video-thumb">
                  {/* <img src="thumb_url" alt="" /> */}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelPage;
