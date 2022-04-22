import { Channel } from "../types/channel";
import { getTAUrl } from "./constants";

const TA_BASE_URL = getTAUrl();

export const getChannels = async (token: string): Promise<Channel> => {
  if (!token) {
    throw new Error(`Unable to fetch channels, no token provided`);
  }

  const response = await fetch(`${TA_BASE_URL.server}/api/channel/`, {
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
