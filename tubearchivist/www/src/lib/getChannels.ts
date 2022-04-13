import { Channel } from "../types/channel";
import { TA_BASE_URL } from "./constants";

export const getChannels = async (token: string): Promise<Channel> => {
  const response = await fetch(`${TA_BASE_URL}/api/channel/`, {
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
