import { useLoaderData } from "@remix-run/react";
import type { ErrorBoundaryComponent, LoaderFunction } from "@remix-run/server-runtime";

import VideoList from "~/components/VideoList/VideoList";
import { API_KEY } from "~/lib/constants.server";
import { getVideos } from "~/lib/getVideos";
import type { Datum } from "~/types/Videos";

export const loader: LoaderFunction = async ({ context, request }) => {
  const { data } = await getVideos(API_KEY);
  const withVideoThumbs = data.map((d) => ({
    ...d,
    resolved_thumb_url: `http://localhost:8000${d.vid_thumb_url}`,
  }));

  return withVideoThumbs;
};

export type Videos = Datum[] & {
  resolved_thumb_url: string;
};

export default function Index() {
  const videos = useLoaderData<Videos>();

  return (
    <main>
      <VideoList videos={videos} />
    </main>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }: { error: Error }) => {
  console.warn(error);
  return (
    <div className="boxed-content">
      <div className="title-bar">
        <h1>Error: </h1>
        <p>{error.message}</p>
      </div>
    </div>
  );
};
