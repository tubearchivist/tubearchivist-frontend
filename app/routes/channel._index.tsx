import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { useState } from "react";
import { API_URL } from "~/lib/constants";
import { API_KEY } from "~/lib/constants.server";
import { getChannels } from "~/lib/getChannels";
import type { Channels } from "~/types/channels";
import { formatNumbers } from "../lib/utils";

export const loader: LoaderFunction = async () => {
  const channels = await getChannels(API_KEY);

  return channels;
};

export const meta: MetaFunction = () => {
  return {
    title: "Channels",
  };
};

type ViewStyle = "grid" | "list";

const ChannelsPage = () => {
  const channels = useLoaderData<Channels>();
  const [viewStyle, setViewStyle] = useState<ViewStyle>("grid");

  const handleSetViewstyle = (selectedViewStyle: ViewStyle) => {
    setViewStyle(selectedViewStyle);
  };

  return (
    <>
      <div className="boxed-content">
        <div className="title-split">
          <div className="title-bar">
            <h1>Channels</h1>
          </div>
          <div className="title-split-form">
            <img
              id="animate-icon"
              onClick={() => console.log("showForm()")}
              src="/img/icon-add.svg"
              alt="add-icon"
              title="Subscribe to Channels"
            />
            <div className="show-form">
              <form id="hidden-form" action="/channel/" method="post">
                {/* {% csrf_token %}
                    {{ subscribe_form }} */}
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        <div className="view-controls">
          <div className="toggle">
            <span>Show subscribed only:</span>
            <div className="toggleBox">
              <input
                id="show_subed_only"
                onClick={() => console.log("toggleCheckbox(this)")}
                type="checkbox"
              />
              {/* {% if not show_subed_only %} */}
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
          <div className="view-icons">
            <img
              src="/img/icon-gridview.svg"
              onClick={() => handleSetViewstyle("grid")}
              alt="grid view"
            />
            <img
              src="/img/icon-listview.svg"
              onClick={() => handleSetViewstyle("list")}
              alt="list view"
            />
          </div>
        </div>
        <h2>Total matching channels: {channels?.data?.length} </h2>
        <div className={`channel-list ${viewStyle}`}>
          {!channels.data ? (
            <h2>No channels found...</h2>
          ) : (
            channels.data?.map((channel) => {
              return (
                <div key={channel.channel_id} className={`channel-item ${viewStyle}`}>
                  <div className={`channel-banner ${viewStyle}`}>
                    <Link to={channel.channel_id}>
                      <img
                        src={`${API_URL}${channel.channel_banner_url}`}
                        alt="{{ channel.source.channel_id }}-banner"
                      />
                    </Link>
                  </div>
                  <div className={`info-box info-box-2 ${viewStyle}`}>
                    <div className="info-box-item">
                      <div className="round-img">
                        <Link to={channel.channel_id}>
                          <img src={`${API_URL}${channel.channel_thumb_url}`} alt="channel-thumb" />
                        </Link>
                      </div>
                      <div>
                        <h3>
                          <Link to={channel.channel_id}>{channel?.channel_name}</Link>
                        </h3>
                        {/* {% if channel.source.channel_subs >= 1000000 %} */}
                        <p>Subscribers: {formatNumbers(channel?.channel_subs)}</p>
                        {/* {% else %} */}
                      </div>
                    </div>
                    <div className="info-box-item">
                      <div>
                        <p>Last refreshed: {channel?.channel_last_refresh} </p>
                        {/* {% if channel.source.channel_subscribed %} */}
                        <button
                          className="unsubscribe"
                          type="button"
                          id="{{ channel.source.channel_id }}"
                          onClick={() => console.log("unsubscribe(this.id) -> toggleSubscribe()")}
                          title={`${
                            channel?.channel_subscribed ? "Unsubscribe from" : "Subscribe to"
                          } ${channel?.channel_name}`}
                        >
                          {channel?.channel_subscribed ? "Unsubscribe" : "Subscribe"}
                        </button>
                        {/* {% else %} */}
                        {/* <button
                            type="button"
                            id="{{ channel.source.channel_id }}"
                            onClick={() => console.log("subscribe(this.id)")}
                            title="Subscribe to {{ channel.source.channel_name }}"
                          >
                            Subscribe
                          </button> */}
                        {/* {% endif %} */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {/* {% endfor %}
        {% else %} */}
          {/* <h2>No channels found...</h2> */}
          {/* {% endif %} */}
        </div>
      </div>
    </>
  );
};

export default ChannelsPage;
