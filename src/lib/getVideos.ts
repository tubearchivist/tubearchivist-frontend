import { Video } from "../types/video";
import { Videos } from "../types/videos";
import { getTAUrl } from "./constants";

const TA_BASE_URL = getTAUrl();

export const getVideos = async (token: string): Promise<Videos> => {
  if (!token) {
    throw new Error("Missing API token in request to get videos");
  }
  const response = await fetch(`${TA_BASE_URL.server}/api/video/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }

  return response.json();
};

export const getVideo = async (
  token: string,
  videoId: string
): Promise<Video> => {
  if (!token) {
    throw new Error("Missing API token in request to get video");
  }
  const response = await fetch(`${TA_BASE_URL.server}/api/video/${videoId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }

  return response.json();
};
