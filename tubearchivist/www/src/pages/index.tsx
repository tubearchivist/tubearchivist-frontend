import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { dehydrate, QueryClient } from "react-query";
import { CustomHead } from "../components/CustomHead";
import { Layout } from "../components/Layout";
import { VideoList } from "../components/VideoList";
import { getVideos } from "../lib/getVideos";
import { Videos } from "../types/video";

type HomeProps = {
  videos: Videos;
  imagePlaceholders?: string[];
};

const SignInOutButton = ({ isSignedIn }: { isSignedIn: boolean }) => {
  if (isSignedIn) {
    return <button onClick={() => signOut()}>Sign Out</button>;
  }
  return <button onClick={() => signIn()}>Sign in</button>;
};

const Home: NextPage<HomeProps> = () => {
  const { data: session, status } = useSession();
  const authData = {
    session,
    status,
  };

  return (
    <>
      <CustomHead />

      <Layout>
        <VideoList />
        <SignInOutButton isSignedIn={!!session?.user} />
      </Layout>
    </>
  );
};

export default Home;

// http://localhost:8000/cache/videos/3/37Kn-kIsVu8.jpg

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const videos = await getVideos();

//   return { props: { videos } };
// };

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("videos", getVideos);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
