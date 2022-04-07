import { GetServerSideProps, NextPage } from "next";
import { CustomHead } from "../components/CustomHead";
import { Layout } from "../components/Layout";
import { TA_BASE_URL } from "../lib/constants";
import { getChannels } from "../lib/getChannels";
import { Channel } from "../types/channel";

export const getServerSideProps: GetServerSideProps = async () => {
  const channels = await getChannels();
  return { props: { channels } };
};

const Channel: NextPage<{ channels: Channel }> = ({ channels }) => {
  return (
    <>
      <CustomHead title="Channels" />

      <Layout>
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
                  checked
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
                onClick={() => console.log("changeView(this)")}
                data-origin="channel"
                data-value="grid"
                alt="grid view"
              />
              <img
                src="/img/icon-listview.svg"
                onClick={() => console.log("changeView(this)")}
                data-origin="channel"
                data-value="list"
                alt="list view"
              />
            </div>
          </div>
          <h2>Total matching channels: {channels.data.length} </h2>
          <div className="channel-list list">
            {/* {% if results %}
            {% for channel in results %} */}
            {channels &&
              channels.data.map((channel) => {
                return (
                  <div key={channel.channel_id} className="channel-item list">
                    <div className="channel-banner list">
                      <a href="{% url 'channel_id' channel.source.channel_id %}">
                        <img
                          src={`${TA_BASE_URL}${channel.channel_banner_url}`}
                          alt="{{ channel.source.channel_id }}-banner"
                        />
                      </a>
                    </div>
                    <div className="info-box info-box-2 list">
                      <div className="info-box-item">
                        <div className="round-img">
                          <a href="{% url 'channel_id' channel.source.channel_id %}">
                            <img
                              src={`${TA_BASE_URL}${channel.channel_thumb_url}`}
                              alt="channel-thumb"
                            />
                          </a>
                        </div>
                        <div>
                          <h3>
                            <a href="{% url 'channel_id' channel.source.channel_id %}">
                              {" "}
                              {channel.channel_name}{" "}
                            </a>
                          </h3>
                          {/* {% if channel.source.channel_subs >= 1000000 %} */}
                          <p>Subscribers: {channel.channel_subs} </p>
                          {/* {% else %} */}
                        </div>
                      </div>
                      <div className="info-box-item">
                        <div>
                          <p>Last refreshed: {channel.channel_last_refresh} </p>
                          {/* {% if channel.source.channel_subscribed %} */}
                          <button
                            className="unsubscribe"
                            type="button"
                            id="{{ channel.source.channel_id }}"
                            onClick={() => console.log("unsubscribe(this.id)")}
                            title="Unsubscribe from {{ channel.source.channel_name }}"
                          >
                            Unsubscribe
                          </button>
                          {/* {% else %} */}
                          <button
                            type="button"
                            id="{{ channel.source.channel_id }}"
                            onClick={() => console.log("subscribe(this.id)")}
                            title="Subscribe to {{ channel.source.channel_name }}"
                          >
                            Subscribe
                          </button>
                          {/* {% endif %} */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {/* {% endfor %}
        {% else %} */}
            {/* <h2>No channels found...</h2> */}
            {/* {% endif %} */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Channel;
