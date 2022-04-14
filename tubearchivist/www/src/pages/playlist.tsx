import { GetServerSideProps } from "next";
import NextImage from "next/image";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CustomHead } from "../components/CustomHead";
import { Layout } from "../components/Layout";
import { TA_BASE_URL } from "../lib/constants";
import { getPlaylists } from "../lib/getPlaylists";
import IconAdd from "../images/icon-add.svg";
import IconListView from "../images/icon-listview.svg";
import IconGridView from "../images/icon-gridview.svg";

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

  await queryClient.prefetchQuery(["playlists", session.ta_token.token], () =>
    getPlaylists(session.ta_token.token)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};

const Playlist = () => {
  const { data: session } = useSession();
  const {
    data: { data: playlists },
    error,
    isLoading,
  } = useQuery(
    ["playlists", session.ta_token.token],
    () => getPlaylists(session.ta_token.token),
    {
      enabled: !!session.ta_token.token,
    }
  );

  const [viewStyle, setViewStyle] = useState<ViewStyle>("grid");

  const handleSetViewstyle = (selectedViewStyle: ViewStyle) => {
    setViewStyle(selectedViewStyle);
  };

  return (
    <Layout>
      <CustomHead title="Playlist" />

      <div className="boxed-content">
        <div className="title-split">
          <div className="title-bar">
            <h1>Playlists</h1>
          </div>
          <div className="title-split-form">
            <NextImage
              id="animate-icon"
              // onClick="showForm()"
              src={IconAdd}
              width={45}
              height={40}
              alt="add-icon"
              title="Subscribe to Playlists"
            />
            <div className="show-form">
              <form id="hidden-form" action="/playlist/" method="post">
                {/* {% csrf_token %}
                    {{ subscribe_form }} */}
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        {/* <div id="notifications" data="playlist"></div> */}
        <div className="view-controls">
          <div className="toggle">
            <span>Show subscribed only:</span>
            <div className="toggleBox">
              <input
                id="show_subed_only"
                // onClick="toggleCheckbox(this)"
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
            <NextImage
              src={IconGridView}
              width={35}
              height={30}
              onClick={() => handleSetViewstyle("grid")}
              alt="grid view"
            />
            <NextImage
              src={IconListView}
              width={35}
              height={30}
              onClick={() => handleSetViewstyle("list")}
              alt="list view"
            />
          </div>
        </div>
        <div className={`playlist-list ${viewStyle}`}>
          {/* {% if results %}
            {% for playlist in results %} */}
          {!isLoading && !playlists ? (
            <h2>No playlists found...</h2>
          ) : (
            playlists?.map((playlist) => {
              return (
                <div
                  key={playlist.playlist_id}
                  className={`playlist-item ${viewStyle}`}
                >
                  <div className="playlist-thumbnail">
                    <a href="{% url 'playlist_id' playlist.source.playlist_id %}">
                      <img
                        src={`${TA_BASE_URL}/${playlist.playlist_thumbnail}`}
                        alt={`${playlist.playlist_id}-thumbnail`}
                      />
                    </a>
                  </div>
                  <div className={`playlist-desc ${viewStyle}`}>
                    <a href="{% url 'channel_id' playlist.source.playlist_channel_id %}">
                      <h3> {playlist.playlist_channel} </h3>
                    </a>
                    <a href="{% url 'playlist_id' playlist.source.playlist_id %}">
                      <h2> {playlist.playlist_name} </h2>
                    </a>
                    <p>Last refreshed: {playlist.playlist_last_refresh} </p>
                    {/* {% if playlist.source.playlist_subscribed %} */}
                    <button
                      className="unsubscribe"
                      type="button"
                      id="{{ playlist.source.playlist_id }}"
                      // onClick="unsubscribe(this.id)"
                      title="Unsubscribe from {{ playlist.source.playlist_name }}"
                    >
                      Unsubscribe
                    </button>
                    {/* {% else %} */}
                    <button
                      type="button"
                      id="{{ playlist.source.playlist_id }}"
                      // onClick="subscribe(this.id)"
                      title="Subscribe to {{ playlist.source.playlist_name }}"
                    >
                      Subscribe
                    </button>
                    {/* {% endif %} */}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Playlist;
