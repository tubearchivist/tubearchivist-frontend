import { Videos } from "../types/video";
import { TA_BASE_URL } from "./constants";

export const getVideos = async (token: string): Promise<Videos> => {
  if (!token) {
    throw new Error("Missing API token in request to get videos");
  }
  const response = await fetch(`${TA_BASE_URL}/api/video/`, {
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
