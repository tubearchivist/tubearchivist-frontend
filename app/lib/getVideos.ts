import type { Datum, Videos } from "~/types/Videos";
import { API_URL } from "./constants.server";
import { getSession } from "~/session.server";

export const getVideos = async (request: Request) => {
  // if (!token) {
  //   throw new Error("Missing API token in request to get videos");
  // }
  const session = await getSession(request);
  const token = session.get("token");
  const response = await fetch(`${API_URL}/api/video/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
  });

  if (!response.ok) {
    // if (response.status === 403) {
    //   return redirect("/login");
    // }
    throw new Error(`Failed to fetch videos: ${response.statusText}`);
  }

  const data: Videos = await response.json();

  return data;
};

export const getVideo = async (token: string, videoId: string): Promise<Datum> => {
  if (!token) {
    throw new Error("Missing API token in request to get video");
  }
  const response = await fetch(`${API_URL}/api/video/${videoId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch videos: ${response.statusText}`);
  }

  return response.json();
};
