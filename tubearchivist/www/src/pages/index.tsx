import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { dehydrate, QueryClient } from "react-query";
import { CustomHead } from "../components/CustomHead";
import { Layout } from "../components/Layout";
import { VideoList } from "../components/VideoList";
import { getVideos } from "../lib/getVideos";
import type { Videos } from "../types/video";

type HomeProps = {
  videos: Videos;
};

const Home: NextPage<HomeProps> = () => {
  return (
    <>
      <CustomHead />

      <Layout>
        <VideoList />
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery(["videos", session.ta_token.token], () =>
    getVideos(session.ta_token.token)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};
