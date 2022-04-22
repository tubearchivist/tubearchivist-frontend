import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CustomHead } from "../components/CustomHead";
import { Layout } from "../components/Layout";
import { getTAUrl } from "../lib/constants";
import { getChannels } from "../lib/getChannels";
import { formatNumbers } from "../lib/utils";

const TA_BASE_URL = getTAUrl();

type ViewStyle = "grid" | "list";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery(["channels", session.ta_token.token], () =>
    getChannels(session.ta_token.token)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};

const Channel: NextPage = () => {
  const { data: session } = useSession();
  const {
    data: channels,
    error,
    isLoading,
  } = useQuery(
    ["channels", session.ta_token.token],
    () => getChannels(session.ta_token.token),
    {
      enabled: !!session?.ta_token?.token,
    }
  );

  const [viewStyle, setViewStyle] = useState<ViewStyle>("grid");

  const handleSetViewstyle = (selectedViewStyle: ViewStyle) => {
    setViewStyle(selectedViewStyle);
  };

  if (isLoading) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h1>Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </Layout>
    );
  }

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
              channels?.data?.map((channel) => {
                return (
                  <div
                    key={channel?.channel_id}
                    className={`channel-item ${viewStyle}`}
                  >
                    <div className={`channel-banner ${viewStyle}`}>
                      <a href="{% url 'channel_id' channel.source.channel_id %}">
                        <img
                          src={`${TA_BASE_URL.client}${channel?.channel_banner_url}`}
                          alt="{{ channel.source.channel_id }}-banner"
                        />
                      </a>
                    </div>
                    <div className={`info-box info-box-2 ${viewStyle}`}>
                      <div className="info-box-item">
                        <div className="round-img">
                          <a href="{% url 'channel_id' channel.source.channel_id %}">
                            <img
                              src={`${TA_BASE_URL.client}${channel?.channel_thumb_url}`}
                              alt="channel-thumb"
                            />
                          </a>
                        </div>
                        <div>
                          <h3>
                            <a href="{% url 'channel_id' channel.source.channel_id %}">
                              {" "}
                              {channel?.channel_name}{" "}
                            </a>
                          </h3>
                          {/* {% if channel.source.channel_subs >= 1000000 %} */}
                          <p>Subscribers: {formatNumbers(channel?.channel_subs)} </p>
                          {/* {% else %} */}
                        </div>
                      </div>
                      <div className="info-box-item">
                        <div>
                          <p>
                            Last refreshed: {channel?.channel_last_refresh}{" "}
                          </p>
                          {/* {% if channel.source.channel_subscribed %} */}
                          <button
                            className="unsubscribe"
                            type="button"
                            id="{{ channel.source.channel_id }}"
                            onClick={() => console.log("unsubscribe(this.id) -> toggleSubscribe()")}
                            title={`${channel?.channel_subscribed ? "Unsubscribe from" : "Subscribe to"} ${channel?.channel_name}`} 
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
      </Layout>
    </>
  );
};

export default Channel;
