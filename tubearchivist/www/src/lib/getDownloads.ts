import { Download } from "../types/download";
import { TA_BASE_URL } from "./constants";

export const getDownloads = async (token: string): Promise<Download> => {
  const response = await fetch(`${TA_BASE_URL}/api/download/`, {
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
