import type { Channel } from "~/types/channel";
import type { Channels } from "../types/channels";
import { API_URL } from "./constants.server";

export const getChannels = async (token: string): Promise<Channels> => {
  if (!token) {
    throw new Error(`Unable to fetch channels, no token provided`);
  }

  const response = await fetch(`${API_URL}/api/channel/`, {
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
  return await response.json();
};

export const getChannel = async (token: string, id: string | undefined): Promise<Channel> => {
  if (!token) {
    throw new Error(`Unable to fetch channels, no token provided`);
  }

  if (!id) {
    throw new Error(`Unable to fetch channel, no id provided`);
  }

  const response = await fetch(`${API_URL}/api/channel/${id}`, {
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
