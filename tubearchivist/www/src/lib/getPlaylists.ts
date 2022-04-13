import { Playlist } from "../types/playlist";

export const getPlaylists = async (token: string): Promise<Playlist> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TUBEARCHIVIST_URL}/api/playlist/`,
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
    throw new Error("Error getting channel information");
  }
  return response.json();
};
