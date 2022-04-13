import { Videos } from "../types/video";

export const getVideos = async (token: string): Promise<Videos> => {
  if (!token) {
    throw new Error("Missing API token in request to get videos");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TUBEARCHIVIST_URL}/api/video/`,
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
    throw new Error("Failed to fetch videos");
  }

  return response.json();
};

// b4d4330462c7fc16c51873e45579b29a1a12fc90
