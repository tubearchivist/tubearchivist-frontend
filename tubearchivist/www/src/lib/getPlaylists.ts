import { Playlist } from "../types/playlist";
import { TA_BASE_URL } from "./constants";

export const getPlaylists = async (token: string): Promise<Playlist> => {
  const response = await fetch(`${TA_BASE_URL}/api/playlist/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
  });
  if (!response.ok) {
    throw new Error("Error getting channel information");
  }
  return response.json();
};
