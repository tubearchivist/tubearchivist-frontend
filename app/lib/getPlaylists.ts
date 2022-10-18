import type { Playlist } from "~/types/playlist";
import type { Playlists } from "~/types/playlists";
import type { PlaylistVideos } from "~/types/playlistVideos";
import { API_URL } from "./constants.server";

export const getPlaylists = async (token: string): Promise<Playlists> => {
  if (!token) {
    throw new Error(`No token provided when fetching a playlists`);
  }

  const response = await fetch(`${API_URL}/api/playlist/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
  });
  if (!response.ok) {
    throw new Error(`Error getting playlists information: ${response.statusText}`);
  }
  return response.json();
};

export const getPlaylist = async (
  token: string,
  playlistId: string | undefined
): Promise<Playlist> => {
  if (!token) {
    throw new Error(`No token provided when fetching a playlist: ${playlistId}`);
  }

  const response = await fetch(`${API_URL}/api/playlist/${playlistId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
  });
  if (!response.ok) {
    throw new Error(`Error getting playlists information: ${response.statusText}`);
  }
  return response.json();
};

export const getPlaylistVideos = async (
  token: string,
  id: string | undefined
): Promise<PlaylistVideos> => {
  if (!token) {
    throw new Error(`No token provided when fetching playlist videos: ${id}`);
  }
  const response = await fetch(`${API_URL}/api/playlist/${id}/video/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
  });

  if (!response.ok) {
    throw new Error(`Error getting playlist videos: ${response.statusText}`);
  }
  return response.json();
};
