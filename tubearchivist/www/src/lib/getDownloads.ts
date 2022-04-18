import { Download } from "../types/download";
import { getTAUrl } from "./constants";

const TA_BASE_URL = getTAUrl();

export const getDownloads = async (token: string, filter: boolean): Promise<Download> => {
  const response = await fetch(`${TA_BASE_URL.server}/api/download/?filter=${filter ? 'ignore' : 'pending'}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
  });
  if (!response.ok) {
    throw new Error("Error getting download queue information");
  }
  return response.json();
};

export const sendDownloads = async (token: string, input: string): Promise<Download> => {
  var data = {
    "data": [{
      "youtube_id": input,
      "status": "pending"
    }]
  };
  const response = await fetch(`${TA_BASE_URL.server}/api/download/`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
    method: "POST"
  });
  if (!response.ok) {
    // throw new Error("Error adding content to the download queue.");
    // return response.json();
  }
  return response.json();
};

export const sendDeleteAllQueuedIgnored = async (token: string, filter: string): Promise<Download> => {
  const response = await fetch(`${TA_BASE_URL.server}/api/download/?filter=${filter}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
    method: "DELETE"
  });
  if (!response.ok) {
    // throw new Error("Error adding content to the download queue.");
    // return response.json();
  }
  return response.json();
};

export const sendDeleteVideoQueuedIgnored = async (token: string, videoId: string): Promise<Download> => {
  const response = await fetch(`${TA_BASE_URL.server}/api/download/${videoId}/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      mode: "no-cors",
    },
    method: "DELETE"
  });
  if (!response.ok) {
    // throw new Error("Error adding content to the download queue.");
    // return response.json();
  }
  return response.json();
};