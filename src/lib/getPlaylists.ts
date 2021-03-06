import { Playlist } from "../types/playlist";
import { Playlists } from "../types/playlists";
import { getTAUrl } from "./constants";

const TA_BASE_URL = getTAUrl();

export const getPlaylists = async (token: string): Promise<Playlists> => {
  if (!token) {
    throw new Error(`No token provided when fetching a playlists`);
  }

  const response = await fetch(`${TA_BASE_URL.server}/api/playlist/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Error getting playlists information: ${response.statusText}`
    );
  }
  return response.json();
};

export const getPlaylist = async (
  token: string,
  playlistId: string
): Promise<Playlist> => {
  if (!token) {
    throw new Error(
      `No token provided when fetching a playlist: ${playlistId}`
    );
  }

  const response = await fetch(
    `${TA_BASE_URL.server}/api/playlist/${playlistId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        mode: "no-cors",
      },
    }
  );
  if (!response.ok) {
    throw new Error(
      `Error getting playlists information: ${response.statusText}`
    );
  }
  return response.json();
};
