import { useLoaderData } from "@remix-run/react";
import type { ErrorBoundaryComponent, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import VideoList from "~/components/VideoList/VideoList";
import { getVideos } from "~/lib/getVideos";

export const loader = async ({ context, request }: LoaderArgs) => {
  const data = await getVideos(request);
  return json(data);
};

export default function Index() {
  const { data: videos } = useLoaderData<typeof loader>();
  // console.log(videos);

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
