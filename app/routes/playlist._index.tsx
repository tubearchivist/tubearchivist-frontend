import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import IconAdd from "~/images/icon-add.svg";
import IconGridView from "~/images/icon-gridview.svg";
import IconListView from "~/images/icon-listview.svg";
import { API_URL } from "~/lib/constants";
import { API_KEY } from "~/lib/constants.server";
import { getPlaylists } from "~/lib/getPlaylists";
import type { Playlists } from "~/types/playlists";

export const loader = async () => {
  const playlists = await getPlaylists(API_KEY);

  return playlists;
};

type ViewStyle = "grid" | "list";

const Playlist = () => {
  const playlists = useLoaderData<Playlists>();
  const [viewStyle, setViewStyle] = useState<ViewStyle>("grid");

  const handleSetViewstyle = (selectedViewStyle: ViewStyle) => {
    setViewStyle(selectedViewStyle);
  };

  return (
    <>
      <div className="boxed-content">
        <div className="title-split">
          <div className="title-bar">
            <h1>Playlists</h1>
          </div>
          <div className="title-split-form">
            <img
              id="animate-icon"
              // onClick="showForm()"
              src={IconAdd}
              width={35}
              height={30}
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
              />
              {/* {% if not show_subed_only %} */}
              <label htmlFor="show_subed_only" className="ofbtn">
                Off
              </label>
              {/* {% else %} */}
              <label htmlFor="show_subed_only" className="onbtn">
                On
              </label>
              {/* {% endif %} */}
            </div>
          </div>
          <div className="view-icons">
            <img
              src={IconGridView}
              width={35}
              height={30}
              onClick={() => handleSetViewstyle("grid")}
              alt="grid view"
            />
            <img
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
          {!playlists ? (
            <h2>No playlists found...</h2>
          ) : (
            playlists.data.map((playlist) => {
              return (
                <div key={playlist.playlist_id} className={`playlist-item ${viewStyle}`}>
                  <div className="playlist-thumbnail">
                    <Link to={playlist.playlist_id}>
                      <img
                        src={`${API_URL}/${playlist.playlist_thumbnail}`}
                        alt={`${playlist.playlist_id}-thumbnail`}
                      />
                    </Link>
                  </div>
                  <div className={`playlist-desc ${viewStyle}`}>
                    <a href="{% url 'channel_id' playlist.source.playlist_channel_id %}">
                      <h3> {playlist.playlist_channel} </h3>
                    </a>
                    <a href="{% url 'playlist_id' playlist.source.playlist_id %}">
                      <h2> {playlist.playlist_name} </h2>
                    </a>
                    <p>Last refreshed: {playlist.playlist_last_refresh} </p>

                    {playlist.playlist_subscribed ? (
                      <button
                        className="unsubscribe"
                        type="button"
                        id="{{ playlist.source.playlist_id }}"
                        // onClick="unsubscribe(this.id)"
                        title="Unsubscribe from {{ playlist.source.playlist_name }}"
                      >
                        Unsubscribe
                      </button>
                    ) : (
                      <button
                        type="button"
                        id="{{ playlist.source.playlist_id }}"
                        // onClick="subscribe(this.id)"
                        title="Subscribe to {{ playlist.source.playlist_name }}"
                      >
                        Subscribe
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Playlist;
