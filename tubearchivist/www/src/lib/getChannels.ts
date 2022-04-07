import { Channel } from "../types/channel";

export const getChannels = async (): Promise<Channel> => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_TUBEARCHIVIST_URL}/api/channel/`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token b4d4330462c7fc16c51873e45579b29a1a12fc90`,
        mode: "no-cors",
      },
    }
  ).then((res) => res.json());
};
